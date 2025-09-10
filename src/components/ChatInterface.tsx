import { useState } from "react";
import { Send, Phone, User, Bot, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function ChatInterface() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: 1,
      user: "+55 11 9999-1234",
      name: "Ana Silva",
      lastMessage: "Como funciona o plano anual?",
      time: "2 min",
      status: "active",
      profile: "Comercial",
      unread: 2,
    },
    {
      id: 2,
      user: "+55 11 8888-5678", 
      name: "Carlos Santos",
      lastMessage: "Erro 401 na integração webhook",
      time: "5 min",
      status: "waiting", 
      profile: "Técnico",
      unread: 0,
    },
    {
      id: 3,
      user: "+55 11 7777-9012",
      name: "Maria Costa",
      lastMessage: "Meu boleto venceu ontem",
      time: "8 min",
      status: "resolved",
      profile: "Financeiro", 
      unread: 0,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "user",
      text: "Oi, gostaria de saber sobre os planos anuais",
      time: "14:30",
    },
    {
      id: 2,
      sender: "bot",
      text: "Olá! Fico feliz em ajudar com informações sobre nossos planos anuais. 😊\n\nTemos 3 opções principais:\n• Plano Básico: R$ 299/ano\n• Plano Pro: R$ 599/ano  \n• Plano Enterprise: R$ 1.299/ano\n\nQual deles desperta seu interesse?",
      time: "14:30",
      profile: "Comercial",
      sources: ["Base interna › Planos & Preços"],
    },
    {
      id: 3,
      sender: "user", 
      text: "O que inclui no plano Pro?",
      time: "14:32",
    },
    {
      id: 4,
      sender: "bot",
      text: "Excelente escolha! O Plano Pro inclui:\n\n• Até 10.000 mensagens/mês\n• Integração com CRM\n• Relatórios avançados\n• Suporte prioritário 24/7\n• Backup automático\n• API completa\n\nTambém oferecemos 20% de desconto no primeiro ano! 🎉\n\nGostaria de uma demonstração?",
      time: "14:32",
      profile: "Comercial",
      sources: ["Base interna › Plano Pro", "FAQ Site › Demonstrações"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-primary";
      case "waiting": return "bg-warning";
      case "resolved": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getProfileColor = (profile: string) => {
    switch (profile) {
      case "Comercial": return "bg-info/10 text-info border-info/20";
      case "Técnico": return "bg-secondary/10 text-secondary border-secondary/20";
      case "Financeiro": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6">
      {/* Lista de Conversas */}
      <Card className="w-80 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Conversas Ativas
          </CardTitle>
          <CardDescription>
            {chats.filter(c => c.status === "active").length} conversas em andamento
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-0">
          <div className="space-y-1">
            {chats.map((chat, index) => (
              <div
                key={chat.id}
                className={`p-4 cursor-pointer transition-colors border-b border-border hover:bg-accent/50 ${
                  selectedChat === index ? "bg-primary/5 border-l-4 border-l-primary" : ""
                }`}
                onClick={() => setSelectedChat(index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{chat.name}</p>
                      <p className="text-xs text-muted-foreground">{chat.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">{chat.unread}</span>
                      </div>
                    )}
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(chat.status)}`} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate flex-1 mr-2">
                    {chat.lastMessage}
                  </p>
                  <div className="text-right">
                    <Badge variant="outline" className={`text-xs mb-1 ${getProfileColor(chat.profile)}`}>
                      {chat.profile}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{chat.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interface de Chat */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{chats[selectedChat]?.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  {chats[selectedChat]?.user}
                  <Badge variant="outline" className={getProfileColor(chats[selectedChat]?.profile)}>
                    {chats[selectedChat]?.profile}
                  </Badge>
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(chats[selectedChat]?.status)}`} />
                {chats[selectedChat]?.status === "active" ? "Ativo" : 
                 chats[selectedChat]?.status === "waiting" ? "Aguardando" : "Resolvido"}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[70%] ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  {msg.sources && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="text-xs opacity-70 mb-1">Fontes:</p>
                      {msg.sources.map((source, i) => (
                        <p key={i} className="text-xs opacity-70">• {source}</p>
                      ))}
                    </div>
                  )}
                </div>
                <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}>
                  {msg.sender === "bot" && (
                    <>
                      <Bot className="h-3 w-3" />
                      <span>{msg.profile}</span>
                      <span>•</span>
                    </>
                  )}
                  <Clock className="h-3 w-3" />
                  <span>{msg.time}</span>
                  {msg.sender === "user" && <CheckCircle className="h-3 w-3 text-success" />}
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Digite uma mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && setMessage("")}
              className="flex-1"
            />
            <Button 
              size="icon" 
              className="bg-gradient-primary hover:bg-gradient-primary/90"
              onClick={() => setMessage("")}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}