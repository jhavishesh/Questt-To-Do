import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { StoreProvider } from "@/stores/StoreProvider";
import Link from "next/link";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Management App",
  description: "An application for managing tasks",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 ${inter.className}`}>
        <StoreProvider>
          <div className="min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
              <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                Questt Study App
                </Link>
                <div>
                  <Link href="/" className="mx-4 hover:underline">
                  
                  </Link>
                  {/* Add more links here if needed */}
                </div>
              </nav>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto p-4 sm:p-8 bg-white shadow-lg rounded-lg mt-4 mb-4">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 mt-4">
              <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Questt Study App</p>
              </div>
            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
