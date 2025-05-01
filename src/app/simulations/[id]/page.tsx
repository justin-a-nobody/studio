import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// This is a placeholder page. In a real app, you'd fetch simulation details based on the ID.
// For now, we'll just display the ID.

// Example simulation data lookup (replace with actual data fetching logic)
const getSimulationData = (id: string) => {
  const simulations = [
    { id: 'or-cleaning', title: 'Operating Room Cleaning', description: 'Learn the step-by-step process for terminal cleaning an operating room.', image: 'https://picsum.photos/600/300?random=1', steps: ['Prepare cleaning supplies', 'Clean high-touch surfaces', 'Mop floors', 'Dispose of waste'] },
    { id: 'patient-room-turnover', title: 'Patient Room Turnover', description: 'Master the procedures for cleaning and disinfecting a patient room between occupants.', image: 'https://picsum.photos/600/300?random=2', steps: ['Gather supplies', 'Remove soiled linens', 'Clean surfaces', 'Disinfect bathroom', 'Make bed'] },
    { id: 'isolation-room', title: 'Isolation Room Cleaning', description: 'Understand the specific protocols for cleaning rooms housing patients under isolation precautions.', image: 'https://picsum.photos/600/300?random=3', steps: ['Don PPE', 'Follow specific cleaning path', 'Use designated equipment', 'Doff PPE correctly'] },
    { id: 'emergency-dept', title: 'Emergency Department Bay', description: 'Practice cleaning high-touch surfaces in a busy emergency department setting.', image: 'https://picsum.photos/600/300?random=4', steps: ['Identify high-touch points', 'Clean and disinfect surfaces frequently', 'Manage spills promptly'] },
  ];
  return simulations.find(sim => sim.id === id);
}

export default function SimulationDetailPage({ params }: { params: { id: string } }) {
  const simulation = getSimulationData(params.id);

  if (!simulation) {
    return (
       <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold">Simulation Not Found</h1>
          <p className="text-muted-foreground">The requested simulation module could not be found.</p>
           <Button asChild variant="outline">
             <Link href="/simulations">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Simulations
             </Link>
           </Button>
        </div>
    );
  }

  return (
    <div className="space-y-6">
       <Button asChild variant="outline" size="sm" className="mb-4">
             <Link href="/simulations">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Simulations
             </Link>
       </Button>

      <h1 className="text-3xl font-bold">{simulation.title}</h1>

      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <Image
              src={simulation.image}
              alt={simulation.title}
              width={600}
              height={300}
              className="w-full h-64 object-cover"
              data-ai-hint="hospital cleaning simulation"
            />
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <CardDescription>{simulation.description}</CardDescription>

          <h2 className="text-xl font-semibold">Simulation Steps Overview:</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
             {simulation.steps.map((step, index) => (
                <li key={index}>{step}</li>
             ))}
          </ul>

          {/* Placeholder for the interactive simulation component */}
          <div className="border rounded-md p-8 text-center bg-secondary">
            <p className="text-muted-foreground mb-4">Interactive simulation module will load here.</p>
            <Button size="lg">
                <PlayCircle className="mr-2 h-5 w-5" /> Start Interactive Session
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
