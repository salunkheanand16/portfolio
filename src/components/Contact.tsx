import { Mail, Github, Linkedin, Twitter, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section bg-secondary/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-lg text-muted-foreground">
            Interested in working together? Feel free to reach out through any of the platforms below.
          </p>
        </div>
        
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4 md:grid-cols-5">
          <a 
            href="mailto:salunkheanand16@gmail.com" 
            className="flex flex-col items-center p-4 rounded-lg hover:bg-secondary transition-colors duration-200"
            aria-label="Email"
          >
            <Mail className="h-8 w-8 mb-2 text-primary" />
            <span className="text-sm md:text-base">Email</span>
          </a>
          
          <a 
            href="tel:+917666956340" 
            className="flex flex-col items-center p-4 rounded-lg hover:bg-secondary transition-colors duration-200"
            aria-label="Phone"
          >
            <Phone className="h-8 w-8 mb-2 text-primary" />
            <span className="text-sm md:text-base">Phone</span>
          </a>
          
          <a 
            href="https://github.com/salunkheanand16" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center p-4 rounded-lg hover:bg-secondary transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="h-8 w-8 mb-2 text-primary" />
            <span className="text-sm md:text-base">GitHub</span>
          </a>
          
          <a 
            href="https://linkedin.com/in/salunkheanand16" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center p-4 rounded-lg hover:bg-secondary transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-8 w-8 mb-2 text-primary" />
            <span className="text-sm md:text-base">LinkedIn</span>
          </a>
          
          <a 
            href="https://twitter.com/salunkheanand16" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center p-4 rounded-lg hover:bg-secondary transition-colors duration-200"
            aria-label="Twitter"
          >
            <Twitter className="h-8 w-8 mb-2 text-primary" />
            <span className="text-sm md:text-base">Twitter</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
