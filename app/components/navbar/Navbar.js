"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./navbar.module.css";

import { useWatchlist } from "../../context/StorageListContext";

export default function Navbar() {
  const pathname = usePathname();
  const { watchlist } = useWatchlist();
  return (
    <nav className={`navbar navbar-expand ${styles.navbar}`}>
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold navLink">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={70}
            height={70}
          />
        </Link>
        <div className="d-flex gap-3">
          <Link href="/" className={pathname === "/" ? styles.navLinkActive : styles.navLink}>
            Ma liste ({watchlist.length})
          </Link>
          <Link href="/recherche" className={pathname === "/recherche" ? styles.navLinkActive : styles.navLink}>
            Rechercher
          </Link>
        </div>
      </div>
    </nav>
  );
}