export interface Profile {
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  bio: string;
  location: string;
  resumeUrl: string;
  email: string;
}

export interface Social {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Experience {
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  details: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  featured: boolean;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface PortfolioData {
  theme: string;
  profile: Profile;
  roles: string[];
  socials: Social[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
  quotes: string[];
}
