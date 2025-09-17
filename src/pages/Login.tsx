import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, LockKeyhole } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/15 flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-primary/10 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground/80">
          <div className="flex items-center gap-3 text-primary">
            <Bot className="h-9 w-9" />
            <span className="text-lg font-semibold uppercase tracking-[0.3em]">Conversa Mestre</span>
          </div>
          <h1 className="mt-10 text-4xl font-bold text-foreground">
            Inteligência conversacional para equipes de alta performance
          </h1>
          <p className="mt-6 text-base text-muted-foreground max-w-lg">
            Acesse o painel para configurar perfis especialistas, acompanhar métricas em tempo real e garantir um
            atendimento excepcional no WhatsApp com tecnologia RAG.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <LockKeyhole className="h-5 w-5 text-primary" />
                Segurança corporativa
              </div>
              <p>Acesso protegido e controle de permissões para toda a equipe.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Bot className="h-5 w-5 text-primary" />
                Perfis inteligentes
              </div>
              <p>Configure especialistas virtuais com conhecimento contextualizado.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md shadow-2xl border-border/60 bg-background/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Acesse sua conta</CardTitle>
            <CardDescription>
              Entre com suas credenciais corporativas para acessar o painel Conversa Mestre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="voce@empresa.com" required autoComplete="email" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button type="button" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </button>
                </div>
                <Input id="password" type="password" placeholder="••••••••" required autoComplete="current-password" />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <p className="mt-6 text-sm text-muted-foreground text-center">
              Não tem acesso? <span className="text-primary font-medium">Entre em contato com o administrador.</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
