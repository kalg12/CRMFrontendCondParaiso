import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CRM Condominios Paraíso",
  description: "Aplicación desarrollada para la gestión de prospectos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <link rel="icon" href="/favicon.ico" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
