import { useState } from "react";

const CALENDLY_URL = "https://calendly.com/YOUR_LINK_HERE";

interface Question {
  id: number;
  text: string;
  options: { label: string; value: string }[];
}

interface Result {
  title: string;
  description: string;
  recommendations: string[];
  cta: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Where are you in your career right now?",
    options: [
      { label: "Actively job searching", value: "searching" },
      { label: "Employed but unhappy", value: "unhappy" },
      { label: "Considering a career pivot", value: "pivoting" },
      { label: "Ready for leadership/promotion", value: "leadership" },
    ],
  },
  {
    id: 2,
    text: "What's your biggest frustration when it comes to your career?",
    options: [
      { label: "I don't know what I want", value: "clarity" },
      { label: "I know what I want but don't know how to get there", value: "strategy" },
      { label: "I apply but don't get responses or offers", value: "visibility" },
      { label: "Self-doubt and fear hold me back", value: "mindset" },
    ],
  },
  {
    id: 3,
    text: "How would you describe your resume and LinkedIn profile?",
    options: [
      { label: "Outdated or nonexistent", value: "outdated" },
      { label: "Basic—it exists but isn't strategic", value: "basic" },
      { label: "Good, but not getting results", value: "inactive" },
      { label: "Strong—that's not my issue", value: "strong" },
    ],
  },
  {
    id: 4,
    text: "How do you feel about interviews?",
    options: [
      { label: "Terrified—I freeze up", value: "fear" },
      { label: "Nervous but I manage", value: "nervous" },
      { label: "I rarely get interviews to begin with", value: "no_interviews" },
      { label: "Confident—interviews aren't the problem", value: "confident" },
    ],
  },
  {
    id: 5,
    text: "What would a career win look like for you in the next 6 months?",
    options: [
      { label: "Land a new job I actually love", value: "new_job" },
      { label: "Get promoted or recognized", value: "promotion" },
      { label: "Successfully pivot to a new field", value: "pivot" },
      { label: "Feel clear, confident, and in control", value: "confidence" },
    ],
  },
];

const results: Record<string, Result> = {
  clarity: {
    title: "You Need Clarity First",
    description:
      "You're not lost—you're at a crossroads. Before strategy, before resumes, you need to reconnect with what truly drives you. The good news: this is Erica's favorite place to start.",
    recommendations: [
      "Complete a values and strengths assessment",
      "Explore The Pathway Method's Discovery phase",
      "Book a clarity-focused discovery call with Erica",
    ],
    cta: "Get Clarity with a Free Call",
  },
  strategy: {
    title: "You Need a Clearer Strategy",
    description:
      "You have the vision but need the roadmap. A targeted job search strategy, a standout personal brand, and a clear action plan are what will bridge the gap between knowing and going.",
    recommendations: [
      "Audit your resume and LinkedIn for strategic gaps",
      "Define your target companies and roles",
      "Build a 30-60-90 day job search plan",
    ],
    cta: "Build Your Strategy — Free Call",
  },
  visibility: {
    title: "Your Visibility Is the Issue",
    description:
      "You're qualified—but you're invisible. Your resume, LinkedIn, and personal brand aren't working hard enough for you. This is very fixable with the right strategy.",
    recommendations: [
      "Overhaul resume with an ATS-optimized, story-driven approach",
      "Optimize LinkedIn with keyword-rich positioning",
      "Activate your network with a targeted outreach plan",
    ],
    cta: "Fix Your Visibility — Free Call",
  },
  mindset: {
    title: "Your Mindset Is the Biggest Block",
    description:
      "You have more than enough talent—imposter syndrome, fear, and self-doubt are the real obstacles. Erica specializes in the inner game of career success, and this is where the biggest breakthroughs happen.",
    recommendations: [
      "Work through The Pathway Method's 'Break Through Fear' phase",
      "Identify and reframe the core limiting belief holding you back",
      "Build a daily confidence practice to show up fully",
    ],
    cta: "Break Through the Block — Free Call",
  },
  default: {
    title: "You're Ready for Your Next Level",
    description:
      "Whether you want a new role, a promotion, or a full career transformation—you have what it takes. What you need now is the right strategy, the right mindset, and someone in your corner who knows how to get you there.",
    recommendations: [
      "Book a free discovery call with Erica",
      "Explore The Pathway Method in full",
      "Take action today—your next chapter is waiting",
    ],
    cta: "Start Your Pathway — Free Call",
  },
};

