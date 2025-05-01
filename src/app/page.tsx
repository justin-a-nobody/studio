import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FlaskConical, ClipboardCheck, MessageSquareText, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative rounded-lg bg-gradient-to-r from-sky-100 via-blue-100 to-sky-200 p-8 md:p-12 text-center overflow-hidden shadow-md">
         <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
         <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Welcome to EnviroClean Training</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Master hospital environmental cleaning with our interactive simulations, knowledge checks, and personalized AI feedback.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="/simulations">
                  Start Training <ArrowRight className="ml-2 h-5 w-5" />
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

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
             <div className="bg-secondary p-3 rounded-md">
                <FlaskConical className="h-6 w-6 text-primary" />
             </div>
            <CardTitle className="text-xl font-semibold">Interactive Simulations</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Engage in realistic scenarios to practice and perfect cleaning techniques for various hospital settings.
            </CardDescription>
             <Image
                src="https://picsum.photos/400/200"
                alt="Interactive Simulation"
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-40"
                data-ai-hint="hospital cleaning simulation"
              />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
             <div className="bg-secondary p-3 rounded-md">
              <ClipboardCheck className="h-6 w-6 text-primary" />
             </div>
            <CardTitle className="text-xl font-semibold">Knowledge Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Assess your understanding with quizzes and evaluations designed to reinforce learning.
            </CardDescription>
             <Image
                src="https://picsum.photos/400/201"
                alt="Knowledge Check Quiz"
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-40"
                data-ai-hint="quiz assessment test"
              />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
             <div className="bg-secondary p-3 rounded-md">
              <MessageSquareText className="h-6 w-6 text-primary" />
             </div>
            <CardTitle className="text-xl font-semibold">Personalized Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Receive AI-driven insights on your performance, identifying areas for improvement and targeted practice.
            </CardDescription>
            <Image
                src="https://picsum.photos/400/202"
                alt="AI Feedback report"
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-40"
                data-ai-hint="feedback report analysis"
              />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// Add a simple grid pattern for the hero section background
const BgGridPattern = () => (
  <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
    <defs>
      <pattern
        id="grid-pattern"
        width="72"
        height="72"
        patternUnits="userSpaceOnUse"
        x="50%"
        y="50%"
        patternTransform="translate(0.5 0.5)"
      >
        <path d="M0 72V0h72" fill="none" stroke="hsl(var(--border) / 0.5)" strokeWidth="1"></path>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
  </svg>
);
