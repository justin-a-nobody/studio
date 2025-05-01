import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground">
        Manage your application preferences and account settings.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                    Enable dark theme for the application. (Requires page reload)
                </p>
             </div>
            <Switch id="dark-mode" aria-label="Toggle dark mode" />
          </div>
           <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
             <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                    Receive email updates about new modules and feedback.
                </p>
             </div>
            <Switch id="email-notifications" defaultChecked aria-label="Toggle email notifications" />
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <p className="text-sm text-muted-foreground">Account management features coming soon.</p>
             <Button variant="outline" disabled>Change Password</Button>
             <Button variant="destructive" disabled>Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
