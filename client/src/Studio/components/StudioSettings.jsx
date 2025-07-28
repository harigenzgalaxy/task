
import { useState } from "react"
import { Save, Trash2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Payment preferences state
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCreditCards: true,
    acceptPayPal: true,
    acceptBankTransfer: false,
    acceptCash: true,
    requireDeposit: true,
    depositPercentage: "50",
  })

  // Notification preferences state
  const [notificationSettings, setNotificationSettings] = useState({
    emailBookingConfirmation: true,
    emailPaymentReminders: true,
    emailEventReminders: false,
    smsBookingConfirmation: false,
    smsPaymentReminders: true,
    smsEventReminders: true,
    pushNotifications: true,
  })

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    timezone: "America/New_York",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSavePaymentSettings = () => {
    // toast({
    //   title: "Payment settings saved",
    //   description: "Your payment preferences have been updated successfully.",
    // })
  }

  const handleSaveNotificationSettings = () => {
    // toast({
    //   title: "Notification settings saved",
    //   description: "Your notification preferences have been updated successfully.",
    // })
  }

  const handleSaveGeneralSettings = () => {
    // toast({
    //   title: "General settings saved",
    //   description: "Your general preferences have been updated successfully.",
    // })
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // toast({
      //   title: "Password mismatch",
      //   description: "New password and confirmation password do not match.",
      //   variant: "destructive",
      // })
      return
    }

    // toast({
    //   title: "Password changed",
    //   description: "Your password has been updated successfully.",
    // })

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleDeleteAccount = () => {
    // toast({
    //   title: "Account deletion initiated",
    //   description: "Your account deletion request has been submitted. You will receive a confirmation email shortly.",
    //   variant: "destructive",
    // })
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between relative">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-400">
            Studio Settings
          </h1>
          <p className="text-gray-400">
            Configure your studio preferences and account settings
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Payment Preferences */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Payment Preferences</CardTitle>
            <CardDescription className="text-gray-400">
              Configure your accepted payment methods and deposit requirements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Accepted Payment Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="creditCards" className="text-white">
                      Credit Cards
                    </Label>
                    <Switch
                      id="creditCards"
                      checked={paymentSettings.acceptCreditCards}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, acceptCreditCards: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="paypal" className="text-white">
                      PayPal
                    </Label>
                    <Switch
                      id="paypal"
                      checked={paymentSettings.acceptPayPal}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, acceptPayPal: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bankTransfer" className="text-white">
                      Bank Transfer
                    </Label>
                    <Switch
                      id="bankTransfer"
                      checked={paymentSettings.acceptBankTransfer}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, acceptBankTransfer: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cash" className="text-white">
                      Cash
                    </Label>
                    <Switch
                      id="cash"
                      checked={paymentSettings.acceptCash}
                      onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, acceptCash: checked })}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-white">Deposit Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireDeposit" className="text-white">
                      Require Deposit
                    </Label>
                    <Switch
                      id="requireDeposit"
                      checked={paymentSettings.requireDeposit}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, requireDeposit: checked })
                      }
                    />
                  </div>
                  {paymentSettings.requireDeposit && (
                    <div className="space-y-2">
                      <Label htmlFor="depositPercentage" className="text-white">
                        Deposit Percentage
                      </Label>
                      <Select
                        value={paymentSettings.depositPercentage}
                        onValueChange={(value) =>
                          setPaymentSettings({ ...paymentSettings, depositPercentage: value })
                        }
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="25" className="text-white hover:bg-gray-700">
                            25%
                          </SelectItem>
                          <SelectItem value="50" className="text-white hover:bg-gray-700">
                            50%
                          </SelectItem>
                          <SelectItem value="75" className="text-white hover:bg-gray-700">
                            75%
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button onClick={handleSavePaymentSettings} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Payment Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Notification Preferences</CardTitle>
            <CardDescription className="text-gray-400">
              Choose how you want to receive notifications about bookings and events.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailBooking" className="text-white">
                      Booking Confirmations
                    </Label>
                    <Switch
                      id="emailBooking"
                      checked={notificationSettings.emailBookingConfirmation}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailBookingConfirmation: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailPayment" className="text-white">
                      Payment Reminders
                    </Label>
                    <Switch
                      id="emailPayment"
                      checked={notificationSettings.emailPaymentReminders}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailPaymentReminders: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailEvent" className="text-white">
                      Event Reminders
                    </Label>
                    <Switch
                      id="emailEvent"
                      checked={notificationSettings.emailEventReminders}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailEventReminders: checked })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-white">SMS Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsBooking" className="text-white">
                      Booking Confirmations
                    </Label>
                    <Switch
                      id="smsBooking"
                      checked={notificationSettings.smsBookingConfirmation}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, smsBookingConfirmation: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsPayment" className="text-white">
                      Payment Reminders
                    </Label>
                    <Switch
                      id="smsPayment"
                      checked={notificationSettings.smsPaymentReminders}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, smsPaymentReminders: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsEvent" className="text-white">
                      Event Reminders
                    </Label>
                    <Switch
                      id="smsEvent"
                      checked={notificationSettings.smsEventReminders}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, smsEventReminders: checked })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-white">Push Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications" className="text-white">
                      Enable Push Notifications
                    </Label>
                    <Switch
                      id="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={handleSaveNotificationSettings} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* General Settings */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-purple-400">General Settings</CardTitle>
            <CardDescription className="text-gray-400">
              Configure your timezone, currency, and display preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-white">
                  Timezone
                </Label>
                <Select
                  value={generalSettings.timezone}
                  onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="America/New_York" className="text-white hover:bg-gray-700">
                      Eastern Time (ET)
                    </SelectItem>
                    <SelectItem value="America/Chicago" className="text-white hover:bg-gray-700">
                      Central Time (CT)
                    </SelectItem>
                    <SelectItem value="America/Denver" className="text-white hover:bg-gray-700">
                      Mountain Time (MT)
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles" className="text-white hover:bg-gray-700">
                      Pacific Time (PT)
                    </SelectItem>
                    <SelectItem value="Europe/London" className="text-white hover:bg-gray-700">
                      London (GMT)
                    </SelectItem>
                    <SelectItem value="Europe/Paris" className="text-white hover:bg-gray-700">
                      Paris (CET)
                    </SelectItem>
                    <SelectItem value="Asia/Tokyo" className="text-white hover:bg-gray-700">
                      Tokyo (JST)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-white">
                  Currency
                </Label>
                <Select
                  value={generalSettings.currency}
                  onValueChange={(value) => setGeneralSettings({ ...generalSettings, currency: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="USD" className="text-white hover:bg-gray-700">
                      US Dollar (USD)
                    </SelectItem>
                    <SelectItem value="EUR" className="text-white hover:bg-gray-700">
                      Euro (EUR)
                    </SelectItem>
                    <SelectItem value="GBP" className="text-white hover:bg-gray-700">
                      British Pound (GBP)
                    </SelectItem>
                    <SelectItem value="CAD" className="text-white hover:bg-gray-700">
                      Canadian Dollar (CAD)
                    </SelectItem>
                    <SelectItem value="AUD" className="text-white hover:bg-gray-700">
                      Australian Dollar (AUD)
                    </SelectItem>
                    <SelectItem value="JPY" className="text-white hover:bg-gray-700">
                      Japanese Yen (JPY)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat" className="text-white">
                  Date Format
                </Label>
                <Select
                  value={generalSettings.dateFormat}
                  onValueChange={(value) => setGeneralSettings({ ...generalSettings, dateFormat: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="MM/DD/YYYY" className="text-white hover:bg-gray-700">
                      MM/DD/YYYY
                    </SelectItem>
                    <SelectItem value="DD/MM/YYYY" className="text-white hover:bg-gray-700">
                      DD/MM/YYYY
                    </SelectItem>
                    <SelectItem value="YYYY-MM-DD" className="text-white hover:bg-gray-700">
                      YYYY-MM-DD
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeFormat" className="text-white">
                  Time Format
                </Label>
                <Select
                  value={generalSettings.timeFormat}
                  onValueChange={(value) => setGeneralSettings({ ...generalSettings, timeFormat: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="12h" className="text-white hover:bg-gray-700">
                      12 Hour (AM/PM)
                    </SelectItem>
                    <SelectItem value="24h" className="text-white hover:bg-gray-700">
                      24 Hour
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleSaveGeneralSettings} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save General Settings
            </Button>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Change Password</CardTitle>
            <CardDescription className="text-gray-400">Update your account password for security.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-white">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    required
                    className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-white">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                      className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                      className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                <Save className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-gray-900 border-red-600">
          <CardHeader>
            <CardTitle className="text-red-400">Danger Zone</CardTitle>
            <CardDescription className="text-gray-400">Irreversible and destructive actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border border-red-600/20 rounded-lg bg-red-600/5">
              <div>
                <h4 className="font-medium text-red-400">Delete Studio Account</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Permanently delete your studio account and all associated data. This action cannot be undone.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-800 border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Delete Studio Account</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      This action cannot be undone. This will permanently delete your studio account, remove all
                      your data from our servers, and cancel any active subscriptions.
                      <br />
                      <br />
                      <strong className="text-white">All of the following will be permanently deleted:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                        <li>Client information and contact details</li>
                        <li>Booking history and schedules</li>
                        <li>Payment records and invoices</li>
                        <li>Gallery images and portfolios</li>
                        <li>Studio settings and preferences</li>
                      </ul>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-gray-700 text-white hover:bg-gray-700">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Yes, delete my account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
