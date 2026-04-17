import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { CartProvider } from '@/hooks/use-cart';
import { FavoritesProvider } from '@/hooks/use-favorites';
import { Toaster } from '@/components/ui/toaster';
import { SupportChatbot } from '@/components/SupportChatbot';

export const metadata: Metadata = {
  title: 'FoodFetch - Fast & Fresh Food Delivery',
  description: 'Order food from your favorite restaurants with FoodFetch.',
  icons: {
    icon: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <FavoritesProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="border-t bg-muted/30 py-12">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-4">FoodFetch</h3>
                    <p className="text-sm text-muted-foreground">© 2024 FoodFetch Technologies Pvt. Ltd.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="#" className="hover:text-primary">About</a></li>
                      <li><a href="#" className="hover:text-primary">Careers</a></li>
                      <li><a href="#" className="hover:text-primary">Team</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="#" className="hover:text-primary">Help & Support</a></li>
                      <li><a href="#" className="hover:text-primary">Partner with us</a></li>
                      <li><a href="#" className="hover:text-primary">Ride with us</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="#" className="hover:text-primary">Terms & Conditions</a></li>
                      <li><a href="#" className="hover:text-primary">Refund & Cancellation</a></li>
                      <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
              </footer>
            </div>
            <SupportChatbot />
            <Toaster />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
