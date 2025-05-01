import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle, CheckSquare, Target, ListChecks } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


// Example simulation data lookup (replace with actual data fetching logic)
const getSimulationData = (id: string) => {
  const simulations = [
    {
        id: 'or-cleaning',
        title: 'Operating Room Terminal Cleaning',
        description: 'Learn the step-by-step process for terminally cleaning an operating room to ensure a sterile environment.',
        image: 'https://picsum.photos/600/300?random=1',
        learningObjectives: [
            'Identify critical zones within the OR.',
            'Follow correct sequence for cleaning surfaces (top-to-bottom, clean-to-dirty).',
            'Demonstrate proper use and dilution of disinfectants.',
            'Perform terminal cleaning checklist verification.'
        ],
        steps: [
            { title: 'Preparation', details: 'Gather all necessary supplies (PPE, cleaning solutions, cloths, mop, waste bags). Don appropriate PPE.' },
            { title: 'Initial Cleaning', details: 'Remove visible soil and debris from all surfaces.' },
            { title: 'High-Touch Surfaces', details: 'Clean and disinfect lights, monitors, tables, equipment controls.' },
            { title: 'Walls & Fixtures', details: 'Wipe down walls, vents, and fixed equipment.' },
            { title: 'Floor Cleaning', details: 'Mop the floor starting from the furthest point and moving towards the door.' },
            { title: 'Waste Disposal', details: 'Properly dispose of all waste according to facility protocol.' },
            { title: 'Final Inspection', details: 'Visually inspect the room for cleanliness. Doff PPE.' },
        ],
        checklistId: 'or-terminal-cleaning-checklist' // Link to a potential checklist
    },
    {
        id: 'patient-room-turnover',
        title: 'Patient Room Turnover Cleaning',
        description: 'Master the procedures for cleaning and disinfecting a patient room between occupants to prevent cross-contamination.',
        image: 'https://picsum.photos/600/300?random=2',
        learningObjectives: [
            'Safely handle and dispose of soiled linens and waste.',
            'Identify and disinfect high-touch surfaces in a patient room.',
            'Clean and disinfect the patient bathroom thoroughly.',
            'Prepare the room for the next patient according to protocol.'
        ],
        steps: [
            { title: 'Entry & Preparation', details: 'Don PPE. Announce presence. Gather supplies.'},
            { title: 'Waste & Linen Removal', details: 'Remove trash and soiled linens, placing them in appropriate bags.' },
            { title: 'High-Touch Surface Cleaning', details: 'Clean and disinfect bed rails, call buttons, light switches, doorknobs, tables.' },
            { title: 'Bathroom Cleaning', details: 'Clean and disinfect toilet, sink, shower, grab bars.' },
            { title: 'Floor Cleaning', details: 'Mop the floor.' },
            { title: 'Restock & Final Touches', details: 'Restock supplies. Make the bed. Final visual inspection. Doff PPE.' },
        ],
        checklistId: 'patient-room-turnover-checklist'
    },
    {
        id: 'isolation-room',
        title: 'Isolation Room Cleaning (Contact Precautions)',
        description: 'Understand the specific protocols for cleaning rooms housing patients under contact isolation precautions.',
        image: 'https://picsum.photos/600/300?random=3',
        learningObjectives: [
            'Correctly don and doff PPE for contact precautions.',
            'Utilize dedicated cleaning equipment for isolation rooms.',
            'Follow enhanced disinfection procedures for high-touch surfaces.',
            'Understand waste disposal procedures for isolation rooms.'
        ],
        steps: [
            { title: 'Preparation', details: 'Gather supplies outside the room. Check isolation signage. Don PPE (gown and gloves).'},
            { title: 'Cleaning Process', details: 'Clean following standard procedures, paying extra attention to high-touch surfaces frequently touched by patient and staff.'},
            { title: 'Equipment Handling', details: 'Use dedicated or disposable cleaning supplies. Clean and disinfect reusable equipment before removing from room.'},
            { title: 'Waste Disposal', details: 'Dispose of waste according to facility protocol for infectious waste.'},
            { title: 'Doffing PPE', details: 'Remove and discard PPE inside the room before exiting. Perform hand hygiene immediately after exiting.'},
        ],
        checklistId: 'isolation-contact-precautions-checklist'
    },
    {
        id: 'emergency-dept',
        title: 'Emergency Department Bay Cleaning',
        description: 'Practice cleaning high-touch surfaces and managing spills in a busy emergency department setting between patients.',
        image: 'https://picsum.photos/600/300?random=4',
        learningObjectives: [
            'Quickly identify and prioritize cleaning of high-touch surfaces.',
            'Respond effectively to spills (e.g., bodily fluids).',
            'Maintain cleanliness in a fast-paced environment.',
            'Communicate cleaning status effectively.'
        ],
        steps: [
            { title: 'Assessment', details: 'Quickly assess the bay for visible soil and contamination.'},
            { title: 'High-Touch Disinfection', details: 'Wipe down stretcher rails, monitors, equipment buttons, counters, chairs with disinfectant.'},
            { title: 'Spill Management', details: 'Clean and disinfect any spills according to protocol.'},
            { title: 'Floor Spot Cleaning', details: 'Address any visible contamination on the floor.'},
            { title: 'Turnaround', details: 'Ensure the bay is ready for the next patient quickly and safely.'},
        ],
         checklistId: 'ed-bay-turnover-checklist'
    },
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
       <Button asChild variant="outline" size="sm" className="mb-4 print:hidden">
             <Link href="/simulations">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Simulations
             </Link>
       </Button>

      <h1 className="text-3xl font-bold mb-2">{simulation.title}</h1>
       <CardDescription className="text-lg">{simulation.description}</CardDescription>

      <Card className="overflow-hidden">
        <CardHeader className="p-0 relative">
          <Image
              src={simulation.image}
              alt={simulation.title}
              width={800}
              height={400}
              className="w-full h-48 md:h-64 object-cover"
              priority // Prioritize loading the main image
              data-ai-hint="hospital cleaning simulation sterile environment"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
             <div className="absolute bottom-0 left-0 p-6">
                 <Button size="lg" className="bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg">
                    <PlayCircle className="mr-2 h-5 w-5" /> Launch Interactive Simulation
                 </Button>
            </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">

             <section aria-labelledby="learning-objectives">
                <h2 id="learning-objectives" className="text-xl font-semibold flex items-center mb-3">
                    <Target className="mr-2 h-5 w-5 text-primary" /> Learning Objectives
                </h2>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground bg-secondary p-4 rounded-md">
                    {simulation.learningObjectives.map((obj, index) => (
                    <li key={index}>{obj}</li>
                    ))}
                </ul>
             </section>

             <Separator />

             <section aria-labelledby="simulation-steps">
                 <h2 id="simulation-steps" className="text-xl font-semibold flex items-center mb-3">
                     <ListChecks className="mr-2 h-5 w-5 text-primary" /> Simulation Steps
                 </h2>
                 <Accordion type="single" collapsible className="w-full">
                     {simulation.steps.map((step, index) => (
                         <AccordionItem value={`item-${index}`} key={index}>
                             <AccordionTrigger className="text-left hover:no-underline">
                                 <span className="font-medium">Step {index + 1}: {step.title}</span>
                             </AccordionTrigger>
                             <AccordionContent className="text-muted-foreground pl-8">
                                 {step.details}
                             </AccordionContent>
                         </AccordionItem>
                     ))}
                 </Accordion>
             </section>

              <Separator />

            {/* Placeholder for the interactive simulation component or training module */}
            <section aria-labelledby="training-module">
                <h2 id="training-module" className="text-xl font-semibold flex items-center mb-3">
                    <PlayCircle className="mr-2 h-5 w-5 text-primary" /> Training Module
                </h2>
                <div className="border rounded-md p-8 text-center bg-secondary/50">
                    <p className="text-muted-foreground mb-4">The interactive training module for this simulation will be presented here. Practice the steps and test your skills.</p>
                    <Button size="lg">
                        Start Training Module
                    </Button>
                 </div>
            </section>

        </CardContent>
         {simulation.checklistId && (
            <CardFooter className="bg-muted/50 p-4 flex justify-end print:hidden">
                 <Button asChild variant="outline">
                    <Link href={`/checklists/${simulation.checklistId}`}>
                        <CheckSquare className="mr-2 h-4 w-4" /> View Related Checklist
                    </Link>
                </Button>
            </CardFooter>
        )}
      </Card>


    </div>
  );
}
