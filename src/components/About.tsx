import { useEffect, useState, useRef } from 'react';
import { Code, Database, Briefcase, Cpu, GraduationCap, Award, Laptop, Library, Globe, Star, Zap, Heart, User, Layers, ArrowUpRight, Calendar, GitBranch, GitMerge, GitPullRequest, Clock, Lightbulb, Code2, PenTool, BarChart, Shield, Braces, FileCode } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

// Define simplified skill categories for a cleaner presentation
const skillCategories = [
  {
    name: "Frontend",
    skills: ["React.js", "TypeScript", "Tailwind CSS", "Next.js", "Redux", "HTML5/CSS3", "Material UI", "Framer Motion"],
    icon: <Layers className="h-5 w-5" />,
    level: 85,
    description: "Creating responsive, performant user interfaces with modern frameworks and libraries. Specializing in React ecosystem with TypeScript for type safety."
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "RESTful APIs", "GraphQL", "MongoDB", "PostgreSQL", "Microservices", "API Design"],
    icon: <Database className="h-5 w-5" />,
    level: 80,
    description: "Building scalable server-side applications and APIs with Node.js. Implementing database solutions and microservice architectures."
  },
  {
    name: "Embedded Systems",
    skills: ["Arduino", "ESP32", "Raspberry Pi", "IoT Protocols", "Sensor Integration", "PCB Design", "C/C++", "RTOS"],
    icon: <Cpu className="h-5 w-5" />,
    level: 90,
    description: "Developing hardware-software solutions using microcontrollers and single-board computers. Specializing in IoT device programming and integration."
  },
  {
    name: "DevOps & Cloud",
    skills: ["Git/GitHub", "Docker", "AWS", "CI/CD Pipelines", "Azure", "Kubernetes", "Linux", "Terraform"],
    icon: <GitBranch className="h-5 w-5" />,
    level: 75,
    description: "Implementing continuous integration and deployment workflows. Managing infrastructure as code and cloud-based solutions."
  },
  {
    name: "Data Engineering",
    skills: ["Data Pipelines", "TensorFlow", "Data Processing", "Data Visualization", "Time Series Analysis", "Feature Engineering", "ETL Processes", "Pandas/NumPy"],
    icon: <BarChart className="h-5 w-5" />,
    level: 80,
    description: "Creating data processing pipelines and visualization systems. Implementing predictive models for industrial applications."
  },
  {
    name: "System Design",
    skills: ["Architecture Patterns", "Scalability", "Performance Optimization", "Security", "Load Balancing", "Distributed Systems", "Fault Tolerance", "System Integration"],
    icon: <PenTool className="h-5 w-5" />,
    level: 70,
    description: "Designing robust, scalable system architectures. Implementing performance optimizations and security best practices."
  }
];

// Educational background
const education = {
  degree: "Bachelor of Engineering in Electrical Engineering",
  institution: "PES Modern College of Engineering, Pune, India",
  year: "2021 - 2025 (Currently Pursuing)",
  coursework: [
    "Advanced Algorithms & Data Structures",
    "Computer Architecture",
    "Embedded Systems Design",
    "Machine Learning",
    "Digital Signal Processing",
    "Database Management Systems",
    "Computer Networks",
    "Control Systems"
  ],
  achievements: [
    "Ranked 3rd in Departmental Rankings",
    "Technical Paper on Forecasting of Wind Turbine Performance using Machine Learning Published in College Journal"
  ]
};

