import { useState } from "react";
import { MessageSquare, Bot, Users, Settings, BarChart3, Zap, Clock, TrendingUp, Phone, Monitor } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { MetricsCards } from "@/components/MetricsCards";
import { ProfilesConfig } from "@/components/ProfilesConfig";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard RAG WhatsApp</h1>
                <p className="text-muted-foreground">
                  Sistema inteligente de atendimento com múltiplos perfis especialistas
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                  Sistema Ativo
                </Badge>
              </div>
            </div>

            <MetricsCards />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Conversas Recentes
                  </CardTitle>
                  <CardDescription>
                    Últimas interações do chatbot
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { user: "+55 11 9999-1234", message: "Como funciona o plano anual?", profile: "Comercial", time: "2 min", status: "active" },
                      { user: "+55 11 8888-5678", message: "Erro 401 na integração webhook", profile: "Técnico", time: "5 min", status: "resolved" },
                      { user: "+55 11 7777-9012", message: "Meu boleto venceu ontem", profile: "Financeiro", time: "8 min", status: "pending" },
                    ].map((conv, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-gradient-card hover:bg-accent/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{conv.user}</span>
                            <Badge variant="outline" className="text-xs">
                              {conv.profile}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conv.message}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{conv.time}</p>
                          <div className={`w-2 h-2 rounded-full mt-1 ml-auto ${
                            conv.status === 'active' ? 'bg-primary animate-pulse' :
                            conv.status === 'resolved' ? 'bg-success' : 'bg-warning'
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-secondary" />
                    Performance dos Perfis
                  </CardTitle>
                  <CardDescription>
                    Distribuição de atendimentos por especialista
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Atendente Sênior", count: 45, percentage: 35, color: "bg-primary" },
                      { name: "Técnico Especialista", count: 32, percentage: 25, color: "bg-secondary" },
                      { name: "Comercial/Vendas", count: 28, percentage: 22, color: "bg-info" },
                      { name: "Financeiro", count: 23, percentage: 18, color: "bg-warning" },
                    ].map((profile, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{profile.name}</span>
                          <span className="text-muted-foreground">{profile.count} atendimentos</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${profile.color} transition-all duration-500`}
                            style={{ width: `${profile.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "chat":
        return <ChatInterface />;
      case "perfis":
        return <ProfilesConfig />;
      case "configuracoes":
        return (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Configurações</h1>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuração OpenAI</CardTitle>
                  <CardDescription>Configure sua chave de API e modelos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">API Key</label>
                    <input 
                      type="password" 
                      placeholder="sk-..." 
                      className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Modelo Principal</label>
                      <select className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background">
                        <option value="gpt-5-thinking">GPT-5 Thinking</option>
                        <option value="gpt-4-turbo">GPT-4 Turbo</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Modelo Embeddings</label>
                      <select className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background">
                        <option value="text-embedding-3-large">Text Embedding 3 Large</option>
                        <option value="text-embedding-ada-002">Ada 002</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configuração WhatsApp</CardTitle>
                  <CardDescription>Configure a integração com o provedor de WhatsApp</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Provedor</label>
                    <select className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background">
                      <option value="twilio">Twilio</option>
                      <option value="meta">Meta Cloud API</option>
                      <option value="zenvia">Zenvia</option>
                      <option value="360dialog">360Dialog</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Webhook URL</label>
                    <input 
                      type="url" 
                      placeholder="https://seu-webhook.com/whatsapp" 
                      className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return <div>Conteúdo não encontrado</div>;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}