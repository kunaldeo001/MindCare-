'use server';
/**
 * @fileOverview A Genkit flow for generating personalized food and restaurant recommendations.
 *
 * - receivePersonalizedRecommendations - A function that handles the recommendation process.
 * - ReceivePersonalizedRecommendationsInput - The input type for the receivePersonalizedRecommendations function.
 * - ReceivePersonalizedRecommendationsOutput - The return type for the receivePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const ReceivePersonalizedRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user requesting recommendations.'),
  pastOrders: z.array(
    z.object({
      restaurantName: z.string().describe('The name of the restaurant.'),
      foodItems: z.array(
        z.object({
          name: z.string().describe('The name of the food item.'),
          quantity: z.number().describe('The quantity of the food item ordered.'),
          price: z.number().describe('The price of the food item.'),
        })
      ).describe('List of food items in the order.'),
      orderDate: z.string().describe('The date of the order in ISO format (e.g., "YYYY-MM-DD").'),
    })
  ).describe('A list of the user\'s past food orders.'),
  browsingHistory: z.array(
    z.object({
      restaurantName: z.string().optional().describe('The name of the restaurant browsed.'),
      foodItemName: z.string().optional().describe('The name of the food item browsed.'),
      timestamp: z.string().describe('The timestamp of the browsing event in ISO format (e.g., "YYYY-MM-DDTHH:MM:SSZ").'),
    })
  ).describe('A list of the user\'s recent browsing history.'),
});
export type ReceivePersonalizedRecommendationsInput = z.infer<typeof ReceivePersonalizedRecommendationsInputSchema>;

// Output Schema
const ReceivePersonalizedRecommendationsOutputSchema = z.object({
  recommendedFoodItems: z.array(
    z.object({
      name: z.string().describe('The name of the recommended food item.'),
      description: z.string().describe('A brief description of the food item.'),
      price: z.number().describe('The price of the food item in Rupees (e.g., 250.00).'),
      restaurantName: z.string().describe('The name of the restaurant where the food item is available.'),
    })
  ).describe('A list of personalized food item recommendations.'),
  recommendedRestaurants: z.array(
    z.object({
      name: z.string().describe('The name of the recommended restaurant.'),
      cuisine: z.string().describe('The cuisine type of the restaurant (e.g., Indian, Italian).'),
      rating: z.number().min(1).max(5).optional().describe('The average rating of the restaurant (e.g., 4.5, out of 5).'),
      description: z.string().describe('A brief description of the restaurant.'),
    })
  ).describe('A list of personalized restaurant recommendations.'),
});
export type ReceivePersonalizedRecommendationsOutput = z.infer<typeof ReceivePersonalizedRecommendationsOutputSchema>;

// Prompt definition
const recommendationPrompt = ai.definePrompt({
  name: 'personalizedRecommendationPrompt',
  input: { schema: ReceivePersonalizedRecommendationsInputSchema },
  output: { schema: ReceivePersonalizedRecommendationsOutputSchema },
  prompt: `You are an AI assistant for a food ordering platform called FoodFetch.\nYour task is to provide personalized food item and restaurant recommendations to a user based on their past orders and browsing history.\nThe user wants to discover new options that align with their preferences.\n\nAnalyze the provided past orders and browsing history to understand their culinary tastes, preferred cuisines, and favorite restaurants.\nThen, generate a list of recommended food items and a list of recommended restaurants.\nEnsure the recommendations are diverse yet relevant to the user's inferred preferences.\n\nHere is the user's data:\n\nPast Orders:\n{{#if pastOrders.length}}\n{{#each pastOrders}}\n  - Restaurant: {{this.restaurantName}}\n    Items: {{#each this.foodItems}}{{this.name}} (Qty: {{this.quantity}}, Price: ₹{{this.price}}){{#unless @last}}, {{/unless}}{{/each}}\n    Order Date: {{this.orderDate}}\n{{/each}}\n{{else}}\nNo past orders available.\n{{/if}}\n\nBrowsing History:\n{{#if browsingHistory.length}}\n{{#each browsingHistory}}\n  - {{#if this.restaurantName}}Restaurant: {{this.restaurantName}}{{/if}}{{#if this.foodItemName}}{{#if this.restaurantName}}, {{/if}}Food Item: {{this.foodItemName}}{{/if}} (Browsed on: {{this.timestamp}})\n{{/each}}\n{{else}}\nNo browsing history available.\n{{/if}}\n\nBased on this information, provide your personalized recommendations in JSON format, following the specified output schema.\n`,
});

// Flow definition
const receivePersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'receivePersonalizedRecommendationsFlow',
    inputSchema: ReceivePersonalizedRecommendationsInputSchema,
    outputSchema: ReceivePersonalizedRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await recommendationPrompt(input);
    if (!output) {
      throw new Error('Failed to generate personalized recommendations: No output from prompt.');
    }
    return output;
  }
);

// Wrapper function
export async function receivePersonalizedRecommendations(
  input: ReceivePersonalizedRecommendationsInput
): Promise<ReceivePersonalizedRecommendationsOutput> {
  return receivePersonalizedRecommendationsFlow(input);
}
