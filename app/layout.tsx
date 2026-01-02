// app/layout.tsx
import "./globals.css";
import { Manrope, Cormorant_Garamond } from "next/font/google"; // High-End Lusion Stack

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap"
});

export const metadata = {
  title: "AntarShanti - The Inner Atlas",
  description: "A guided return to presence. 10 minutes of silence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorantGaramond.variable}`}>
      <body className={`${manrope.className} antialiased bg-[#030014]`}>
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
            <SmoothScroll>
              <TransitionController>
                <GlobalNavbar />
                <div className="min-h-screen relative z-10 text-rendering-optimizeLegibility antialiased">
                  {children}
                </div>
                <GlobalFooter />
              </TransitionController>
            </SmoothScroll>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
