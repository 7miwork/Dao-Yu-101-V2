// Dao-Yu-101 Platform Data Model
// Design: Pixel Archipelago — Minecraft Education Block Coding

export type Theme = 'island' | 'minecraft' | 'modern';
export type UserRole = 'student' | 'parent' | 'teacher' | 'admin' | 'school' | 'sales' | 'support';
export type Language = 'en' | 'de' | 'fr' | 'es' | 'ar';

export interface Lesson {
  id: number;
  title: string;
  objective: string;
  content: string;
  task: string;
  quiz: Quiz;
  xpReward: number;
  coinReward: number;
  duration: number; // minutes
  type: 'video' | 'text' | 'interactive';
}

export interface Quiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Island {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  lessons: Lesson[];
  xpRequired: number; // XP needed to unlock
  totalXP: number;
  image?: string;
}

export interface Archipelago {
  id: string;
  name: string;
  subject: string;
  description: string;
  islands: Island[];
  color: string;
  image?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  coinReward: number;
  condition: string;
}

export interface UserProgress {
  userId: string;
  role: UserRole;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  completedLessons: number[];
  completedIslands: number[];
  achievements: string[];
  currentIsland: number;
  currentLesson: number;
  streak: number;
  totalTimeMinutes: number;
  language: Language;
  theme: Theme;
}

