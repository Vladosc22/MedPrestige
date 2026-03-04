import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";
import ThemeConext from '@/components/providers/ThemeContext';

export const metadata = {
  title: "MedPrestige - Advanced Healthcare Made Personal",
  description: "Professional healthcare services with personalized care for every patient.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts here (global) OR you can move to marketing layout if admin uses different fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeConext>
          {children}
        </ThemeConext>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
