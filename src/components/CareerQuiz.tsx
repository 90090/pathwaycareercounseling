import { useState } from "react";

const CALENDLY_URL = "https://calendly.com/YOUR_LINK_HERE";

interface Question {
  id: number;
  text: string;
  type: "options" | "scale";
  options?: { label: string; value: string }[];
  scaleMin?: number;
  scaleMax?: number;
}

interface Archetype {
  id: string;
  title: string;
  tagline: string;
  validation: string;
  patterns: string;
  strengths: string[];
  pathway: string;
  recommendedService: string;
  cta: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "How do you currently feel about your career?",
    type: "options",
    options: [
      { label: "Stuck and unsure", value: "stuck" },
      { label: "Burned out and exhausted", value: "burnout" },
      { label: "Ready for something bigger", value: "ready" },
      { label: "Underappreciated", value: "underappreciated" },
      { label: "Craving purpose", value: "purpose" },
      { label: "Seeking stability", value: "stability" },
      { label: "Ready to reinvent myself", value: "reinvent" },
    ],
  },
  {
    id: 2,
    text: "What feels like the biggest obstacle right now?",
    type: "options",
    options: [
      { label: "Lack of confidence", value: "confidence" },
      { label: "Fear of starting over", value: "fear" },
      { label: "Resume or LinkedIn struggles", value: "visibility" },
      { label: "Interview anxiety", value: "interviews" },
      { label: "No clear direction", value: "direction" },
      { label: "Burnout", value: "burnout" },
      { label: "Financial pressure", value: "financial" },
      { label: "Feeling invisible professionally", value: "invisible" },
    ],
  },
  {
    id: 3,
    text: "If everything worked out, what would your next chapter look like?",
    type: "options",
    options: [
      { label: "A career I actually love", value: "love" },
      { label: "More freedom and flexibility", value: "freedom" },
      { label: "Leadership growth", value: "leadership" },
      { label: "Higher income", value: "income" },
      { label: "More purpose", value: "purpose" },
      { label: "Better balance", value: "balance" },
      { label: "Starting my own thing", value: "entrepreneur" },
      { label: "Feeling fulfilled again", value: "fulfilled" },
    ],
  },
  {
    id: 4,
    text: "Which statement resonates most with you right now?",
    type: "options",
    options: [
      { label: "I know I'm capable of more", value: "capable" },
      { label: "I've outgrown where I am", value: "outgrown" },
      { label: "I don't know where to start", value: "lost" },
      { label: "I'm tired of playing small", value: "small" },
      { label: "I want clarity", value: "clarity" },
      { label: "I need accountability", value: "accountability" },
      { label: "I've lost confidence in myself", value: "lostconfidence" },
      { label: "I'm ready for transformation", value: "transformation" },
    ],
  },
  {
    id: 5,
    text: "How ready are you to make a change? (1 = Not quite ready, 10 = Ready to move NOW)",
    type: "scale",
    scaleMin: 1,
    scaleMax: 10,
  },
];

