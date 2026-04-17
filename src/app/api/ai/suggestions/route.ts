import { NextRequest, NextResponse } from 'next/server';
import { suggestionFlow } from '@/ai/flows/suggestions';
import { RESTAURANTS } from '@/lib/data';

export async function POST(req: NextRequest) {
    try {
        const { history } = await req.json();

        // Extract all menu items
        const allMenuItems = RESTAURANTS.flatMap(r => r.menu.map(m => ({
            id: m.id,
            name: m.name,
            category: m.category,
            description: m.description
        })));

        const suggestions = await suggestionFlow({
            history,
            menuItems: allMenuItems
        });

        return NextResponse.json({ suggestions });
    } catch (error) {
        console.error('Suggestion error:', error);
        return NextResponse.json({ suggestions: [] });
    }
}
