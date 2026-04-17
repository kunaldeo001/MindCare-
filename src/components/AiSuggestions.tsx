"use client"

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { RESTAURANTS, MenuItem } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingCart, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

export function AiSuggestions() {
    const { orderHistory, addToCart } = useCart();
    const [suggestions, setSuggestions] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        async function fetchSuggestions() {
            if (orderHistory.length === 0) return;

            setIsLoading(true);
            try {
                const historyItems = orderHistory.flatMap(order => order.items);
                const response = await fetch('/api/ai/suggestions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ history: historyItems }),
                });

                const data = await response.json();

                if (data.suggestions && data.suggestions.length > 0) {
                    const recommendedItems: MenuItem[] = [];

                    // Map suggestion names back to full MenuItem objects
                    data.suggestions.forEach((name: string) => {
                        for (const restaurant of RESTAURANTS) {
                            const item = restaurant.menu.find(m => m.name.toLowerCase().includes(name.toLowerCase()));
                            if (item && !recommendedItems.find(ri => ri.id === item.id)) {
                                recommendedItems.push(item);
                                break;
                            }
                        }
                    });

                    setSuggestions(recommendedItems.slice(0, 4));
                }
            } catch (error) {
                console.error("Failed to fetch suggestions:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSuggestions();
    }, [orderHistory]);

    if (orderHistory.length === 0 || (!isLoading && suggestions.length === 0)) {
        return null;
    }

    return (
        <section className="space-y-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <h2 className="text-2xl font-bold">Recommended for You</h2>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center p-12 bg-muted/20 rounded-2xl border border-dashed border-primary/20">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-sm font-medium text-muted-foreground italic">AI is curating your perfect meal...</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {suggestions.map((item) => (
                        <Card key={item.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-primary/5">
                            <div className="relative h-40 w-full">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-2 right-2 flex bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                                    <span className="text-xs font-bold text-primary italic">AI Choice</span>
                                </div>
                            </div>
                            <CardContent className="p-4 space-y-3">
                                <div>
                                    <h3 className="font-bold text-base line-clamp-1">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground font-medium">{item.category}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-black text-primary">₹{item.price}</span>
                                    <Button
                                        size="sm"
                                        className="h-8 w-8 p-0 rounded-full bg-accent hover:bg-accent/90"
                                        onClick={() => {
                                            addToCart(item);
                                            toast({
                                                title: "Added to cart",
                                                description: `${item.name} is ready for your next meal!`,
                                            });
                                        }}
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}
