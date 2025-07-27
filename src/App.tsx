import React, { useState } from 'react';
import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { UserTypeSelector } from './components/Auth/UserTypeSelector';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { CompanyDashboard } from './components/Company/Dashboard';
import { PostJob } from './components/Company/PostJob';
import { MyJobs } from './components/Company/MyJobs';
import { Applications } from './components/Company/Applications';
import { FindFreelancers } from './components/Company/FindFreelancers';
import { CompanySettings } from './components/Company/Settings';
import { FreelancerDashboard } from './components/Freelancer/Dashboard';
import { FindJobs } from './components/Freelancer/FindJobs';
import { MyApplications } from './components/Freelancer/MyApplications';
import { ActiveProjects } from './components/Freelancer/ActiveProjects';
import { FreelancerProfile } from './components/Freelancer/Profile';
import { FreelancerReviews } from './components/Freelancer/Reviews';
import { FreelancerSettings } from './components/Freelancer/Settings';
import { MessageCenter } from './components/Messages/MessageCenter';
import { NotificationCenter } from './components/Notifications/NotificationCenter';
import { MessageDropdown } from './components/Messages/MessageDropdown';
import { UserType } from './types';

const AppContent: React.FC = () => {
  const { setCurrentUser } = useApp();
  const [userType, setUserType] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessageDropdown, setShowMessageDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('openMessageCenter', handleOpenMessageCenter);
    return () => window.removeEventListener('openMessageCenter', handleOpenMessageCenter);
  }, []);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    // Set mock current user based on type
    if (type === 'company') {
      setCurrentUser({
        id: '1',
        name: 'Tech Solutions Ribeirão',
        email: 'joao@techsolutions.com',
        type: 'company',
        avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        location: 'Ribeirão Preto, SP',
        createdAt: new Date()
      });
    } else {
      setCurrentUser({
        id: '2',
        name: 'Maria Santos',
        email: 'maria@email.com',
        type: 'freelancer',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        location: 'Ribeirão Preto, SP',
        createdAt: new Date()
      });
    }
  };

  const renderContent = () => {
    if (userType === 'company') {
      switch (activeTab) {
        case 'dashboard':
          return <CompanyDashboard />;
        case 'post-job':
          return <PostJob />;
        case 'applications':
          return <Applications />;
        case 'my-jobs':
          return <MyJobs />;
        case 'find-freelancers':
          return <FindFreelancers />;
        case 'messages':
          return <MessageCenter />;
        case 'settings':
          return <CompanySettings />;
        default:
          return <CompanyDashboard />;
      }
    } else if (userType === 'freelancer') {
      switch (activeTab) {
        case 'dashboard':
          return <FreelancerDashboard />;
        case 'find-jobs':
          return <FindJobs />;
        case 'my-applications':
          return <MyApplications />;
        case 'active-projects':
          return <ActiveProjects />;
        case 'profile':
          return <FreelancerProfile onEditProfile={() => setActiveTab('settings')} />;
        case 'reviews':
          return <FreelancerReviews />;
        case 'settings':
          return <FreelancerSettings />;
        default:
          return <FreelancerDashboard />;
      }
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowMessageDropdown(false);
  };

  const handleMessageClick = () => {
    setShowMessageDropdown(!showMessageDropdown);
    setShowNotifications(false);
  };

  const handleOpenMessageCenter = () => {
    setActiveTab('messages');
    setShowMessageDropdown(false);
    setShowNotifications(false);
    setIsMobileMenuOpen(false);
  };

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowNotifications(false);
    setShowMessageDropdown(false);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle messages tab
  if (activeTab === 'messages') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          userType={userType!} 
          onNotificationClick={handleNotificationClick}
          onMessageClick={handleMessageClick}
          onMenuClick={handleMenuClick}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <div className="flex">
          <Sidebar 
            userType={userType!} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuClose={handleMobileMenuClose}
          />
          <main className="flex-1 p-4 md:p-8">
            <MessageCenter />
          </main>
        </div>
      </div>
    );
  }

  if (!userType) {
    return <UserTypeSelector onSelectUserType={handleUserTypeSelect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
      <Header 
        userType={userType} 
        onNotificationClick={handleNotificationClick}
        onMessageClick={handleMessageClick}
        onMenuClick={handleMenuClick}
        isMobileMenuOpen={isMobileMenuOpen}
      />
        
        {/* Notification Dropdown */}
        {showNotifications && (
          <div className="absolute top-16 right-4 md:right-6 z-50">
            <NotificationCenter />
          </div>
        )}
        
        {/* Message Dropdown */}
        {showMessageDropdown && (
          <div className="absolute top-16 right-16 md:right-20 z-50">
            <MessageDropdown onClose={() => setShowMessageDropdown(false)} />
          </div>
        )}
      </div>
      
      <div className="flex">
        <Sidebar 
          userType={userType} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={handleMobileMenuClose}
        />
        <main className="flex-1 p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;