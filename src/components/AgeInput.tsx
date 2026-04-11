import { useState } from 'react';
import { User } from 'lucide-react';

interface AgeInputProps {
  onSubmit: (age: number) => void;
  onBack: () => void;
}

const AgeInput = ({ onSubmit, onBack }: AgeInputProps) => {
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const num = parseInt(age);
    if (isNaN(num) || num < 5 || num > 120) {
      setError('Please enter a valid age (5–120)');
      return;
    }
    onSubmit(num);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-8 md:p-12 w-full max-w-md animate-scale-in space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
          <User className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-display font-bold text-foreground">How old are you?</h2>
          <p className="text-sm text-muted-foreground">We'll tailor the experience to your age group.</p>
        </div>

        <div className="space-y-3">
          <input
            type="number"
            value={age}
            onChange={e => { setAge(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter your age"
            min={5}
            max={120}
            className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-center text-2xl font-display font-semibold placeholder:text-muted-foreground/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
            autoFocus
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 rounded-xl font-display font-medium text-muted-foreground bg-secondary hover:bg-secondary/80 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 rounded-xl font-display font-semibold bg-primary text-primary-foreground btn-glow transition-all hover:scale-105 active:scale-95"
          >
            Begin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeInput;
