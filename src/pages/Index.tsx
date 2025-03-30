import { ThemeProvider } from "@/components/ThemeProvider";
import InteractiveNavigation from "@/components/InteractiveNavigation";
import EnhancedHero from "@/components/EnhancedHero";
import EnhancedProjects from "@/components/EnhancedProjects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import EnhancedFooter from "@/components/EnhancedFooter";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import InteractiveBackground from "@/components/InteractiveBackground";
import EasterEggs from "@/components/EasterEggs";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// Simple error boundary component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="max-w-md p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-destructive">Something went wrong</h2>
      <p className="mb-4 text-muted-foreground">We encountered an error while rendering the portfolio.</p>
      <pre className="p-3 bg-muted rounded text-sm overflow-auto max-h-48">
        {error.message}
      </pre>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Global error handler
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Caught error:", event.error);
      setError(event.error || new Error(event.message));
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Show welcome toast after the page has loaded
      setTimeout(() => {
        setShowWelcome(true);
      }, 1500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showWelcome) {
      toast({
        title: "Welcome to my Portfolio",
        description: "Press Ctrl+K to access additional features and information.",
        duration: 5000,
      });
    }
  }, [showWelcome]);

  // If there's an error, show the error fallback
  if (error) {
    return <ThemeProvider><ErrorFallback error={error} /></ThemeProvider>;
  }

  return (
    <ThemeProvider>
      <AnimatePresence>
        {isLoading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-background z-50"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <motion.div 
                  className="absolute inset-0 border-4 border-primary rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 1] }}
                  transition={{ 
                    times: [0, 0.5, 1],
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
                <motion.div 
                  className="absolute inset-0 border-4 border-t-transparent border-primary rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div 
                  className="absolute inset-2 border-4 border-accent rounded-full opacity-30"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <motion.p 
                className="mt-6 font-display text-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading portfolio...
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-background text-foreground relative"
          >
            <EasterEggs>
              <InteractiveBackground />
              <InteractiveNavigation />
              <main className="relative z-10">
                <EnhancedHero />
                <EnhancedProjects />
                <About />
                <Contact />
              </main>
              <EnhancedFooter />
              <Toaster />
              <Sonner />
            </EasterEggs>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Index;
