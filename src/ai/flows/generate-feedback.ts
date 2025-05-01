'use server';

/**
 * @fileOverview Generates personalized feedback on user performance in simulations.
 *
 * - generateFeedback - A function that generates personalized feedback.
 * - GenerateFeedbackInput - The input type for the generateFeedback function.
 * - GenerateFeedbackOutput - The return type for the generateFeedback function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateFeedbackInputSchema = z.object({
  simulationType: z.string().describe('The type of simulation performed (e.g., operating room cleaning).'),
  userPerformance: z.string().describe('A detailed description of the user\'s performance in the simulation.'),
  knowledgeCheckScore: z.number().describe('The user\'s score on the knowledge check quiz.'),
});
export type GenerateFeedbackInput = z.infer<typeof GenerateFeedbackInputSchema>;

const GenerateFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Personalized feedback for the user, highlighting areas for improvement and suggesting specific techniques to practice.'),
});
export type GenerateFeedbackOutput = z.infer<typeof GenerateFeedbackOutputSchema>;

export async function generateFeedback(input: GenerateFeedbackInput): Promise<GenerateFeedbackOutput> {
  return generateFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFeedbackPrompt',
  input: {
    schema: z.object({
      simulationType: z.string().describe('The type of simulation performed (e.g., operating room cleaning).'),
      userPerformance: z.string().describe('A detailed description of the user\'s performance in the simulation.'),
      knowledgeCheckScore: z.number().describe('The user\'s score on the knowledge check quiz.'),
    }),
  },
  output: {
    schema: z.object({
      feedback: z.string().describe('Personalized feedback for the user, highlighting areas for improvement and suggesting specific techniques to practice.'),
    }),
  },
  prompt: `You are an AI-powered tool that provides personalized feedback to users on their performance in hospital environment cleaning simulations.

  Based on the simulation type, user performance, and knowledge check score, provide feedback that highlights areas for improvement and suggests specific techniques to practice.

  Simulation Type: {{{simulationType}}}
  User Performance: {{{userPerformance}}}
  Knowledge Check Score: {{{knowledgeCheckScore}}}

  Feedback:
  `,
});

const generateFeedbackFlow = ai.defineFlow<
  typeof GenerateFeedbackInputSchema,
  typeof GenerateFeedbackOutputSchema
>({
  name: 'generateFeedbackFlow',
  inputSchema: GenerateFeedbackInputSchema,
  outputSchema: GenerateFeedbackOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
