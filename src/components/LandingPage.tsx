import { Brain, Sparkles, Zap } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-[80px] animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-streak/10 blur-[60px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
        {/* Icon */}
        <div className="flex justify-center animate-fade-in">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center animate-pulse-glow">
              <Brain className="w-12 h-12 text-primary" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-float" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
            <span className="gradient-text">Adaptive</span>
            <br />
            <span className="text-foreground">IQ Tester</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Challenge your mind with an intelligent quiz that adapts to your skill level in real-time. Discover your cognitive strengths.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {[
            { icon: Zap, label: "Adaptive Difficulty" },
            { icon: Brain, label: "IQ Estimation" },
            { icon: Sparkles, label: "Brain Type Analysis" },
          ].map((feat, i) => (
            <div key={i} className="glass-card rounded-xl p-4 text-center space-y-2">
              <feat.icon className="w-5 h-5 text-accent mx-auto" />
              <p className="text-xs md:text-sm text-muted-foreground">{feat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-in" style={{ animationDelay: '0.45s' }}>
          <button
            onClick={onStart}
            className="relative px-10 py-4 rounded-xl font-display font-semibold text-lg bg-primary text-primary-foreground btn-glow transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Start Test
          </button>
          <p className="text-xs text-muted-foreground mt-4">15 questions · ~5 minutes · All ages welcome</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
