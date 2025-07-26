import { Plus, MoreVertical } from "lucide-react";
import { useState } from "react";
import AddClientModal from "./AddClientModel";

const clients = [
  {
    date: "20 Jul 2025",
    firstName: "pikachu of pallet town",
    lastName: "-",
    company: "-",
    phone: "-",
    email: "pickapikpikachu@gmail.com",
  },
];

export default function ClientsOverview() {
    const [showModal, setShowModal] = useState(false);
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
      <div className="space-y-2">
        <h1 className="text-primary text-3xl font-bold">Clients</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your studio.
        </p>
      </div>
        <button  onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          <Plus className="w-4 h-4" />
          Add New Client
        </button>
      </div>

      <div className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date Created</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">First Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Last Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Company</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Phone</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, idx) => (
              <tr key={idx} className="border-t border-border text-white">
                <td className="px-4 py-3">{client.date}</td>
                <td className="px-4 py-3">{client.firstName}</td>
                <td className="px-4 py-3">{client.lastName}</td>
                <td className="px-4 py-3">{client.company}</td>
                <td className="px-4 py-3">{client.phone}</td>
                <td className="px-4 py-3 text-blue-600">{client.email}</td>
                <td className="px-4 py-3 text-right">
                  <button>
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        Show
        <select className="border border-border rounded-md px-2 py-1 bg-background text-foreground">
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
      {showModal && <AddClientModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
