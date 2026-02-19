"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { api, ApiError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.auth.login({ email, code });
      router.push("/welcome");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <h1 className="mb-8 text-center font-heading text-3xl font-bold text-primary">
        Je me connecte
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <InputField
          type="email"
          name="email"
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="text"
          name="code"
          placeholder="code à 6 chiffres"
          value={code}
          onChange={(e) => {
            // Only allow digits, max 6 characters
            const value = e.target.value.replace(/\D/g, "").slice(0, 6);
            setCode(value);
          }}
          inputMode="numeric"
          maxLength={6}
          autoComplete="one-time-code"
        />

        {/* Error message */}
        {error && (
          <p className="text-center text-sm text-danger">{error}</p>
        )}

        {/* Submit button */}
        <div className="mt-4 flex justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
