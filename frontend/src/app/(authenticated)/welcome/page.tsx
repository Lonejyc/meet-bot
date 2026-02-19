import Image from "next/image";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Card className="max-w-[560px]">
        <h1 className="mb-6 text-center font-heading text-3xl font-bold text-primary">
          Bienvenue !
        </h1>

        {/* Reservation info card */}
        <div className="rounded-xl bg-input/40 p-6">
          <p className="mb-4 text-center text-sm font-bold text-primary">
            Voici votre prochaine r&eacute;servation :
          </p>

          <div className="flex gap-6">
            {/* Colisée image */}
            <div className="relative h-32 w-44 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/images/colisee.jpg"
                alt="Le Colis\u00e9e"
                fill
                className="object-cover"
              />
            </div>

            {/* Reservation details */}
            <div className="flex flex-col justify-center gap-1 text-sm text-primary">
              <p>
                <span className="font-bold">Lieu :</span> Le Colis&eacute;e
              </p>
              <p>
                <span className="font-bold">Date :</span> 20/03/2026
              </p>
              <p>
                <span className="font-bold">Heure :</span> 14h00
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="mt-6 flex justify-center">
            <div className="rounded-full bg-primary px-10 py-3">
              <span className="font-heading text-2xl font-bold tracking-widest text-white">
                00:00:00
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Action buttons below card */}
      <div className="relative z-10 flex items-center gap-4">
        <Button href="#" variant="filled">
          Voir le tutoriel
        </Button>
        <Button href="/dashboard" variant="filled">
          C&apos;est parti !
        </Button>
      </div>
    </div>
  );
}
