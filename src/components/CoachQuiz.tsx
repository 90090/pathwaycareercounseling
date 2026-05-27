import { useState } from "react";

const CALENDLY_URL = "https://calendly.com/selfdevelopmentpathway/30min";

interface Question {
  id: number;
  text: string;
  options: { label: string; value: string }[];
}

interface CoachArchetype {
  id: string;
  title: string;
  tagline: string;
  validation: string;
  insights: string;
  strengths: string[];
  nextSteps: string[];
  recommendedService: string;
  cta: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What stage best describes your coaching business right now?",
    options: [
      { label: "Just getting started", value: "starting" },
      { label: "Building momentum", value: "momentum" },
      { label: "Growing steadily", value: "growing" },
      { label: "Ready to scale", value: "scaling" },
      { label: "Evolving into my next level", value: "evolving" },
    ],
  },
  {
    id: 2,
    text: "What area would you most love more support in?",
    options: [
      { label: "More consistent clients", value: "clients" },
      { label: "Better systems and organization", value: "systems" },
      { label: "Visibility and personal branding", value: "visibility" },
      { label: "Automation and workflows", value: "automation" },
      { label: "More balance and freedom", value: "balance" },
      { label: "Scaling my impact", value: "impact" },
    ],
  },
  {
    id: 3,
    text: "What feels most important to you in this next season of growth?",
    options: [
      { label: "Confidence", value: "confidence" },
      { label: "Clarity", value: "clarity" },
      { label: "Simplicity", value: "simplicity" },
      { label: "Expansion", value: "expansion" },
      { label: "Alignment", value: "alignment" },
      { label: "Sustainability", value: "sustainability" },
    ],
  },
  {
    id: 4,
    text: "How do you currently feel running your coaching business?",
    options: [
      { label: "Inspired and excited", value: "inspired" },
      { label: "Motivated but overwhelmed", value: "overwhelmed" },
      { label: "Ready for more structure", value: "structure" },
      { label: "Pulled in too many directions", value: "scattered" },
      { label: "Growing but craving support", value: "support" },
      { label: "Excited for my next level", value: "nextlevel" },
    ],
  },
  {
    id: 5,
    text: "What's your biggest vision for your coaching business?",
    options: [
      { label: "More freedom", value: "freedom" },
      { label: "More impact", value: "impact" },
      { label: "More income", value: "income" },
      { label: "A scalable business", value: "scalable" },
      { label: "Thought leadership opportunities", value: "thought" },
      { label: "Creating a lasting legacy", value: "legacy" },
    ],
  },
];

