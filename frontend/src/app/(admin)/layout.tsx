import Logo from "@/components/Logo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-primary">
      {/* Header — logo only */}
      <header className="relative z-20 p-6">
        <Logo className="h-16 w-auto text-white" />
      </header>

      {/* Centered content */}
      <main className="relative z-10 flex flex-1 items-start justify-center px-4 py-8">
        {children}
      </main>
    </div>
  );
}
