import { BarChart3, Bot, LogOut, MessageSquare, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "chat", label: "Chat Interface", icon: MessageSquare },
    { id: "perfis", label: "Perfis Especialistas", icon: Users },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ];

  const handleLogout = () => {
    signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-full flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground">RAG Bot</h2>
            <p className="text-xs text-sidebar-foreground/60">WhatsApp Assistant</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11 transition-all duration-200",
                activeTab === item.id
                  ? "bg-gradient-primary text-white shadow-glow hover:bg-gradient-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-3 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-accent-foreground">Sistema Online</p>
              <p className="text-xs text-sidebar-accent-foreground/60">Última sinc: agora</p>
            </div>
          </div>
          {user && (
            <div className="rounded-md bg-sidebar bg-opacity-60 p-3 border border-sidebar-border/40">
              <p className="text-xs text-sidebar-foreground/60 uppercase tracking-wide">Usuário autenticado</p>
              <p className="text-sm font-semibold text-sidebar-foreground mt-1 truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user.email}</p>
            </div>
          )}
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="w-full bg-transparent text-sidebar-accent-foreground hover:bg-sidebar hover:text-sidebar-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair do sistema
          </Button>
        </div>
      </div>
    </div>
  );
}