// Professional journey timeline with more impressive details
const journeySteps = [
  {
    year: "2021",
    title: "Started Engineering Degree",
    description: "Began formal education in Electrical Engineering with a focus on computer systems and embedded technologies",
    icon: <GraduationCap size={20} />,
    color: "from-blue-400 to-blue-600"
  },
  {
    year: "2022",
    title: "First Major Project",
    description: "Developed a full-stack Twitter clone leveraging React, Node.js, and MongoDB - implemented real-time updates with Socket.io",
    icon: <Code2 size={20} />,
    color: "from-teal-400 to-teal-600"
  },
  {
    year: "2022",
    title: "Embedded Systems Competition",
    description: "Won 1st prize in microcontroller coding competition with an innovative home automation solution",
    icon: <Cpu size={20} />,
    color: "from-green-400 to-green-600"
  },
  {
    year: "2023",
    title: "Machine Learning Research",
    description: "Developed ML model for wind turbine performance prediction achieving 95% accuracy - presented findings at university symposium",
    icon: <BarChart size={20} />,
    color: "from-purple-400 to-purple-600"
  },
  {
    year: "2023",
    title: "Summer Internship",
    description: "Completed virtual internship at a tech startup working on cloud infrastructure",
    icon: <Briefcase size={20} />,
    color: "from-indigo-400 to-indigo-600"
  },
  {
    year: "2024",
    title: "DevOps & Cloud Certification",
    description: " Implemented CI/CD pipelines for academic projects",
    icon: <GitBranch size={20} />,
    color: "from-orange-400 to-orange-600"
  }
];

// Work process steps
const workProcess = [
  {
    title: "Discover",
    description: "Understanding requirements and exploring possibilities",
    icon: <Lightbulb className="h-6 w-6" />
  },
  {
    title: "Design",
    description: "Architecting elegant solutions with scalability in mind",
    icon: <PenTool className="h-6 w-6" />
  },
  {
    title: "Develop",
    description: "Building robust systems with clean, maintainable code",
    icon: <Code className="h-6 w-6" />
  },
  {
    title: "Deploy",
    description: "Delivering optimized solutions with thorough testing",
    icon: <GitMerge className="h-6 w-6" />
  }
];

// Update achievements with the selected items
const achievements = [
  "Won 1st prize in Microcontroller Coding Competition 2022 at college level",
  "Achieved 95% accuracy in predictive maintenance model, surpassing course benchmark by 15%",
  "Implemented secure authentication system compliant with OWASP standards for department portal",
  "Led 4-person team to deploy campus-wide energy monitoring solution used by facilities management",
  "Mentored junior students in programming fundamentals, with 90% showing improved performance"
];

// Certifications and courses
const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "February 2024",
    icon: <FileCode className="h-5 w-5 text-primary" />
  },
 
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "November 2023",
    icon: <FileCode className="h-5 w-5 text-primary" />
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford Online (Coursera)",
    date: "August 2023",
    icon: <FileCode className="h-5 w-5 text-primary" />
  },
  {
    title: "React - The Complete Guide",
    issuer: "Udemy",
    date: "May 2023",
    icon: <FileCode className="h-5 w-5 text-primary" />
  },
  {
    title: "Complete Python Developer",
    issuer: "Zero To Mastery Academy",
    date: "January 2023",
    icon: <FileCode className="h-5 w-5 text-primary" />
  }
];

