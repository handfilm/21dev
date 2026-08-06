import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My App",
    template: "%s · My App",
  },
  description: "A modern, animated Next.js site.",
};

export const viewport: Viewport = {
  // Matches --background in each theme so the browser chrome and any
  // overscroll gutter don't flash white against the dark canvas.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d14" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `dark` is set statically here. To add a toggle later, move this class
    // onto <html> from a blocking inline script so there's no light-mode flash.
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
