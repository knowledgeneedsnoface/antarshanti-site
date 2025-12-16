// app/layout.tsx
import "./globals.css";
import { Inter, Crimson_Text } from "next/font/google";
import { CartProvider } from "./(components)/CartContext";
import { ThemeProvider } from "./(components)/theme-system/ThemeContext";
import GlobalNavbar from "./(components)/GlobalNavbar";
import GlobalFooter from "./(components)/GlobalFooter";
import ThemeRenderer from "./(components)/theme-system/ThemeRenderer";
import ThemeSwitcher from "./(components)/theme-system/ThemeSwitcher";
import MobileSettingsFab from "./(components)/MobileSettingsFab";
import TwinWrapper from "./TwinWrapper";
import LiteModeToggle from "./(components)/LiteModeToggle";
import AccessibilityManager from "./(components)/AccessibilityManager";
import TransitionController from "./(components)/TransitionController";
import BatteryManager from "./(components)/BatteryManager";
import Watermark from "./(components)/Watermark";
import BreathingIndicator from "./(components)/BreathingIndicator";

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
            <LiteModeToggle />
            <MobileSettingsFab />

            {/* Soul Twin System */}
            <TwinWrapper />
            <AccessibilityManager />
            <BatteryManager />
            <Watermark />
            <BreathingIndicator />
            <TransitionController>
              <GlobalNavbar />
              <div className="min-h-screen relative z-10">
                {children}
              </div>
              <GlobalFooter />
            </TransitionController>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
