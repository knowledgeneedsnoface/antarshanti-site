// app/layout.tsx
import "./globals.css";
import { Inter, Crimson_Text } from "next/font/google";
import { CartProvider } from "./(components)/CartContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const crimsonText = Crimson_Text({ 
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap"
});

export const metadata = {
  title: "AntarShanti",
  description: "Daily Rituals for Inner Peace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonText.variable}`}>
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
