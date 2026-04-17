import { NextRequest, NextResponse } from 'next/server';
import { supportFlow } from '@/ai/flows/chat';

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();

        const response = await supportFlow({
            message,
            history
        });

        return NextResponse.json({ response });
    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json({ response: "I'm sorry, I'm having trouble connecting right now. Please try again later." });
    }
}
