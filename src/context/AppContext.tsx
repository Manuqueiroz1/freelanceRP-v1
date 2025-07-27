import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Job, Application, User, Company, Freelancer, Message, Notification, Project, Review } from '../types';
import { 
  mockJobs, 
  mockApplications, 
  mockCompanies, 
  mockFreelancers,
  mockMessages,
  mockNotifications,
  mockProjects,
  mockReviews
} from '../data/mockData';

interface AppContextType {
  // Jobs
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'applicationsCount'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  
  // Applications
  applications: Application[];
  addApplication: (application: Omit<Application, 'id' | 'appliedAt'>) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  
  // Users
  companies: Company[];
  freelancers: Freelancer[];
  updateCompany: (id: string, updates: Partial<Company>) => void;
  updateFreelancer: (id: string, updates: Partial<Freelancer>) => void;
  
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Messages
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  markMessageAsRead: (messageId: string) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  
  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'timestamp'>) => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [freelancers, setFreelancers] = useState<Freelancer[]>(mockFreelancers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'applicationsCount'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      createdAt: new Date(),
      applicationsCount: 0
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...updates } : job
    ));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    setApplications(prev => prev.filter(app => app.jobId !== id));
  };

  const addApplication = (appData: Omit<Application, 'id' | 'appliedAt'>) => {
    const newApplication: Application = {
      ...appData,
      id: Date.now().toString(),
      appliedAt: new Date()
    };
    setApplications(prev => [newApplication, ...prev]);
    
    // Update job applications count
    setJobs(prev => prev.map(job => 
      job.id === appData.jobId 
        ? { ...job, applicationsCount: job.applicationsCount + 1 }
        : job
    ));
  };

  const updateApplication = (id: string, updates: Partial<Application>) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, ...updates } : app
    ));
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies(prev => prev.map(company => 
      company.id === id ? { ...company, ...updates } : company
    ));
  };

  const updateFreelancer = (id: string, updates: Partial<Freelancer>) => {
    setFreelancers(prev => prev.map(freelancer => 
      freelancer.id === id ? { ...freelancer, ...updates } : freelancer
    ));
  };

  const addMessage = (messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
    
    // Add notification for recipient
    addNotification({
      userId: messageData.toId,
      type: 'message',
      title: 'Nova mensagem',
      message: `${messageData.fromName} enviou uma mensagem`,
      read: false
    });
  };

  const markMessageAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString()
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'timestamp'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setReviews(prev => [newReview, ...prev]);
  };
  return (
    <AppContext.Provider value={{
      jobs,
      addJob,
      updateJob,
      deleteJob,
      applications,
      addApplication,
      updateApplication,
      companies,
      freelancers,
      updateCompany,
      updateFreelancer,
      currentUser,
      setCurrentUser,
      messages,
      addMessage,
      markMessageAsRead,
      notifications,
      addNotification,
      markNotificationAsRead,
      projects,
      addProject,
      updateProject,
      reviews,
      addReview
    }}>
      {children}
    </AppContext.Provider>
  );
};