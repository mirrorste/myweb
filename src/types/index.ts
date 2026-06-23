export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  content: string;
}

export interface Profile {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  social: {
    github: string;
    twitter: string;
    email: string;
    linkedin: string;
  };
  skills: Skill[];
  experiences: Experience[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
