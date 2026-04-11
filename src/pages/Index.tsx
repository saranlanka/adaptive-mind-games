import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import AgeInput from '@/components/AgeInput';
import QuizView from '@/components/QuizView';
import ResultsPage from '@/components/ResultsPage';
import { useQuiz } from '@/hooks/useQuiz';

type Screen = 'landing' | 'age' | 'quiz' | 'results';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('landing');
  const [age, setAge] = useState(25);
  const quiz = useQuiz(age);

  const handleAgeSubmit = (userAge: number) => {
    setAge(userAge);
    setScreen('quiz');
    // Small delay to ensure state is set
    setTimeout(() => quiz.startQuiz(), 50);
  };

  const handleRestart = () => {
    setScreen('landing');
  };

  if (screen === 'landing') {
    return <LandingPage onStart={() => setScreen('age')} />;
  }

  if (screen === 'age') {
    return <AgeInput onSubmit={handleAgeSubmit} onBack={() => setScreen('landing')} />;
  }

  if (screen === 'quiz' && quiz.state.isComplete && quiz.results) {
    return <ResultsPage results={quiz.results} onRestart={handleRestart} />;
  }

  return (
    <QuizView
      state={quiz.state}
      onAnswer={quiz.submitAnswer}
      onHint={quiz.toggleHint}
    />
  );
};

export default Index;
