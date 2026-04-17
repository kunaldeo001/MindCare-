
import Link from "next/link";
import { Star, Clock, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Restaurant } from "@/lib/data";
import Image from "next/image";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const favorite = isFavorite(restaurant.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to restaurant details
    toggleFavorite(restaurant);
    toast({
      title: favorite ? "Removed from Favorites" : "Added to Favorites",
      description: `${restaurant.name} has been ${favorite ? 'removed from' : 'added to'} your favorites list.`,
      duration: 3000,
    });
  };

  return (
    <Link href={`/restaurant/${restaurant.id}`} className="block">
      <Card className="group overflow-hidden border-none transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint="restaurant food"
          />
          <div className="absolute bottom-3 left-3 rounded bg-white/90 px-2 py-1 text-xs font-bold text-primary backdrop-blur-sm z-10">
            ₹{restaurant.costForTwo} for two
          </div>
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10 text-muted-foreground hover:text-red-500"
          >
            <Heart className={`h-5 w-5 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
        <CardContent className="p-3">
          <h3 className="text-lg font-bold text-foreground line-clamp-1">{restaurant.name}</h3>
          <div className="mt-1 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 rounded bg-primary/10 px-1.5 py-0.5 text-primary">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-xs font-bold">{restaurant.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{restaurant.deliveryTime}</span>
            </div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{restaurant.cuisine}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
