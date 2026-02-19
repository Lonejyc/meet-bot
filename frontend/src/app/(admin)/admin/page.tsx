"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { api, ApiError } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.admin.login({ username, password });
      router.push("/admin/dashboard");
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
      <h1 className="mb-2 text-center font-heading text-3xl font-bold text-primary">
        Administration
      </h1>
      <p className="mb-8 text-center text-sm text-foreground/50">
        Espace réservé aux administrateurs
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <InputField
          type="text"
          name="username"
          placeholder="nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <InputField
          type="password"
          name="password"
          placeholder="mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && (
          <p className="text-center text-sm text-danger">{error}</p>
        )}

        <div className="mt-4 flex justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
