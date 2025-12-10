// app/layout.tsx
import "./globals.css";
import { Inter, Crimson_Text } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "./(components)/CartContext";
import { ThemeProvider } from "./(components)/theme-system/ThemeContext";
import GlobalNavbar from "./(components)/GlobalNavbar";
import GlobalFooter from "./(components)/GlobalFooter";
import ThemeRenderer from "./(components)/theme-system/ThemeRenderer";
import ThemeSwitcher from "./(components)/theme-system/ThemeSwitcher";
import TwinWrapper from "./TwinWrapper";

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
  title: "AntarShanti - Daily Rituals for Inner Peace",
  description: "10 minutes of puja. A whole day of inner peace. Modern spiritual tools for ancient wisdom.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonText.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <CartProvider>
            {/* Dynamic spiritual ambience background */}
            <ThemeRenderer />
            
            {/* Theme switcher button */}
            <ThemeSwitcher />
            
            {/* Soul Twin System */}
            <TwinWrapper />
            
            <GlobalNavbar />
            <div className="min-h-screen relative z-10">
              {children}
            </div>
            <GlobalFooter />
            <Analytics />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
