'use client'; // Required for client-side interactions like checkbox toggling

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Check, Square } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';


// --- Example Checklist Data ---
// In a real app, fetch this data based on the `id` parameter
const checklistsData: { [key: string]: { title: string; description: string; items: { id: string; text: string; category: string }[] } } = {
  'or-terminal-cleaning-checklist': {
    title: 'OR Terminal Cleaning Checklist',
    description: 'Ensure all steps are completed for operating room terminal cleaning.',
    items: [
      { id: 'or1', text: 'Gather all required PPE and cleaning supplies.', category: 'Preparation' },
      { id: 'or2', text: 'Remove all disposable items and trash.', category: 'Initial Cleaning' },
      { id: 'or3', text: 'Clean and disinfect overhead surgical lights.', category: 'Surface Cleaning' },
      { id: 'or4', text: 'Clean and disinfect anesthesia cart and equipment.', category: 'Equipment' },
      { id: 'or5', text: 'Clean and disinfect operating table and accessories.', category: 'Surface Cleaning' },
      { id: 'or6', text: 'Clean and disinfect all fixed and portable equipment.', category: 'Equipment' },
      { id: 'or7', text: 'Clean and disinfect walls, doors, and handles.', category: 'Surface Cleaning' },
      { id: 'or8', text: 'Clean and disinfect floors using appropriate technique.', category: 'Floors' },
      { id: 'or9', text: 'Dispose of waste and soiled linens correctly.', category: 'Waste Disposal' },
      { id: 'or10', text: 'Visually inspect room for cleanliness before marking as complete.', category: 'Final Inspection' },
    ]
  },
  'patient-room-turnover-checklist': {
    title: 'Patient Room Turnover Checklist',
    description: 'Standard checklist for cleaning patient rooms between occupants.',
    items: [
       { id: 'pr1', text: 'Don appropriate PPE (gloves, gown if necessary).', category: 'Preparation' },
       { id: 'pr2', text: 'Remove trash and soiled linen.', category: 'Waste & Linen' },
       { id: 'pr3', text: 'Clean and disinfect high-touch surfaces (bed rails, call button, light switch, door handles, phone).', category: 'High-Touch Surfaces' },
       { id: 'pr4', text: 'Clean and disinfect overbed table and bedside cabinet.', category: 'Furniture' },
       { id: 'pr5', text: 'Clean and disinfect patient chairs or visitor seating.', category: 'Furniture' },
       { id: 'pr6', text: 'Clean and disinfect IV pole.', category: 'Equipment' },
       { id: 'pr7', text: 'Clean and disinfect bathroom surfaces (toilet, sink, handles, grab bars, shower).', category: 'Bathroom' },
       { id: 'pr8', text: 'Restock bathroom supplies (soap, paper towels).', category: 'Bathroom' },
       { id: 'pr9', text: 'Clean mirrors and windows.', category: 'Surfaces' },
       { id: 'pr10', text: 'Dust horizontal surfaces.', category: 'Surfaces' },
       { id: 'pr11', text: 'Mop floor.', category: 'Floors' },
       { id: 'pr12', text: 'Make bed with clean linen.', category: 'Bed' },
       { id: 'pr13', text: 'Visually inspect room. Remove PPE and perform hand hygiene.', category: 'Final Steps' },
    ]
  },
   'isolation-contact-precautions-checklist': {
    title: 'Isolation Room Checklist (Contact)',
    description: 'Specific checklist for cleaning rooms under contact precautions.',
     items: [
       { id: 'iso_c1', text: 'Check isolation signage before entry.', category: 'Pre-Entry' },
       { id: 'iso_c2', text: 'Gather dedicated or disposable cleaning supplies.', category: 'Pre-Entry' },
       { id: 'iso_c3', text: 'Don required PPE (gown, gloves) before entering.', category: 'PPE' },
       { id: 'iso_c4', text: 'Clean and disinfect room following standard turnover procedure.', category: 'Cleaning' },
       { id: 'iso_c5', text: 'Pay extra attention to frequently touched items (bed rails, call buttons, remote controls, commode).', category: 'High-Touch Focus' },
       { id: 'iso_c6', text: 'Use EPA-approved disinfectant with appropriate contact time.', category: 'Disinfection' },
       { id: 'iso_c7', text: 'Clean and disinfect any reusable medical equipment before removal from the room.', category: 'Equipment' },
       { id: 'iso_c8', text: 'Dispose of trash and linen according to infectious waste policy.', category: 'Waste' },
       { id: 'iso_c9', text: 'Doff PPE inside the room before exiting.', category: 'PPE' },
       { id: 'iso_c10', text: 'Perform hand hygiene immediately after exiting the room.', category: 'Post-Cleaning' },
    ]
   },
    'ed-bay-turnover-checklist': {
    title: 'ED Bay Turnover Checklist',
    description: 'Checklist for rapid cleaning of Emergency Department bays between patients.',
     items: [
        { id: 'ed1', text: 'Don appropriate PPE.', category: 'Preparation' },
        { id: 'ed2', text: 'Remove visible debris, trash, and used linen.', category: 'Clear Area' },
        { id: 'ed3', text: 'Wipe down stretcher/bed rails and mattress with disinfectant.', category: 'High-Touch' },
        { id: 'ed4', text: 'Wipe down monitors, cables, and equipment controls.', category: 'High-Touch Equipment' },
        { id: 'ed5', text: 'Wipe down counters, chairs, and other surfaces in the bay.', category: 'Surfaces' },
        { id: 'ed6', text: 'Clean and disinfect any visible spills, especially bodily fluids.', category: 'Spills' },
        { id: 'ed7', text: 'Spot clean floor as needed.', category: 'Floor' },
        { id: 'ed8', text: 'Restock essential supplies if necessary.', category: 'Restock' },
        { id: 'ed9', text: 'Visually confirm cleanliness. Remove PPE.', category: 'Completion' },
    ]
   }
};
// --- End Example Data ---

