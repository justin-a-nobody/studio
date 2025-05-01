'use client';

import { useState, type FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Terminal } from 'lucide-react';
import { generateFeedback, type GenerateFeedbackInput, type GenerateFeedbackOutput } from '@/ai/flows/generate-feedback';
import { useToast } from "@/hooks/use-toast";


export default function FeedbackPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackResult, setFeedbackResult] = useState<GenerateFeedbackOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setFeedbackResult(null);

    const formData = new FormData(event.currentTarget);
    const inputData: GenerateFeedbackInput = {
      simulationType: formData.get('simulationType') as string,
      userPerformance: formData.get('userPerformance') as string,
      knowledgeCheckScore: parseInt(formData.get('knowledgeCheckScore') as string, 10) || 0,
    };

    if (!inputData.simulationType || !inputData.userPerformance) {
        setError("Please fill in all required fields.");
        setIsLoading(false);
        return;
    }


    try {
        const result = await generateFeedback(inputData);
        setFeedbackResult(result);
         toast({
          title: "Feedback Generated",
          description: "AI analysis complete. Check the results below.",
        });
    } catch (err) {
        console.error("Error generating feedback:", err);
        setError("Failed to generate feedback. Please try again.");
         toast({
          title: "Error",
          description: "Failed to generate feedback. Please try again.",
          variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Personalized Feedback</h1>
      <p className="text-muted-foreground">
        Get AI-powered feedback on your performance. Enter details about a recent simulation or assessment below.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Feedback Request</CardTitle>
          <CardDescription>Provide details to receive personalized analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="simulationType">Simulation Type</Label>
                <Input id="simulationType" name="simulationType" placeholder="e.g., Operating Room Cleaning" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="knowledgeCheckScore">Knowledge Check Score (Optional)</Label>
                <Input id="knowledgeCheckScore" name="knowledgeCheckScore" type="number" placeholder="e.g., 85" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="userPerformance">Describe Your Performance</Label>
              <Textarea
                id="userPerformance"
                name="userPerformance"
                placeholder="Describe the steps you took, any challenges faced, areas you felt unsure about..."
                rows={5}
                required
              />
            </div>
             {error && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Feedback...
                </>
              ) : (
                'Get Feedback'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {feedbackResult && (
        <Card>
          <CardHeader>
            <CardTitle>AI Generated Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{feedbackResult.feedback}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
