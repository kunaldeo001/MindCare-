"use client"

import { useEffect, useState } from "react";
import { receivePersonalizedRecommendations, ReceivePersonalizedRecommendationsOutput } from "@/ai/flows/receive-personalized-recommendations";
import { generateFoodImage } from "@/ai/flows/generate-food-image";
import { RestaurantCard } from "./restaurant-card";
import { RESTAURANTS } from "@/lib/data";
import { Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Star, Clock } from "lucide-react";

interface RecommendedItemWithImage {
  name: string;
  description: string;
  price: number;
  restaurantName: string;
  imageUrl?: string;
}

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<ReceivePersonalizedRecommendationsOutput | null>(null);
  const [foodImages, setFoodImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecs() {
      try {
        const result = await receivePersonalizedRecommendations({
          userId: "user-123",
          pastOrders: [
            {
              restaurantName: "Biryani Blues",
              foodItems: [{ name: "Chicken Biryani", quantity: 1, price: 320 }],
              orderDate: "2024-03-01"
            },
            {
              restaurantName: "Pizza Paradise",
              foodItems: [{ name: "Pepperoni Pizza", quantity: 1, price: 499 }],
              orderDate: "2024-03-05"
            }
          ],
          browsingHistory: [
            { foodItemName: "Burger", timestamp: new Date().toISOString() }
          ]
        });
        setRecommendations(result);

        // Generate AI images for the recommended food items
        if (result.recommendedFoodItems.length > 0) {
          result.recommendedFoodItems.forEach(async (item) => {
            try {
              const imageUrl = await generateFoodImage({ 
                foodName: item.name, 
                description: item.description 
              });
              setFoodImages(prev => ({ ...prev, [item.name]: imageUrl }));
            } catch (err) {
              console.error(`Failed to generate image for ${item.name}`, err);
            }
          });
        }
      } catch (e) {
        console.error("Failed to load recommendations", e);
      } finally {
        setLoading(false);
      }
    }
    fetchRecs();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
  
  if (!recommendations) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-accent animate-pulse" />
        <h2 className="text-2xl font-bold italic tracking-tight">AI-Generated Picks For You</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {recommendations.recommendedFoodItems.slice(0, 2).map((item) => (
          <Card key={item.name} className="group overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row h-full">
              <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-muted">
                {foodImages[item.name] ? (
                  <Image
                    src={foodImages[item.name]}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    data-ai-hint="ai generated food"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-1 rounded uppercase">AI Recommended</span>
                </div>
              </div>
              <CardContent className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider">{item.restaurantName}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">₹{item.price}</span>
                  <button className="text-primary font-bold text-sm border border-primary px-4 py-1.5 rounded-md hover:bg-primary/5 transition-colors">
                    ADD TO CART
                  </button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-muted-foreground">Nearby matches based on your taste</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RESTAURANTS.slice(0, 4).map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
