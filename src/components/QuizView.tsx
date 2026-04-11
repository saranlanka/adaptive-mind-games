import { Lightbulb, Timer, Flame, Zap } from 'lucide-react';
import { QuizState } from '@/hooks/useQuiz';

interface QuizViewProps {
  state: QuizState;
  onAnswer: (option: number) => void;
  onHint: () => void;
}

const difficultyColors = {
  easy: 'text-success',
  medium: 'text-warning',
  hard: 'text-destructive',
};

const QuizView = ({ state, onAnswer, onHint }: QuizViewProps) => {
  const { currentQuestion, questionIndex, totalQuestions, timeLeft, streak, score, currentDifficulty, showHint, feedback } = state;

  if (!currentQuestion) return null;

  const timeMax = currentDifficulty === 'easy' ? 20 : currentDifficulty === 'medium' ? 15 : 12;
  const timePercent = (timeLeft / timeMax) * 100;
  const isTimeLow = timeLeft <= 5;

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 max-w-2xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-streak" />
            <span className="font-display font-bold text-foreground">{score}</span>
          </div>
          {streak >= 2 && (
            <div className="flex items-center gap-1 animate-streak-pop">
              <Flame className="w-4 h-4 text-streak" />
              <span className="text-sm font-bold text-streak">{streak}x</span>
            </div>
          )}
        </div>

        <span className={`text-xs font-display font-semibold uppercase tracking-wider ${difficultyColors[currentDifficulty]}`}>
          {currentDifficulty}
        </span>

        <div className={`flex items-center gap-1.5 ${isTimeLow ? 'animate-timer-pulse text-destructive' : 'text-muted-foreground'}`}>
          <Timer className="w-4 h-4" />
          <span className="font-display font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full bg-secondary mb-8">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${(questionIndex / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Timer bar */}
      <div className="w-full h-1 rounded-full bg-secondary/50 mb-8">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${isTimeLow ? 'bg-destructive' : 'bg-accent'}`}
          style={{ width: `${timePercent}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center">
        <div className={`glass-card rounded-2xl p-6 md:p-8 mb-6 ${feedback === 'correct' ? 'animate-correct-flash' : feedback === 'wrong' ? 'animate-wrong-flash' : 'animate-scale-in'}`}>
          <p className="text-xs text-muted-foreground mb-2 font-display">
            Question {questionIndex + 1} of {totalQuestions}
          </p>
          <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className="grid gap-3 mb-6">
          {currentQuestion.options.map((option, i) => {
            let optionClass = "glass-card rounded-xl px-5 py-4 text-left font-body text-foreground transition-all duration-200 hover:scale-[1.02] hover:border-primary/50 active:scale-[0.98] cursor-pointer";
            
            if (feedback !== null) {
              if (i === currentQuestion.correct_answer) {
                optionClass = "rounded-xl px-5 py-4 text-left font-body text-foreground bg-success/20 border border-success/50";
              } else if (i === state.answers[state.answers.length - 1]?.selectedOption && !state.answers[state.answers.length - 1]?.correct) {
                optionClass = "rounded-xl px-5 py-4 text-left font-body text-foreground bg-destructive/20 border border-destructive/50";
              } else {
                optionClass = "rounded-xl px-5 py-4 text-left font-body text-muted-foreground bg-secondary/30 border border-border opacity-50";
              }
            }

            return (
              <button
                key={i}
                onClick={() => !feedback && onAnswer(i)}
                disabled={feedback !== null}
                className={optionClass}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-display font-semibold shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Hint */}
        <div className="text-center">
          <button
            onClick={onHint}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? 'Hide Hint' : 'Need a Hint?'}
          </button>
          {showHint && (
            <div className="mt-3 glass-card rounded-xl p-4 text-sm text-accent animate-fade-in">
              💡 {currentQuestion.hint}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
