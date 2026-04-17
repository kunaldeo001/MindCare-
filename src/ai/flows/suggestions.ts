import { z } from 'zod';
import { ai } from '../genkit';

export const suggestionFlow = ai.defineFlow(
    {
        name: 'suggestionFlow',
        inputSchema: z.object({
            history: z.array(z.string()),
            menuItems: z.array(z.object({
                id: z.string(),
                name: z.string(),
                category: z.string(),
                description: z.string()
            }))
        }),
        outputSchema: z.array(z.string()),
    },
    async (input) => {
        const { history, menuItems } = input;

        if (history.length === 0) return [];

        const prompt = `
      Based on the following food order history: ${history.join(', ')}
      And the available menu items: ${menuItems.map(m => `${m.name} (${m.category})`).join(', ')}
      
      Suggest exactly 3 unique dish IDs from the menu that the user might like next.
      Consider flavor profiles, categories, and potential variety.
      Return ONLY a JSON array of strings containing the item names.
    `;

        const response = await ai.generate({
            prompt,
            config: { temperature: 0.7 }
        });

        try {
            // Basic extraction if the model wrapped it in backticks
            const text = response.text.replace(/```json|```/g, '').trim();
            return JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse AI response', e);
            return [];
        }
    }
);