const About = () => {
  const { theme } = useTheme();
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const processRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end center"]
  });
  
  // Track mouse position for particle effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Add a parallax effect for background elements
  const backgroundX = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Auto-advance work process steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % workProcess.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          element.classList.add('animate-slide-in');
          element.classList.remove('opacity-0');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section ref={aboutSectionRef} id="about" className="section py-16 relative overflow-hidden">
      {/* Enhanced magical background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 gradient-orb opacity-40"
        style={{ x: backgroundX, y: backgroundY }}
      />
      <motion.div 
        className="absolute bottom-40 left-0 w-[30rem] h-[30rem] gradient-orb opacity-30"
        style={{ x: backgroundX, y: backgroundY, scale: scrollYProgress }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 360]) }}
      />
      
      {/* Magical particle constellation that follows cursor */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`cursor-particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              x: mousePosition.x + Math.cos(i / 3 * Math.PI * 2) * (i * 10 + 30),
              y: mousePosition.y + Math.sin(i / 3 * Math.PI * 2) * (i * 10 + 30),
              opacity: 0.6 - (i * 0.03),
              scale: 1 - (i * 0.05),
              background: i % 3 === 0 
                ? 'linear-gradient(to right, rgba(var(--primary-rgb), 0.8), rgba(var(--accent-rgb), 0.8))' 
                : i % 3 === 1 
                  ? 'rgba(var(--primary-rgb), 0.8)' 
                  : 'rgba(var(--accent-rgb), 0.8)',
              boxShadow: '0 0 10px rgba(var(--primary-rgb), 0.5)'
            }}
            transition={{ type: 'spring', stiffness: 400 - (i * 20), damping: 30 + (i * 2) }}
          />
        ))}
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">About Me</h2>
          <p className="text-lg text-muted-foreground leading-relaxed glass-morphism p-6 rounded-xl mx-auto">
            I am a <span className="text-primary font-medium">detail-oriented engineering graduate</span> with a strong foundation in <span className="text-primary font-medium">software development</span> and computer engineering principles. 
            My expertise spans <span className="text-primary font-medium">multiple programming languages</span> with demonstrated excellence through practical projects. 
            I bring exceptional <span className="text-primary font-medium">problem-solving abilities</span> and analytical skills, complemented by strong teamwork and communication proficiency.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Electrical Engineer', 'Software Developer', 'Embedded Systems', 'Problem Solver', 'IoT Developer'].map((tag, i) => (
              <motion.span 
                key={i}
                className="px-4 py-2 rounded-full glass-morphism text-foreground text-sm font-medium"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(var(--primary-rgb), 0.2), 0 4px 6px -4px rgba(var(--primary-rgb), 0.2)" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Professional Journey Timeline */}
        <motion.div 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <Calendar className="mr-2 h-6 w-6 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Professional Journey</span>
          </h3>
          
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/30 via-accent/30 to-primary/30 rounded-full"></div>
            
            {journeySteps.map((step, index) => (
              <motion.div 
                key={index}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg p-3 animate-pulse`}>
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold mt-1 text-center">{step.year}</div>
                </div>
                
                {/* Content */}
                <div className={`glass-morphism p-5 rounded-xl w-5/12 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                  <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <GraduationCap className="mr-2 h-6 w-6 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Education</span>
          </h3>
          
          <motion.div 
            className="glass-morphism p-6 animate-on-scroll opacity-0 relative overflow-hidden group ambient-glow"
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-medium mb-2 flex items-center">
                  <Star className="h-4 w-4 text-primary mr-2" />
                  {education.degree}
                </h4>
                <p className="text-muted-foreground">{education.institution}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full mt-2 md:mt-0 flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span>{education.year}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-4 border-t border-border/30">
              <div>
                <h5 className="text-base font-medium mb-3 flex items-center">
                  <Code className="h-4 w-4 text-primary mr-2" />
                  Relevant Coursework
                </h5>
                <div className="flex flex-wrap gap-2">
                  {education.coursework.map((course, i) => (
                    <motion.span 
                      key={i} 
                      className="px-3 py-1 rounded-full bg-secondary/30 text-xs"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-base font-medium mb-3 flex items-center">
                  <Award className="h-4 w-4 text-primary mr-2" />
                  Academic Achievements
                </h5>
                <ul className="space-y-2">
                  {education.achievements.map((achievement, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      <span className="text-sm">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Skills Section with 3D rotating sphere */}
        <motion.div 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <Laptop className="mr-2 h-6 w-6 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Core Skills</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Fix the interactive skill visualization - replace 3D sphere with a more reliable 3D ring */}
            <div className="lg:col-span-2 glass-morphism p-6 rounded-lg relative overflow-hidden perspective-container">
              <div className="h-[320px] flex items-center justify-center">
                <motion.div 
                  className="relative w-[280px] h-[280px] mx-auto"
                  style={{ perspective: 800 }}
                >
                  {skillCategories.map((skill, i) => {
                    // Calculate positions on a circle (more stable than 3D sphere)
                    const angle = (i * (360 / skillCategories.length)) * (Math.PI / 180);
                    const radius = 120;
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-24 h-24 skill-item"
                        style={{ 
                          top: '50%',
                          left: '50%',
                          x: Math.cos(angle) * radius - 48,
                          y: Math.sin(angle) * radius - 48,
                          zIndex: Math.cos(angle) > 0 ? 2 : 1,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          rotateY: [0, 360],
                          transition: {
                            rotateY: {
                              repeat: Infinity,
                              duration: 15,
                              ease: "linear",
                              delay: i * 0.5,
                            },
                            opacity: { duration: 0.5, delay: i * 0.2 },
                            scale: { duration: 0.5, delay: i * 0.2 }
                          }
                        }}
                        whileHover={{ 
                          scale: 1.1, 
                          zIndex: 10,
                          boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.5)' 
                        }}
                        onClick={() => setActiveSkill(i === activeSkill ? null : i)}
                      >
                        <div className="w-full h-full flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/80 to-accent/80 p-3 text-white shadow-lg transform-gpu">
                          <div className="text-2xl mb-1">{skill.icon}</div>
                          <div className="text-xs font-semibold">{skill.name}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                  
                  {/* Add rotating ring effect */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div 
                      className="w-[240px] h-[240px] rounded-full border-2 border-primary/20"
                      animate={{ rotateZ: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="absolute w-[200px] h-[200px] rounded-full border-2 border-accent/20"
                      animate={{ rotateZ: -360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              </div>
              
              <div className="text-center mt-4">
                <AnimatePresence mode="wait">
                  {activeSkill !== null ? (
                    <motion.div
                      key={activeSkill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-3 bg-primary/5 rounded-lg transform-gpu shadow-lg"
                    >
                      <h4 className="font-medium mb-2 flex items-center justify-center">
                        {skillCategories[activeSkill].icon}
                        <span className="ml-2">{skillCategories[activeSkill].name}</span>
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">{skillCategories[activeSkill].description}</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {skillCategories[activeSkill].skills.map((skill, i) => (
                          <motion.span 
                            key={i} 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-3 py-1 rounded-full bg-secondary/20 text-xs"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                      <div className="mt-2 w-full bg-secondary/30 rounded-full h-1.5">
                        <motion.div 
                          className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${skillCategories[activeSkill].level}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="bg-gradient-to-r from-primary/10 to-accent/10 p-3 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-sm">
                        <span className="font-medium">Click</span> on a skill to see details
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Traditional skill categories - Update to include more skill cards and improved styling */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillCategories.map((category, index) => (
                <motion.div 
                  key={index}
                  className="glass-morphism p-6 animate-on-scroll opacity-0 relative overflow-hidden ambient-glow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  variants={fadeIn}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(var(--primary-rgb), 0.1)" }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-accent/50 opacity-60"></div>
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-primary/10 mr-3">
                      {category.icon}
                    </div>
                    <h4 className="text-xl font-medium">{category.name}</h4>
                  </div>
                  
                  {/* Add skill proficiency bar */}
                  <div className="w-full bg-secondary/30 rounded-full h-1.5 mb-4">
                    <motion.div 
                      className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full"
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${category.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {category.skills.map((skill, i) => (
                      <motion.span 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="px-3 py-1 rounded-full bg-secondary/20 text-xs hover:bg-primary/20 transition-colors duration-300"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Add Certifications Section - before Work Philosophy */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FileCode className="mr-2 h-6 w-6 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Certifications & Courses</span>
          </h3>
          
          <div className="glass-morphism p-6 animate-on-scroll opacity-0 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 group"
                  variants={fadeIn}
                  custom={index * 0.1}
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 rounded-full bg-primary/10 mt-1 group-hover:bg-primary/20 transition-colors duration-300">
                    {cert.icon}
                  </div>
                  <div>
                    <h4 className="font-medium group-hover:text-primary transition-colors duration-300">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {cert.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Work Philosophy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <Briefcase className="mr-2 h-6 w-6 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Work Philosophy</span>
          </h3>
          
          <div className="glass-morphism p-8 animate-on-scroll opacity-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="mx-auto p-3 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">Performance Focused</h4>
                <p className="text-sm text-muted-foreground">Building solutions that are optimized for speed and efficiency</p>
              </div>
              <div className="space-y-2">
                <div className="mx-auto p-3 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">Clean Architecture</h4>
                <p className="text-sm text-muted-foreground">Creating maintainable code with solid principles</p>
              </div>
              <div className="space-y-2">
                <div className="mx-auto p-3 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">User Centered</h4>
                <p className="text-sm text-muted-foreground">Designing with the end user experience as the top priority</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-morphism p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">What Drives Me</h3>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          </div>
          <p className="text-center text-muted-foreground">
            I'm passionate about building technology that solves real-world problems. As a student with hands-on experience in both software development and embedded systems, I bring a unique perspective that bridges the gap between hardware and software solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
