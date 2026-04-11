import { Brain, RotateCcw, Share2, Trophy, Target, Clock, Flame } from 'lucide-react';
import { QuizResults } from '@/hooks/useQuiz';

interface ResultsPageProps {
  results: QuizResults;
  onRestart: () => void;
}

const ResultsPage = ({ results, onRestart }: ResultsPageProps) => {
  const { iq, brainType, brainDescription, accuracy, avgTime, totalScore, maxStreak } = results;

  const getIQLabel = (iq: number) => {
    if (iq >= 140) return { label: 'Genius', color: 'text-accent' };
    if (iq >= 120) return { label: 'Superior', color: 'text-primary' };
    if (iq >= 110) return { label: 'Above Average', color: 'text-success' };
    if (iq >= 90) return { label: 'Average', color: 'text-warning' };
    return { label: 'Below Average', color: 'text-muted-foreground' };
  };

  const iqInfo = getIQLabel(iq);

  const handleShare = async () => {
    const text = `🧠 My Adaptive IQ Test Results:\nIQ Score: ${iq} (${iqInfo.label})\nBrain Type: ${brainType}\nAccuracy: ${accuracy}%\n\nTry it yourself!`;
    if (navigator.share) {
      await navigator.share({ title: 'My IQ Test Results', text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        {/* IQ Score */}
        <div className="glass-card rounded-2xl p-8 text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground font-display uppercase tracking-wider mb-2">Your Estimated IQ</p>
          <p className="text-6xl md:text-7xl font-display font-bold gradient-text mb-2">{iq}</p>
          <p className={`text-lg font-display font-semibold ${iqInfo.color}`}>{iqInfo.label}</p>
        </div>

        {/* Brain Type */}
        <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="w-5 h-5 text-streak" />
            <h3 className="font-display font-semibold text-foreground">Brain Type: {brainType}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{brainDescription}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: '0.35s' }}>
          {[
            { icon: Target, label: 'Accuracy', value: `${accuracy}%`, color: 'text-success' },
            { icon: Clock, label: 'Avg Time', value: `${avgTime}s`, color: 'text-accent' },
            { icon: Flame, label: 'Best Streak', value: `${maxStreak}x`, color: 'text-streak' },
            { icon: Trophy, label: 'Total Score', value: `${totalScore}`, color: 'text-primary' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-xl p-4 text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Retry
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold bg-primary text-primary-foreground btn-glow transition-all hover:scale-105 active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
