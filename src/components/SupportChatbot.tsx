"use client"

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, User, Bot, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
    role: 'user' | 'model';
    content: string;
}

export function SupportChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', content: "Hi! I'm your FoodFetch Support AI. How can I help you with your order or any other questions today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.slice(-5) // Send last few messages for context
                }),
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'model', content: data.response }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', content: "I'm having a bit of trouble right now. Can you try again in a moment?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-primary hover:bg-primary/90 z-50 p-0 overflow-hidden group border-4 border-background"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                <MessageCircle className="h-8 w-8 text-primary-foreground relative z-10 animate-in zoom-in" />
            </Button>
        );
    }

    return (
        <div className={cn(
            "fixed bottom-6 right-6 z-50 transition-all duration-300 animate-in slide-in-from-bottom-10",
            isMinimized ? "w-64" : "w-[380px] h-[550px]"
        )}>
            <Card className="h-full shadow-2xl border-none overflow-hidden bg-background/95 backdrop-blur-md flex flex-col border-primary/20 border">
                <CardHeader className="p-4 bg-primary text-primary-foreground flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                                <Bot className="h-6 w-6" />
                            </div>
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-bold tracking-tight">FoodFetch AI Support</CardTitle>
                            <p className="text-[10px] opacity-80 font-medium italic">Online | Ready to Help</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white/10 text-primary-foreground"
                            onClick={() => setIsMinimized(!isMinimized)}
                        >
                            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white/10 text-primary-foreground"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>

                {!isMinimized && (
                    <>
                        <CardContent className="flex-1 p-0 overflow-hidden bg-muted/5 flex flex-col">
                            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                                <div className="space-y-4">
                                    {messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                                                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                                                msg.role === 'user' ? "bg-accent text-accent-foreground border-accent/20" : "bg-muted text-muted-foreground border-muted-foreground/10"
                                            )}>
                                                {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                            </div>
                                            <div className={cn(
                                                "rounded-2xl px-4 py-2.5 text-sm max-w-[80%] shadow-sm",
                                                msg.role === 'user'
                                                    ? "bg-accent text-accent-foreground rounded-tr-none font-medium"
                                                    : "bg-background border border-muted-foreground/10 rounded-tl-none leading-relaxed"
                                            )}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex gap-3 animate-in fade-in duration-300">
                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 border border-muted-foreground/10">
                                                <Bot className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div className="bg-background border border-muted-foreground/10 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <div className="h-1.5 w-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <div className="h-1.5 w-1.5 bg-primary/40 rounded-full animate-bounce" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>

                        <CardFooter className="p-4 bg-background border-t">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex w-full items-center gap-2"
                            >
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about your order..."
                                    className="flex-1 bg-muted/30 border-none focus-visible:ring-primary h-11 rounded-xl"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!input.trim() || isLoading}
                                    className="rounded-xl h-11 w-11 shadow-lg shadow-primary/20"
                                >
                                    <Send className="h-5 w-5" />
                                </Button>
                            </form>
                        </CardFooter>
                    </>
                )}
            </Card>
        </div>
    );
}
