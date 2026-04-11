import { useState, useCallback, useRef, useEffect } from 'react';
import { questions, Question, QUESTIONS_PER_SESSION, TIME_PER_QUESTION, getQuestionsByDifficulty } from '@/data/questions';

export interface AnswerRecord {
  questionId: number;
  selectedOption: number;
  correct: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  responseTime: number;
}

export interface QuizState {
  currentQuestion: Question | null;
  questionIndex: number;
  totalQuestions: number;
  answers: AnswerRecord[];
  currentDifficulty: 'easy' | 'medium' | 'hard';
  streak: number;
  score: number;
  timeLeft: number;
  isComplete: boolean;
  showHint: boolean;
  feedback: 'correct' | 'wrong' | null;
}

export interface QuizResults {
  iq: number;
  brainType: string;
  brainDescription: string;
  accuracy: number;
  avgTime: number;
  totalScore: number;
  answers: AnswerRecord[];
  maxStreak: number;
}

const DIFFICULTY_ORDER: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];

function pickNextDifficulty(current: 'easy' | 'medium' | 'hard', wasCorrect: boolean, streak: number): 'easy' | 'medium' | 'hard' {
  const idx = DIFFICULTY_ORDER.indexOf(current);
  if (wasCorrect && streak >= 2 && idx < 2) return DIFFICULTY_ORDER[idx + 1];
  if (!wasCorrect && idx > 0) return DIFFICULTY_ORDER[idx - 1];
  return current;
}

