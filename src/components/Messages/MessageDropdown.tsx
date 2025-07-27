import React from 'react';
import { MessageSquare, User, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MessageDropdownProps {
  onClose: () => void;
}

export const MessageDropdown: React.FC<MessageDropdownProps> = ({ onClose }) => {
  const { messages, currentUser, companies, freelancers } = useApp();

  if (!currentUser) return null;

  // Get recent messages for current user
  const userMessages = messages.filter(m => 
    m.fromId === currentUser.id || m.toId === currentUser.id
  );

  // Group by conversation partner and get latest message
  const conversations = userMessages.reduce((acc, message) => {
    const partnerId = message.fromId === currentUser.id ? message.toId : message.fromId;
    if (!acc[partnerId] || new Date(message.timestamp) > new Date(acc[partnerId].timestamp)) {
      acc[partnerId] = message;
    }
    return acc;
  }, {} as Record<string, typeof messages[0]>);

  const recentConversations = Object.values(conversations)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const unreadMessages = messages.filter(m => 
    m.toId === currentUser.id && !m.read
  );

  const getPartnerInfo = (partnerId: string) => {
    const allUsers = [...companies, ...freelancers];
    return allUsers.find(u => u.id === partnerId);
  };

  const getPartnerAvatar = (partner: any) => {
    return partner?.avatar || partner?.logo || partner?.profileImage;
  };

  return (
    <div className="w-80 max-w-[90vw] bg-white rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Mensagens</h3>
          <button 
            onClick={() => {
              window.dispatchEvent(new CustomEvent('openMessageCenter'));
              onClose();
            }}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Ver todas
          </button>
        </div>
        {unreadMessages.length > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            {unreadMessages.length} não lida{unreadMessages.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="overflow-y-auto max-h-80">
        {recentConversations.length === 0 ? (
          <div className="p-6 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma mensagem
            </h4>
            <p className="text-gray-600">
              Suas conversas aparecerão aqui
            </p>
          </div>
        ) : (
          recentConversations.map(message => {
            const partnerId = message.fromId === currentUser.id ? message.toId : message.fromId;
            const partner = getPartnerInfo(partnerId);
            const isUnread = message.toId === currentUser.id && !message.read;
            
            if (!partner) return null;

            return (
              <div
                key={message.id}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('openMessageCenter'));
                  window.dispatchEvent(new CustomEvent('selectConversation', { detail: partnerId }));
                  onClose();
                }}
                className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                  isUnread ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    {getPartnerAvatar(partner) ? (
                      <img 
                        src={getPartnerAvatar(partner)} 
                        alt={partner.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium truncate ${
                        isUnread ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {partner.name}
                      </p>
                      {isUnread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 truncate mt-1">
                      {message.content}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleDateString()} às {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <button 
          onClick={() => {
            window.dispatchEvent(new CustomEvent('openMessageCenter'));
            onClose();
          }}
          className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Abrir Central de Mensagens
        </button>
      </div>
    </div>
  );
};