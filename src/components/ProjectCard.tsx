import { useState, useRef, MouseEvent } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  detailedDescription?: string;
  category?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [shine, setShine] = useState({ opacity: 0, x: 0, y: 0 });
  
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // 3D tilt effect handlers
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    
    // Calculate shine effect position
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    setShine({ opacity: 0.3, x: shineX, y: shineY });
  };
  
  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
    setShine({ opacity: 0, x: 0, y: 0 });
  };

  return (
    <>
      <div 
        ref={cardRef}
        className="project-card group cursor-pointer overflow-hidden backdrop-blur-sm" 
        onClick={openModal}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          transform,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div className="aspect-video overflow-hidden relative">
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-white pointer-events-none z-10 transition-opacity duration-300" 
            style={{ 
              opacity: shine.opacity, 
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)` 
            }}
          />
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <div className="p-4 space-y-3 bg-card/80 backdrop-blur-sm border-t border-border">
          <h3 className="text-xl font-display font-semibold">{project.title}</h3>
          
          <p className="text-muted-foreground line-clamp-2">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, index) => (
              <span key={index} className="tech-badge bg-primary/10 text-primary">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-card border border-border rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'scale-in 0.3s forwards ease-out' }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-card/90 backdrop-blur-sm border-b">
              <h3 className="text-xl font-display font-semibold">{project.title}</h3>
              <button 
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-secondary/80 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="overflow-hidden rounded-md">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  {project.detailedDescription || project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tech-badge bg-primary/10 text-primary">{tag}</span>
                  ))}
                </div>
                
                <div className="flex gap-4 pt-4">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="button-primary group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="button-secondary backdrop-blur-sm bg-background/30 hover:bg-background/50 transition-all duration-300"
                    >
                      <Github size={16} className="mr-2" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
