import React from 'react';
import { Clock, DollarSign, User, MessageSquare, CheckCircle, XCircle, Star } from 'lucide-react';
import { mockApplications } from '../../data/mockData';

export const Applications: React.FC = () => {
  const handleAccept = (applicationId: string) => {
    console.log('Accept application:', applicationId);
  };

  const handleReject = (applicationId: string) => {
    console.log('Reject application:', applicationId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Candidaturas</h2>
        <p className="text-gray-600">Gerencie as candidaturas recebidas para suas vagas</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Candidaturas Pendentes</h3>
            <div className="flex space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{mockApplications.length}</span> candidaturas pendentes
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {mockApplications.map((application) => (
            <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
              {/* Mobile Layout */}
              <div className="md:hidden">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-lg font-semibold text-gray-900 truncate">
                          {application.freelancerName}
                        </h4>
                        <div className="flex items-center space-x-1 ml-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">4.9</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{application.appliedAt.toLocaleDateString()}</span>
                        <span className="font-medium text-gray-900">R$ {application.proposedRate.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-gray-600 text-sm leading-relaxed">{application.message}</p>

                  {/* Compatibility */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Compatibilidade</span>
                      <span className="text-sm font-medium text-green-600">{application.skillsMatch}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-green-500 rounded-full transition-all" 
                        style={{ width: `${application.skillsMatch}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReject(application.id)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Recusar</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200">
                        <MessageSquare className="w-4 h-4" />
                        <span>Conversar</span>
                      </button>
                    </div>
                    <button
                      onClick={() => handleAccept(application.id)}
                      className="w-full flex items-center justify-center space-x-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Aceitar Candidatura</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {application.freelancerName}
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.9</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3 max-w-2xl">{application.message}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{application.appliedAt.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>R$ {application.proposedRate.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-600">Compatibilidade:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${application.skillsMatch}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-green-600">
                          {application.skillsMatch}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReject(application.id)}
                        className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Recusar</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>Conversar</span>
                      </button>
                      
                      <button
                        onClick={() => handleAccept(application.id)}
                        className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Aceitar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {mockApplications.length === 0 && (
          <div className="p-12 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma candidatura ainda</h3>
            <p className="text-gray-600">
              Assim que freelancers se candidatarem às suas vagas, elas aparecerão aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};