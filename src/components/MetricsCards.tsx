import { TrendingUp, Clock, MessageSquare, Users, Zap, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricsCards() {
  const metrics = [
    {
      title: "Conversas Hoje",
      value: "128",
      change: "+12%",
      trend: "up",
      icon: MessageSquare,
      description: "vs. ontem",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Tempo Médio Resposta",
      value: "1.2s",
      change: "-0.3s",
      trend: "up",
      icon: Clock,
      description: "vs. semana passada",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Taxa de Resolução",
      value: "94%",
      change: "+2%",
      trend: "up",
      icon: Zap,
      description: "resolvidos automaticamente",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Usuários Ativos",
      value: "1,247",
      change: "+18%",
      trend: "up",
      icon: Users,
      description: "este mês",
      color: "text-info",
      bgColor: "bg-info/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card 
            key={metric.title} 
            className="animate-slide-up hover:shadow-glow transition-all duration-300 bg-gradient-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-success font-medium">{metric.change}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}