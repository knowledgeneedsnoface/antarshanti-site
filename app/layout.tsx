// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "./(components)/CartContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AntarShanti",
  description: "Daily Rituals for Inner Peace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
