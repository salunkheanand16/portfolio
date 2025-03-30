
import { useState, useEffect, useRef } from 'react';
import ProjectCard, { Project } from './ProjectCard';

const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A modern e-commerce admin dashboard with advanced analytics and inventory management",
    detailedDescription: "Built with React and TailwindCSS, this dashboard features comprehensive analytics, user management, and inventory tracking. It includes dark mode, responsive design, and performant data handling with React Query.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80",
    tags: ["React", "TailwindCSS", "TypeScript", "React Query"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 2,
    title: "Personal Finance Tracker",
    description: "A finance management application with budget planning and expense tracking",
    detailedDescription: "This application helps users track expenses, plan budgets, and visualize spending patterns. Features include categorization, notifications, and interactive charts created with Recharts.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    tags: ["Vue.js", "SCSS", "Firebase", "Recharts"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 3,
    title: "Travel Planning Platform",
    description: "A collaborative platform for planning trips with friends and family",
    detailedDescription: "This platform enables collaborative trip planning with shared itineraries, expense splitting, and destination recommendation based on preferences and budget.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    tags: ["Next.js", "TailwindCSS", "MongoDB", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "An AI-powered application that helps create marketing content and social media posts",
    detailedDescription: "Leveraging OpenAI's GPT, this tool generates high-quality content for marketing campaigns, social media posts, and emails based on user input and preferences.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    tags: ["React", "Node.js", "OpenAI API", "Express"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 5,
    title: "Fitness Tracking App",
    description: "A mobile-first application for tracking workouts and nutrition",
    detailedDescription: "This fitness app helps users track workouts, nutrition, and progress over time. Features include custom workout plans, meal tracking, and achievement badges to motivate users.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3538&q=80",
    tags: ["React Native", "Redux", "Firebase", "Expo"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 6,
    title: "Real-time Collaboration Tool",
    description: "A tool for teams to collaborate on documents and projects in real-time",
    detailedDescription: "This real-time collaboration platform features document editing, task management, and team communication channels. It uses WebSockets for instant updates and supports rich text formatting.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    tags: ["React", "Socket.io", "MongoDB", "Express"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  }
];

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Simulating a loading effect for the projects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          // Load projects one by one with a delay for animation effect
          projectsData.forEach((project, index) => {
            setTimeout(() => {
              setVisibleProjects(prev => {
                if (prev.some(p => p.id === project.id)) return prev;
                return [...prev, project];
              });
            }, index * 200);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = projectsRef.current;
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
      
      <div className="container-custom relative z-10" ref={projectsRef}>
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title text-center mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Explore a selection of innovative projects showcasing my skills and creativity in web development and design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`opacity-0`} 
              style={{ 
                animation: `slideUp 0.6s ${index * 0.1}s forwards ease-out`,
                transform: 'translateY(30px)'
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
