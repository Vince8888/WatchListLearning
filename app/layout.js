// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { WatchlistProvider } from "../app/context/StorageListContext";

export const metadata = {
  title: "CineWatch — Ma watchlist de films",
  description: "Gère ta liste de films à regarder avec CineWatch",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <WatchlistProvider>
          <Navbar />
          {children}
        </WatchlistProvider>
      </body>
    </html>
  );
}
