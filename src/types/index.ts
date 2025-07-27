export interface User {
  id: string;
  name: string;
  email: string;
  type: 'company' | 'freelancer';
  avatar?: string;
  location: string;
  createdAt: Date;
}

export interface Company extends User {
  type: 'company';
  companyName: string;
  cnpj: string;
  description: string;
  website?: string;
  employees: number;
  logo?: string;
  brandColor?: string;
  secondaryColor?: string;
  benefits?: string[];
}

export interface Freelancer extends User {
  type: 'freelancer';
  title: string;
  bio: string;
  skills: string[];
  hourlyRate: number;
  experience: number;
  portfolio: Portfolio[];
  availability: 'available' | 'busy' | 'unavailable';
  profileImage?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  projectUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  companyId: string;
  companyName: string;
  location: string;
  workType: 'remote' | 'onsite' | 'hybrid';
  budget: number;
  budgetType: 'fixed' | 'hourly';
  requiredSkills: string[];
  deadline: Date;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  benefits?: string[];
  applicationsCount: number;
  createdAt: Date;
}

export interface Application {
  id: string;
  jobId: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar?: string;
  message: string;
  proposedRate: number;
  skillsMatch: number;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: Date;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  fromName: string;
  toName: string;
  content: string;
  timestamp: Date;
  read: boolean;
  jobId?: string;
  jobTitle?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'application' | 'message' | 'job_update' | 'project_update';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
}

export interface Project {
  id: string;
  jobId: string;
  freelancerId: string;
  companyId: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  startDate: Date;
  deadline: Date;
  budget: number;
  progress: number;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
}

export interface Review {
  id: string;
  projectId: string;
  fromId: string;
  toId: string;
  fromName: string;
  rating: number;
  comment: string;
  timestamp: Date;
}

export type UserType = 'company' | 'freelancer';