// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

export const metadata = {
  title: "CineWatch — Ma watchlist de films",
  description: "Gère ta liste de films à regarder avec CineWatch",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
