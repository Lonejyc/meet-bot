import Logo from "@/components/Logo";
import Ribbon from "@/components/Ribbon";

export default function OnboardingLayout({
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

      {/* Ribbon decoration */}
      <Ribbon />

      {/* Centered content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-12">
        {children}
      </main>
    </div>
  );
}
