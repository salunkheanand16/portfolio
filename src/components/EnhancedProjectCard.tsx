import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ArrowRight, Plus, Eye } from 'lucide-react';
import { Project } from './ProjectCard';

interface EnhancedProjectCardProps {
  project: Project;
  index: number;
}

const EnhancedProjectCard = ({ project, index }: EnhancedProjectCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  
  // 3D tilt effect handlers
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
    },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: custom * 0.1
      }
    }),
  };

  const imageVariants = {
    hover: { scale: 1.05 },
    initial: { scale: 1 }
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    initial: { scale: 1 }
  };

  const tagVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        delay: custom * 0.05 
      }
    })
  };

  return (
    <>
      <motion.div 
        ref={cardRef}
        custom={index}
        variants={variants}
        initial="hidden"
        animate="visible"
        whileHover={{ z: 20 }}
        style={{ x, y, rotateX, rotateY, z: 100 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="project-card group glass-morphism overflow-hidden relative"
        onClick={openModal}
      >
        {/* Add ambient glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />
        </div>
        
        <motion.div className="aspect-video overflow-hidden relative">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          
          <motion.img 
            variants={imageVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 0.4 }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-4 z-20 flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              className="bg-primary text-primary-foreground rounded-full p-2 hover:shadow-lg transition-all"
            >
              <Eye size={18} />
            </motion.button>
            
            <motion.div className="flex gap-2">
              {project.liveUrl && (
                <motion.a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  className="bg-white text-black rounded-full p-2 hover:shadow-lg transition-all"
                >
                  <ExternalLink size={18} />
                </motion.a>
              )}
              
              {project.githubUrl && (
                <motion.a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  className="bg-black text-white rounded-full p-2 hover:shadow-lg transition-all"
                >
                  <Github size={18} />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
        
        <div className="p-5 space-y-3 backdrop-blur-sm">
          <h3 className="text-xl font-display font-semibold">{project.title}</h3>
          
          <p className="text-muted-foreground line-clamp-2">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, index) => (
              <motion.span 
                key={index} 
                custom={index}
                variants={tagVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="tech-badge bg-primary/10 text-primary"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          
          <motion.div 
            className="pt-2"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              className="flex items-center text-primary font-medium"
              whileHover={{ x: 5 }}
            >
              View Case Study <ArrowRight className="ml-1" size={16} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-xl flex items-center justify-center p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="glass-morphism border border-border/50 rounded-lg shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-card/95 backdrop-blur-xl border-b">
                <h3 className="text-xl md:text-2xl font-display font-semibold">{project.title}</h3>
                <motion.button 
                  onClick={closeModal}
                  className="p-2 rounded-full bg-secondary/50 hover:bg-secondary/80 transition-colors"
                  whileHover={{ rotate: 90, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                  transition={{ duration: 0.2 }}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </motion.button>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Image Gallery with enhanced glow */}
                <div className="overflow-hidden rounded-md shadow-xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-700"></div>
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="text-lg font-display font-semibold mb-2">Overview</h4>
                      <p className="text-foreground leading-relaxed">
                        {project.detailedDescription || project.description}
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="glass-morphism p-6 rounded-lg"
                    >
                      <h4 className="text-lg font-display font-semibold mb-2">Problem Statement</h4>
                      <p className="text-foreground leading-relaxed">
                        {project.id === 1 ? 
                          "The challenge was to accurately predict wind turbine power output based on highly variable environmental data to optimize maintenance schedules and improve operational efficiency." :
                        project.id === 2 ? 
                          "Building a scalable social media platform with real-time capabilities while ensuring robust security and consistent user experience across devices." :
                        project.id === 3 ? 
                          "Migrating terabytes of legacy data to modern cloud infrastructure without disrupting business operations or risking data integrity during the transition." :
                          "The client needed a solution to streamline their workflow while maintaining consistency and scalability."}
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="glass-morphism p-6 rounded-lg"
                    >
                      <h4 className="text-lg font-display font-semibold mb-2">Approach & Solution</h4>
                      <p className="text-foreground leading-relaxed">
                        {project.id === 1 ? 
                          "Implemented advanced preprocessing for SCADA data, feature engineering, and ensemble machine learning models. Created a custom evaluation framework to validate predictions against actual turbine performance in various weather conditions." :
                        project.id === 2 ? 
                          "Developed a microservices architecture with React for frontend, Node.js for backend APIs, and MongoDB for flexible data storage. Implemented Socket.io for real-time updates and JWT for secure authentication." :
                        project.id === 3 ? 
                          "Created a phased migration strategy with parallel processing pipelines, validation checkpoints, and rollback mechanisms. Utilized Azure Data Factory for ETL processes with custom Python transformations to handle complex data mapping." :
                          "We implemented a modular design system with reusable components, improving development efficiency and optimizing for both desktop and mobile."}
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="glass-morphism p-6 rounded-lg"
                    >
                      <h4 className="text-lg font-display font-semibold mb-2">Results & Impact</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="bg-secondary/30 backdrop-blur-sm p-4 rounded-lg text-center">
                          <p className="text-2xl font-bold text-primary">
                            {project.id === 1 ? "92%" : project.id === 2 ? "45%" : project.id === 3 ? "99.9%" : "35%"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {project.id === 1 ? "Prediction Accuracy" : project.id === 2 ? "User Engagement" : project.id === 3 ? "Data Integrity" : "Conversion Increase"}
                          </p>
                        </div>
                        <div className="bg-secondary/30 backdrop-blur-sm p-4 rounded-lg text-center">
                          <p className="text-2xl font-bold text-primary">
                            {project.id === 1 ? "30%" : project.id === 2 ? "60%" : project.id === 3 ? "75%" : "50%"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {project.id === 1 ? "Maintenance Cost Reduction" : project.id === 2 ? "Load Time Improvement" : project.id === 3 ? "Processing Time Reduction" : "Load Time Reduction"}
                          </p>
                        </div>
                        <div className="bg-secondary/30 backdrop-blur-sm p-4 rounded-lg text-center">
                          <p className="text-2xl font-bold text-primary">
                            {project.id === 1 ? "15%" : project.id === 2 ? "85%" : project.id === 3 ? "0%" : "28%"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {project.id === 1 ? "Energy Output Increase" : project.id === 2 ? "Mobile Users" : project.id === 3 ? "Data Loss" : "User Engagement"}
                          </p>
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {project.id === 1 ? 
                          "The ML model successfully reduced maintenance costs while improving energy output through better predictive maintenance scheduling. The solution was deployed to monitor a fleet of 50+ wind turbines." :
                        project.id === 2 ? 
                          "The platform achieved high user engagement with smooth real-time interactions. The microservices architecture allowed for independent scaling of components based on demand." :
                        project.id === 3 ? 
                          "Completed migration of over 15TB of critical business data with zero data loss and minimal downtime. The new cloud infrastructure reduced processing times by 75% and improved data accessibility." :
                          "The new system reduced development time for future features and improved overall user satisfaction based on feedback surveys."}
                      </p>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="glass-morphism p-6 rounded-lg"
                    >
                      <h4 className="text-lg font-display font-semibold mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <motion.span 
                            key={index}
                            custom={index}
                            variants={tagVariants}
                            initial="initial"
                            animate="animate"
                            className="tech-badge bg-primary/10 text-primary"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="glass-morphism p-6 rounded-lg"
                    >
                      <h4 className="text-lg font-display font-semibold mb-3">Timeline</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Research</span>
                          <span className="font-medium">
                            {project.id === 1 ? "3 weeks" : project.id === 2 ? "2 weeks" : "4 weeks"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Design</span>
                          <span className="font-medium">
                            {project.id === 1 ? "2 weeks" : project.id === 2 ? "3 weeks" : "3 weeks"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Development</span>
                          <span className="font-medium">
                            {project.id === 1 ? "8 weeks" : project.id === 2 ? "10 weeks" : "12 weeks"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Testing</span>
                          <span className="font-medium">
                            {project.id === 1 ? "3 weeks" : project.id === 2 ? "2 weeks" : "4 weeks"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="glass-morphism p-6 rounded-lg"
                    >
                      <h4 className="text-lg font-display font-semibold mb-3">Team</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">UX Designer</span>
                          <span className="font-medium">2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frontend Dev</span>
                          <span className="font-medium">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Backend Dev</span>
                          <span className="font-medium">2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">QA Tester</span>
                          <span className="font-medium">1</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                  {project.liveUrl && (
                    <motion.a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="button-primary group relative overflow-hidden ambient-glow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </motion.a>
                  )}
                  
                  {project.githubUrl && (
                    <motion.a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="button-secondary backdrop-blur-md hover:bg-background/40 transition-all duration-300 ambient-glow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} className="mr-2" />
                      Source Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedProjectCard;
