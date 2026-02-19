import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import Ribbon from "@/components/Ribbon";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-primary">
      {/* Header — logo + navbar */}
      <header className="relative z-20 flex items-center justify-between p-6">
        <Logo className="h-16 w-auto text-white" />
        <Navbar />
      </header>

      {/* Ribbon decoration */}
      <Ribbon />

      {/* Centered content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-12">
        {children}
      </main>
    </div>
  );
}
