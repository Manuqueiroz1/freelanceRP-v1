import React from 'react';
import { User, MapPin, DollarSign, Star, Calendar, Github, Linkedin, Globe, Mail, Phone, Edit } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FreelancerProfileProps {
  onEditProfile?: () => void;
}

export const FreelancerProfile: React.FC<FreelancerProfileProps> = ({ onEditProfile }) => {
  const { currentUser, freelancers, reviews } = useApp();

  if (!currentUser || currentUser.type !== 'freelancer') {
    return <div>Acesso negado</div>;
  }

  const freelancer = freelancers.find(f => f.id === currentUser.id);
  if (!freelancer) return <div>Perfil não encontrado</div>;

  const freelancerReviews = reviews.filter(r => r.toId === currentUser.id);
  const averageRating = freelancerReviews.length > 0 
    ? freelancerReviews.reduce((sum, r) => sum + r.rating, 0) / freelancerReviews.length 
    : 0;

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'busy': return 'bg-yellow-100 text-yellow-700';
      case 'unavailable': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'available': return 'Disponível';
      case 'busy': return 'Ocupado';
      case 'unavailable': return 'Indisponível';
      default: return availability;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h2>
            <p className="text-gray-600">Visualize como seu perfil aparece para as empresas</p>
          </div>
          <button
            onClick={onEditProfile}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span className="hidden sm:inline">Editar Perfil</span>
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-start space-x-6">
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg flex-shrink-0">
            {freelancer.profileImage ? (
              <img 
                src={freelancer.profileImage} 
                alt={freelancer.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-8 h-8 md:w-16 md:h-16 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-3">
              <h1 className="text-xl md:text-3xl font-bold text-gray-900">{freelancer.name}</h1>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getAvailabilityColor(freelancer.availability)}`}>
                {getAvailabilityLabel(freelancer.availability)}
              </span>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 mb-3">{freelancer.title}</p>
            
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{freelancer.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>R$ {freelancer.hourlyRate}/hora</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{freelancer.experience} anos de experiência</span>
              </div>
              {averageRating > 0 && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{averageRating.toFixed(1)} ({freelancerReviews.length} avaliações)</span>
                </div>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{freelancer.bio}</p>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-2 mb-4">
              {freelancer.email && (
                <a
                  href={`mailto:${freelancer.email}`}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              )}
              {freelancer.phone && (
                <a
                  href={`tel:${freelancer.phone}`}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Telefone</span>
                </a>
              )}
              {freelancer.linkedin && (
                <a
                  href={freelancer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {freelancer.github && (
                <a
                  href={freelancer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
            </div>

            {/* Edit Button Mobile */}
            <div className="sm:hidden">
              <button
                onClick={onEditProfile}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Editar Perfil</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Habilidades Técnicas</h3>
          <div className="flex flex-wrap gap-2">
            {freelancer.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Portfólio</h3>
          {freelancer.portfolio.length === 0 ? (
            <p className="text-gray-600">Nenhum projeto no portfólio ainda.</p>
          ) : (
            <div className="space-y-4">
              {freelancer.portfolio.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Ver Projeto</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      {freelancerReviews.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Avaliações ({freelancerReviews.length})
          </h3>
          <div className="space-y-4">
            {freelancerReviews.slice(0, 5).map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    por {review.fromName} • {review.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};