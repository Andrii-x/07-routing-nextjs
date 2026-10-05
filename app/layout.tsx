import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header/Header";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoteHub | Notes for a clearer day",
  description: "Capture, organize, and revisit your notes.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: ReactNode; modal: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Header />
          {children}
          {modal}
        </QueryProvider>
      </body>
    </html>
  );
}
