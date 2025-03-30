
import { useState } from 'react';
import { Github, Twitter, Linkedin, Mail, Heart, ExternalLink, ArrowUpRight, Send, Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activeTab, setActiveTab] = useState("connect");
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${text} has been copied to your clipboard.`,
      duration: 3000,
    });
  };
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      
      toast({
        title: "Subscribed!",
        description: "You've been added to the newsletter.",
        duration: 3000,
      });
      
      // Reset form after successful subscription
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 2000);
    }, 1500);
  };
  
  return (
    <footer className="py-16 border-t border-border relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 opacity-50 blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/10 opacity-50 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Let's Create Something Amazing Together
          </h2>
          
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
            Whether you have a project in mind or just want to connect, I'm always open to discussing new opportunities and ideas.
          </p>
          
          <div className="w-full max-w-2xl mx-auto backdrop-blur-sm">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="connect" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Connect</TabsTrigger>
                <TabsTrigger value="newsletter" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Newsletter</TabsTrigger>
              </TabsList>
              
              <TabsContent value="connect" className="animate-fade-in p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary animate-pulse" style={{ animationDuration: '3s' }}>
                      <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">John Portfolio</h3>
                      <p className="text-muted-foreground">Full-stack Developer</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="mailto:hello@example.com" 
                      className="button-primary group relative overflow-hidden"
                      onClick={(e) => {
                        e.preventDefault();
                        copyToClipboard("hello@example.com");
                      }}
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                      <Mail size={16} className="mr-2" />
                      Get in Touch
                    </a>
                    <a 
                      href="#" 
                      className="button-secondary group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                      <ArrowUpRight size={16} className="mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      Resume
                    </a>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="newsletter" className="animate-fade-in p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg">
                <form className="space-y-4" onSubmit={handleSubscribe}>
                  <p className="text-sm text-muted-foreground">Stay updated with my latest projects and articles. No spam, ever.</p>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="pr-24 bg-background/50 border-border/50 focus:border-primary transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button 
                      type="submit" 
                      className="absolute right-1 top-1 bottom-1 bg-primary hover:bg-primary/90"
                      disabled={isSubscribing || isSubscribed}
                    >
                      {isSubscribing ? (
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                          <span>Subscribing</span>
                        </span>
                      ) : isSubscribed ? (
                        <span className="flex items-center gap-2">
                          <Check size={16} />
                          <span>Subscribed!</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={16} />
                          <span>Subscribe</span>
                        </span>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">By subscribing, you agree to receive occasional updates about my work and offerings.</p>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-border/40">
          <div className="transform transition-transform hover:translate-y-[-5px] duration-300">
            <h3 className="text-2xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary">Navigation</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">Home <ArrowUpRight size={12} /></a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">Projects <ArrowUpRight size={12} /></a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">About <ArrowUpRight size={12} /></a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">Contact <ArrowUpRight size={12} /></a></li>
            </ul>
          </div>
          
          <div className="transform transition-transform hover:translate-y-[-5px] duration-300">
            <h3 className="text-2xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary">Social</h3>
            <div className="flex flex-col gap-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                  <Github size={16} />
                </span>
                <span>Github</span>
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                  <Twitter size={16} />
                </span>
                <span>Twitter</span>
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                  <Linkedin size={16} />
                </span>
                <span>LinkedIn</span>
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
          
          <div className="transform transition-transform hover:translate-y-[-5px] duration-300">
            <h3 className="text-2xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary">Skills</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">React</Badge>
              <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">TypeScript</Badge>
              <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">Next.js</Badge>
              <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">TailwindCSS</Badge>
              <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">UI/UX</Badge>
              <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">Node.js</Badge>
              <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">GraphQL</Badge>
              <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">Figma</Badge>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-8 border-t border-border/40">
          <p className="text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Anand Salunkhe. All rights reserved.
          </p>
          
          <div className="text-muted-foreground text-sm flex items-center">
            <p>Crafted with</p>
            <Heart size={16} className="mx-1 text-primary animate-pulse" />
            <p>using React, TypeScript & TailwindCSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
