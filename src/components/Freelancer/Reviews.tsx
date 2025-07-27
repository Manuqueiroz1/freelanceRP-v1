import React from 'react';
import { Star, User, Calendar, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FreelancerReviews: React.FC = () => {
  const { reviews, currentUser, companies } = useApp();

  if (!currentUser || currentUser.type !== 'freelancer') {
    return <div>Acesso negado</div>;
  }

  const freelancerReviews = reviews.filter(r => r.toId === currentUser.id);
  const averageRating = freelancerReviews.length > 0 
    ? freelancerReviews.reduce((sum, r) => sum + r.rating, 0) / freelancerReviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: freelancerReviews.filter(r => r.rating === rating).length,
    percentage: freelancerReviews.length > 0 
      ? (freelancerReviews.filter(r => r.rating === rating).length / freelancerReviews.length) * 100 
      : 0
  }));

  const getCompanyName = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    return company?.name || 'Empresa';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Avaliações</h2>
        <p className="text-gray-600">Veja o feedback dos seus clientes</p>
      </div>

      {/* Rating Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              {averageRating > 0 ? averageRating.toFixed(1) : '0.0'}
            </div>
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 lg:w-6 lg:h-6 ${
                    i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm lg:text-base text-gray-600">
              {freelancerReviews.length} avaliação{freelancerReviews.length !== 1 ? 'ões' : ''}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-8 lg:w-12">
                  <span className="text-sm text-gray-600">{rating}</span>
                  <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-6 lg:w-8">{count}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Taxa de Satisfação</p>
                <p className="text-base lg:text-lg font-semibold text-gray-900">
                  {freelancerReviews.length > 0 
                    ? Math.round((freelancerReviews.filter(r => r.rating >= 4).length / freelancerReviews.length) * 100)
                    : 0}%
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Última Avaliação</p>
                <p className="text-base lg:text-lg font-semibold text-gray-900">
                  {freelancerReviews.length > 0 
                    ? freelancerReviews[freelancerReviews.length - 1].timestamp.toLocaleDateString()
                    : 'Nenhuma'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Todas as Avaliações</h3>
        </div>

        {freelancerReviews.length === 0 ? (
          <div className="p-12 text-center">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma avaliação ainda</h3>
            <p className="text-gray-600">
              Complete seus primeiros projetos para receber avaliações dos clientes.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {freelancerReviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.fromName}</h4>
                        <p className="text-sm text-gray-600">
                          {review.timestamp.toLocaleDateString()} às {review.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};