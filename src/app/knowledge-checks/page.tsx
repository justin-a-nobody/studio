import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClipboardCheck, GraduationCap, ShieldCheck } from "lucide-react";

// Example quiz data - replace with actual data fetching
const quizzes = [
  { id: 'basics-quiz', title: 'Cleaning Fundamentals', description: 'Test your knowledge on basic cleaning principles and safety.', icon: <GraduationCap className="h-6 w-6 text-primary" /> },
  { id: 'disinfection-quiz', title: 'Disinfection Procedures', description: 'Assess your understanding of proper disinfectant use and contact times.', icon: <ShieldCheck className="h-6 w-6 text-primary" /> },
  { id: 'ppe-quiz', title: 'Personal Protective Equipment', description: 'Check your knowledge on selecting and using appropriate PPE.', icon: <ClipboardCheck className="h-6 w-6 text-primary" /> },
  { id: 'waste-disposal-quiz', title: 'Waste Disposal', description: 'Review the procedures for safe handling and disposal of different waste types.', icon: <GraduationCap className="h-6 w-6 text-primary" /> },
];

export default function KnowledgeChecksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Knowledge Checks</h1>
      <p className="text-muted-foreground">
        Test your understanding of the training materials with these quizzes and assessments.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{quiz.title}</CardTitle>
              <div className="bg-secondary p-3 rounded-md">
                 {quiz.icon}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{quiz.description}</CardDescription>
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/knowledge-checks/${quiz.id}`}>
                  Start Quiz
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
