import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FlaskConical, ClipboardCheck, MessageSquareText, ArrowRight, CheckSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative rounded-lg bg-gradient-to-r from-sky-100 via-blue-100 to-sky-200 p-8 md:p-12 text-center overflow-hidden shadow-md">
         <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
         <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Welcome to EnviroClean Training</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Master hospital environmental cleaning with our interactive simulations, checklists, knowledge checks, and personalized AI feedback.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="/simulations">
                  Start Training <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <Link href="/checklists">
                  View Checklists
                </Link>
              </Button>
                <Button asChild variant="outline" size="lg" className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <Link href="/knowledge-checks">
                  Test Your Knowledge
                </Link>
              </Button>
            </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
             <div className="bg-secondary p-3 rounded-md">
                <FlaskConical className="h-6 w-6 text-primary" />
             </div>
            <CardTitle className="text-xl font-semibold">Simulations</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <CardDescription className="mb-4 flex-grow">
              Engage in realistic scenarios to practice and perfect cleaning techniques.
            </CardDescription>
             <Image
                src="https://picsum.photos/400/200"
                alt="Interactive Simulation"
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-32"
                data-ai-hint="hospital cleaning simulation"
              />
              <Button asChild variant="link" className="mt-auto self-start px-0">
                <Link href="/simulations">Explore Simulations <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
          </CardContent>
        </Card>

         <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
             <div className="bg-secondary p-3 rounded-md">
              <CheckSquare className="h-6 w-6 text-primary" />
             </div>
            <CardTitle className="text-xl font-semibold">Checklists</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <CardDescription className="mb-4 flex-grow">
             Access standardized checklists for various cleaning procedures.
            </CardDescription>
             <Image
                src="https://picsum.photos/400/203" // Different image
                alt="Cleaning Checklist"
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-32"
                data-ai-hint="checklist check marks form"
              />
                <Button asChild variant="link" className="mt-auto self-start px-0">
                    <Link href="/checklists">View Checklists <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
          </CardContent>
        </Card>


        <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
             <div className="bg-secondary p-3 rounded-md">
              <ClipboardCheck className="h-6 w-6 text-primary" />
             </div>
            <CardTitle className="text-xl font-semibold">Knowledge Checks</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <CardDescription className="mb-4 flex-grow">
              Assess your understanding with quizzes and reinforce learning.
            </CardDescription>
             <Image
                src="https://picsum.photos/400/201"
                alt="Knowledge Check Quiz"
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-32"
                data-ai-hint="quiz assessment test"
              />
                 <Button asChild variant="link" className="mt-auto self-start px-0">
                    <Link href="/knowledge-checks">Take a Quiz <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
             <div className="bg-secondary p-3 rounded-md">
              <MessageSquareText className="h-6 w-6 text-primary" />
             </div>
            <CardTitle className="text-xl font-semibold">AI Feedback</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <CardDescription className="mb-4 flex-grow">
              Receive AI-driven insights on your performance to identify areas for improvement.
            </CardDescription>
            <Image
                src="https://picsum.photos/400/202"
                alt="AI Feedback report"
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-32"
                data-ai-hint="feedback report analysis chart"
              />
             <Button asChild variant="link" className="mt-auto self-start px-0">
                    <Link href="/feedback">Get Feedback <ArrowRight className="ml-1 h-4 w-4" /></Link>
             </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
