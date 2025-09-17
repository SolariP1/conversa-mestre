import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bot, LockKeyhole, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const password = (formData.get("password") as string) ?? "";
    const confirmPassword = (formData.get("confirmPassword") as string) ?? "";

    if (password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve possuir pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "Verifique os campos de senha e confirme novamente.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await signUp(name, email, password);
      toast({
        title: "Cadastro realizado",
        description: "Conta criada com sucesso! Você será redirecionado ao painel.",
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível concluir o cadastro.";
      toast({
        title: "Erro ao cadastrar",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className="mt-10 text-4xl font-bold text-foreground">Protegemos o acesso ao seu ecossistema RAG</h1>
          <p className="mt-6 text-base text-muted-foreground max-w-lg">
            Cadastre-se com um email corporativo e garanta a autenticação necessária para acessar o painel Conversa
            Mestre.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Confirmação por email
              </div>
              <p>Somente endereços de email validados podem acessar o painel seguro.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <LockKeyhole className="h-5 w-5 text-primary" />
                Controle de acesso
              </div>
              <p>Gerenciamos permissões para garantir segurança máxima aos times.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md shadow-2xl border-border/60 bg-background/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Crie sua conta</CardTitle>
            <CardDescription>Cadastre-se com seu email corporativo para liberar o acesso.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" name="name" placeholder="Maria Silva" required autoComplete="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email corporativo</Label>
                <Input id="email" name="email" type="email" placeholder="voce@empresa.com" required autoComplete="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Cadastrando..." : "Criar conta"}
              </Button>
            </form>
            <p className="mt-6 text-sm text-muted-foreground text-center">
              Já possui acesso?{" "}
              <Link to="/" className="text-primary font-medium hover:underline">
                Entrar com minha conta
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
