import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Reddit Based Glassdoor",
  description:
    "Reddit Based Glassdoor is an app that leverages Reddit content and AI to generate detailed reports on companies and industries. It offers sentiment analysis, company summaries, and industry insights, helping users make informed decisions based on discussions and opinions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-nunito antialiased dark`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
            <Toaster />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
