import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckSquare, Hospital, Syringe, AlertTriangle } from "lucide-react";

// Example checklist data - replace with actual data fetching
const checklists = [
  {
    id: 'or-terminal-cleaning-checklist',
    title: 'OR Terminal Cleaning Checklist',
    description: 'Comprehensive checklist for ensuring operating rooms are terminally cleaned and sterile.',
    icon: <Hospital className="h-6 w-6 text-primary" />,
    area: 'Operating Room'
  },
  {
    id: 'patient-room-turnover-checklist',
    title: 'Patient Room Turnover Checklist',
    description: 'Standard checklist for cleaning and disinfecting patient rooms between occupants.',
    icon: <CheckSquare className="h-6 w-6 text-primary" />,
     area: 'Patient Room'
  },
  {
    id: 'isolation-contact-precautions-checklist',
    title: 'Isolation Room Checklist (Contact)',
    description: 'Specific checklist for cleaning rooms under contact precautions.',
    icon: <AlertTriangle className="h-6 w-6 text-orange-500" />,
     area: 'Isolation Room'
  },
    {
    id: 'ed-bay-turnover-checklist',
    title: 'ED Bay Turnover Checklist',
    description: 'Checklist for rapid cleaning of Emergency Department bays between patients.',
    icon: <Syringe className="h-6 w-6 text-primary" />,
     area: 'Emergency Department'
  },
  // Add more checklists as needed
];

export default function ChecklistsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cleaning Checklists</h1>
      <p className="text-muted-foreground">
        Ensure thoroughness and compliance with standardized cleaning checklists for various hospital areas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklists.map((checklist) => (
          <Card key={checklist.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                    <CardTitle className="text-lg font-medium mb-1">{checklist.title}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">{checklist.area}</CardDescription>
                </div>
              <div className="bg-secondary p-3 rounded-md">
                 {checklist.icon}
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{checklist.description}</p>
              <Button asChild className="w-full mt-auto">
                <Link href={`/checklists/${checklist.id}`}>
                  View Checklist
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}