// ─── ISLAND 1: Introduction to Minecraft Coding (Full 15 Lessons) ───────────
export const island1Lessons: Lesson[] = [
  {
    id: 1, title: "What is Coding?",
    objective: "Understand what coding is and why it matters",
    content: "Coding is giving instructions to a computer. Just like you follow a recipe to bake a cake, a computer follows code to do tasks. In Minecraft Education, you'll use blocks of code — just like Minecraft blocks — to make things happen!",
    task: "Open Minecraft Education and find the 'Code Builder' button. Take a screenshot of the Code Builder interface.",
    quiz: { question: "What is coding?", options: ["Drawing pictures on a computer", "Giving step-by-step instructions to a computer", "Playing video games", "Typing fast on a keyboard"], correct: 1, explanation: "Coding means writing instructions that a computer can follow, step by step!" },
    xpReward: 20, coinReward: 5, duration: 10, type: 'text'
  },
  {
    id: 2, title: "What is Minecraft Education?",
    objective: "Learn about Minecraft Education Edition and its coding tools",
    content: "Minecraft Education is a special version of Minecraft made for learning! It has a Code Builder where you can write code using blocks — no typing needed. Your code controls an Agent (a robot helper) that can build, mine, and explore for you.",
    task: "Find the Agent in your Minecraft Education world. Try clicking on it. What happens?",
    quiz: { question: "What is the Agent in Minecraft Education?", options: ["A monster that attacks you", "A robot helper you can program", "A type of block", "A special sword"], correct: 1, explanation: "The Agent is your programmable robot helper in Minecraft Education!" },
    xpReward: 20, coinReward: 5, duration: 10, type: 'video'
  },
  {
    id: 3, title: "Your First Block Action",
    objective: "Place your first code block and run a program",
    content: "In MakeCode, you drag and drop colored blocks to create programs. The 'on start' block runs your code when the game begins. Let's make the Agent say 'Hello World!' — your very first program!",
    task: "Open Code Builder → drag a 'print' block inside 'on start' → type 'Hello World!' → click Run. Did it work?",
    quiz: { question: "Where do you put blocks to make them run at the start?", options: ["In the inventory", "Inside the 'on start' block", "On the ground", "In a chest"], correct: 1, explanation: "The 'on start' block is where your code begins running!" },
    xpReward: 25, coinReward: 8, duration: 15, type: 'interactive'
  },
  {
    id: 4, title: "The Code Builder Interface",
    objective: "Navigate the MakeCode interface confidently",
    content: "The Code Builder has three main areas: the Block Toolbox (left), the Workspace (middle), and the Game Preview (right). Blocks are sorted by color: blue = Agent actions, green = loops, yellow = logic, red = variables!",
    task: "Find one block from each color category and drag them to the workspace. What do they do?",
    quiz: { question: "What color are Agent action blocks in MakeCode?", options: ["Red", "Green", "Blue", "Yellow"], correct: 2, explanation: "Blue blocks control your Agent — they're the most important blocks for Minecraft coding!" },
    xpReward: 20, coinReward: 5, duration: 12, type: 'interactive'
  },
  {
    id: 5, title: "Blocks vs. Text Code",
    objective: "Understand the difference between block coding and text coding",
    content: "Block coding uses colorful puzzle pieces you snap together — perfect for beginners! Text coding uses typed commands like Python or JavaScript. MakeCode lets you switch between both! As you get better, you can peek at the JavaScript version of your blocks.",
    task: "Build a simple block program, then click the 'JavaScript' tab. Can you spot your code in text form?",
    quiz: { question: "What is an advantage of block coding for beginners?", options: ["It runs faster", "No typing needed — just drag and drop", "It uses more memory", "It only works in Minecraft"], correct: 1, explanation: "Block coding is perfect for beginners because you drag and drop instead of typing!" },
    xpReward: 20, coinReward: 5, duration: 12, type: 'text'
  },
  {
    id: 6, title: "Meet the Agent",
    objective: "Learn what the Agent can do and how to control it",
    content: "The Agent is your coding robot! It can: move forward/backward/left/right, turn, place blocks, break blocks, collect items, and even detect what's around it. Think of it as your hands inside the Minecraft world — controlled by your code!",
    task: "Use the 'agent move forward' block to make your Agent walk 3 steps forward. What did it do?",
    quiz: { question: "Which of these can the Agent NOT do?", options: ["Place blocks", "Move forward", "Fly in creative mode", "Break blocks"], correct: 2, explanation: "The Agent walks and interacts with the world but doesn't fly — you need to plan its path carefully!" },
    xpReward: 25, coinReward: 8, duration: 15, type: 'interactive'
  },
  {
    id: 7, title: "Moving the Agent",
    objective: "Use movement blocks to navigate the Agent",
    content: "Movement blocks include: move forward, move back, move left, move right, turn left, turn right. The Agent always faces a direction — North, South, East, or West. Moving 'forward' means in the direction it's currently facing!",
    task: "Make the Agent walk in a square: forward 4, turn right, forward 4, turn right, forward 4, turn right, forward 4. Did it return to start?",
    quiz: { question: "If the Agent faces North and turns right, which direction does it face?", options: ["North", "South", "East", "West"], correct: 2, explanation: "Turning right from North means you now face East — like a compass!" },
    xpReward: 30, coinReward: 10, duration: 18, type: 'interactive'
  },
  {
    id: 8, title: "Placing Your First Block",
    objective: "Use the Agent to place blocks in the world",
    content: "The 'agent place on move' block makes the Agent place a block every time it moves. You can also use 'agent place block' to place a specific block type. First, give the Agent blocks using 'agent set item' — just like filling its inventory!",
    task: "Give the Agent 10 grass blocks, then make it walk forward 5 steps with 'place on move' turned on. You should see a trail of grass!",
    quiz: { question: "What must you do before the Agent can place blocks?", options: ["Press the spacebar", "Give it blocks first", "Turn off creative mode", "Build a house"], correct: 1, explanation: "The Agent needs blocks in its inventory before it can place them — just like you need blocks in your hotbar!" },
    xpReward: 30, coinReward: 10, duration: 18, type: 'interactive'
  },
  {
    id: 9, title: "Breaking Blocks",
    objective: "Program the Agent to break and collect blocks",
    content: "The 'agent destroy' block makes the Agent break the block in front of it. 'agent collect all' picks up dropped items. You can use this to mine automatically! Combine move + destroy to create a mining robot.",
    task: "Build a wall of 5 dirt blocks. Program the Agent to destroy all 5 blocks automatically. Collect the dirt!",
    quiz: { question: "What does 'agent collect all' do?", options: ["Makes the Agent build a collection", "Picks up all nearby dropped items", "Destroys all blocks", "Teleports the Agent"], correct: 1, explanation: "After breaking blocks, use 'agent collect all' to pick up the dropped items!" },
    xpReward: 30, coinReward: 10, duration: 18, type: 'interactive'
  },
  {
    id: 10, title: "Teleporting the Agent",
    objective: "Use teleport commands to position the Agent precisely",
    content: "Instead of walking step by step, you can teleport the Agent to exact coordinates! Use 'agent teleport to player' to bring it to you, or 'agent teleport' with X, Y, Z coordinates. This is useful for large builds!",
    task: "Find your current coordinates (press F3 or look at the debug screen). Teleport the Agent to your exact location. Did it appear next to you?",
    quiz: { question: "What are the three coordinates used to describe a position in Minecraft?", options: ["A, B, C", "X, Y, Z", "Up, Down, Side", "Red, Green, Blue"], correct: 1, explanation: "X (East/West), Y (Up/Down), and Z (North/South) — these three numbers describe every position in Minecraft!" },
    xpReward: 30, coinReward: 10, duration: 18, type: 'interactive'
  },
  {
    id: 11, title: "Chat Commands",
    objective: "Trigger code using Minecraft chat commands",
    content: "The 'on chat command' block runs your code when you type a word in the Minecraft chat! Type 'build' in chat → your building code runs. Type 'mine' → your mining code runs. This is like creating your own game commands!",
    task: "Create a chat command called 'hello' that makes the Agent say 'Hello from my code!' in the chat.",
    quiz: { question: "How do you trigger an 'on chat command' block?", options: ["By pressing a button", "By typing the command word in Minecraft chat", "By clicking the Agent", "By building a redstone circuit"], correct: 1, explanation: "Type the command word in Minecraft chat and your code runs automatically!" },
    xpReward: 35, coinReward: 12, duration: 20, type: 'interactive'
  },
  {
    id: 12, title: "Debugging Your Code",
    objective: "Learn how to find and fix errors in your code",
    content: "Bugs are mistakes in code that make it do the wrong thing. Debugging means finding and fixing them! Common bugs: Agent facing wrong direction, not enough blocks in inventory, wrong number of steps. Always test your code in small pieces!",
    task: "This buggy code should make a 3×3 square but it doesn't work. Find the 2 bugs and fix them! (Hint: check the number of steps and turns)",
    quiz: { question: "What is a 'bug' in programming?", options: ["An insect in your computer", "A mistake in code that causes wrong behavior", "A type of block in Minecraft", "A feature of MakeCode"], correct: 1, explanation: "A bug is an error in your code. Debugging means finding and fixing those errors!" },
    xpReward: 35, coinReward: 12, duration: 20, type: 'interactive'
  },
  {
    id: 13, title: "Saving and Sharing Code",
    objective: "Save your programs and share them with others",
    content: "In MakeCode, your code saves automatically in the browser. You can also download it as a .mcworld file to share with friends, or copy a share link. Your teacher can see your code through the classroom dashboard!",
    task: "Save your favorite program from this island. Share the link with a classmate and try running their code!",
    quiz: { question: "What file format does MakeCode use to save Minecraft Education projects?", options: [".txt", ".mcworld", ".py", ".exe"], correct: 1, explanation: ".mcworld files contain your Minecraft world AND your code — perfect for sharing!" },
    xpReward: 25, coinReward: 8, duration: 12, type: 'text'
  },
  {
    id: 14, title: "Review: What We Learned",
    objective: "Review all concepts from Island 1",
    content: "Amazing work! Let's recap what you've learned on Introduction Island: ✓ What coding is ✓ Minecraft Education & MakeCode ✓ The Agent and its abilities ✓ Moving, placing, breaking blocks ✓ Chat commands ✓ Debugging. You're ready for Island 2!",
    task: "Create a 'showcase' program that demonstrates 3 different things you learned. Make the Agent do something impressive!",
    quiz: { question: "Which block runs code when the game starts?", options: ["on chat command", "on start", "forever", "on player walk"], correct: 1, explanation: "'on start' runs your code automatically when the Minecraft world loads!" },
    xpReward: 40, coinReward: 15, duration: 20, type: 'interactive'
  },
  {
    id: 15, title: "Mini Project: Agent Adventure",
    objective: "Build a complete mini-project using all Island 1 concepts",
    content: "It's project time! Create an 'Agent Adventure' — a small automated Minecraft experience. Your Agent should: start at a home base, walk a path, collect resources, build a small structure, and return home. Use chat commands to control it!",
    task: "Build your Agent Adventure! Requirements: 1) Chat command to start 2) Agent moves at least 10 steps 3) Agent places at least 5 blocks 4) Agent returns to start position. Submit your .mcworld file!",
    quiz: { question: "What makes a good coding project?", options: ["Using as many blocks as possible", "Clear goal, working code, and testing", "Making it very complicated", "Using only one type of block"], correct: 1, explanation: "Great projects have a clear goal, working code that you've tested, and are easy for others to understand!" },
    xpReward: 100, coinReward: 50, duration: 45, type: 'interactive'
  }
];

