"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Settings, LogOut, ChevronRight, Star, Moon, Sun, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFavorites } from "@/hooks/use-favorites";
import { useCart } from "@/hooks/use-cart";
import { RestaurantCard } from "@/components/restaurant-card";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'settings' | 'addresses' | 'reviews' | 'favorites'>('orders');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { favorites } = useFavorites();
  const { orderHistory } = useCart();
  const pastOrders = orderHistory.length > 0 ? orderHistory : [
    { id: "FF-102", restaurant: "Biryani Blues", date: "Yesterday, 8:30 PM", status: "Delivered", amount: 450, items: ["Chicken Biryani", "Paneer Tikka"] },
    { id: "FF-098", restaurant: "Pizza Paradise", date: "4 March, 1:15 PM", status: "Delivered", amount: 645, items: ["Margherita Pizza", "Garlic Bread"] },
  ];

  // Initialize theme from document class
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src="https://picsum.photos/seed/kunal-deo/200/200" alt="Kunal Deo" />
                  <AvatarFallback>KD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">Kunal Deo</h2>
                  <p className="text-sm text-muted-foreground">+91 9876543210</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>

          <nav className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 ${activeTab === 'orders' ? 'bg-primary/10 text-primary' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package className="w-4 h-4" />
              Orders
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 ${activeTab === 'addresses' ? 'bg-primary/10 text-primary' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin className="w-4 h-4" />
              Addresses
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 ${activeTab === 'favorites' ? 'bg-primary/10 text-primary' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart className="w-4 h-4" />
              Favorites
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 ${activeTab === 'reviews' ? 'bg-primary/10 text-primary' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <Star className="w-4 h-4" />
              Reviews
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Separator className="my-2" />
            <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          {activeTab === 'orders' && (
            <>
              <h1 className="text-2xl font-bold">Past Orders</h1>
              {pastOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-muted/30 pb-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">{order.restaurant}</h3>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">{order.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="py-4 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {order.items.join(", ")}
                      </p>
                      <p className="font-bold">₹{order.amount}</p>
                    </div>
                    <Separator className="mb-4" />
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm" className="flex-1 border-primary text-primary font-bold">REORDER</Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                        View Details <ChevronRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {activeTab === 'favorites' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Your Favorites</h1>
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {favorites.map((resto) => (
                    <RestaurantCard key={resto.id} restaurant={resto} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center space-y-4 border rounded-xl bg-muted/20">
                  <div className="mx-auto h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">No favorites yet</h3>
                  <p className="text-muted-foreground">Tap the heart icon on any restaurant to save it here.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <>
              <h1 className="text-2xl font-bold">Settings</h1>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Adjust the appearance of the application.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isDarkMode ? <Moon className="h-4 w-4 text-muted-foreground" /> : <Sun className="h-4 w-4 text-muted-foreground" />}
                      <Switch
                        checked={isDarkMode}
                        onCheckedChange={toggleDarkMode}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about your orders via email.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Safety</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">Change Password</Button>
                  <Button variant="outline" className="w-full justify-start">Two-Factor Authentication</Button>
                </CardContent>
              </Card>
            </>
          )}

          {(activeTab === 'addresses' || activeTab === 'reviews') && (
            <div className="py-20 text-center space-y-4">
              <div className="text-4xl">🚧</div>
              <h3 className="text-xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} coming soon</h3>
              <p className="text-muted-foreground">We are working on this feature.</p>
              <Button onClick={() => setActiveTab('orders')}>Back to Orders</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
