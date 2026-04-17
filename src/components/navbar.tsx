
"use client"

import Link from "next/link";
import { Search, ShoppingCart, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function Navbar() {
  const { cart, totalItems, totalPrice, updateQuantity } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-primary p-1.5 text-primary-foreground flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">FoodFetch</span>
          </Link>
          
          <div className="hidden items-center gap-2 text-sm font-medium text-muted-foreground md:flex">
            <MapPin className="h-4 w-4 text-accent" />
            <span>Select Location</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-8 md:max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for restaurants or food..."
              className="w-full bg-muted/50 pl-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/profile" className="hidden items-center gap-2 text-sm font-medium hover:text-primary md:flex">
            <User className="h-5 w-5" />
            Sign In
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 p-0">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center bg-accent text-accent-foreground p-0 text-[10px]">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your Cart
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex-1 overflow-y-auto pr-2 space-y-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                    <div className="rounded-full bg-muted p-6">
                      <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Your cart is empty</h3>
                      <p className="text-sm text-muted-foreground">Add some delicious food from restaurants near you!</p>
                    </div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          className="object-cover" 
                          data-ai-hint="cart item"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`h-2.5 w-2.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                          <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground italic line-clamp-1">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-primary">₹{item.price}</p>
                          <div className="flex items-center gap-2 rounded-md border p-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2 font-bold hover:text-primary">-</button>
                            <span className="text-sm min-w-[20px] text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2 font-bold hover:text-primary">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="pt-6 border-t mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold text-lg text-primary">₹{totalPrice}</span>
                  </div>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
