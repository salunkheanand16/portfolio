import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import EnhancedProjectCard from './EnhancedProjectCard';
import { Project } from './ProjectCard';
import { useTheme } from './ThemeProvider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Plus, Filter } from 'lucide-react';

// Enhanced project data with more detailed information
const projectsData: Project[] = [
  {
    id: 1,
    title: "Wind Turbine Performance ML Project",
    description: "Application of machine learning techniques to predict and optimize wind turbine performance from SCADA data.",
    detailedDescription: "This project involved developing a machine learning model to predict wind turbine power output using historical SCADA data. Implemented data preprocessing, feature engineering, and various regression algorithms to create an accurate prediction model. The project achieved a 92% accuracy rate, helping optimize turbine operation and maintenance scheduling.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tags: ["Python", "Scikit-learn", "Pandas", "TensorFlow", "Time Series Analysis"],
    liveUrl: "https://github.com/salunkheanand16",
    githubUrl: "https://github.com/salunkheanand16",
    category: "ai"
  },
  {
    id: 2,
    title: "Full-Stack Twitter Clone",
    description: "A complete social media application with real-time updates, user authentication, and post interactions.",
    detailedDescription: "Developed a comprehensive Twitter-like application with features including user authentication, tweet creation and interaction, real-time notifications, and responsive design. The application utilized a modern tech stack with React for the frontend, Node.js for the backend, and MongoDB for data storage. Real-time capabilities were implemented using Socket.io.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    liveUrl: "https://github.com/salunkheanand16",
    githubUrl: "https://github.com/salunkheanand16",
    category: "web"
  },
  {
    id: 3,
    title: "Enterprise-Scale Azure Data Migration",
    description: "Architected and implemented a large-scale data migration from on-premises systems to Azure cloud solutions.",
    detailedDescription: "This enterprise project involved designing and executing a comprehensive migration strategy to move critical business data from legacy on-premises systems to modern Azure cloud infrastructure. The project included data mapping, ETL process development, validation testing, and performance optimization. The migration was completed with zero data loss and minimal business disruption.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    tags: ["Azure", "SQL", "Python", "ETL", "Data Engineering"],
    liveUrl: "https://github.com/salunkheanand16",
    githubUrl: "https://github.com/salunkheanand16",
    category: "web"
  }
];

const EnhancedProjects = () => {
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("all");
  const projectsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  // Filter projects based on selected category
  useEffect(() => {
    if (filter === "all") {
      // Load projects one by one with a delay for animation effect
      projectsData.forEach((project, index) => {
        setTimeout(() => {
          setVisibleProjects(prev => {
            if (prev.some(p => p.id === project.id)) return prev;
            return [...prev, project];
          });
        }, index * 200);
      });
    } else {
      setVisibleProjects([]);
      // Load filtered projects one by one with a delay for animation effect
      const filtered = projectsData.filter(project => project.category === filter);
      filtered.forEach((project, index) => {
        setTimeout(() => {
          setVisibleProjects(prev => {
            if (prev.some(p => p.id === project.id)) return prev;
            return [...prev, project];
          });
        }, index * 200);
      });
    }
  }, [filter]);

  return (
    <section id="projects" className="section relative overflow-hidden min-h-screen py-20">
      {/* Background gradient blobs */}
      <motion.div 
        className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply"
        style={{ 
          x: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          y: useTransform(scrollYProgress, [0, 1], [-50, 200]) 
        }}
      />
      <motion.div 
        className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-50 mix-blend-multiply"
        style={{ 
          x: useTransform(scrollYProgress, [0, 1], [100, -100]),
          y: useTransform(scrollYProgress, [0, 1], [200, -50]) 
        }}
      />
      
      <motion.div 
        className="container-custom relative z-10"
        ref={projectsRef}
        style={{ opacity, y }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="section-title text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured <motion.span 
              className="text-primary relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              Projects
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-center text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Explore a selection of my professional projects that showcase my expertise in software development, machine learning, and data engineering.
          </motion.p>
          
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-full max-w-md">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  All
                </TabsTrigger>
                <TabsTrigger value="web" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Web
                </TabsTrigger>
                <TabsTrigger value="mobile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Mobile
                </TabsTrigger>
                <TabsTrigger value="ai" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  AI
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <EnhancedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="#"
            className="button-secondary flex items-center gap-2 backdrop-blur-sm bg-background/30 hover:bg-background/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} />
            View More Projects
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EnhancedProjects;
