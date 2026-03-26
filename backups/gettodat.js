export const getTodaysTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!._id;

    // Get start and end of today strictly in IST (Asia/Kolkata)
    const now = new Date();
    const nowISTstr = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const nowIST = new Date(nowISTstr);

    const year = nowIST.getFullYear();
    const month = (nowIST.getMonth() + 1).toString().padStart(2, "0");
    const day = nowIST.getDate().toString().padStart(2, "0");

    // Construct ISO strings for strictly 00:00:00 and 23:59:59+05:30 on that target day
    const startOfToday = new Date(`${year}-${month}-${day}T00:00:00.000+05:30`);
    const endOfToday = new Date(`${year}-${month}-${day}T23:59:59.999+05:30`);

    // 1. Fetch Today's Calendar Events (including multi-day overlaps)
    const calEvents =
      (await CalenderEventModel.find({
        createdBy: userId,
        $or: [
          { start: { $lte: endOfToday }, end: { $gte: startOfToday } },
          { start: { $gte: startOfToday, $lte: endOfToday }, end: { $exists: false } },
          { start: { $gte: startOfToday, $lte: endOfToday }, end: null }
        ]
      }).lean()) || [];

    // 2. Fetch Projects active today (including multi-day overlaps)
    const projEvents =
      (await Project.find({
        createdBy: userId,
        $or: [
          { startDate: { $lte: endOfToday }, endDate: { $gte: startOfToday } },
          { startDate: { $gte: startOfToday, $lte: endOfToday }, endDate: { $exists: false } },
          { startDate: { $gte: startOfToday, $lte: endOfToday }, endDate: null }
        ]
      })
        .select(
          "_id projectTitle startDate endDate projectDescription location clientName",
        )
        .lean()) || [];

    // 3. Fetch Today's Follow-Ups
    const followUps =
      (await FollowUpModel.find({
        userId: userId,
        date: { $gte: startOfToday, $lte: endOfToday },
      })
        .populate("leadId", "name")
        .populate("clientId", "clientName")
        .lean()) || [];

    // 4. Fetch Today's Unpaid Payments (and synthetics)
    // Reusing the same logic from paymentController but tightly bound to today
    const payments =
      (await PaymentScheduleModel.find({
        createdBy: new mongoose.Types.ObjectId(userId),
        dueDate: { $gte: startOfToday, $lte: endOfToday }, // Only today
      })
        .populate(
          "projectId",
          "projectTitle endDate clientName projectAmount budget",
        )
        .lean()) || [];

    // === Map the data to Dashboard's expected format ({ id, name, desc, time, overdue, originalEvent }) ===
    const formatTime = (dateInput: Date | string) => {
      return new Date(dateInput).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    };

    const todaysEvents: any[] = [];
    const todaysFollowups: any[] = [];
    const todaysReminders: any[] = [];
    const todaysPayments: any[] = [];

    // Map Calendar Events -> Events
    calEvents.forEach((evt) => {
      todaysEvents.push({
        id: (evt as any)._id,
        name: (evt as any).title,
        desc: (evt as any).description || "No details",
        time: formatTime((evt as any).start),
        overdue: false,
        originalEvent: evt,
      });
    });

    // Map Project Events -> Events
    projEvents.forEach((evt) => {
      todaysEvents.push({
        id: (evt as any)._id,
        name: (evt as any).projectTitle,
        desc: (evt as any).projectDescription || "No details",
        time: null,
        overdue: false,
        originalEvent: evt,
      });
    });

    // Map Follow-ups -> Follow-ups or Reminders
    followUps.forEach((evt: any) => {
      const leadObj = evt.leadId;
      const clientObj = evt.clientId;
      const targetName =
        leadObj?.name || clientObj?.clientName || evt.leadName || "Unknown";

      const mapped = {
        id: evt._id,
        name: targetName,
        desc: evt.reason || evt.notes || "No details",
        time: formatTime(evt.date),
        overdue: false, // Since it's exactly today
        originalEvent: {
          ...evt,
          type: "followup", // Required by frontend router logic
        },
      };

      if (clientObj) {
        todaysReminders.push(mapped);
      } else {
        todaysFollowups.push(mapped);
      }
    });

    // Map Payments -> Payments
    // Assuming strict scheduled logic here
    payments.forEach((due: any) => {
      todaysPayments.push({
        id: due._id,
        name: due.projectId?.projectTitle || "Unknown Project",
        desc: `${due.description} — ₹${(due.amount || 0).toLocaleString("en-IN")}`,
        time: due.status === "paid" ? "Paid" : "Due Today",
        overdue: false,
        done: due.status === "paid",
        originalPayment: due,
      });
    });

    res.status(200).json({
      success: true,
      data: {
        followups: todaysFollowups,
        reminders: todaysReminders,
        events: todaysEvents,
        payments: todaysPayments,
      },
    });
  } catch (err) {
    console.error("❌ getTodaysTasks error:", err);
    res.status(500).json({ success: false, message: `Server Error: ${err}` });
  }
};