function selectQuestion(difficulty: 'easy' | 'medium' | 'hard', usedIds: Set<number>): Question | null {
  const pool = getQuestionsByDifficulty(difficulty).filter(q => !usedIds.has(q.id));
  if (pool.length === 0) {
    // fallback: try any difficulty
    const fallback = questions.filter(q => !usedIds.has(q.id));
    if (fallback.length === 0) return null;
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function calculateResults(answers: AnswerRecord[], age: number): QuizResults {
  const correct = answers.filter(a => a.correct).length;
  const accuracy = correct / answers.length;
  const avgTime = answers.reduce((s, a) => s + a.responseTime, 0) / answers.length;
  
  const difficultyWeights = { easy: 1, medium: 2, hard: 3 };
  const weightedScore = answers.reduce((s, a) => {
    if (!a.correct) return s;
    const timeBonus = Math.max(0, 1 - a.responseTime / (TIME_PER_QUESTION[a.difficulty] * 1000));
    return s + difficultyWeights[a.difficulty] * (1 + timeBonus * 0.5);
  }, 0);

  const maxPossible = answers.length * 3 * 1.5;
  const normalizedScore = weightedScore / maxPossible;
  
  // IQ mapping: 70-160 range
  let iq = Math.round(70 + normalizedScore * 90);
  // Age adjustment (younger gets slight boost for attempting harder content)
  if (age < 14) iq = Math.min(160, iq + 5);
  iq = Math.max(70, Math.min(160, iq));

  let maxStreak = 0, currentStreak = 0;
  answers.forEach(a => {
    if (a.correct) { currentStreak++; maxStreak = Math.max(maxStreak, currentStreak); }
    else currentStreak = 0;
  });

  const hardCorrect = answers.filter(a => a.difficulty === 'hard' && a.correct).length;
  const fastAnswers = answers.filter(a => a.correct && a.responseTime < 5000).length;
  
  let brainType: string, brainDescription: string;
  if (hardCorrect >= 3 && accuracy > 0.7) {
    brainType = "Logical Thinker";
    brainDescription = "You excel at complex reasoning and pattern recognition. Your analytical mind thrives on challenging problems.";
  } else if (fastAnswers > answers.length * 0.5) {
    brainType = "Fast Responder";
    brainDescription = "Your quick thinking and rapid processing set you apart. You make accurate decisions under pressure.";
  } else if (maxStreak >= 5) {
    brainType = "Consistent Performer";
    brainDescription = "Your steady and reliable thinking produces consistent results. You maintain focus and avoid careless errors.";
  } else if (accuracy > 0.6) {
    brainType = "Creative Mind";
    brainDescription = "You approach problems from unique angles. Your creative thinking helps you find solutions others might miss.";
  } else {
    brainType = "Growing Learner";
    brainDescription = "You show great potential for growth. Every challenge you take on builds your cognitive abilities further.";
  }

  return {
    iq,
    brainType,
    brainDescription,
    accuracy: Math.round(accuracy * 100),
    avgTime: Math.round(avgTime / 1000 * 10) / 10,
    totalScore: Math.round(weightedScore * 100),
    answers,
    maxStreak,
  };
}

export function useQuiz(age: number) {
  const [state, setState] = useState<QuizState>({
    currentQuestion: null,
    questionIndex: 0,
    totalQuestions: QUESTIONS_PER_SESSION,
    answers: [],
    currentDifficulty: 'easy',
    streak: 0,
    score: 0,
    timeLeft: TIME_PER_QUESTION.easy,
    isComplete: false,
    showHint: false,
    feedback: null,
  });

  const [results, setResults] = useState<QuizResults | null>(null);
  const usedIds = useRef<Set<number>>(new Set());
  const questionStartTime = useRef<number>(Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback((seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState(s => ({ ...s, timeLeft: seconds }));
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  }, []);

  const loadNextQuestion = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    const q = selectQuestion(difficulty, usedIds.current);
    if (!q) {
      setState(s => ({ ...s, isComplete: true }));
      return;
    }
    usedIds.current.add(q.id);
    questionStartTime.current = Date.now();
    setState(s => ({
      ...s,
      currentQuestion: q,
      currentDifficulty: difficulty,
      showHint: false,
      feedback: null,
    }));
    startTimer(TIME_PER_QUESTION[difficulty]);
  }, [startTimer]);

  const startQuiz = useCallback(() => {
    usedIds.current.clear();
    setState({
      currentQuestion: null,
      questionIndex: 0,
      totalQuestions: QUESTIONS_PER_SESSION,
      answers: [],
      currentDifficulty: 'easy',
      streak: 0,
      score: 0,
      timeLeft: TIME_PER_QUESTION.easy,
      isComplete: false,
      showHint: false,
      feedback: null,
    });
    setResults(null);
    loadNextQuestion('easy');
  }, [loadNextQuestion]);

  const submitAnswer = useCallback((selectedOption: number) => {
    if (!state.currentQuestion || state.feedback) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const responseTime = Date.now() - questionStartTime.current;
    const correct = selectedOption === state.currentQuestion.correct_answer;
    const record: AnswerRecord = {
      questionId: state.currentQuestion.id,
      selectedOption,
      correct,
      difficulty: state.currentDifficulty,
      responseTime,
    };

    const newStreak = correct ? state.streak + 1 : 0;
    const scoreAdd = correct ? (state.currentDifficulty === 'hard' ? 30 : state.currentDifficulty === 'medium' ? 20 : 10) : 0;
    const newAnswers = [...state.answers, record];
    const newIndex = state.questionIndex + 1;

    setState(s => ({
      ...s,
      feedback: correct ? 'correct' : 'wrong',
      streak: newStreak,
      score: s.score + scoreAdd,
      answers: newAnswers,
      questionIndex: newIndex,
    }));

    setTimeout(() => {
      if (newIndex >= QUESTIONS_PER_SESSION) {
        setState(s => ({ ...s, isComplete: true, feedback: null }));
        setResults(calculateResults(newAnswers, age));
      } else {
        const nextDiff = pickNextDifficulty(state.currentDifficulty, correct, newStreak);
        loadNextQuestion(nextDiff);
      }
    }, 1200);
  }, [state, age, loadNextQuestion]);

  // Handle timeout
  useEffect(() => {
    if (state.timeLeft === 0 && state.currentQuestion && !state.feedback) {
      submitAnswer(-1); // timeout = wrong answer
    }
  }, [state.timeLeft, state.currentQuestion, state.feedback, submitAnswer]);

  const toggleHint = useCallback(() => {
    setState(s => ({ ...s, showHint: !s.showHint }));
  }, []);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return { state, results, startQuiz, submitAnswer, toggleHint };
}
