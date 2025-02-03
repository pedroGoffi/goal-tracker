import { Geist, Geist_Mono } from "next/font/google";
import { Metadata, Viewport } from "next";
import "./global.css";
import RootNavbar from "@/components/Root/RootNavbar";
import RootFooter from "@/components/Root/RootFooter";
import RootQueryClientProvider from "@/components/Root/RootQueryClientProvider";
import RootClientSessionProvider from "@/components/Root/RootClientProvider";

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
    template: '%s | Objetivo Fácil',
    default: 'Objetivo Fácil',
  },
  description: 'Next-generation goal management platform',
  authors: [{
    name: 'Pedro Henrique Goffi de Paulo',
    url: 'https://github.com/pedroGoffi'
  }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Objetivo Facil',
  },
}

export const viewport: Viewport = {
  themeColor: '#18181b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-gray-950 text-gray-50 antialiased">
        <RootClientSessionProvider>
          <RootQueryClientProvider>
            <div className="flex flex-col min-h-screen">
              <RootNavbar />
              
              <main className="flex-1">
                <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                  {children}
                </div>
              </main>

              <RootFooter />
            </div>
          </RootQueryClientProvider>
        </RootClientSessionProvider>
      </body>
    </html>
  );
}