const archetypes: Archetype[] = [
  {
    id: "reinvention-seeker",
    title: "The Reinvention Seeker",
    tagline: "You're ready for transformation and a bigger next chapter.",
    validation: "You've been sitting with this feeling for a while — the knowing that something needs to change. That restlessness isn't a sign of ingratitude. It's your potential calling you forward.",
    patterns: "You're someone who has outgrown your current situation and is ready to step into something bigger, bolder, and more aligned with who you're becoming.",
    strengths: ["Strong self-awareness", "Desire for meaningful change", "Courage to consider reinvention", "Vision for something bigger"],
    pathway: "Your path forward starts with clarity on what you truly want, followed by a strategic repositioning of your experience and a confident plan for what's next.",
    recommendedService: "The Pathway Intensive™ or Career Pivot Strategy",
    cta: "Start Your Reinvention",
  },
  {
    id: "burned-out-achiever",
    title: "The Burned-Out Achiever",
    tagline: "High-performing but emotionally exhausted.",
    validation: "You've given so much — and you've accomplished a lot. But somewhere along the way, the work stopped fueling you. What you're feeling isn't weakness. It's a signal that something needs to shift.",
    patterns: "High achievers often push through exhaustion until they can't anymore. Your burnout is telling you that your current path isn't aligned with your values, energy, or deeper goals.",
    strengths: ["Proven track record of achievement", "High capacity and work ethic", "Deep awareness of what's not working", "Readiness for real change"],
    pathway: "Your path forward involves reconnecting with what energizes you, identifying where you're losing energy, and redesigning your career around your values and your life.",
    recommendedService: "Career Coaching or The Pathway Intensive™",
    cta: "Reclaim Your Energy & Direction",
  },
  {
    id: "hidden-leader",
    title: "The Hidden Leader",
    tagline: "Capable of more but not fully activated or recognized.",
    validation: "You have more to offer than your current title or role reflects. You see opportunities others miss. You lead even without the formal authority. You're ready to be seen — fully.",
    patterns: "You've been operating below your full potential, often because of systems that haven't recognized your value, or because you haven't yet fully claimed it yourself.",
    strengths: ["Natural leadership instincts", "Strategic thinking", "Desire to create impact", "Readiness to be recognized"],
    pathway: "Your path forward is about activating your leadership presence, repositioning your brand, and stepping into the roles and opportunities that match your true level.",
    recommendedService: "Leadership & Executive Coaching or Career Coaching",
    cta: "Step Into Your Full Potential",
  },
  {
    id: "confidence-rebuilder",
    title: "The Confidence Rebuilder",
    tagline: "Ready to rebuild belief, momentum, and direction.",
    validation: "Somewhere along the way, your confidence took a hit — a rejection, a difficult situation, or simply years of not being seen for who you truly are. That's not a permanent state. It's a starting point.",
    patterns: "Confidence challenges often mask deep capability. You have more to offer than you currently believe, and with the right support, your belief in yourself will catch up to your potential.",
    strengths: ["Deep self-reflection", "Genuine desire to grow", "Openness to support", "Resilience beneath the surface"],
    pathway: "Your path forward combines mindset work with strategic action — rebuilding your belief in yourself while creating tangible wins that remind you of what you're truly capable of.",
    recommendedService: "Career Coaching or The Pathway Intensive™",
    cta: "Rebuild Your Confidence & Momentum",
  },
  {
    id: "career-pivot-visionary",
    title: "The Career Pivot Visionary",
    tagline: "Ready for a major career reinvention.",
    validation: "You can see a different future for yourself — one that looks very different from where you are now. That vision is valid. And it's more achievable than you might think.",
    patterns: "Career changers often underestimate how much of their experience is transferable. You're not starting over — you're redirecting everything you've built toward something that actually fits.",
    strengths: ["Clear vision of something different", "Courage to consider change", "Diverse experience to leverage", "Desire for meaningful work"],
    pathway: "Your path forward involves mapping your transferable skills, identifying your target field, and building a strategic bridge from where you are to where you want to be.",
    recommendedService: "Career Pivot Strategy or The Pathway Intensive™",
    cta: "Map Your Career Pivot",
  },
  {
    id: "purpose-driven-professional",
    title: "The Purpose-Driven Professional",
    tagline: "Seeking alignment, impact, and fulfillment.",
    validation: "You've achieved things — maybe even things others envy. But something feels missing. You want your work to mean something. That desire isn't naive. It's one of the most powerful career motivators there is.",
    patterns: "Purpose-driven professionals often feel torn between what looks good on paper and what feels truly aligned. Finding that alignment is both possible and transformational.",
    strengths: ["Values-driven decision making", "Desire for meaningful impact", "Self-awareness about what matters", "Commitment to growth"],
    pathway: "Your path forward starts with clarifying your values and purpose, then mapping a career direction that honors both your skills and your deeper why.",
    recommendedService: "Career Coaching or Career Pivot Strategy",
    cta: "Find Your Purpose-Aligned Path",
  },
];

const getArchetype = (answers: (string | number)[]): Archetype => {
  const q1 = answers[0] as string;
  const q2 = answers[1] as string;
  const q4 = answers[3] as string;
  const readiness = answers[4] as number;

  if (q1 === "burnout" || q2 === "burnout") return archetypes[1];
  if (q1 === "reinvent" || q1 === "ready") return archetypes[0];
  if (q2 === "confidence" || q2 === "fear" || q4 === "lostconfidence") return archetypes[3];
  if (q4 === "outgrown" || q4 === "capable" || q4 === "small") return archetypes[2];
  if (q1 === "purpose" || q1 === "stuck") return archetypes[5];
  if (readiness >= 7) return archetypes[4];
  return archetypes[0];
};

