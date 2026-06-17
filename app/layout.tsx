import type { Metadata } from "next";
import { ThemeProvider } from "./theme-engine/theme-provider/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "JISL Theme Studio",
  description: "Jain Irrigation Systems Ltd · Theme Engine & Studio · 25+ Enterprise Themes",
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
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
