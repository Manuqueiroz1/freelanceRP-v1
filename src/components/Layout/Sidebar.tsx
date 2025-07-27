import React from 'react';
import { 
  Home, 
  Briefcase, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings,
  Plus,
  Search,
  Star
} from 'lucide-react';

interface SidebarProps {
  userType: 'company' | 'freelancer';
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  userType, 
  activeTab, 
  onTabChange, 
  isMobileMenuOpen, 
  onMobileMenuClose 
}) => {
  const companyItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'post-job', label: 'Publicar Vaga', icon: Plus },
    { id: 'my-jobs', label: 'Minhas Vagas', icon: Briefcase },
    { id: 'applications', label: 'Candidaturas', icon: FileText },
    { id: 'find-freelancers', label: 'Buscar Freelancers', icon: Search },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const freelancerItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'find-jobs', label: 'Buscar Projetos', icon: Search },
    { id: 'my-applications', label: 'Minhas Candidaturas', icon: FileText },
    { id: 'active-projects', label: 'Projetos Ativos', icon: Briefcase },
    { id: 'profile', label: 'Meu Perfil', icon: Users },
    { id: 'reviews', label: 'Avaliações', icon: Star },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const items = userType === 'company' ? companyItems : freelancerItems;

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    onMobileMenuClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onMobileMenuClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        bg-white border-r border-gray-200 p-6 transition-transform duration-300 ease-in-out z-50
        md:relative md:translate-x-0 md:w-64 md:min-h-screen
        fixed top-0 left-0 h-full w-80 max-w-[80vw]
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Header */}
        <div className="md:hidden mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
        </div>
        
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
    </>
  );
};