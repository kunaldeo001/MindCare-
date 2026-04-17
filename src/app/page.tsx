"use client"

import { useState, useMemo } from "react";
import { CATEGORIES, RESTAURANTS } from "@/lib/data";
import { RestaurantCard } from "@/components/restaurant-card";
import { AiSuggestions } from "@/components/AiSuggestions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Search, SlidersHorizontal, Star, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const filteredRestaurants = useMemo(() => {
    const filtered = RESTAURANTS.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = !activeFilter ||
        (activeFilter === "4.0+" && r.rating >= 4.0) ||
        (activeFilter === "Pure Veg" && r.menu.every(m => m.isVeg));

      return matchesSearch && matchesFilter;
    });

    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "deliveryTime") {
      filtered.sort((a, b) => parseFloat(a.deliveryTime) - parseFloat(b.deliveryTime));
    } else if (sortBy === "costLowHigh") {
      filtered.sort((a, b) => a.costForTwo - b.costForTwo);
    } else if (sortBy === "costHighLow") {
      filtered.sort((a, b) => b.costForTwo - a.costForTwo);
    }

    return filtered;
  }, [searchQuery, activeFilter, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Search Section */}
      <section className="relative h-[300px] w-full rounded-3xl overflow-hidden mb-12 flex flex-col items-center justify-center text-center p-6 bg-primary/5">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="https://picsum.photos/seed/food-bg/1200/600"
            alt="Hero Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary">Craving something special?</h1>
          <p className="text-lg text-muted-foreground font-medium italic">Discover the best food & drinks in your city</p>
          <div className="relative w-full max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for 'Pizza', 'Biryani' or 'Burger'..."
              className="h-14 pl-12 pr-4 rounded-full shadow-lg border-primary/20 bg-background text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories Scroller */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What's on your mind?</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const imgData = PlaceHolderImages.find(img => img.id === cat.imageId);
            return (
              <div
                key={cat.name}
                className="flex flex-col items-center gap-2 min-w-[100px] cursor-pointer group"
                onClick={() => setSearchQuery(cat.name)}
              >
                <div className="relative h-24 w-24 rounded-full overflow-hidden bg-muted group-hover:shadow-md transition-shadow ring-2 ring-transparent group-hover:ring-primary/20">
                  <Image
                    src={imgData?.imageUrl || `https://picsum.photos/seed/${cat.name}/200/200`}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    data-ai-hint={imgData?.imageHint || "food category"}
                  />
                </div>
                <span className="text-sm font-medium text-center group-hover:text-primary transition-colors">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Recommendations */}
      {!searchQuery && <AiSuggestions />}

      {/* Main Restaurant Listing */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">
            {searchQuery ? `Results for "${searchQuery}"` : "Restaurants with online delivery"}
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button
              variant={activeFilter === "4.0+" ? "default" : "outline"}
              size="sm"
              className="rounded-full whitespace-nowrap"
              onClick={() => setActiveFilter(activeFilter === "4.0+" ? null : "4.0+")}
            >
              Ratings 4.0+ <Star className="ml-1 h-3 w-3 fill-current" />
            </Button>
            <Button
              variant={activeFilter === "Pure Veg" ? "default" : "outline"}
              size="sm"
              className="rounded-full whitespace-nowrap"
              onClick={() => setActiveFilter(activeFilter === "Pure Veg" ? null : "Pure Veg")}
            >
              Pure Veg
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={sortBy ? "default" : "outline"} size="sm" className="rounded-full whitespace-nowrap gap-2">
                  <SlidersHorizontal className="h-3 w-3" />
                  {sortBy === "rating" ? "Rating: High to Low" :
                    sortBy === "deliveryTime" ? "Delivery: Fastest" :
                      sortBy === "costLowHigh" ? "Cost: Low to High" :
                        sortBy === "costHighLow" ? "Cost: High to Low" : "Sort By"}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy(null)}>Default</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("rating")}>Rating (High to Low)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("deliveryTime")}>Delivery Time (Fastest)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("costLowHigh")}>Cost (Low to High)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("costHighLow")}>Cost (High to Low)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRestaurants.map((resto) => (
              <RestaurantCard key={resto.id} restaurant={resto} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="text-4xl">🍕</div>
            <h3 className="text-xl font-bold">No restaurants found</h3>
            <p className="text-muted-foreground">Try searching for something else or clearing filters.</p>
            <Button variant="link" onClick={() => { setSearchQuery(""); setActiveFilter(null); }}>Clear all</Button>
          </div>
        )}
      </section>
    </div>
  );
}