export default function CareerQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(string | number)[]>([]);
  const [selected, setSelected] = useState<string | number | null>(null);
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setArchetype(getArchetype(newAnswers));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, answers, archetype: archetype?.id }),
      });
    } catch {}
    setSubmitted(true);
  };

  // Results revealed after email capture
  if (archetype && submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white border border-[#e8cbc8] shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#1a1410] px-8 py-10 text-center"
            style={{ background: "linear-gradient(135deg, #1a1410 0%, #2c2420 100%)" }}>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#b87e27] mb-3 font-sans">Your Career Archetype</div>
            <h2 className="font-serif text-3xl lg:text-4xl text-[#f5f0e8] mb-3">{archetype.title}</h2>
            <p className="font-sans text-[#c9a84c] text-sm tracking-wide">{archetype.tagline}</p>
          </div>

          <div className="p-8 lg:p-10 space-y-8">
            {/* Validation */}
            <div className="border-l-2 border-[#b87e27] pl-5">
              <p className="font-sans text-[#2c2420]/70 leading-relaxed">{archetype.validation}</p>
            </div>

            {/* Patterns */}
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#b87e27] mb-3 font-sans">What We're Seeing</p>
              <p className="font-sans text-[#2c2420]/70 leading-relaxed">{archetype.patterns}</p>
            </div>

            {/* Strengths */}
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#b87e27] mb-3 font-sans">Your Strengths</p>
              <div className="grid grid-cols-2 gap-2">
                {archetype.strengths.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#2c2420]/70">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b87e27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="font-sans text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pathway */}
            <div className="bg-[#f8efee] p-6">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#b87e27] mb-3 font-sans">Your Recommended Pathway</p>
              <p className="font-sans text-[#2c2420]/75 leading-relaxed mb-3">{archetype.pathway}</p>
              <p className="font-sans text-xs text-[#2c2420]/50 uppercase tracking-wider">Recommended: {archetype.recommendedService}</p>
            </div>

            {/* CTA */}
            <div className="text-center pt-2">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#b87e27] text-[#fdf9f8] font-sans text-sm tracking-wide uppercase transition-all hover:bg-[#9a681e] hover:-translate-y-0.5 shadow-lg"
              >
                {archetype.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </a>
              <p className="font-sans text-xs text-[#2c2420]/40 mt-4">Free 30-minute discovery call. No pressure.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Email gate before results
  if (archetype && !submitted) {
    return (
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white border border-[#e8cbc8] p-8 lg:p-10 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#b87e27]/10 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b87e27" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#b87e27] mb-2 font-sans">Your Results Are Ready</div>
            <h2 className="font-serif text-2xl text-[#2c2420] mb-3">You're a {archetype.title}</h2>
            <p className="font-sans text-[#2c2420]/60 text-sm leading-relaxed">
              Enter your name and email to unlock your full personalized career archetype breakdown, hidden patterns, and recommended pathway.
            </p>
          </div>
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
              Unlock My Career Archetype →
            </button>
            <p className="font-sans text-xs text-[#2c2420]/30 text-center">No spam. Unsubscribe anytime.</p>
          </form>
        </div>
      </div>
    );
  }

  // Quiz questions
  return (
    <div className="max-w-xl mx-auto px-4">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="font-sans text-xs tracking-widest uppercase text-[#2c2420]/40">
            Question {current + 1} of {questions.length}
          </span>
          <span className="font-sans text-xs tracking-widest uppercase text-[#b87e27]">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full h-1 bg-[#e8cbc8]">
          <div
            className="h-1 transition-all duration-500"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #d4a84b, #b87e27)" }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white border border-[#e8cbc8] p-8 lg:p-10 shadow-lg">
        <h2 className="font-serif text-2xl lg:text-3xl text-[#2c2420] mb-8 leading-snug">{q.text}</h2>

        {q.type === "options" && (
          <div className="space-y-3">
            {q.options!.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                className={`w-full text-left px-5 py-4 border font-sans text-sm transition-all duration-200 ${
                  selected === opt.value
                    ? "border-[#b87e27] bg-[#b87e27]/5 text-[#2c2420]"
                    : "border-[#e8cbc8] hover:border-[#b87e27]/50 text-[#2c2420]/70 hover:text-[#2c2420]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
                    selected === opt.value ? "border-[#b87e27] bg-[#b87e27]" : "border-[#e8cbc8]"
                  }`} />
                  {opt.label}
                </div>
              </button>
            ))}
          </div>
        )}

        {q.type === "scale" && (
          <div>
            <div className="flex justify-between mb-3">
              <span className="font-sans text-xs text-[#2c2420]/40">Not quite ready</span>
              <span className="font-sans text-xs text-[#2c2420]/40">Ready to move NOW</span>
            </div>
            <div className="grid grid-cols-10 gap-2 mb-4">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setSelected(n)}
                  className={`aspect-square flex items-center justify-center font-sans text-sm font-medium border transition-all duration-200 ${
                    selected === n
                      ? "border-[#b87e27] bg-[#b87e27] text-white"
                      : "border-[#e8cbc8] text-[#2c2420]/60 hover:border-[#b87e27]/50 hover:text-[#2c2420]"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            {selected !== null && (
              <p className="font-sans text-sm text-center text-[#b87e27] mt-2">
                {(selected as number) >= 8 ? "You're ready to move. Let's go." : (selected as number) >= 5 ? "Getting closer — that's great momentum." : "No rush. Clarity comes first."}
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={selected === null}
          className={`mt-8 w-full px-8 py-4 font-sans text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
            selected !== null
              ? "bg-[#b87e27] text-[#fdf9f8] hover:bg-[#9a681e] hover:-translate-y-0.5"
              : "bg-[#e8cbc8] text-[#2c2420]/30 cursor-not-allowed"
          }`}
        >
          {current + 1 === questions.length ? "See My Results" : "Next Question"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