const archetypes: CoachArchetype[] = [
  {
    id: "visionary-coach",
    title: "The Visionary Coach",
    tagline: "Big ideas, strong purpose, ready to build the structure to match.",
    validation: "You have a powerful vision for the impact you want to create. Your ideas are big, your heart is in it, and you're ready to bring it all to life in a bigger way. That clarity of purpose is one of your greatest assets.",
    insights: "Visionary coaches often have more to offer than their current systems and structures can support. The next step isn't dreaming bigger — it's building the foundation that allows your vision to become reality.",
    strengths: ["Clear sense of purpose", "Big-picture thinking", "Strong coaching transformation", "Natural thought leadership"],
    nextSteps: ["Map your client journey end-to-end", "Identify the systems gaps slowing your growth", "Build scalable structures that match your vision"],
    recommendedService: "Pathway Systems Implementation or Pathway Coach Support Membership",
    cta: "Build the Structure Behind Your Vision",
  },
  {
    id: "growth-ready-coach",
    title: "The Growth-Ready Coach",
    tagline: "Momentum built. Ready for consistency, confidence, and strategic expansion.",
    validation: "You've done the hard work of getting started and finding your footing. You're not just surviving — you're building something real. Now it's about turning that momentum into consistent, sustainable growth.",
    insights: "Growth-ready coaches have proven their model works. What you need now is the strategic infrastructure to make that growth repeatable, predictable, and scalable.",
    strengths: ["Proven coaching model", "Growing client base", "Strong momentum", "Readiness for the next level"],
    nextSteps: ["Systematize what's already working", "Create consistent lead generation", "Build client experience systems that scale"],
    recommendedService: "Coaching Systems Audit or Pathway Systems Implementation",
    cta: "Systematize Your Growth",
  },
  {
    id: "heart-led-coach",
    title: "The Heart-Led Coach",
    tagline: "Deep transformation work. Ready to let your brilliance shine more fully.",
    validation: "The transformation you create for your clients is real and profound. You lead with heart, intuition, and genuine care — and your clients feel it. Your gift is powerful. Now it's time to make sure your business supports it.",
    insights: "Heart-led coaches often pour so much into their clients that the backend of their business gets overlooked. Simplifying your systems won't diminish what you do — it will free you to do more of it.",
    strengths: ["Deep client transformation", "Genuine empathy and care", "Strong client relationships", "Authentic coaching presence"],
    nextSteps: ["Simplify your onboarding and client journey", "Automate what doesn't need your personal touch", "Create breathing room for your best work"],
    recommendedService: "Pathway Systems Implementation or Coaching Systems Audit",
    cta: "Simplify So Your Brilliance Can Shine",
  },
  {
    id: "expansion-coach",
    title: "The Expansion Coach",
    tagline: "Stepping into bigger visibility, leadership, and scalable growth.",
    validation: "You can feel yourself on the edge of something bigger. A larger audience, a stronger brand, greater impact. That pull toward expansion isn't ego — it's your next level calling.",
    insights: "Expansion requires both visibility and infrastructure. The coaches who grow sustainably are the ones who build the systems before they need them — so growth doesn't create chaos.",
    strengths: ["Readiness for bigger opportunities", "Strong coaching foundation", "Leadership presence", "Desire for greater impact"],
    nextSteps: ["Build your visibility and thought leadership strategy", "Create systems that support larger client volume", "Develop scalable offers and group programs"],
    recommendedService: "Pathway Coach Support Membership or Pathway Systems Implementation",
    cta: "Step Into Your Expansion",
  },
  {
    id: "purpose-driven-coach",
    title: "The Purpose-Driven Coach",
    tagline: "Aligned, meaningful, sustainable — and creating real transformation.",
    validation: "You started coaching because you wanted your work to matter. And it does. But building a business that feels as good as it does meaningful takes intention, strategy, and the right support.",
    insights: "Purpose-driven coaches are at their best when their business is in alignment with their values. When the systems work, the mission thrives. When chaos is removed, purpose can lead.",
    strengths: ["Values-driven business model", "Meaningful client transformation", "Authentic leadership", "Long-term thinking"],
    nextSteps: ["Align your business model with your values", "Build systems that support sustainability", "Create offers that reflect your mission"],
    recommendedService: "Coaching Systems Audit or Pathway Coach Support Membership",
    cta: "Build Your Purpose-Aligned Business",
  },
  {
    id: "scaling-coach",
    title: "The Scaling Coach",
    tagline: "Ready to grow beyond survival mode into long-term scalability and freedom.",
    validation: "You've built something real. Now you're ready to stop trading all your time for income and start creating the leverage, systems, and freedom that a truly scalable coaching business provides.",
    insights: "Scaling is less about working harder and more about working smarter. The coaches who scale successfully are the ones who build smart systems, clear processes, and scalable offers before burning out.",
    strengths: ["Established coaching practice", "Clear business model", "Readiness for systems", "Vision for long-term growth"],
    nextSteps: ["Audit current systems for scale readiness", "Build automation and workflow infrastructure", "Develop scalable group or membership offers"],
    recommendedService: "Pathway Systems Implementation or Pathway Coach Support Membership",
    cta: "Build Your Scalable Coaching Business",
  },
];

const getArchetype = (answers: string[]): CoachArchetype => {
  const q1 = answers[0];
  const q2 = answers[1];
  const q4 = answers[3];
  const q5 = answers[4];

  if (q1 === "scaling" || q5 === "scalable") return archetypes[5];
  if (q4 === "overwhelmed" || q4 === "scattered" || q2 === "systems") return archetypes[2];
  if (q1 === "evolving" || q4 === "nextlevel") return archetypes[3];
  if (q1 === "starting" || q1 === "momentum") return archetypes[1];
  if (q5 === "legacy" || q5 === "thought") return archetypes[0];
  if (q5 === "impact" || q2 === "impact") return archetypes[4];
  return archetypes[0];
};

