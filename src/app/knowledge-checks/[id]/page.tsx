import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// This is a placeholder page. In a real app, you'd fetch quiz details and questions based on the ID.

// Example quiz data lookup (replace with actual data fetching logic)
const getQuizData = (id: string) => {
  const quizzes = [
    { id: 'basics-quiz', title: 'Cleaning Fundamentals', description: 'Test your knowledge on basic cleaning principles and safety.', questions: [
        { q: 'What is the first step before cleaning any area?', options: ['Gather supplies', 'Assess the area', 'Put on PPE', 'Wash hands'], answer: 'Wash hands'},
        { q: 'How should cleaning cloths be handled?', options: ['Reused multiple times', 'Folded into sections', 'Used until visibly soiled', 'Rinsed between rooms'], answer: 'Folded into sections'}
    ]},
    { id: 'disinfection-quiz', title: 'Disinfection Procedures', description: 'Assess your understanding of proper disinfectant use and contact times.', questions: [
        { q: 'What does "contact time" refer to?', options: ['Time to mix the disinfectant', 'Time the surface must remain wet', 'Time to wait before entering the room', 'Time disinfectant is effective after mixing'], answer: 'Time the surface must remain wet'},
    ]},
    { id: 'ppe-quiz', title: 'Personal Protective Equipment', description: 'Check your knowledge on selecting and using appropriate PPE.', questions: [
         { q: 'When cleaning up bodily fluids, what is the minimum required PPE?', options: ['Gloves only', 'Gloves and gown', 'Gloves, gown, and eye protection', 'Mask only'], answer: 'Gloves, gown, and eye protection'},
    ]},
     { id: 'waste-disposal-quiz', title: 'Waste Disposal', description: 'Review the procedures for safe handling and disposal of different waste types.', questions: [] }, // Add questions later
  ];
  return quizzes.find(quiz => quiz.id === id);
}

export default function KnowledgeCheckDetailPage({ params }: { params: { id: string } }) {
   const quiz = getQuizData(params.id);

  if (!quiz) {
    return (
       <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold">Quiz Not Found</h1>
          <p className="text-muted-foreground">The requested knowledge check could not be found.</p>
           <Button asChild variant="outline">
             <Link href="/knowledge-checks">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Checks
             </Link>
           </Button>
        </div>
    );
  }

  return (
    <div className="space-y-6">
        <Button asChild variant="outline" size="sm" className="mb-4">
             <Link href="/knowledge-checks">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Checks
             </Link>
       </Button>
      <h1 className="text-3xl font-bold">{quiz.title}</h1>
      <p className="text-muted-foreground">{quiz.description}</p>

        {quiz.questions.length === 0 ? (
             <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                    Quiz questions are not yet available for this topic. Check back later!
                </CardContent>
            </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Quiz Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {quiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="space-y-4 p-4 border rounded-md">
                  <p className="font-medium">{qIndex + 1}. {question.q}</p>
                  <RadioGroup name={`question-${qIndex}`}>
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q${qIndex}-o${oIndex}`} />
                        <Label htmlFor={`q${qIndex}-o${oIndex}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              <Button type="submit" size="lg" className="w-full md:w-auto">Submit Answers</Button>
            </CardContent>
          </Card>
        )}

    </div>
  );
}
