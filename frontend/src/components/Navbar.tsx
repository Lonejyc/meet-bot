"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { api } from "@/lib/api";

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await api.auth.logout();
    } catch {
      // Ignore errors — clear cookies regardless
    }
    router.push("/login");
  }

  return (
    <nav className="relative z-20 flex items-center gap-8">
      <Link
        href="#"
        className="font-sans text-white transition-opacity hover:opacity-80"
      >
        Paramètres
      </Link>
      <Link
        href="#"
        className="font-sans text-white transition-opacity hover:opacity-80"
      >
        Aide
      </Link>
      <Button
        variant="outline"
        className="border-accent text-accent"
        onClick={handleLogout}
      >
        Déconnexion
      </Button>
    </nav>
  );
}