// ─── ALL ISLANDS ─────────────────────────────────────────────────────────────
export const programmingIslands: Island[] = [
  {
    id: 1, name: "Introduction Island", description: "What is coding? Meet Minecraft Education and your Agent!",
    icon: "🏝️", color: "#5DA832", bgColor: "#E8F5E9",
    lessons: island1Lessons, xpRequired: 0, totalXP: 500,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663474460314/C3yzfyLqBUhAPsbQTbr9Ek/island-intro-fcFvnXT775ZBv5L6xE3rjN.webp"
  },
  {
    id: 2, name: "Movement & Controls", description: "Navigate your Agent through the world with precision!",
    icon: "🧭", color: "#1565C0", bgColor: "#E3F2FD",
    lessons: [], xpRequired: 500, totalXP: 550,
  },
  {
    id: 3, name: "Loops Island", description: "Repeat actions to build amazing structures automatically!",
    icon: "🔄", color: "#6A1B9A", bgColor: "#F3E5F5",
    lessons: [], xpRequired: 1050, totalXP: 600,
  },
  {
    id: 4, name: "Conditions Island", description: "Make decisions with If/Else — give your code a brain!",
    icon: "🔀", color: "#E65100", bgColor: "#FFF3E0",
    lessons: [], xpRequired: 1650, totalXP: 650,
  },
  {
    id: 5, name: "Variables Island", description: "Store values and create counters for game logic!",
    icon: "📦", color: "#00695C", bgColor: "#E0F2F1",
    lessons: [], xpRequired: 2300, totalXP: 700,
  },
  {
    id: 6, name: "Functions Island", description: "Write reusable code blocks to organize your programs!",
    icon: "⚙️", color: "#4527A0", bgColor: "#EDE7F6",
    lessons: [], xpRequired: 3000, totalXP: 750,
  },
  {
    id: 7, name: "Events Island", description: "Trigger actions based on player interactions and game events!",
    icon: "⚡", color: "#F57F17", bgColor: "#FFFDE7",
    lessons: [], xpRequired: 3750, totalXP: 800,
  },
  {
    id: 8, name: "Building Automation", description: "Create auto-building systems for incredible structures!",
    icon: "🏗️", color: "#BF360C", bgColor: "#FBE9E7",
    lessons: [], xpRequired: 4550, totalXP: 850,
  },
  {
    id: 9, name: "Game Mechanics", description: "Build mini-games with rules, scoring, and player interactions!",
    icon: "🎮", color: "#1B5E20", bgColor: "#E8F5E9",
    lessons: [], xpRequired: 5400, totalXP: 900,
  },
  {
    id: 10, name: "Final Project Island", description: "Build your complete Minecraft project using everything you've learned!",
    icon: "🏆", color: "#B71C1C", bgColor: "#FFEBEE",
    lessons: [], xpRequired: 6300, totalXP: 1000,
  }
];

