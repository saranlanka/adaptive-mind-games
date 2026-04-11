export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  category: 'logical' | 'math' | 'technical';
}

export const questions: Question[] = [
  // EASY - Logical
  { id: 1, question: "What comes next in the sequence: 2, 4, 6, 8, ?", options: ["9", "10", "11", "12"], correct_answer: 1, difficulty: "easy", hint: "Each number increases by 2.", category: "logical" },
  { id: 2, question: "If all roses are flowers and some flowers fade quickly, which must be true?", options: ["All roses fade quickly", "Some roses may fade quickly", "No roses fade quickly", "Roses are not flowers"], correct_answer: 1, difficulty: "easy", hint: "Think about what 'some' means—it doesn't apply to all.", category: "logical" },
  { id: 3, question: "Which shape has the most sides?", options: ["Triangle", "Square", "Pentagon", "Hexagon"], correct_answer: 3, difficulty: "easy", hint: "Count the sides: 3, 4, 5, 6.", category: "logical" },
  { id: 4, question: "If you rearrange the letters 'CIFAIPC', you get the name of a(n):", options: ["City", "Animal", "Ocean", "Country"], correct_answer: 2, difficulty: "easy", hint: "Think of the largest body of water.", category: "logical" },
  { id: 5, question: "Odd one out: Dog, Cat, Rose, Fish", options: ["Dog", "Cat", "Rose", "Fish"], correct_answer: 2, difficulty: "easy", hint: "Three are living creatures of a similar kind.", category: "logical" },

  // EASY - Math
  { id: 6, question: "What is 15 × 4?", options: ["50", "55", "60", "65"], correct_answer: 2, difficulty: "easy", hint: "Break it down: 15 × 4 = (10 × 4) + (5 × 4).", category: "math" },
  { id: 7, question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], correct_answer: 2, difficulty: "easy", hint: "12 × 12 = ?", category: "math" },
  { id: 8, question: "What is 25% of 200?", options: ["25", "40", "50", "75"], correct_answer: 2, difficulty: "easy", hint: "25% means one quarter.", category: "math" },

  // EASY - Technical
  { id: 9, question: "What does 'CPU' stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"], correct_answer: 0, difficulty: "easy", hint: "It's the 'brain' of a computer.", category: "technical" },
  { id: 10, question: "Which of these is a web browser?", options: ["Python", "Firefox", "Linux", "Java"], correct_answer: 1, difficulty: "easy", hint: "It's named after an animal.", category: "technical" },

  // MEDIUM - Logical
  { id: 11, question: "A is B's brother. B is C's sister. C is D's father. How is A related to D?", options: ["Uncle", "Father", "Grandfather", "Brother"], correct_answer: 0, difficulty: "medium", hint: "Trace the family tree step by step.", category: "logical" },
  { id: 12, question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?", options: ["100 minutes", "5 minutes", "20 minutes", "1 minute"], correct_answer: 1, difficulty: "medium", hint: "Each machine makes 1 widget in 5 minutes.", category: "logical" },
  { id: 13, question: "What comes next: 1, 1, 2, 3, 5, 8, ?", options: ["11", "12", "13", "15"], correct_answer: 2, difficulty: "medium", hint: "Each number is the sum of the two before it.", category: "logical" },
  { id: 14, question: "If APPLE is coded as 50 (A=1,P=16,P=16,L=12,E=5), what is BAT?", options: ["23", "27", "25", "21"], correct_answer: 0, difficulty: "medium", hint: "B=2, A=1, T=20.", category: "logical" },
  { id: 15, question: "Which number doesn't belong: 2, 3, 5, 9, 11, 13?", options: ["2", "9", "11", "13"], correct_answer: 1, difficulty: "medium", hint: "All others share a mathematical property.", category: "logical" },

  // MEDIUM - Math
  { id: 16, question: "What is the square root of 196?", options: ["12", "13", "14", "15"], correct_answer: 2, difficulty: "medium", hint: "Try squaring the options.", category: "math" },
  { id: 17, question: "If a train travels 240 km in 3 hours, what is its average speed?", options: ["60 km/h", "70 km/h", "80 km/h", "90 km/h"], correct_answer: 2, difficulty: "medium", hint: "Speed = Distance ÷ Time.", category: "math" },
  { id: 18, question: "What is 3⁴?", options: ["27", "64", "81", "108"], correct_answer: 2, difficulty: "medium", hint: "3 × 3 × 3 × 3.", category: "math" },
  { id: 19, question: "A shirt costs $40 after a 20% discount. What was the original price?", options: ["$45", "$48", "$50", "$55"], correct_answer: 2, difficulty: "medium", hint: "80% of original = $40.", category: "math" },

  // MEDIUM - Technical
  { id: 20, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Mode Link", "Home Tool Markup Language"], correct_answer: 0, difficulty: "medium", hint: "It's the standard markup language for web pages.", category: "technical" },
  { id: 21, question: "In binary, what is the decimal value of 1010?", options: ["8", "10", "12", "14"], correct_answer: 1, difficulty: "medium", hint: "Each position is a power of 2: 8+0+2+0.", category: "technical" },

  // HARD - Logical
  { id: 22, question: "Three boxes: one has only apples, one only oranges, one both. All labels are wrong. You pick one fruit from the 'Both' box—it's an apple. What does the 'Oranges' box actually contain?", options: ["Oranges", "Apples", "Both", "Empty"], correct_answer: 2, difficulty: "hard", hint: "Since ALL labels are wrong, work backwards from the known.", category: "logical" },
  { id: 23, question: "What is the next number: 1, 11, 21, 1211, 111221, ?", options: ["312211", "122111", "221121", "112211"], correct_answer: 0, difficulty: "hard", hint: "Each term describes the previous one (look-and-say).", category: "logical" },
  { id: 24, question: "You have 12 balls, one weighs differently. Using a balance scale, what's the minimum weighings to find it?", options: ["2", "3", "4", "5"], correct_answer: 1, difficulty: "hard", hint: "Divide into groups of 3 or 4.", category: "logical" },
  { id: 25, question: "If the day before yesterday was Thursday, what day is the day after tomorrow?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], correct_answer: 1, difficulty: "hard", hint: "Day before yesterday = Thursday → today = ?", category: "logical" },

  // HARD - Math
  { id: 26, question: "What is the sum of interior angles of a heptagon (7 sides)?", options: ["720°", "900°", "1080°", "1260°"], correct_answer: 1, difficulty: "hard", hint: "Formula: (n-2) × 180°.", category: "math" },
  { id: 27, question: "If log₂(x) = 5, what is x?", options: ["10", "25", "32", "64"], correct_answer: 2, difficulty: "hard", hint: "2 raised to what power equals x?", category: "math" },
  { id: 28, question: "What is the probability of rolling two dice and getting a sum of 7?", options: ["1/6", "1/8", "1/9", "1/12"], correct_answer: 0, difficulty: "hard", hint: "Count the combinations: (1,6), (2,5), (3,4)...", category: "math" },

  // HARD - Technical
  { id: 29, question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correct_answer: 1, difficulty: "hard", hint: "The search space halves each step.", category: "technical" },
  { id: 30, question: "In networking, what layer of the OSI model does TCP operate at?", options: ["Network", "Transport", "Session", "Data Link"], correct_answer: 1, difficulty: "hard", hint: "It's layer 4.", category: "technical" },
];

export const QUESTIONS_PER_SESSION = 15;
export const TIME_PER_QUESTION: Record<string, number> = {
  easy: 20,
  medium: 15,
  hard: 12,
};

export function getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Question[] {
  return questions.filter(q => q.difficulty === difficulty);
}
