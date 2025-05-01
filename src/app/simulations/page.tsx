import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

// Example simulation data - replace with actual data fetching
const simulations = [
  { id: 'or-cleaning', title: 'Operating Room Cleaning', description: 'Learn the step-by-step process for terminal cleaning an operating room.', image: 'https://picsum.photos/300/150?random=1', aiHint: 'operating room sterile' },
  { id: 'patient-room-turnover', title: 'Patient Room Turnover', description: 'Master the procedures for cleaning and disinfecting a patient room between occupants.', image: 'https://picsum.photos/300/150?random=2', aiHint: 'hospital patient room' },
  { id: 'isolation-room', title: 'Isolation Room Cleaning', description: 'Understand the specific protocols for cleaning rooms housing patients under isolation precautions.', image: 'https://picsum.photos/300/150?random=3', aiHint: 'hospital isolation biohazard' },
  { id: 'emergency-dept', title: 'Emergency Department Bay', description: 'Practice cleaning high-touch surfaces in a busy emergency department setting.', image: 'https://picsum.photos/300/150?random=4', aiHint: 'emergency room hospital' },
];

export default function SimulationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Interactive Simulations</h1>
      <p className="text-muted-foreground">
        Select a simulation module to begin your interactive training session. Practice makes perfect!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {simulations.map((sim) => (
          <Card key={sim.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
               <Image
                src={sim.image}
                alt={sim.title}
                width={300}
                height={150}
                className="w-full h-40 object-cover"
                data-ai-hint={sim.aiHint}
              />
            </CardHeader>
            <CardContent className="p-4 flex flex-col flex-grow">
              <CardTitle className="text-lg font-semibold mb-2">{sim.title}</CardTitle>
              <CardDescription className="text-sm flex-grow mb-4">{sim.description}</CardDescription>
              <Button asChild className="mt-auto w-full">
                <Link href={`/simulations/${sim.id}`}>
                  <PlayCircle className="mr-2 h-4 w-4" /> Start Simulation
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
