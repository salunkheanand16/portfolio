import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Github, Linkedin, Twitter, Mail, Phone, 
  MapPin, Send, ArrowRight, AlertCircle, CheckCircle, Award 
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { toast } from '@/hooks/use-toast';

const EnhancedFooter = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("contact");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const socialLinks = [
    { icon: <Github size={20} />, url: "https://github.com/salunkheanand16", label: "GitHub" },
    { icon: <Linkedin size={20} />, url: "https://linkedin.com/in/salunkheanand16", label: "LinkedIn" },
    { icon: <Twitter size={20} />, url: "https://twitter.com/salunkheanand16", label: "Twitter" },
    { icon: <Mail size={20} />, url: "mailto:salunkheanand16@gmail.com", label: "Email" },
    { icon: <Phone size={20} />, url: "tel:+917666956340", label: "Phone" }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple email validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (!isValidEmail) {
      setEmailError(true);
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setEmailError(false);
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter",
      duration: 5000,
    });
    setEmail("");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Animated orb component
  const AnimatedOrb = ({ size, delay, left, top, color }: { size: number, delay: number, left: string, top: string, color: string }) => (
    <motion.div
      className="absolute rounded-full blur-xl opacity-40 pointer-events-none z-0"
      style={{ 
        width: size, 
        height: size, 
        left, 
        top,
        background: color
      }}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 15, 0],
        y: [0, 10, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        repeatType: "reverse"
      }}
    />
  );

  return (
    <motion.footer 
      ref={footerRef}
      className="relative overflow-hidden py-16 bg-background"
      style={{ opacity, y }}
    >
      {/* Animated Background Orbs */}
      <AnimatedOrb size={200} delay={0} left="10%" top="20%" color="var(--primary)" />
      <AnimatedOrb size={120} delay={1.5} left="70%" top="60%" color="var(--accent)" />
      <AnimatedOrb size={160} delay={3} left="25%" top="70%" color="var(--primary)" />
      <AnimatedOrb size={180} delay={2} left="80%" top="15%" color="var(--accent)" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-semibold mb-6 flex items-center">
                <span className="text-primary mr-2">
                  <Award size={20} />
                </span>
                Anand Salunkhe<span className="text-primary">.</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Electrical Engineer | Web Developer | Software Developer | Machine Learning Enthusiast
              </p>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex space-x-4"
              >
                {socialLinks.map((link, index) => (
                  <motion.a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="p-2 rounded-full bg-secondary/50 hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Contact
                </TabsTrigger>
                <TabsTrigger value="location" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Location
                </TabsTrigger>
                <TabsTrigger value="newsletter" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Newsletter
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact" className="space-y-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <motion.div variants={itemVariants} className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a href="mailto:salunkheanand16@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                        salunkheanand16@gmail.com
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <a href="tel:+917666956340" className="text-muted-foreground hover:text-foreground transition-colors">
                        +91 7666956340
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex items-start space-x-3 sm:col-span-2">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Address</h4>
                      <p className="text-muted-foreground">
                        Surbhi Prestige, Kasba Peth, Pune - 411011
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="location">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="rounded-lg overflow-hidden border border-border h-64 sm:h-80">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.80555196595!2d-122.43103384021393!3d37.774929837518345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1653308645619!5m2!1sen!2s" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location"
                    />
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="newsletter">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-secondary/30 backdrop-blur-sm p-6 rounded-lg">
                    <h4 className="text-xl font-display font-semibold mb-3">Subscribe to my newsletter</h4>
                    <p className="text-muted-foreground mb-6">
                      Get the latest updates, news, and special content delivered directly to your inbox.
                    </p>
                    
                    <form onSubmit={handleNewsletterSubmit}>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setEmailError(false);
                            }}
                            className={`w-full px-4 py-2 bg-background border ${
                              emailError ? 'border-destructive' : 'border-input'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                            placeholder="Enter your email"
                            required
                          />
                          {emailError && (
                            <div className="text-destructive text-sm mt-1 flex items-center">
                              <AlertCircle size={12} className="mr-1" /> Please enter a valid email
                            </div>
                          )}
                        </div>
                        <motion.button
                          type="submit"
                          className="button-primary flex items-center justify-center group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center">
                            <Send className="mr-2 h-4 w-4" />
                            Subscribe
                          </span>
                          <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <motion.div 
          className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Anand Salunkhe. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default EnhancedFooter;