export const programmingArchipelago: Archipelago = {
  id: 'programming',
  name: 'Programming Archipelago',
  subject: 'Minecraft Education Block Coding',
  description: 'Learn programming fundamentals through Minecraft Education and MakeCode block coding. Perfect for beginners — no prior coding experience needed!',
  islands: programmingIslands,
  color: '#5DA832',
  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663474460314/C3yzfyLqBUhAPsbQTbr9Ek/world-map-Si4q7oLAMxC26psNBdgtDJ.webp"
};

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────────────────
export const achievements: Achievement[] = [
  // Lesson milestones
  { id: 'first_lesson', name: 'First Step', description: 'Complete your first lesson', icon: '⭐', xpReward: 50, coinReward: 10, condition: 'lessons >= 1' },
  { id: 'five_lessons', name: 'Getting Started', description: 'Complete 5 lessons', icon: '🌟', xpReward: 75, coinReward: 15, condition: 'lessons >= 5' },
  { id: 'code_warrior', name: 'Code Warrior', description: 'Complete 10 lessons', icon: '⚔️', xpReward: 100, coinReward: 25, condition: 'lessons >= 10' },
  { id: 'dedicated_learner', name: 'Dedicated Learner', description: 'Complete 25 lessons', icon: '📚', xpReward: 200, coinReward: 50, condition: 'lessons >= 25' },
  { id: 'coding_master', name: 'Coding Master', description: 'Complete 50 lessons', icon: '🎓', xpReward: 400, coinReward: 100, condition: 'lessons >= 50' },
  { id: 'legendary_coder', name: 'Legendary Coder', description: 'Complete 100 lessons', icon: '🏆', xpReward: 800, coinReward: 200, condition: 'lessons >= 100' },
  
  // Island milestones
  { id: 'first_island', name: 'Island Explorer', description: 'Complete your first island', icon: '🏝️', xpReward: 100, coinReward: 25, condition: 'islands >= 1' },
  { id: 'loop_master', name: 'Loop Master', description: 'Complete Loops Island', icon: '💚', xpReward: 200, coinReward: 50, condition: 'island >= 3' },
  { id: 'logic_wizard', name: 'Logic Wizard', description: 'Complete Conditions Island', icon: '🔴', xpReward: 250, coinReward: 60, condition: 'island >= 4' },
  { id: 'island_conqueror', name: 'Island Conqueror', description: 'Complete 5 islands', icon: '🔵', xpReward: 500, coinReward: 100, condition: 'islands >= 5' },
  { id: 'archipelago_champion', name: 'Archipelago Champion', description: 'Complete all 10 islands!', icon: '👑', xpReward: 1000, coinReward: 250, condition: 'islands >= 10' },
  
  // Streak achievements
  { id: 'streak_3', name: 'On a Roll', description: '3-day learning streak', icon: '🔥', xpReward: 50, coinReward: 10, condition: 'streak >= 3' },
  { id: 'streak_7', name: 'Week Warrior', description: '7-day learning streak', icon: '🔥', xpReward: 150, coinReward: 30, condition: 'streak >= 7' },
  { id: 'streak_14', name: 'Fortnight Fighter', description: '14-day learning streak', icon: '💪', xpReward: 300, coinReward: 60, condition: 'streak >= 14' },
  { id: 'streak_30', name: 'Monthly Master', description: '30-day learning streak', icon: '🏅', xpReward: 500, coinReward: 100, condition: 'streak >= 30' },
  
  // Quiz achievements
  { id: 'quiz_perfect', name: 'Perfect Score', description: 'Get 100% on a quiz', icon: '💯', xpReward: 75, coinReward: 20, condition: 'perfect_quiz' },
  { id: 'quiz_ace', name: 'Quiz Ace', description: 'Get 100% on 5 quizzes', icon: '🎯', xpReward: 200, coinReward: 50, condition: 'perfect_quizzes >= 5' },
  { id: 'quiz_champion', name: 'Quiz Champion', description: 'Get 100% on 10 quizzes', icon: '🥇', xpReward: 400, coinReward: 100, condition: 'perfect_quizzes >= 10' },
  
  // XP milestones
  { id: 'xp_100', name: 'XP Hunter', description: 'Earn 100 XP', icon: '✨', xpReward: 25, coinReward: 5, condition: 'xp >= 100' },
  { id: 'xp_500', name: 'XP Collector', description: 'Earn 500 XP', icon: '💎', xpReward: 50, coinReward: 10, condition: 'xp >= 500' },
  { id: 'xp_1000', name: 'XP Master', description: 'Earn 1000 XP', icon: '🔮', xpReward: 100, coinReward: 25, condition: 'xp >= 1000' },
  { id: 'xp_5000', name: 'XP Legend', description: 'Earn 5000 XP', icon: '🌈', xpReward: 250, coinReward: 50, condition: 'xp >= 5000' },
  
  // Coin milestones
  { id: 'coins_100', name: 'Coin Collector', description: 'Earn 100 coins', icon: '🪙', xpReward: 50, coinReward: 10, condition: 'coins >= 100' },
  { id: 'coins_500', name: 'Coin Hoarder', description: 'Earn 500 coins', icon: '💰', xpReward: 100, coinReward: 25, condition: 'coins >= 500' },
  { id: 'coins_1000', name: 'Rich Coder', description: 'Earn 1000 coins', icon: '🤑', xpReward: 200, coinReward: 50, condition: 'coins >= 1000' },
  
  // Special achievements
  { id: 'night_owl', name: 'Night Owl', description: 'Complete a lesson after 10 PM', icon: '🦉', xpReward: 50, coinReward: 10, condition: 'night_lesson' },
  { id: 'early_bird', name: 'Early Bird', description: 'Complete a lesson before 7 AM', icon: '🐦', xpReward: 50, coinReward: 10, condition: 'morning_lesson' },
  { id: 'speed_demon', name: 'Speed Demon', description: 'Complete a lesson in under 5 minutes', icon: '⚡', xpReward: 75, coinReward: 15, condition: 'fast_lesson' },
  { id: 'shopaholic', name: 'Shopaholic', description: 'Purchase 3 items from the shop', icon: '🛒', xpReward: 100, coinReward: 25, condition: 'purchases >= 3' },
  { id: 'avatar_collector', name: 'Avatar Collector', description: 'Own 5 different avatars', icon: '👤', xpReward: 150, coinReward: 30, condition: 'avatars >= 5' },
  { id: 'theme_master', name: 'Theme Master', description: 'Own 5 different themes', icon: '🎨', xpReward: 150, coinReward: 30, condition: 'themes >= 5' },
];

