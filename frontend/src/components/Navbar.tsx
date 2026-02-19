import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
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
      <Button href="/login" variant="outline" className="border-accent text-accent">
        Déconnexion
      </Button>
    </nav>
  );
}
