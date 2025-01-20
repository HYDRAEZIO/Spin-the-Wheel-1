// src/app/layout.tsx
import "../app/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children} {/* This renders the page content */}
      </body>
    </html>
  );
}