// ─── DEMO USER ────────────────────────────────────────────────────────────────
export const demoStudent: UserProgress = {
  userId: 'demo-student-1',
  role: 'student',
  name: 'Alex Coder',
  avatar: '🧑‍💻',
  level: 3,
  xp: 720,
  xpToNextLevel: 1000,
  coins: 145,
  completedLessons: [1, 2, 3, 4, 5, 6, 7],
  completedIslands: [],
  achievements: ['first_lesson', 'code_warrior'],
  currentIsland: 1,
  currentLesson: 8,
  streak: 5,
  totalTimeMinutes: 180,
  language: 'en',
  theme: 'island',
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
export const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.world': 'World Map',
    'nav.dashboard': 'Dashboard',
    'nav.shop': 'Shop',
    'nav.achievements': 'Achievements',
    'hero.title': 'Learn to Code',
    'hero.subtitle': 'Through Minecraft Adventures',
    'hero.cta': 'Start Your Journey',
    'hero.cta2': 'Explore the World',
    'island.locked': 'Locked',
    'island.unlocked': 'Unlocked',
    'island.completed': 'Completed',
    'island.lessons': 'lessons',
    'lesson.start': 'Start Lesson',
    'lesson.next': 'Next Lesson',
    'lesson.complete': 'Complete',
    'quiz.check': 'Check Answer',
    'quiz.correct': 'Correct!',
    'quiz.wrong': 'Try Again',
    'xp': 'XP',
    'coins': 'Coins',
    'level': 'Level',
    'streak': 'Day Streak',
    'shop.title': 'Island Shop',
    'shop.buy': 'Purchase',
    'dashboard.progress': 'My Progress',
    'dashboard.recent': 'Recent Activity',
    'achievements.title': 'Achievements',
    'theme.island': 'Island Theme',
    'theme.minecraft': 'Minecraft Theme',
    'theme.modern': 'Modern Theme',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.world': 'Weltkarte',
    'nav.dashboard': 'Dashboard',
    'nav.shop': 'Shop',
    'nav.achievements': 'Erfolge',
    'hero.title': 'Programmieren lernen',
    'hero.subtitle': 'Durch Minecraft-Abenteuer',
    'hero.cta': 'Reise beginnen',
    'hero.cta2': 'Welt erkunden',
    'island.locked': 'Gesperrt',
    'island.unlocked': 'Entsperrt',
    'island.completed': 'Abgeschlossen',
    'island.lessons': 'Lektionen',
    'lesson.start': 'Lektion starten',
    'lesson.next': 'Nächste Lektion',
    'lesson.complete': 'Abschließen',
    'quiz.check': 'Antwort prüfen',
    'quiz.correct': 'Richtig!',
    'quiz.wrong': 'Nochmal versuchen',
    'xp': 'EP',
    'coins': 'Münzen',
    'level': 'Level',
    'streak': 'Tage-Serie',
    'shop.title': 'Insel-Shop',
    'shop.buy': 'Kaufen',
    'dashboard.progress': 'Mein Fortschritt',
    'dashboard.recent': 'Letzte Aktivität',
    'achievements.title': 'Erfolge',
    'theme.island': 'Insel-Thema',
    'theme.minecraft': 'Minecraft-Thema',
    'theme.modern': 'Modernes Thema',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.world': 'Carte du monde',
    'nav.dashboard': 'Tableau de bord',
    'nav.shop': 'Boutique',
    'nav.achievements': 'Succès',
    'hero.title': 'Apprendre à coder',
    'hero.subtitle': 'À travers des aventures Minecraft',
    'hero.cta': 'Commencer le voyage',
    'hero.cta2': 'Explorer le monde',
    'island.locked': 'Verrouillé',
    'island.unlocked': 'Déverrouillé',
    'island.completed': 'Terminé',
    'island.lessons': 'leçons',
    'lesson.start': 'Commencer la leçon',
    'lesson.next': 'Leçon suivante',
    'lesson.complete': 'Terminer',
    'quiz.check': 'Vérifier la réponse',
    'quiz.correct': 'Correct!',
    'quiz.wrong': 'Réessayer',
    'xp': 'XP',
    'coins': 'Pièces',
    'level': 'Niveau',
    'streak': 'Jours consécutifs',
    'shop.title': 'Boutique des îles',
    'shop.buy': 'Acheter',
    'dashboard.progress': 'Ma progression',
    'dashboard.recent': 'Activité récente',
    'achievements.title': 'Succès',
    'theme.island': 'Thème île',
    'theme.minecraft': 'Thème Minecraft',
    'theme.modern': 'Thème moderne',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.world': 'Mapa del mundo',
    'nav.dashboard': 'Panel',
    'nav.shop': 'Tienda',
    'nav.achievements': 'Logros',
    'hero.title': 'Aprende a programar',
    'hero.subtitle': 'A través de aventuras Minecraft',
    'hero.cta': 'Comenzar el viaje',
    'hero.cta2': 'Explorar el mundo',
    'island.locked': 'Bloqueado',
    'island.unlocked': 'Desbloqueado',
    'island.completed': 'Completado',
    'island.lessons': 'lecciones',
    'lesson.start': 'Iniciar lección',
    'lesson.next': 'Siguiente lección',
    'lesson.complete': 'Completar',
    'quiz.check': 'Verificar respuesta',
    'quiz.correct': '¡Correcto!',
    'quiz.wrong': 'Inténtalo de nuevo',
    'xp': 'XP',
    'coins': 'Monedas',
    'level': 'Nivel',
    'streak': 'Días seguidos',
    'shop.title': 'Tienda de islas',
    'shop.buy': 'Comprar',
    'dashboard.progress': 'Mi progreso',
    'dashboard.recent': 'Actividad reciente',
    'achievements.title': 'Logros',
    'theme.island': 'Tema isla',
    'theme.minecraft': 'Tema Minecraft',
    'theme.modern': 'Tema moderno',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.world': 'خريطة العالم',
    'nav.dashboard': 'لوحة التحكم',
    'nav.shop': 'المتجر',
    'nav.achievements': 'الإنجازات',
    'hero.title': 'تعلم البرمجة',
    'hero.subtitle': 'من خلال مغامرات ماينكرافت',
    'hero.cta': 'ابدأ رحلتك',
    'hero.cta2': 'استكشف العالم',
    'island.locked': 'مقفل',
    'island.unlocked': 'مفتوح',
    'island.completed': 'مكتمل',
    'island.lessons': 'دروس',
    'lesson.start': 'ابدأ الدرس',
    'lesson.next': 'الدرس التالي',
    'lesson.complete': 'إكمال',
    'quiz.check': 'تحقق من الإجابة',
    'quiz.correct': 'صحيح!',
    'quiz.wrong': 'حاول مرة أخرى',
    'xp': 'نقاط',
    'coins': 'عملات',
    'level': 'المستوى',
    'streak': 'أيام متتالية',
    'shop.title': 'متجر الجزر',
    'shop.buy': 'شراء',
    'dashboard.progress': 'تقدمي',
    'dashboard.recent': 'النشاط الأخير',
    'achievements.title': 'الإنجازات',
    'theme.island': 'ثيم الجزيرة',
    'theme.minecraft': 'ثيم ماينكرافت',
    'theme.modern': 'الثيم الحديث',
  }
};

export const LEVEL_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000, 5500];
export function getLevelFromXP(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}
export function getXPForNextLevel(level: number): number {
  return LEVEL_THRESHOLDS[Math.min(level, LEVEL_THRESHOLDS.length - 1)] || 9999;
}
