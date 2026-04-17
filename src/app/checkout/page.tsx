"use client"

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, CreditCard, ShoppingBag, ArrowLeft, CheckCircle2, Banknote } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const { cart, totalPrice, confirmOrder } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const router = useRouter();
  const { toast } = useToast();

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-6">
        <div className="bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Button asChild>
          <Link href="/">Browse Restaurants</Link>
        </Button>
      </div>
    );
  }

  const handleOrder = () => {
    // Determine the restaurant name from the first item in the cart, or use a default
    const restaurantName = cart.length > 0 ? (cart[0] as any).restaurantTitle || "FoodFetch Restaurant" : "FoodFetch Restaurant";

    confirmOrder(restaurantName);
    setStep(3);
    toast({
      title: "Order Placed!",
      description: paymentMethod === 'cod'
        ? "Your order is confirmed. Please keep cash ready at the time of delivery."
        : "Your delicious food is on the way.",
    });
  };

  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-primary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you for ordering with FoodFetch. Your order #FF8294 is being prepared and will be delivered in 35 mins.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild>
            <Link href="/profile">Track Order</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <h1 className="text-3xl font-bold">Secure Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className={step === 1 ? 'border-primary border-2 shadow-md' : 'opacity-70'}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className={`p-2 rounded-full ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <MapPin className="w-5 h-5" />
              </div>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-primary/5 border-primary relative">
                  <p className="font-bold mb-1">Home</p>
                  <p className="text-sm text-muted-foreground">123, Green Valley, Cyber City, Gurgaon - 122002</p>
                  <div className="absolute top-4 right-4 text-primary">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                  <p className="font-bold mb-1">Office</p>
                  <p className="text-sm text-muted-foreground">Tech Park, Sector 44, Gurgaon - 122003</p>
                </div>
              </div>
              {step === 1 && (
                <Button className="mt-6 bg-accent hover:bg-accent/90" onClick={() => setStep(2)}>Deliver Here</Button>
              )}
            </CardContent>
          </Card>

          <Card className={step === 2 ? 'border-primary border-2 shadow-md' : step < 2 ? 'opacity-50 pointer-events-none' : 'opacity-70'}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className={`p-2 rounded-full ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <CreditCard className="w-5 h-5" />
              </div>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded">💳</div>
                    <div>
                      <p className="font-medium">Credit / Debit Card</p>
                      <p className="text-xs text-muted-foreground">Pay with Visa/Mastercard</p>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center">
                    {paymentMethod === 'card' && <div className="h-3 w-3 bg-primary rounded-full" />}
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded">
                      <Banknote className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-xs text-muted-foreground">Pay with cash upon arrival</p>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center">
                    {paymentMethod === 'cod' && <div className="h-3 w-3 bg-primary rounded-full" />}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="text-primary font-bold">{item.quantity}x</span>
                      <span className="line-clamp-1">{item.name}</span>
                    </span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Item Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="text-primary font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes & Charges</span>
                  <span>₹45</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold text-primary">
                <span>Grand Total</span>
                <span>₹{totalPrice + 45}</span>
              </div>

              <Button
                className="w-full bg-accent hover:bg-accent/90 h-12 text-lg font-bold"
                disabled={step < 2}
                onClick={handleOrder}
              >
                {paymentMethod === 'cod' ? 'Confirm Order' : 'Place Order'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
