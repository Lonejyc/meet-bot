"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { api, ApiError, type CreateUserResponse } from "@/lib/api";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CreateUserResponse | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await api.admin.createUser({
        email,
        starts_at: new Date(startsAt).toISOString(),
        expires_at: new Date(expiresAt).toISOString(),
      });
      setResult(response);
      // Reset form
      setEmail("");
      setStartsAt("");
      setExpiresAt("");
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

  async function handleLogout() {
    await api.auth.logout();
    router.push("/admin");
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-white">
          Tableau de bord
        </h1>
        <Button variant="outline" onClick={handleLogout}>
          Déconnexion
        </Button>
      </div>

      {/* Create user form */}
      <Card wide>
        <h2 className="mb-6 font-heading text-xl font-bold text-primary">
          Créer un utilisateur
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground/70">
              Adresse email
            </label>
            <InputField
              type="email"
              name="email"
              placeholder="utilisateur@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/70">
                Début de session
              </label>
              <InputField
                type="datetime-local"
                name="starts_at"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/70">
                Fin de session
              </label>
              <InputField
                type="datetime-local"
                name="expires_at"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-center text-sm text-danger">{error}</p>
          )}

          <div className="mt-2 flex justify-center">
            <Button type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer et envoyer l'invitation"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Success result */}
      {result && (
        <Card wide>
          <h2 className="mb-4 font-heading text-xl font-bold text-primary">
            Utilisateur créé
          </h2>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg bg-input/30 p-3">
              <span className="text-sm text-foreground/60">Email</span>
              <span className="font-medium text-foreground">{result.user.email}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-input/30 p-3">
              <span className="text-sm text-foreground/60">Code de connexion</span>
              <span className="font-heading text-2xl font-bold tracking-widest text-primary">
                {result.session.code}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-input/30 p-3">
              <span className="text-sm text-foreground/60">Session</span>
              <span className="text-sm font-medium text-foreground">
                {new Date(result.session.starts_at).toLocaleString("fr-FR")}
                {" — "}
                {new Date(result.session.expires_at).toLocaleString("fr-FR")}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-input/30 p-3">
              <span className="text-sm text-foreground/60">Email envoyé</span>
              <span className={`text-sm font-semibold ${result.email_sent ? "text-primary" : "text-danger"}`}>
                {result.email_sent ? "Oui" : "Échec de l'envoi"}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
