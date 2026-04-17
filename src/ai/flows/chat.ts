import { z } from 'zod';
import { ai } from '../genkit';

export const supportFlow = ai.defineFlow(
    {
        name: 'supportFlow',
        inputSchema: z.object({
            message: z.string(),
            history: z.array(z.object({
                role: z.enum(['user', 'model']),
                content: z.string()
            })).optional()
        }),
        outputSchema: z.string(),
    },
    async (input) => {
        const { message, history = [] } = input;

        const response = await ai.generate({
            system: `You are FoodFetch Support Assistant. You are helpful, friendly, and professional. 
              If users ask about orders, assume they are being tracked. 
              If they ask about refunds, explain that our policy allows returns within 30 minutes of delivery.
              Keep responses concise and empathetic.`,
            prompt: message,
            messages: history.map(h => ({
                role: h.role,
                content: [{ text: h.content }]
            })),
            config: { temperature: 0.5 }
        });

        return response.text;
    }
);
