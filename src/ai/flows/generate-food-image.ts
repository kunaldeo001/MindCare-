'use server';
/**
 * @fileOverview A Genkit flow for generating professional food photography images.
 * 
 * Uses the Gemini 2.5 Flash Image model to generate high-quality food visuals.
 * Includes a robust fallback mechanism for consistent UI performance.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateFoodImageInputSchema = z.object({
  foodName: z.string().describe('The name of the food item to generate an image for.'),
  description: z.string().optional().describe('An optional description to refine the image generation.'),
});

export type GenerateFoodImageInput = z.infer<typeof GenerateFoodImageInputSchema>;

/**
 * Generates a professional food photography image using Gemini 2.5 Flash Image.
 * This multimodal model handles image generation tasks reliably.
 */
export async function generateFoodImage(input: GenerateFoodImageInput): Promise<string> {
  try {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image',
      prompt: `Professional, gourmet food photography of ${input.foodName}. ${input.description || ''}. Cinematic lighting, high resolution, delicious presentation, vibrant colors, shallow depth of field.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (media?.url) {
      return media.url;
    }
  } catch (err) {
    console.warn(`AI Image generation failed for ${input.foodName}. Using high-quality placeholder.`, err);
  }

  // Deterministic fallback based on food name for visual consistency
  const seed = input.foodName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `https://picsum.photos/seed/${seed}/800/600`;
}
