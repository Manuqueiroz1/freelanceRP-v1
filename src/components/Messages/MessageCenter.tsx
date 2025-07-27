import React, { useState, useEffect } from 'react';
import { Send, Search, User, MessageSquare, ArrowLeft, Phone, Video } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MessageCenter: React.FC = () => {
  const { messages, addMessage, markMessageAsRead, currentUser, companies, freelancers } = useApp();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleSelectConversation = (event: any) => {
      const partnerId = event.detail;
      if (partnerId) {
        setSelectedConversation(partnerId);
      }
    };

    window.addEventListener('selectConversation', handleSelectConversation);
    return () => window.removeEventListener('selectConversation', handleSelectConversation);
  }, []);

  if (!currentUser) return null;

  // Get all conversations for current user
  const userMessages = messages.filter(m => 
    m.fromId === currentUser.id || m.toId === currentUser.id
  );

  // Group messages by conversation partner
  const conversations = userMessages.reduce((acc, message) => {
    const partnerId = message.fromId === currentUser.id ? message.toId : message.fromId;
    if (!acc[partnerId]) {
      acc[partnerId] = [];
    }
    acc[partnerId].push(message);
    return acc;
  }, {} as Record<string, typeof messages>);

  // Get partner info
  const getPartnerInfo = (partnerId: string) => {
    const company = companies.find(c => c.id === partnerId);
    if (company) return company;
    
    const freelancer = freelancers.find(f => f.id === partnerId);
    return freelancer;
  };

  // Get conversation messages
  const getConversationMessages = (partnerId: string) => {
    return conversations[partnerId]?.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    ) || [];
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const partner = getPartnerInfo(selectedConversation);
    if (!partner) return;

    addMessage({
      fromId: currentUser.id,
      toId: selectedConversation,
      fromName: currentUser.name,
      toName: partner.name,
      content: newMessage.trim(),
      read: false
    });

    setNewMessage('');
  };

  const handleSelectConversation = (partnerId: string) => {
    setSelectedConversation(partnerId);
    // Mark messages as read
    const conversationMessages = conversations[partnerId] || [];
    conversationMessages.forEach(msg => {
      if (msg.toId === currentUser.id && !msg.read) {
        markMessageAsRead(msg.id);
      }
    });
  };

  const handleBackToConversations = () => {
    setSelectedConversation(null);
  };

  const filteredConversations = Object.keys(conversations).filter(partnerId => {
    const partner = getPartnerInfo(partnerId);
    return partner?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectedPartner = selectedConversation ? getPartnerInfo(selectedConversation) : null;

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* MOBILE LAYOUT */}
      <div className="flex flex-col h-full md:hidden">
        {!selectedConversation ? (
          // Lista de Conversas - Mobile
          <>
            {/* Header Mobile */}
            <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Mensagens</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar conversas..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
              </div>
            </div>

            {/* Lista de Conversas */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma conversa</h3>
                  <p className="text-gray-600">Suas conversas aparecerão aqui</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredConversations.map(partnerId => {
                    const partner = getPartnerInfo(partnerId);
                    const lastMessage = conversations[partnerId]?.slice(-1)[0];
                    const unreadCount = conversations[partnerId]?.filter(m => 
                      m.toId === currentUser.id && !m.read
                    ).length || 0;

                    if (!partner || !lastMessage) return null;

                    return (
                      <div
                        key={partnerId}
                        onClick={() => handleSelectConversation(partnerId)}
                        className="p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            {partner.avatar || partner.logo || partner.profileImage ? (
                              <img 
                                src={partner.avatar || partner.logo || partner.profileImage} 
                                alt={partner.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-base font-semibold text-gray-900 truncate pr-2">
                                {partner.name}
                              </h4>
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                {unreadCount > 0 && (
                                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                    {unreadCount}
                                  </span>
                                )}
                                <span className="text-xs text-gray-400">
                                  {lastMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 truncate mb-1">
                              {lastMessage.content}
                            </p>
                            <p className="text-xs text-gray-400">
                              {partner.type === 'company' ? 'Empresa' : 'Freelancer'} • {lastMessage.timestamp.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          // Chat Individual - Mobile
          <>
            {/* Header do Chat */}
            <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleBackToConversations}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  {selectedPartner?.avatar || selectedPartner?.logo || selectedPartner?.profileImage ? (
                    <img 
                      src={selectedPartner?.avatar || selectedPartner?.logo || selectedPartner?.profileImage} 
                      alt={selectedPartner?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {selectedPartner?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedPartner?.type === 'company' ? 'Empresa' : 'Freelancer'}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Área de Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {getConversationMessages(selectedConversation!).map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.fromId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-end space-x-2 max-w-[80%]">
                    {message.fromId !== currentUser.id && (
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        {selectedPartner?.avatar || selectedPartner?.logo || selectedPartner?.profileImage ? (
                          <img 
                            src={selectedPartner?.avatar || selectedPartner?.logo || selectedPartner?.profileImage} 
                            alt={selectedPartner?.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-3 h-3 text-white" />
                        )}
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm ${
                        message.fromId === currentUser.id
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed break-words">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.fromId === currentUser.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.fromId === currentUser.id && (
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        {currentUser.avatar ? (
                          <img 
                            src={currentUser.avatar} 
                            alt={currentUser.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-3 h-3 text-white" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input de Mensagem */}
            <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-3 items-end">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex h-full">
        {/* Lista de Conversas - Desktop */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="flex-shrink-0 p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mensagens</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar conversas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma conversa</h3>
                <p className="text-gray-600">Suas conversas aparecerão aqui</p>
              </div>
            ) : (
              filteredConversations.map(partnerId => {
                const partner = getPartnerInfo(partnerId);
                const lastMessage = conversations[partnerId]?.slice(-1)[0];
                const unreadCount = conversations[partnerId]?.filter(m => 
                  m.toId === currentUser.id && !m.read
                ).length || 0;

                if (!partner || !lastMessage) return null;

                return (
                  <div
                    key={partnerId}
                    onClick={() => handleSelectConversation(partnerId)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === partnerId ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        {partner.avatar || partner.logo || partner.profileImage ? (
                          <img 
                            src={partner.avatar || partner.logo || partner.profileImage} 
                            alt={partner.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-base font-medium text-gray-900 truncate">
                            {partner.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            {unreadCount > 0 && (
                              <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {unreadCount}
                              </span>
                            )}
                            <span className="text-xs text-gray-400">
                              {lastMessage.timestamp.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 truncate">
                            {lastMessage.content}
                          </p>
                          <span className="text-xs text-gray-400 ml-2">
                            {lastMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          {partner.type === 'company' ? 'Empresa' : 'Freelancer'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Área de Chat - Desktop */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Header do Chat */}
              <div className="flex-shrink-0 p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    {getPartnerInfo(selectedConversation)?.avatar || 
                     getPartnerInfo(selectedConversation)?.logo || 
                     getPartnerInfo(selectedConversation)?.profileImage ? (
                      <img 
                        src={getPartnerInfo(selectedConversation)?.avatar || 
                             getPartnerInfo(selectedConversation)?.logo || 
                             getPartnerInfo(selectedConversation)?.profileImage} 
                        alt={getPartnerInfo(selectedConversation)?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-900">
                      {getPartnerInfo(selectedConversation)?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {getPartnerInfo(selectedConversation)?.type === 'company' ? 'Empresa' : 'Freelancer'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {getConversationMessages(selectedConversation).map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.fromId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                      {message.fromId !== currentUser.id && (
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                          {getPartnerInfo(selectedConversation)?.avatar || 
                           getPartnerInfo(selectedConversation)?.logo || 
                           getPartnerInfo(selectedConversation)?.profileImage ? (
                            <img 
                              src={getPartnerInfo(selectedConversation)?.avatar || 
                                   getPartnerInfo(selectedConversation)?.logo || 
                                   getPartnerInfo(selectedConversation)?.profileImage} 
                              alt={getPartnerInfo(selectedConversation)?.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-3 h-3 text-white" />
                          )}
                        </div>
                      )}
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.fromId === currentUser.id
                            ? 'bg-blue-600 text-white rounded-br-sm'
                            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.fromId === currentUser.id ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.fromId === currentUser.id && (
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                          {currentUser.avatar ? (
                            <img 
                              src={currentUser.avatar} 
                              alt={currentUser.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-3 h-3 text-white" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input de Mensagem */}
              <div className="flex-shrink-0 p-4 border-t border-gray-200">
                <div className="flex space-x-2 items-end">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecione uma conversa
                </h3>
                <p className="text-gray-600">
                  Escolha uma conversa para começar a trocar mensagens
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};