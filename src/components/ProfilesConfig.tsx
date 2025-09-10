import { useState } from "react";
import { User, Bot, Briefcase, Calculator, Users, Settings, Save, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function ProfilesConfig() {
  const [selectedProfile, setSelectedProfile] = useState(0);

  const profiles = [
    {
      id: "atendente",
      name: "Atendente Sênior",
      icon: User,
      color: "bg-primary/10 text-primary border-primary/20",
      description: "Cumprimentos, dúvidas gerais, triagem, SLA, prazos",
      keywords: ["saudação", "geral", "triagem", "prazo", "política"],
      active: true,
      prompt: `Você é um Atendente Sênior especializado em atendimento geral via WhatsApp. 

Sua função:
- Receber e cumprimentar clientes
- Realizar triagem inicial de solicitações
- Informar sobre prazos e SLA
- Esclarecer políticas gerais da empresa
- Direcionar para especialistas quando necessário

Estilo de comunicação:
- Formal-amigável em português brasileiro
- Respostas curtas e objetivas (máx. 6-8 linhas)
- Use emojis moderadamente
- Sempre ofereça opções de próximos passos

Quando transferir:
- Questões técnicas → Técnico Especialista
- Vendas/contratos → Comercial
- Pagamentos/faturas → Financeiro
- Emergências → Atendente Humano`,
      confidence: 0.85,
      examples: [
        "Olá! Como posso ajudá-lo hoje?",
        "Qual é o prazo para trocas?",
        "Preciso falar sobre meu pedido"
      ]
    },
    {
      id: "tecnico", 
      name: "Técnico Especialista",
      icon: Settings,
      color: "bg-secondary/10 text-secondary border-secondary/20",
      description: "Questões técnicas, integração, API, erros, tutoriais",
      keywords: ["erro", "api", "integração", "webhook", "código", "bug"],
      active: true,
      prompt: `Você é um Técnico Especialista em integrações e APIs via WhatsApp.

Sua função:
- Resolver problemas técnicos
- Orientar integrações de API
- Diagnosticar erros de sistema
- Fornecer tutoriais passo a passo
- Suporte a desenvolvedores

Estilo de comunicação:
- Técnico mas acessível
- Forneça códigos de exemplo quando útil
- Use termos técnicos com explicação
- Sempre cite fontes da documentação

Ferramentas disponíveis:
- Acesso à base de conhecimento técnico
- Exemplos de código
- Logs de erro comuns
- Guias de integração`,
      confidence: 0.92,
      examples: [
        "Erro 401 ao integrar webhook",
        "Como configurar a API?",
        "Problemas na autenticação"
      ]
    },
    {
      id: "comercial",
      name: "Comercial/Vendas", 
      icon: Briefcase,
      color: "bg-info/10 text-info border-info/20",
      description: "Planos, preços, proposta, upgrade, contratação",
      keywords: ["plano", "preço", "comprar", "contratar", "upgrade", "proposta"],
      active: true,
      prompt: `Você é um Especialista Comercial focado em vendas via WhatsApp.

Sua função:
- Apresentar planos e preços
- Elaborar propostas comerciais
- Processar upgrades de conta
- Negociar condições especiais
- Fechar vendas

Estilo de comunicação:
- Persuasivo mas não insistente
- Sempre destaque benefícios
- Ofereça descontos quando apropriado
- Use elementos de urgência sutilmente

Informações importantes:
- Sempre consulte tabela de preços atual
- Ofereça demonstrações
- Colete informações de contato
- Registre interesse do lead`,
      confidence: 0.88,
      examples: [
        "Quero saber sobre planos",
        "Quanto custa o plano Pro?",
        "Preciso fazer upgrade"
      ]
    },
    {
      id: "financeiro",
      name: "Financeiro/Cobrança",
      icon: Calculator, 
      color: "bg-warning/10 text-warning border-warning/20",
      description: "Fatura, boleto, NF, meios de pagamento, vencimentos",
      keywords: ["boleto", "fatura", "pagamento", "vencimento", "nota fiscal"],
      active: true,
      prompt: `Você é um Especialista Financeiro para questões de cobrança via WhatsApp.

Sua função:
- Esclarecer sobre faturas e boletos
- Orientar meios de pagamento
- Resolver pendências financeiras
- Emitir segundas vias
- Negociar parcelamentos

Estilo de comunicação:
- Empático com inadimplência
- Claro sobre prazos e juros
- Sempre ofereça soluções
- Mantenha sigilo de dados financeiros

Cuidados especiais:
- Nunca exponha dados sensíveis
- Valide identidade antes de informações
- Registre acordos feitos
- Ofereça parcelamento quando possível`,
      confidence: 0.90,
      examples: [
        "Meu boleto venceu",
        "Como pagar minha fatura?",
        "Preciso da nota fiscal"
      ]
    }
  ];

  const currentProfile = profiles[selectedProfile];
  const Icon = currentProfile.icon;

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6">
      {/* Lista de Perfis */}
      <Card className="w-80 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Perfis Especialistas
          </CardTitle>
          <CardDescription>
            Configure os perfis de atendimento do chatbot
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-0">
          <div className="space-y-1">
            {profiles.map((profile, index) => {
              const ProfileIcon = profile.icon;
              return (
                <div
                  key={profile.id}
                  className={`p-4 cursor-pointer transition-colors border-b border-border hover:bg-accent/50 ${
                    selectedProfile === index ? "bg-primary/5 border-l-4 border-l-primary" : ""
                  }`}
                  onClick={() => setSelectedProfile(index)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${profile.color}`}>
                        <ProfileIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{profile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Confiança: {(profile.confidence * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={profile.active} />
                      <div className={`w-2 h-2 rounded-full ${profile.active ? "bg-success" : "bg-muted"}`} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {profile.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {profile.keywords.slice(0, 3).map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                    {profile.keywords.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{profile.keywords.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <div className="p-4 border-t border-border">
          <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/90" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Novo Perfil
          </Button>
        </div>
      </Card>

      {/* Configuração do Perfil */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${currentProfile.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">{currentProfile.name}</CardTitle>
                <CardDescription>{currentProfile.description}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Confiança: {(currentProfile.confidence * 100).toFixed(0)}%
              </Badge>
              <Switch checked={currentProfile.active} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto p-6 space-y-6">
          {/* Configurações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configurações Básicas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nome do Perfil</label>
                <Input value={currentProfile.name} />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Nível de Confiança</label>
                <Input type="number" min="0" max="1" step="0.01" value={currentProfile.confidence} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Descrição</label>
              <Input value={currentProfile.description} />
            </div>
          </div>

          {/* Palavras-chave */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Palavras-chave de Ativação</h3>
            <div className="flex flex-wrap gap-2">
              {currentProfile.keywords.map((keyword, i) => (
                <Badge key={i} variant="outline" className="text-sm">
                  {keyword}
                  <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
                </Badge>
              ))}
              <Button variant="outline" size="sm">
                <Plus className="h-3 w-3 mr-1" />
                Adicionar
              </Button>
            </div>
          </div>

          {/* Prompt do Sistema */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Prompt do Sistema</h3>
            <Textarea
              value={currentProfile.prompt}
              className="min-h-[300px] font-mono text-sm"
              placeholder="Configure o comportamento do perfil..."
            />
          </div>

          {/* Exemplos de Teste */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Exemplos de Teste</h3>
            <div className="space-y-2">
              {currentProfile.examples.map((example, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input value={example} />
                  <Button variant="outline" size="sm">Testar</Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-3 w-3 mr-1" />
                Adicionar Exemplo
              </Button>
            </div>
          </div>
        </CardContent>

        <div className="p-6 border-t border-border">
          <div className="flex gap-2">
            <Button className="flex-1 bg-gradient-primary hover:bg-gradient-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </Button>
            <Button variant="outline">
              Testar Perfil
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}