export default function ChecklistDetailPage({ params }: { params: { id: string } }) {
  const checklist = checklistsData[params.id];
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);

   // Handle client-side only operations in useEffect
    useEffect(() => {
        // Placeholder for potential future client-side logic
         if (typeof window !== 'undefined') {
             // Example: Load saved state from localStorage
             // const savedState = localStorage.getItem(`checklist-${params.id}`);
             // if (savedState) {
             //     setCheckedItems(new Set(JSON.parse(savedState)));
             // }
         }
    }, [params.id]);

  useEffect(() => {
    if (checklist) {
      const newProgress = Math.round((checkedItems.size / checklist.items.length) * 100);
      setProgress(newProgress);

        // Example: Save state to localStorage
        // if (typeof window !== 'undefined') {
        //     localStorage.setItem(`checklist-${params.id}`, JSON.stringify(Array.from(checkedItems)));
        // }
    }
  }, [checkedItems, checklist]);


  const handleCheckboxChange = (itemId: string, isChecked: boolean) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(itemId);
      } else {
        newSet.delete(itemId);
      }
      return newSet;
    });
  };

   const handlePrint = () => {
       // Check if window is defined (runs only on client)
       if (typeof window !== 'undefined') {
           window.print();
       }
   };

  if (!checklist) {
    return (
       <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold">Checklist Not Found</h1>
          <p className="text-muted-foreground">The requested cleaning checklist could not be found.</p>
           <Button asChild variant="outline">
             <Link href="/checklists">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Checklists
             </Link>
           </Button>
        </div>
    );
  }

   // Group items by category
   const groupedItems = checklist.items.reduce((acc, item) => {
    const category = item.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof checklist.items>);


  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                <Link href="/checklists">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Checklists
                </Link>
            </Button>
             <Button onClick={handlePrint} variant="outline" size="sm" className="w-full sm:w-auto">
                <Printer className="mr-2 h-4 w-4" /> Print Checklist
            </Button>
        </div>

        <Card className="print:shadow-none print:border-none">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{checklist.title}</CardTitle>
                <CardDescription>{checklist.description}</CardDescription>
                 <div className="pt-4 print:hidden">
                     <Label htmlFor="progress" className="text-sm font-medium text-muted-foreground">
                         Completion Progress: {checkedItems.size} / {checklist.items.length} items
                     </Label>
                     <Progress id="progress" value={progress} className="w-full mt-1 h-2" aria-label={`${progress}% complete`} />
                 </div>
            </CardHeader>
            <CardContent className="space-y-6">
                 {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold mb-3 mt-4 border-b pb-1">{category}</h3>
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-colors">
                                    <Checkbox
                                        id={item.id}
                                        checked={checkedItems.has(item.id)}
                                        onCheckedChange={(checked) => handleCheckboxChange(item.id, Boolean(checked))}
                                        className="mt-1"
                                        aria-labelledby={`label-${item.id}`}
                                    />
                                    <Label htmlFor={item.id} id={`label-${item.id}`} className="flex-1 text-sm leading-relaxed">
                                        {item.text}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <Separator className="my-8" />

                <div className="p-4 border border-dashed rounded-md text-center print:hidden">
                    <p className="text-muted-foreground mb-2">Finished with the checklist?</p>
                     <Button disabled={checkedItems.size !== checklist.items.length}>
                         Mark as Complete & Submit (Feature coming soon)
                     </Button>
                      {checkedItems.size !== checklist.items.length && (
                        <p className="text-xs text-destructive mt-1">Complete all items before submitting.</p>
                     )}
                </div>

            </CardContent>
        </Card>

        {/* Print-specific styles */}
        <style jsx global>{`
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                .print\\:hidden { display: none; }
                .print\\:shadow-none { box-shadow: none; }
                .print\\:border-none { border: none; }
                main { padding: 0 !important; margin: 1cm !important; }
                h1, h2, h3 { page-break-after: avoid; }
                .flex.items-start.space-x-3 { page-break-inside: avoid; }
                 /* Style checkboxes for print */
                input[type="checkbox"] {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    width: 1em;
                    height: 1em;
                    border: 1px solid #000;
                    vertical-align: middle;
                    margin-right: 0.5em;
                    position: relative;
                    top: -1px; /* Adjust alignment */
                }
                input[type="checkbox"]:checked::before {
                    content: '✔'; /* Checkmark character */
                    display: block;
                    text-align: center;
                    line-height: 0.9em; /* Adjust checkmark position */
                    font-size: 1.1em;
                    color: #000;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
            }
        `}</style>
    </div>
  );
}
