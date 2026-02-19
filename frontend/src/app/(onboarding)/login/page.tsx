import Card from "@/components/Card";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

export default function LoginPage() {
  return (
    <Card>
      <h1 className="mb-8 text-center font-heading text-3xl font-bold text-primary">
        Je me connecte
      </h1>

      {/* Login form (static, not connected to API) */}
      <div className="flex flex-col gap-5">
        <InputField
          type="email"
          name="email"
          placeholder="e-mail"
        />
        <InputField
          type="password"
          name="password"
          placeholder="mot de passe provisoire"
        />

        {/* Submit button */}
        <div className="mt-4 flex justify-center">
          <Button href="/welcome">Se connecter</Button>
        </div>
      </div>
    </Card>
  );
}