export default function CoachQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [archetype, setArchetype] = useState<CoachArchetype | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  const handleNext = () => {
    if (!selected) return;
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
        body: JSON.stringify({ name, email, answers, archetype: archetype?.id, type: "coach" }),
      });
    } catch {}
    setSubmitted(true);
  };

  if (archetype && submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white border border-[#e8cbc8] shadow-xl overflow-hidden">
          <div className="px-8 py-10 text-center" style={{ background: "linear-gradient(135deg, #1a1410 0%, #2c2420 100%)" }}>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#b87e27] mb-3 font-sans">Your Coaching Growth Path</div>
            <h2 className="font-serif text-3xl lg:text-4xl text-[#f5f0e8] mb-3">{archetype.title}</h2>
            <p className="font-sans text-[#c9a84c] text-sm tracking-wide">{archetype.tagline}</p>
          </div>
          <div className="p-8 lg:p-10 space-y-8">
            <div className="border-l-2 border-[#b87e27] pl-5">
              <p className="font-sans text-[#2c2420]/70 leading-relaxed">{archetype.validation}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#b87e27] mb-3 font-sans">What We're Seeing</p>
              <p className="font-sans text-[#2c2420]/70 leading-relaxed">{archetype.insights}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#b87e27] mb-3 font-sans">Your Strengths</p>
              <div className="grid grid-cols-2 gap-2">
                {archetype.strengths.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#2c2420]/70">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b87e27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="font-sans text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#f8efee] p-6">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#b87e27] mb-3 font-sans">Your Next Steps</p>
              <ul className="space-y-2">
                {archetype.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-sm text-[#2c2420]/75">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b87e27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1"><polyline points="20 6 9 17 4 12"/></svg>
                    {step}
                  </li>
                ))}
              </ul>
              <p className="font-sans text-xs text-[#2c2420]/50 uppercase tracking-wider mt-4">Recommended: {archetype.recommendedService}</p>
            </div>
            <div className="text-center pt-2">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#b87e27] text-[#fdf9f8] font-sans text-sm tracking-wide uppercase transition-all hover:bg-[#9a681e] hover:-translate-y-0.5 shadow-lg">
                {archetype.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
              <p className="font-sans text-xs text-[#2c2420]/40 mt-4">Free strategy call. No pressure.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#b87e27] mb-2 font-sans">Your Growth Path Is Ready</div>
            <h2 className="font-serif text-2xl text-[#2c2420] mb-3">You're a {archetype.title}</h2>
            <p className="font-sans text-[#2c2420]/60 text-sm leading-relaxed">
              Enter your name and email to unlock your full coaching growth path, personalized insights, and recommended next steps.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full font-sans text-sm px-4 py-3 bg-[#f8efee] border border-[#e8cbc8] text-[#2c2420] placeholder-[#2c2420]/30 focus:outline-none focus:border-[#b87e27] transition-colors" />
            <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full font-sans text-sm px-4 py-3 bg-[#f8efee] border border-[#e8cbc8] text-[#2c2420] placeholder-[#2c2420]/30 focus:outline-none focus:border-[#b87e27] transition-colors" />
            <button type="submit" className="w-full px-8 py-4 bg-[#b87e27] text-[#fdf9f8] font-sans text-sm tracking-wide uppercase hover:bg-[#9a681e] transition-all">
              Unlock My Coaching Growth Path →
            </button>
            <p className="font-sans text-xs text-[#2c2420]/30 text-center">No spam. Unsubscribe anytime.</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="font-sans text-xs tracking-widest uppercase text-[#2c2420]/40">Question {current + 1} of {questions.length}</span>
          <span className="font-sans text-xs tracking-widest uppercase text-[#b87e27]">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-1 bg-[#e8cbc8]">
          <div className="h-1 transition-all duration-500" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #d4a84b, #b87e27)" }} />
        </div>
      </div>
      <div className="bg-white border border-[#e8cbc8] p-8 lg:p-10 shadow-lg">
        <h2 className="font-serif text-2xl lg:text-3xl text-[#2c2420] mb-8 leading-snug">{q.text}</h2>
        <div className="space-y-3">
          {q.options.map((opt) => (
            <button key={opt.value} onClick={() => setSelected(opt.value)}
              className={`w-full text-left px-5 py-4 border font-sans text-sm transition-all duration-200 ${selected === opt.value ? "border-[#b87e27] bg-[#b87e27]/5 text-[#2c2420]" : "border-[#e8cbc8] hover:border-[#b87e27]/50 text-[#2c2420]/70 hover:text-[#2c2420]"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${selected === opt.value ? "border-[#b87e27] bg-[#b87e27]" : "border-[#e8cbc8]"}`} />
                {opt.label}
              </div>
            </button>
          ))}
        </div>
        <button onClick={handleNext} disabled={!selected}
          className={`mt-8 w-full px-8 py-4 font-sans text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 ${selected ? "bg-[#b87e27] text-[#fdf9f8] hover:bg-[#9a681e] hover:-translate-y-0.5" : "bg-[#e8cbc8] text-[#2c2420]/30 cursor-not-allowed"}`}>
          {current + 1 === questions.length ? "See My Results" : "Next Question"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
}