const getResult = (answers: string[]): Result => {
  const counts: Record<string, number> = {};
  answers.forEach((a) => {
    counts[a] = (counts[a] || 0) + 1;
  });
  const topAnswer = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  return results[topAnswer] || results.default;
};

export default function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setResult(getResult(newAnswers));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Wire to AWS endpoint
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, answers, result: result?.title }),
      });
    } catch {
      // Continue regardless
    }
    setSubmitted(true);
  };

  const progress = ((currentQuestion) / questions.length) * 100;

  if (result && submitted) {
    return (
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white border border-[#e8cbc8] p-8 lg:p-12 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#b87e27]/10 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b87e27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div className="text-xs tracking-[0.3em] uppercase text-[#b87e27] mb-2 font-sans">Your Results</div>
          <h2 className="font-serif text-3xl text-[#2c2420] mb-4">{result.title}</h2>
          <p className="font-sans text-[#2c2420]/65 leading-relaxed mb-8">{result.description}</p>

          <div className="text-left space-y-3 mb-10">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 text-[#2c2420]/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b87e27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="font-sans text-sm">{rec}</span>
              </div>
            ))}
          </div>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#b87e27] text-[#fdf9f8] font-sans text-sm tracking-wide uppercase transition-all hover:bg-[#9a681e] hover:-translate-y-0.5 shadow-lg"
          >
            {result.cta}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white border border-[#e8cbc8] p-8 lg:p-12 shadow-xl">
          <div className="text-xs tracking-[0.3em] uppercase text-[#b87e27] mb-2 font-sans text-center">Your Results Are Ready</div>
          <h2 className="font-serif text-3xl text-[#2c2420] mb-4 text-center">{result.title}</h2>
          <p className="font-sans text-[#2c2420]/60 text-sm leading-relaxed mb-8 text-center">
            Enter your name and email to receive your full personalized action plan from Erica.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full font-sans text-sm px-4 py-3 bg-[#f8efee] border border-[#e8cbc8] text-[#2c2420] placeholder-[#2c2420]/30 focus:outline-none focus:border-[#b87e27] transition-colors"
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full font-sans text-sm px-4 py-3 bg-[#f8efee] border border-[#e8cbc8] text-[#2c2420] placeholder-[#2c2420]/30 focus:outline-none focus:border-[#b87e27] transition-colors"
            />
            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#b87e27] text-[#fdf9f8] font-sans text-sm tracking-wide uppercase hover:bg-[#9a681e] transition-all"
            >
              See My Results & Action Plan
            </button>
            <p className="font-sans text-xs text-[#2c2420]/30 text-center">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-xl mx-auto px-6">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="font-sans text-xs tracking-widest uppercase text-[#2c2420]/40">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="font-sans text-xs tracking-widest uppercase text-[#b87e27]">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full h-1 bg-[#e8cbc8]">
          <div
            className="h-1 bg-gradient-to-r from-[#d4a84b] to-[#b87e27] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white border border-[#e8cbc8] p-8 lg:p-10 shadow-lg">
        <h2 className="font-serif text-2xl lg:text-3xl text-[#2c2420] mb-8 leading-snug">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-5 py-4 border font-sans text-sm transition-all duration-200 ${
                selectedOption === option.value
                  ? "border-[#b87e27] bg-[#b87e27]/5 text-[#2c2420]"
                  : "border-[#e8cbc8] hover:border-[#b87e27]/50 text-[#2c2420]/70 hover:text-[#2c2420]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
                  selectedOption === option.value
                    ? "border-[#b87e27] bg-[#b87e27]"
                    : "border-[#e8cbc8]"
                }`} />
                {option.label}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`mt-8 w-full px-8 py-4 font-sans text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
            selectedOption
              ? "bg-[#b87e27] text-[#fdf9f8] hover:bg-[#9a681e] hover:-translate-y-0.5"
              : "bg-[#e8cbc8] text-[#2c2420]/30 cursor-not-allowed"
          }`}
        >
          {currentQuestion + 1 === questions.length ? "See My Results" : "Next Question"}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
