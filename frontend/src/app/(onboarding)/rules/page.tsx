import Card from "@/components/Card";
import Button from "@/components/Button";

const rules = [
  {
    number: 1,
    text: "Ne pas foncer sur les personnes et les objets/murs.",
  },
  {
    number: 2,
    text: "Ne pas s\u2019approcher du vide.",
  },
  {
    number: 3,
    text: "Suivre le parcours pr\u00e9vu par l\u2019exp\u00e9rience.",
  },
  {
    number: 4,
    text: "Tenir son comportement et sa pr\u00e9sence en public.",
  },
  {
    number: 5,
    text: "Respecter les autres usagers.",
  },
  {
    number: 6,
    text: "Respecter la dur\u00e9e du billet et rester avec son accompagnateur.",
  },
];

export default function RulesPage() {
  return (
    <Card className="max-w-[640px]">
      <h1 className="mb-8 text-center font-heading text-3xl font-bold text-primary">
        Quelques r&egrave;gles...
      </h1>

      {/* 3x2 grid of rule cards */}
      <div className="grid grid-cols-3 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.number}
            className="flex flex-col gap-2 rounded-xl bg-primary p-5"
          >
            <span className="font-heading text-2xl font-bold text-accent">
              {rule.number}.
            </span>
            <p className="text-sm leading-snug text-white">{rule.text}</p>
          </div>
        ))}
      </div>

      {/* Accept button */}
      <div className="mt-8 flex justify-center">
        <Button href="/charter">J&apos;accepte</Button>
      </div>
    </Card>
  );
}
