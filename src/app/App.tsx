import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, ArrowRight, Lightbulb, Home, X, ChevronDown, ChevronUp } from "lucide-react";


const screens = [
  "homepage", "context/reality", "context/persona", "context/scattered",
  "context/confusion", "transformation/intro", "transformation/mapping-csn",
  "transformation/mapping-af", "transformation/mapping-fk",
  "unified/overview", "unified/value", "unified/test",
];

const CATEGORIES = [
  {
    id: "context", label: "Context", screens: [
      { id: "context/reality", label: "The Current Reality" },
      { id: "context/persona", label: "Meet Jane" },
      { id: "context/scattered", label: "Scattered View" },
      { id: "context/confusion", label: "Too Complex" },
    ]
  },
  {
    id: "transformation", label: "Transformation", screens: [
      { id: "transformation/intro", label: "The Transformation Process" },
      { id: "transformation/mapping-csn", label: "Mapping Logic — Example 1" },
      { id: "transformation/mapping-af", label: "Mapping Logic — Example 2" },
      { id: "transformation/mapping-fk", label: "Apply Logic to All Data" },
    ]
  },
  {
    id: "unified", label: "Unified View", screens: [
      { id: "unified/overview", label: "Unified View" },
      { id: "unified/value", label: "Why This Matters" },
        { id: "unified/test", label: "Work in Progress" },
    ]
  },
];

const PAGE_INFO = {
  "homepage": { title: "Semantic Interoperability", content: "...is the ability to interpret the intended meaning of data across systems. \n\n While sytems successfully can exchange data, they may still fail to understand each other.\n\n  True understanding requires shared standards, aligned definitions, and a common context.\n\n" },
  "context/reality": {
    title: "Swedish Case Context - GIF",
    
    content: "GIF is an authority-led initiative currently under development, aimed at improving data exchange between Swedish public authority systems.\n\n A remaining key challenge is ensuring that the exchanged data is comprehensible.\n\nThat is where the semantics comes in."
  },
  
  "context/persona": { title: "More Personas", content: "In the future you will meet Paul and Sarah." },
  "context/scattered": { title: "What am I looking at?", content: "Essentially what case workers for financial aid applications are facing today. \n\nThere have been a few complaints, which are being met by the development of GIF." },
"context/confusion": {
  title: "More on Scattered Data",
  content: 'Read more in the <a href="https://skr.se/download/18.8d6fd9e198bb80313a2e2da/1755696159916/Informationsspecifikation-ekonomiskt-bistand.pdf" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">official documentation</a>.'
},
  "transformation/intro": { title: "More on The Transformation Process", content: "Placeholder — content will be updated." },
  "transformation/mapping-csn": { title: "Mapping Logic — FK", content: "Placeholder — content will be updated." },
  "transformation/mapping-af": { title: "Mapping Logic — AF", content: "Placeholder — content will be updated." },
  "transformation/mapping-fk": { title: "Mapping Logic - CSN", content: "Placeholder — content will be updated." },
  "unified/overview": { title: "Unified View", content: "Placeholder — content will be updated." },
  "unified/value": { title: "Why This Matters", content: "Placeholder — content will be updated." },
  "unified/test": { title: "Work in Progress", content: "Test page" }
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const nextScreen = () => { if (currentScreen < screens.length - 1) setCurrentScreen(currentScreen + 1); };
  const prevScreen = () => { if (currentScreen > 0) setCurrentScreen(currentScreen - 1); };
  const goHome = () => setCurrentScreen(0);
  const jumpToCategory = (categoryId) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat) return;
    const idx = screens.indexOf(cat.screens[0].id);
    if (idx !== -1) setCurrentScreen(idx);
  };
  const isHomepage = screens[currentScreen] === "homepage";
  return (
    <div className="size-full bg-[#F8F8F6] flex flex-col">
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-200 z-50">
        <motion.div className="h-full bg-black" initial={{ width: "0%" }}
          animate={{ width: `${((currentScreen + 1) / screens.length) * 100}%` }} transition={{ duration: 0.3 }} />
      </div>
      {!isHomepage && <CategoryNav currentScreenId={screens[currentScreen]} onJumpToCategory={jumpToCategory} onGoHome={goHome} />}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {screens[currentScreen] === "homepage" && <Homepage key="hp" onNext={nextScreen} onJumpToCategory={jumpToCategory} />}
          {screens[currentScreen] === "context/reality" && <Reality key="cr" />}
          {screens[currentScreen] === "context/persona" && <Persona key="cp" />}
          {screens[currentScreen] === "context/scattered" && <ScatteredView key="cs" />}
          {screens[currentScreen] === "context/confusion" && <Confusion key="cc" />}
          {screens[currentScreen] === "transformation/intro" && <TransformationIntro key="ti" />}
          {screens[currentScreen] === "transformation/mapping-csn" && <MappingFK key="mc" />}
          {screens[currentScreen] === "transformation/mapping-af" && <MappingAF key="ma" />}
          {screens[currentScreen] === "transformation/mapping-fk" && <MappingCSN key="tg" />}
          {screens[currentScreen] === "unified/overview" && <UnifiedView key="uo" />}
          {screens[currentScreen] === "unified/value" && <Value key="uv" />}
          {screens[currentScreen] === "unified/test" && <TestConnection key="ut" />}
        </AnimatePresence>
      </div>
      <div className="flex-shrink-0 border-t-2 border-gray-200 px-8 py-4 bg-[#F8F8F6]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={prevScreen} disabled={currentScreen === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-400 disabled:opacity-25 transition-all text-sm">
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} /> Back
          </button>
          <div className="text-xs text-gray-300">{currentScreen + 1} / {screens.length}</div>
          <button onClick={nextScreen} disabled={currentScreen === screens.length - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 disabled:opacity-25 transition-all text-sm">
            Next <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Blobs: strong only on homepage + last page; dim elsewhere ─────────────────

function Blob({ color, style }) {
  return <div className="absolute pointer-events-none select-none" style={{ background: color, ...style }} />;
}
function GreenBlob({ style }) { return <Blob color="#4ADE80" style={{ borderRadius: "62% 38% 46% 54% / 60% 44% 56% 40%", ...style }} />; }
function PinkBlob({ style }) { return <Blob color="#F472B6" style={{ borderRadius: "45% 55% 65% 35% / 50% 62% 38% 50%", ...style }} />; }
function TealBlob({ style }) { return <Blob color="#2DD4BF" style={{ borderRadius: "55% 45% 38% 62% / 48% 55% 45% 52%", ...style }} />; }
function PurpleBlob({ style }) { return <Blob color="#A78BFA" style={{ borderRadius: "38% 62% 55% 45% / 52% 40% 60% 48%", ...style }} />; }
function OrangeBlob({ style }) { return <Blob color="#FB923C" style={{ borderRadius: "50% 50% 40% 60% / 44% 56% 44% 56%", ...style }} />; }
function BlueBlob({ style }) { return <Blob color="#60A5FA" style={{ borderRadius: "48% 52% 58% 42% / 55% 45% 55% 45%", ...style }} />; }

// Dim variants for inner pages
function DG({ style }) { return <GreenBlob style={{ opacity: 0.22, ...style }} />; }
function DP({ style }) { return <PinkBlob style={{ opacity: 0.22, ...style }} />; }
function DT({ style }) { return <TealBlob style={{ opacity: 0.22, ...style }} />; }
function DPu({ style }) { return <PurpleBlob style={{ opacity: 0.22, ...style }} />; }
function DO({ style }) { return <OrangeBlob style={{ opacity: 0.20, ...style }} />; }
function DB({ style }) { return <BlueBlob style={{ opacity: 0.22, ...style }} />; }

function TransformationPipelinePanel({ onClose }) {
  const pipelineSteps = [
    {
      n: "1", label: "User Query",
      desc: "Citizen asks a question in plain language",
      symbol: "?",
      symbolBg: "bg-blue-100", symbolText: "text-blue-700", symbolBorder: "border-blue-300",
    },
    {
      n: "2", label: "Query Analysis",
      desc: "Classifies intent and extracts semantic concepts",
      symbol: "{ }",
      symbolBg: "bg-indigo-100", symbolText: "text-indigo-700", symbolBorder: "border-indigo-300",
    },
    {
      n: "3", label: "Concept Mapping",
      desc: "Links concepts to data fields and organisations via mapping tables",
      symbol: "~",
      symbolBg: "bg-amber-100", symbolText: "text-amber-700", symbolBorder: "border-amber-300",
    },
    {
      n: "4", label: "Data Retrieval Loop",
      desc: "Queries each authority iteratively until all concepts are filled",
      symbol: "↻",
      symbolBg: "bg-pink-100", symbolText: "text-pink-700", symbolBorder: "border-pink-300",
    },
    {
      n: "5", label: "Handling Mismatches",
      desc: "Tries alternative identifiers and re-maps unfilled concepts",
      symbol: "≠",
      symbolBg: "bg-orange-100", symbolText: "text-orange-700", symbolBorder: "border-orange-300",
    },
    {
      n: "6", label: "Completion Condition",
      desc: "Process stops when all required concepts have been filled",
      symbol: "✓",
      symbolBg: "bg-teal-100", symbolText: "text-teal-700", symbolBorder: "border-teal-300",
    },
    {
      n: "7", label: "Output / Meaning",
      desc: "Values are combined and presented as a clear, human-readable answer",
      symbol: "»",
      symbolBg: "bg-green-100", symbolText: "text-green-700", symbolBorder: "border-green-300",
    },
  ];
  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-gray-900">How the Transformation Pipeline Works</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
          <X className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
      <div className="flex items-stretch gap-0">
        {pipelineSteps.map((step, i) => (
          <div key={step.n} className="flex items-stretch gap-0 flex-1">
            <div className="flex flex-col items-center flex-1">
              {/* Symbol box */}
              <div className={`w-10 h-10 rounded-xl border-2 ${step.symbolBg} ${step.symbolBorder} flex items-center justify-center mb-2 flex-shrink-0`}>
                <span className={`text-base font-bold leading-none ${step.symbolText}`}>{step.symbol}</span>
              </div>
              {/* Step number */}
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1">{step.n.padStart(2,"0")}</div>
              {/* Label */}
              <div className="text-xs font-semibold text-gray-800 text-center leading-tight mb-1.5">{step.label}</div>
              {/* Description */}
              <div className="text-[10px] text-gray-500 text-center leading-relaxed px-1">{step.desc}</div>
            </div>
            {i < pipelineSteps.length - 1 && (
              <div className="flex items-start pt-4 px-1 flex-shrink-0">
                <div className="w-4 h-px bg-gray-300 mt-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page Info Badge ───────────────────────────────────────────────────────────

function PageInfoBadge({ screenId }) {
  const [open, setOpen] = useState(false);
  const info = PAGE_INFO[screenId] || { title: "Info", content: "Placeholder — content will be updated." };
  const isTransformIntro = screenId === "transformation/intro";
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full border-2 text-xs transition-all bg-white ${open ? "border-gray-400 text-gray-700" : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"}`}>
        <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
        <span>{info.title}</span>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl z-50"
              style={isTransformIntro ? { width: "min(780px, 78vw)" } : { width: "320px" }}>
              {isTransformIntro ? (
                <TransformationPipelinePanel onClose={() => setOpen(false)} />
              ) : (
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" strokeWidth={1.5} />
                      <span className="text-sm font-semibold text-gray-900">{info.title}</span>
                    </div>
                    <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{info.content}</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Category nav ──────────────────────────────────────────────────────────────

function CategoryNav({ currentScreenId, onJumpToCategory, onGoHome }) {
  const activeCategory = CATEGORIES.find((cat) => cat.screens.some((s) => s.id === currentScreenId));
  const activeSubcategory = activeCategory?.screens.find((s) => s.id === currentScreenId);
  return (
    <div className="flex-shrink-0 border-b-2 border-gray-200 bg-[#F8F8F6] px-8 pt-2.5 pb-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onGoHome} className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all mr-1">
              <Home className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <div className="w-px h-4 bg-gray-300" />
            {CATEGORIES.map((cat, i) => (
              <span key={cat.id} className="flex items-center gap-4">
                <button onClick={() => onJumpToCategory(cat.id)}
                  className={`text-sm transition-colors ${cat.id === activeCategory?.id ? "text-black font-semibold" : "text-gray-400 hover:text-gray-600"}`}>
                  {cat.label}
                </button>
                {i < CATEGORIES.length - 1 && <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" strokeWidth={1.5} />}
              </span>
            ))}
          </div>
          <PageInfoBadge screenId={currentScreenId} />
        </div>
        {activeSubcategory && (
          <motion.div key={activeSubcategory.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mt-1">
            <span className="text-gray-300 text-xs">·</span>
            <span className="text-xs text-gray-400">{activeSubcategory.label}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ value, label, dot, delay, tooltip, tooltipWidth = "w-64" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className={`bg-white border-[3px] rounded-2xl px-6 py-5 cursor-default transition-all ${hovered ? "border-gray-400 shadow-md" : "border-gray-200 shadow-sm"}`}>
        <div className="w-2.5 h-2.5 rounded-full mb-3" style={{ background: dot }} />
        <div className="text-3xl tracking-tight mb-1">{value}</div>
        <div className="text-xs text-gray-400">{label}</div>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
            className={`absolute top-full mt-2 left-0 bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-xl z-50 ${tooltipWidth}`}>
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Mapping helpers — fixed Red / Amber / Green ───────────────────────────────

function MappingHeader() {
  return (
    <div className="flex items-center gap-3 pb-1">
      <div className="flex-1 px-3"><span className="text-xs text-red-600 uppercase tracking-widest font-semibold">Raw Data</span></div>
      <div className="w-5 flex-shrink-0" />
      <div className="flex-1 px-3"><span className="text-xs text-amber-700 uppercase tracking-widest font-semibold">Concept</span></div>
      <div className="w-5 flex-shrink-0" />
      <div className="flex-1 px-3"><span className="text-xs text-green-700 uppercase tracking-widest font-semibold">Meaning</span></div>
    </div>
  );
}

function MappingRow({ raw, concept, meaning, delay = 0, isEmpty = false }) {
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}
      className="flex items-stretch gap-3">
      <div className={`flex-1 p-3 border-[3px] rounded-xl ${isEmpty ? "bg-gray-50 border-gray-200" : "bg-red-100 border-red-400"}`}>
        <div className={`font-mono text-sm break-all leading-snug ${isEmpty ? "text-gray-400 italic" : "text-gray-700"}`}>{raw}</div>
      </div>
      <div className="flex items-center flex-shrink-0">
        <ArrowRight className="w-4 h-4 text-gray-400" strokeWidth={2} />
      </div>
      <div className="flex-1 p-3 bg-amber-100 border-[3px] border-amber-500 rounded-xl">
        <div className="text-sm text-gray-800 leading-snug font-medium">{concept}</div>
      </div>
      <div className="flex items-center flex-shrink-0">
        <ArrowRight className="w-4 h-4 text-gray-400" strokeWidth={2} />
      </div>
      <div className={`flex-1 p-3 border-[3px] rounded-xl ${isEmpty ? "bg-gray-50 border-gray-200" : "bg-green-100 border-green-400"}`}>
        <div className={`text-sm leading-snug ${isEmpty ? "text-gray-400 italic" : "text-gray-800"}`}>{meaning}</div>
      </div>
    </motion.div>
  );
}

// ── Homepage ──────────────────────────────────────────────────────────────────

function Homepage({ onNext, onJumpToCategory }) {
  const flowSteps = [
    { id: "context", label: "Context" },
    { id: "transformation", label: "Transformation" },
    { id: "unified", label: "Unified View" },
  ];
  const stats = [
    {
      value: "3", label: "Authorities", dot: "#4ADE80", delay: 0.35, tooltipWidth: "w-64",
      tooltip: (
        <div className="space-y-3">
          <div>


            <div className="text-xs text-gray-400">Board of Student Finance</div></div>
          <div className="w-full h-px bg-gray-100" />
          <div><div className="text-xs font-semibold text-gray-800 mb-0.5">Arbetsförmedlingen (AF)</div><div className="text-xs text-gray-400">Public Employment Service</div></div>
          <div className="w-full h-px bg-gray-100" />
          <div><div className="text-xs font-semibold text-gray-800 mb-0.5">Försäkringskassan (FK)</div><div className="text-xs text-gray-400">Swedish Social Insurance Agency</div></div>
        </div>
      ),
    },
    {
      value: "5", label: "Data tables", dot: "#FB923C", delay: 0.42, tooltipWidth: "w-72",
      tooltip: (
        <div className="space-y-3">
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">CSN</div>
            <div className="space-y-1">{["Approved period", "Approved amount"].map((t) => <div key={t} className="flex items-center gap-2 text-xs text-gray-700"><span className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />{t}</div>)}</div>
          </div>
          <div className="w-full h-px bg-gray-100" />
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">AF</div>
            <div className="flex items-center gap-2 text-xs text-gray-700"><span className="w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />Job seeker status</div>
          </div>
          <div className="w-full h-px bg-gray-100" />
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">FK</div>
            <div className="space-y-1">{["Payment record", "Payment detail"].map((t) => <div key={t} className="flex items-center gap-2 text-xs text-gray-700"><span className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />{t}</div>)}</div>
          </div>
        </div>
      ),
    },
    {
      value: "6", label: "Concepts mapped", dot: "#2DD4BF", delay: 0.49, tooltipWidth: "w-64",
      tooltip: (
        <div className="space-y-2">
          {[
            { c: "Support type", d: "Grant, loan, or activity support" },
            { c: "Time period", d: "Approved start and end dates" },
            { c: "Amount", d: "Weekly or total payment value" },
            { c: "Occupation", d: "Study or job-seeking level (%)" },
            { c: "Status", d: "Active, completed, or pending" },
            { c: "Source", d: "Which authority provided the data" },
          ].map(({ c, d }) => (
            <div key={c}><div className="text-xs font-semibold text-gray-800">{c}</div><div className="text-xs text-gray-400 leading-snug">{d}</div></div>
          ))}
        </div>
      ),
    },
    {
      value: "1", label: "Unified view", dot: "#A78BFA", delay: 0.56, tooltipWidth: "w-56",
      tooltip: <div className="text-xs text-gray-500 leading-relaxed">A single consolidated overview combining past and present financial aid data from all three authorities — in plain, actionable language.</div>,
    },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="size-full flex flex-col items-center justify-center px-12 relative overflow-hidden">
      {/* Strong blobs — homepage */}
      <PinkBlob style={{ width: 360, height: 360, top: -130, left: -110, opacity: 0.65 }} />
      <GreenBlob style={{ width: 260, height: 260, top: -80, right: -65, opacity: 0.62 }} />
      <TealBlob style={{ width: 200, height: 200, bottom: 10, right: -60, opacity: 0.6 }} />
      <PurpleBlob style={{ width: 220, height: 220, bottom: -5, left: -70, opacity: 0.58 }} />
      <OrangeBlob style={{ width: 130, height: 130, top: "38%", left: -40, opacity: 0.55 }} />
      <GreenBlob style={{ width: 100, height: 100, bottom: 180, right: 180, opacity: 0.5 }} />
      <PinkBlob style={{ width: 80, height: 80, top: 120, right: 200, opacity: 0.5 }} />
      <BlueBlob style={{ width: 70, height: 70, bottom: 80, left: 200, opacity: 0.45 }} />

      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="absolute top-8 right-10 z-20">
        <PageInfoBadge screenId="homepage" />
      </motion.div>

      <div className="flex flex-col items-center text-center space-y-8 relative z-10 max-w-2xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-gray-200 text-xs text-gray-500 bg-white">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Digital prototype · Semantic Mapping
        </motion.div>
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 }}
          className="text-6xl tracking-tight leading-[1.08]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Harmonizing income data for financial aid
        </motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.28 }}
          className="text-base text-gray-500 leading-relaxed">
          Explore how fragmented public income data can transform into a single, unified view.
        </motion.p>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.38 }}
          className="flex items-center gap-5 flex-wrap justify-center">
          <button onClick={onNext}
            className="px-8 py-3.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all inline-flex items-center gap-3 text-sm">
            Start prototype <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-2">
            {flowSteps.map((step, i) => (
              <span key={step.id} className="flex items-center gap-2">
                <button onClick={() => onJumpToCategory(step.id)}
                  className="text-xs text-gray-400 hover:text-gray-700 hover:underline underline-offset-2 transition-colors">{step.label}</button>
                {i < flowSteps.length - 1 && <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" strokeWidth={1.5} />}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}
        className="flex gap-4 mt-10 relative z-10">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </motion.div>


    </motion.div>
  );
}

// ── Context screens ───────────────────────────────────────────────────────────

function Reality() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 relative overflow-hidden">
      <DG style={{ width: 270, height: 270, top: -70, left: -70 }} />
      <DPu style={{ width: 170, height: 170, bottom: 50, right: -50 }} />
      <DT style={{ width: 110, height: 110, top: "50%", right: 50 }} />

     
        <div className="max-w-5xl space-y-12 relative z-10">
  
  {/* Swedish flag */}
  <div className="absolute top-0 right-0 z-20 w-14 h-14 flex items-center justify-center">
    <img
      src="/swe.png"
      alt="Swedish flag"
      className="w-full h-full object-contain drop-shadow-md"
    />
  </div>

        <div>
          <h1 className="text-6xl tracking-tight leading-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            The Current State
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-3xl">
            In Sweden, financial aid decisions are based on data from multiple public authorities. Each maintains separate systems with different data structures and terminology.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {[
            {
              tag: "CSN",
              image: "/csn.png",
              title: "Board of Student Finance",
              body: "Provides data on student funding, including grants and loans for eligible students.",
              delay: 0.2
            },
            {
              tag: "AF",
              image: "/arbetsform.png",
              title: "Public Employment Service",
              body: "Provides data on employment status, job-seeking activity, and labour market participation.",
              delay: 0.3
            },

            {
              tag: "FK",
              image: "/forsakring.png",
              title: "Social Insurance Agency",
              body: "Provides data on social insurance benefits including activity support payments.",
              delay: 0.4
            }


          ].map((c) => (
            <motion.div
              key={c.tag}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: c.delay }}
              className="p-8 border-[3px] border-gray-200 rounded-2xl bg-white relative"
            >
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-gray-100 shadow-sm bg-white flex items-center justify-center">
                <img
                  src={c.image}
                  alt={c.tag}
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <h3 className="text-lg mb-2 tracking-tight font-semibold">{c.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Persona() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 relative overflow-hidden">
      <DP style={{ width: 250, height: 250, top: 10, right: -65 }} />
      <DT style={{ width: 140, height: 140, bottom: 60, left: -35 }} />
      <DO style={{ width: 85, height: 85, top: "60%", right: 90 }} />
      <div className="max-w-5xl space-y-10 relative z-10">
        <h1 className="text-6xl tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Meet Jane</h1>
        <div className="flex items-start gap-14">
          <img
            src="/girl.png"
            alt="Jane"
            className="w-44 h-44 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 space-y-6">
            <p className="text-2xl text-gray-800 leading-relaxed">
              Jane is currently a part-time student and previously received activity support as a job seeker.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              She wants to understand her current situation before applying for financial aid. She visits a digital platform to understand her current state — but the data is scattered and confusing.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScatteredView() {
  const TableCard = ({ title, source, rows, image }) => (
    <div className="bg-white border-[3px] border-gray-300 rounded-2xl p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>

        {/* Logo instead of placeholder */}
        <div className="w-8 h-8 rounded-full border-2 border-gray-100 shadow-sm bg-white flex items-center justify-center flex-shrink-0">
          <img
            src={image}
            alt={source}
            className="w-full h-full object-contain p-1"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-100">
            <th className="text-left py-1.5 px-2 font-semibold text-gray-400 text-xs w-1/2">
              Field
            </th>
            <th className="text-left py-1.5 px-2 font-semibold text-gray-400 text-xs w-1/2">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([f, v], i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0">
              <td className="py-1.5 px-2 text-xs text-gray-500">{f}</td>
              <td className="py-1.5 px-2 font-mono text-gray-700 text-xs">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="size-full overflow-auto px-8 py-7 relative"
    >
      {/* Background blobs */}
      <DG style={{ width: 200, height: 200, top: -50, right: -40 }} />
      <DPu style={{ width: 150, height: 150, bottom: -30, left: -40 }} />

      <div className="max-w-6xl mx-auto space-y-5 relative z-10">

        {/* Title */}
        <div>
          <h1
            className="text-5xl tracking-tight mb-1"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Scattered View
          </h1>
          <p className="text-sm text-gray-400">
            Raw data as it exists across three separate authority systems
          </p>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-3 gap-4">

          <TableCard
            title="Approved Period"
            source="CSN"
            image="/csn.png"
            rows={[
              ["Start week", "202535"],
              ["End week", "202551"],
              ["Study pace", "50"],
              ["Additional pace", "0"],
              ["Total amount", "37 791"],
            ]}
          />

          <TableCard
            title="Approved Amount"
            source="CSN"
            image="/csn.png"
            rows={[
              ["Type", "GRUNDB"],
              ["Benefit", "Grant"],
              ["Amount/week", "978"],
              ["Total", "16 626"],
              ["Type", "GRUNDL"],
              ["Benefit", "Loan"],
              ["Amount/week", "1 245"],
              ["Total", "21 165"],
            ]}
          />

          <TableCard
            title="Job Seeker Status"
            source="AF"
            image="/arbetsform.png"
            rows={[
              ["Job seeker", "false"],
              ["Category", "Open unemployment"],
              ["Registered", "2025-01-01"],
              ["Scope", "100"],
              ["Deregistered", "2025-06-30"],
              ["Union", "Unionens a-kassa"],
            ]}
          />

          <TableCard
            title="Payment Record"
            source="FK"
            image="/forsakring.png"
            rows={[
              ["Status", "Paid out"],
              ["Type", "Monthly"],
              ["Benefit family", "DAG"],
              ["Period", "Jan–Jun 2025"],
              ["Gross amount", "52 416"],
              ["Tax amount", "7 872"],
              ["Net amount", "43 680"],
            ]}
          />

          <TableCard
            title="Payment Detail"
            source="FK"
            image="/forsakring.png"
            rows={[
              ["Benefit", "AS"],
              ["Amount type", "AS"],
              ["Scope", "100/100"],
              ["Days", "20"],
              ["Hours", "0"],
              ["Net/month", "7 280"],
            ]}
          />

        </div>
      </div>
    </motion.div>
  );
}

function Confusion() {
  const colors = [
    "bg-yellow-200 border-yellow-500 text-yellow-900", "bg-pink-200 border-pink-500 text-pink-900",
    "bg-green-200 border-green-500 text-green-900", "bg-blue-200 border-blue-500 text-blue-900",
    "bg-orange-200 border-orange-500 text-orange-900", "bg-purple-200 border-purple-500 text-purple-900",
    "bg-teal-200 border-teal-500 text-teal-900", "bg-red-200 border-red-500 text-red-900",
    "bg-indigo-200 border-indigo-500 text-indigo-900", "bg-emerald-200 border-emerald-500 text-emerald-900",
  ];
  const questions = [
    { text: "What does GRUNDB mean?", x: "12%", y: "10%" },
    { text: "What is GRUNDL?", x: "62%", y: "15%" },
    { text: "Is 978 per week or total?", x: "26%", y: "30%" },
    { text: "What is week 202535?", x: "66%", y: "40%" },
    { text: "Why two separate amounts?", x: "6%", y: "52%" },
    { text: "What period does this cover?", x: "52%", y: "60%" },
    { text: "Is this active right now?", x: "30%", y: "70%" },
    { text: "What is AS / DAG?", x: "68%", y: "72%" },
    { text: "What is Open unemployment?", x: "8%", y: "80%" },
    { text: "What does 50 (takt) mean?", x: "46%", y: "25%" },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="size-full relative flex items-center justify-center px-8 bg-[#F8F8F6] overflow-hidden">
      <DG style={{ width: 220, height: 220, top: -60, left: -55 }} />
      <DP style={{ width: 170, height: 170, bottom: -40, right: -45 }} />
      <DT style={{ width: 100, height: 100, top: "60%", left: 70 }} />
      {questions.map((q, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -2 : 2 }}
          animate={{ opacity: 1, scale: 1, rotate: i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : 0 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
          className={`absolute rounded-2xl px-4 py-3 shadow-md flex items-start gap-2.5 max-w-[200px] border-2 ${colors[i]}`}
          style={{ left: q.x, top: q.y }}>
          <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0 mt-0.5 opacity-80">
            <span className="text-xs leading-none font-bold">?</span>
          </div>
          <p className="text-xs leading-relaxed font-medium">{q.text}</p>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        className="relative z-10 text-center space-y-4 max-w-2xl">
        <h1 className="text-7xl tracking-tight text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Too Complex</h1>
        <p className="text-base text-gray-500">Technical codes and numbers doesn't help Jane understand her situation</p>
      </motion.div>
    </motion.div>
  );
}

// ── Transformation ────────────────────────────────────────────────────────────

function TransformationIntro() {
  const steps = [
    { label: "Query Understanding", sub: "Interpret user intent and extract key concepts", bg: "bg-blue-100",  border: "border-blue-500",  text: "text-blue-700",  delay: 0.15 },
    { label: "Concept Mapping",     sub: "Align concepts with data fields and sources",    bg: "bg-amber-100", border: "border-amber-500", text: "text-amber-800", delay: 0.4  },
    { label: "Data Retrieval",      sub: "Iteratively collect and fill required information", bg: "bg-pink-100",  border: "border-pink-500",  text: "text-pink-700",  delay: 0.65 },
    { label: "Meaning",             sub: "Deliver consistent, human-readable output",      bg: "bg-green-100", border: "border-green-500", text: "text-green-700", delay: 0.9  },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 relative overflow-hidden">
      <DPu style={{ width: 200, height: 200, top: -60,   right: -55 }} />
      <DT  style={{ width: 130, height: 130, bottom: -35, left: -35 }} />
      <div className="max-w-7xl w-full space-y-14 relative z-10">
        <div className="text-center">
          <h1 className="text-6xl tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>The Transformation Process</h1>
          <p className="text-base text-gray-500 mt-4">As Jane uses the system, several processes occur - translating raw data into meaningful outputs</p>
        </div>
        <div className="flex items-stretch justify-center gap-4">
          {steps.map((s, i) => (
            <span key={s.label} className="flex items-center gap-4 flex-1">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: s.delay }}
                className={`flex-1 p-8 ${s.bg} border-[3px] ${s.border} rounded-2xl text-center flex flex-col items-center justify-center`} style={{ minHeight: "160px" }}>
                <h3 className={`text-xl mb-2 tracking-tight font-semibold ${s.text}`}>{s.label}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{s.sub}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.25 }}>
                  <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" strokeWidth={2} />
                </motion.div>
              )}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Mapping Example 1: FK ─────────────────────────────────────────────────────

function MappingFK() {
  const [showDetails, setShowDetails] = useState(false);

  const summaryItems = [
    { label: "Support", value: "Activity support" },
    { label: "Period", value: "Jan–Jun 2025" },
    { label: "Amount", value: "43,680 SEK net" },
    { label: "Status", value: "Completed" },
    { label: "Source", value: "Social Insurance Agency" },
    { label: "Occupation", value: "Not provided", muted: true },
  ];

  const mappingRows = [
    { raw: "AS", concept: "Support type", meaning: "Activity support" },
    { raw: "Jan–Jun 2025", concept: "Time period", meaning: "Jan–Jun 2025" },
    { raw: "43 680 SEK", concept: "Amount", meaning: "43,680 SEK net received" },
    { raw: "NULL", concept: "Occupation", meaning: "Not provided", isEmpty: true },
    { raw: "Effektuerad", concept: "Status", meaning: "Completed" },
    { raw: "FK", concept: "Source", meaning: "Social Insurance Agency" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 overflow-auto relative"
    >
      <DPu style={{ width: 190, height: 190, top: -55, right: -45 }} />
      <DP style={{ width: 130, height: 130, bottom: -35, left: -35 }} />

      <div className="max-w-5xl w-full space-y-5 py-6 relative z-10">
        <div className="relative">
          <div className="absolute top-0 right-0 w-16 h-16 rounded-2xl border-2 border-gray-200 bg-white shadow-sm flex items-center justify-center p-2">
            <img src="/forsakring.png" alt="FK" className="w-full h-full object-contain" />
          </div>
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-1.5">
            Example 1
          </div>
          <h1
            className="text-5xl tracking-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Social Insurance Agency
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl">
            Collaborates with the Swedish Public Employment Service to retrieve all relevant data.

          </p>
        </div>

        {/* Hero result card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-[3px] border-purple-300 rounded-3xl p-7 shadow-sm"
        >
          <div className="text-xs uppercase tracking-wider text-black mb-3 font-semibold">
            Result
          </div>
          <p className="text-2xl leading-relaxed text-gray-900 max-w-4xl">
            Jane received <strong>activity support</strong> from{" "}
            <strong>January to June 2025</strong> with a total net payment of{" "}
            <strong>43,680 SEK</strong>.
          </p>
          <p className="mt-3 text-sm text-gray-500 max-w-3xl flex items-start gap-2">
            <span className="text-red-500 mt-0.5">⚠</span>
            <span>
              Data from this source does not reveal Jane’s occupation and can only be inferred implicitly.
            </span>
          </p>
        </motion.div>

        {/* Compact summary */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="bg-white border-[3px] border-purple-200 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs uppercase tracking-wider text-black mb-1">
                Interpreted overview
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Key information at a glance
              </h2>
            </div>

            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-purple-200 bg-purple-50 hover:border-purple-400 transition-all text-sm text-purple-700"
            >
              {showDetails ? "Hide data mapping" : "Show data mapping"}
              {showDetails ? (
                <ChevronUp className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {summaryItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 + i * 0.05 }}
                className={`relative rounded-2xl border-2 p-4 ${item.muted
                    ? "bg-purple-50/40 border-purple-100"
                    : "bg-purple-50 border-purple-200"
                  }`}
              >
                {/* ⚠ icon for missing data */}
                {item.muted && (
                  <span className="absolute top-2 right-2 text-red-500 text-sm">
                    ⚠
                  </span>
                )}

                <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                  {item.label}
                </div>

                <div
                  className={`text-base leading-snug ${item.muted
                      ? "text-gray-400 italic"
                      : "text-gray-900 font-medium"
                    }`}
                >
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t-2 border-purple-100 space-y-3">
                  <div className="text-xs uppercase tracking-wider text-black font-semibold">
                    Data mapping
                  </div>

                  <div className="grid grid-cols-3 gap-3 px-1">
                    <div className="text-xs text-red-600 uppercase tracking-widest font-semibold">
                      Raw Data
                    </div>
                    <div className="text-xs text-amber-700 uppercase tracking-widest font-semibold">
                      Concept
                    </div>
                    <div className="text-xs text-green-700 uppercase tracking-widest font-semibold">
                      Meaning
                    </div>
                  </div>

                  {mappingRows.map((row, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i }}
                      className="grid grid-cols-3 gap-3"
                    >
                      <div
                        className={`rounded-2xl border-2 p-4 ${row.isEmpty
                            ? "bg-gray-50 border-gray-200"
                            : "bg-red-50 border-red-300"
                          }`}
                      >
                        <div
                          className={`text-sm leading-snug font-mono ${row.isEmpty ? "text-gray-400 italic" : "text-gray-700"
                            }`}
                        >
                          {row.raw}
                        </div>
                      </div>

                      <div className="rounded-2xl border-2 p-4 bg-amber-50 border-amber-300">
                        <div className="text-sm leading-snug text-gray-800 font-medium">
                          {row.concept}
                        </div>
                      </div>

                      <div
                        className={`rounded-2xl border-2 p-4 ${row.isEmpty
                            ? "bg-gray-50 border-gray-200"
                            : "bg-green-50 border-green-300"
                          }`}
                      >
                        <div
                          className={`text-sm leading-snug ${row.isEmpty ? "text-gray-400 italic" : "text-gray-800"
                            }`}
                        >
                          {row.meaning}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Mapping Example 2: AF ─────────────────────────────────────────────────────

function MappingAF() {
  const [showDetails, setShowDetails] = useState(false);

  const summaryItems = [
    { label: "Support", value: "Activity support" },
    { label: "Period", value: "Jan–Jun 2025" },
    { label: "Occupation", value: "Full-time job seeker" },
    { label: "Status", value: "Completed" },
    { label: "Source", value: "Public Employment Service" },
    { label: "Amount", value: "Not provided", muted: true },
  ];

  const mappingRows = [
    { raw: "Aktivitetsstöd", concept: "Support type", meaning: "Activity support" },
    { raw: "Jan–Jun 2025", concept: "Time period", meaning: "Jan–Jun 2025" },
    { raw: "NULL", concept: "Amount", meaning: "Not provided", isEmpty: true },
    { raw: "100/100", concept: "Occupation", meaning: "Full-time job seeker" },
    { raw: "Effektuerad", concept: "Status", meaning: "Completed" },
    { raw: "AF", concept: "Source", meaning: "Public Employment Service" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 overflow-auto relative"
    >
      <DB style={{ width: 190, height: 190, top: -55, right: -45 }} />
      <DO style={{ width: 130, height: 130, bottom: -35, left: -35 }} />

      <div className="max-w-5xl w-full space-y-5 py-6 relative z-10">
        <div className="relative">
          <div className="absolute top-0 right-0 w-16 h-16 rounded-2xl border-2 border-gray-200 bg-white shadow-sm flex items-center justify-center p-2">
            <img src="/arbetsform.png" alt="AF" className="w-full h-full object-contain" />
          </div>
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-1.5">
            Example 2
          </div>
          <h1
            className="text-5xl tracking-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            The Swedish Public Employment Service
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl">
            Collaborates with the Social Insurance Agency to retrieve all relevant data.

          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-[3px] border-blue-300 rounded-3xl p-7 shadow-sm"
        >
          <div className="text-xs uppercase tracking-wider text-black mb-3 font-semibold">
            Result
          </div>
          <p className="text-2xl leading-relaxed text-gray-900 max-w-4xl">
            Jane was a <strong>full-time job seeker</strong> receiving{" "}
            <strong>activity support</strong> from <strong>January to June 2025</strong>.
          </p>
          <p className="mt-3 text-sm text-gray-500 max-w-3xl flex items-start gap-2">
            <span className="text-red-500 mt-0.5">⚠</span>
            <span>
              Data from this source does not reveal the payment amount.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="bg-white border-[3px] border-blue-200 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs uppercase tracking-wider text-black mb-1">
                Interpreted overview
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Key information at a glance
              </h2>
            </div>

            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-200 bg-blue-50 hover:border-blue-400 transition-all text-sm text-blue-700"
            >
              {showDetails ? "Hide data mapping" : "Show data mapping"}
              {showDetails ? (
                <ChevronUp className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {summaryItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 + i * 0.05 }}
                className={`relative rounded-2xl border-2 p-4 ${item.muted
                    ? "bg-blue-50/40 border-blue-100"
                    : "bg-blue-50 border-blue-200"
                  }`}
              >
                {item.muted && (
                  <span className="absolute top-2 right-2 text-red-500 text-sm">
                    ⚠
                  </span>
                )}

                <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                  {item.label}
                </div>

                <div
                  className={`text-base leading-snug ${item.muted
                      ? "text-gray-400 italic"
                      : "text-gray-900 font-medium"
                    }`}
                >
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t-2 border-blue-100 space-y-3">
                  <div className="text-xs uppercase tracking-wider text-black font-semibold">
                    Data mapping
                  </div>

                  <div className="grid grid-cols-3 gap-3 px-1">
                    <div className="text-xs text-red-600 uppercase tracking-widest font-semibold">
                      Raw Data
                    </div>
                    <div className="text-xs text-amber-700 uppercase tracking-widest font-semibold">
                      Concept
                    </div>
                    <div className="text-xs text-green-700 uppercase tracking-widest font-semibold">
                      Meaning
                    </div>
                  </div>

                  {mappingRows.map((row, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i }}
                      className="grid grid-cols-3 gap-3"
                    >
                      <div
                        className={`rounded-2xl border-2 p-4 ${row.isEmpty
                            ? "bg-gray-50 border-gray-200"
                            : "bg-red-50 border-red-300"
                          }`}
                      >
                        <div
                          className={`text-sm leading-snug font-mono ${row.isEmpty ? "text-gray-400 italic" : "text-gray-700"
                            }`}
                        >
                          {row.raw}
                        </div>
                      </div>

                      <div className="rounded-2xl border-2 p-4 bg-amber-50 border-amber-300">
                        <div className="text-sm leading-snug text-gray-800 font-medium">
                          {row.concept}
                        </div>
                      </div>

                      <div
                        className={`rounded-2xl border-2 p-4 ${row.isEmpty
                            ? "bg-gray-50 border-gray-200"
                            : "bg-green-50 border-green-300"
                          }`}
                      >
                        <div
                          className={`text-sm leading-snug ${row.isEmpty ? "text-gray-400 italic" : "text-gray-800"
                            }`}
                        >
                          {row.meaning}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

function MappingCSN() {
  const [showDetails, setShowDetails] = useState(false);

  const summaryItems = [
    { label: "Support", value: "Study grant + study loan" },
    { label: "Period", value: "Week 35–51, 2025" },
    { label: "Study pace", value: "50% part-time" },
    { label: "Grant", value: "978 SEK/week" },
    { label: "Loan", value: "1,245 SEK/week" },
    { label: "Source", value: "Board of Student Finance" },
  ];

  const mappingRows = [
    { raw: "GRUNDB", concept: "Support type — Grant", meaning: "Study grant (bidrag)" },
    { raw: "GRUNDL", concept: "Support type — Loan", meaning: "Study loan (lån)" },
    { raw: "978", concept: "Grant per week", meaning: "978 SEK/week" },
    { raw: "1 245", concept: "Loan per week", meaning: "1,245 SEK/week" },
    { raw: "202535 → 202551", concept: "Time period", meaning: "Week 35–51, 2025" },
    { raw: "50 (takt)", concept: "Study pace", meaning: "50% part-time" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 overflow-auto relative"
    >
      <GreenBlob style={{ width: 190, height: 190, top: -55, right: -45, opacity: 0.55 }} />
      <TealBlob style={{ width: 130, height: 130, bottom: -35, left: -35, opacity: 0.45 }} />
      <BlueBlob style={{ width: 80, height: 80, top: "50%", left: 40, opacity: 0.35 }} />

      <div className="max-w-5xl w-full space-y-5 py-6 relative z-10">
        <div className="relative">
          <div className="absolute top-0 right-0 w-16 h-16 rounded-2xl border-2 border-gray-200 bg-white shadow-sm flex items-center justify-center p-2">
            <img src="/csn.png" alt="CSN" className="w-full h-full object-contain" />
          </div>
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-1.5">
            Example 3
          </div>
          <h1
            className="text-5xl tracking-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Board of Student Finance
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl">
            Data can be combined with other sources to create a complete overview.
          </p>
        </div>

        {/* Hero result card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-[3px] border-yellow-300 rounded-3xl p-7 shadow-sm"
        >
          <div className="text-xs uppercase tracking-wider text-black mb-3 font-semibold">
            Result
          </div>
          <p className="text-2xl leading-relaxed text-gray-900 max-w-4xl">
            Jane receives a <strong>study grant of 978 SEK per week</strong> and a{" "}
            <strong>study loan of 1,245 SEK per week</strong> at{" "}
            <strong>50% study pace</strong> during <strong>week 35 to week 51, 2025</strong>.
          </p>


          <p className="mt-3 text-sm text-gray-500 max-w-3xl flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span>
              Jane's study support information is comprehensive and self-explanatory.
            </span>
          </p>


        </motion.div>

        {/* Compact summary */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="bg-white border-[3px] border-yellow-300 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs uppercase tracking-wider text-black mb-1">
                Interpreted overview
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Key information at a glance
              </h2>
            </div>

            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-yellow-200 bg-yellow-50 hover:border-yellow-400 transition-all text-sm text-yellow-700"
            >
              {showDetails ? "Hide data mapping" : "Show data mapping"}
              {showDetails ? (
                <ChevronUp className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {summaryItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 + i * 0.05 }}
                className="rounded-2xl border-2 p-4 bg-yellow-50 border-yellow-300"
              >
                <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                  {item.label}
                </div>
                <div className="text-base leading-snug text-gray-900 font-medium">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t-2 border-green-100 space-y-3">
                  <div className="text-xs uppercase tracking-wider text-black font-semibold">
                    Data mapping
                  </div>

                  <div className="grid grid-cols-3 gap-3 px-1">
                    <div className="text-xs text-red-600 uppercase tracking-widest font-semibold">
                      Raw Data
                    </div>
                    <div className="text-xs text-amber-700 uppercase tracking-widest font-semibold">
                      Concept
                    </div>
                    <div className="text-xs text-green-700 uppercase tracking-widest font-semibold">
                      Meaning
                    </div>
                  </div>

                  {mappingRows.map((row, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i }}
                      className="grid grid-cols-3 gap-3"
                    >
                      <div className="rounded-2xl border-2 p-4 bg-red-50 border-red-300">
                        <div className="text-sm leading-snug font-mono text-gray-700">
                          {row.raw}
                        </div>
                      </div>

                      <div className="rounded-2xl border-2 p-4 bg-amber-50 border-amber-300">
                        <div className="text-sm leading-snug text-gray-800 font-medium">
                          {row.concept}
                        </div>
                      </div>

                      <div className="rounded-2xl border-2 p-4 bg-green-50 border-green-300">
                        <div className="text-sm leading-snug text-gray-800">
                          {row.meaning}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Unified View ──────────────────────────────────────────────────────────────

function UnifiedView() {
  const [activityHovered, setActivityHovered] = useState(false);
  const [prevExpanded, setPrevExpanded] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="size-full overflow-auto px-8 py-7 relative">
      <DG style={{ width: 210, height: 210, top: -55, right: -45 }} />
      <DPu style={{ width: 150, height: 150, bottom: -35, left: -35 }} />
      <DT style={{ width: 90, height: 90, top: "55%", right: 50 }} />
      <div className="max-w-4xl mx-auto space-y-5 relative z-10">
        <div>
          <h1 className="text-5xl tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Unified View</h1>
          <p className="text-sm text-gray-400 mt-1">Jane's complete financial aid situation</p>
        </div>

        {/* Profile card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white border-[3px] border-gray-200 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src="/girl.png"
              alt="Jane"
              className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
            />
            <div>
              <div className="text-xl font-semibold text-gray-900">Jane Doe</div>
              <div className="text-xs text-gray-400 font-mono mt-0.5">20000421-1234</div>
            </div>
          </div>
          {/* Activity pills with hover */}
          <div className="relative cursor-default" onMouseEnter={() => setActivityHovered(true)} onMouseLeave={() => setActivityHovered(false)}>
            <AnimatePresence mode="wait">
              {activityHovered ? (
                <motion.div key="exp" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15 }}
                  className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border-2 border-green-400 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-semibold text-green-800">Student</span>
                    <span className="text-sm text-green-700 font-mono">50%</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-2 border-gray-300 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">Job seeker</span>
                    <span className="text-sm text-gray-600 font-mono">50%</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-full hover:border-gray-400 transition-all">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm text-gray-600">Student</span>
                  <span className="text-gray-300">·</span>
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-sm text-gray-600">Job seeker</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          {/* Current situation — CSN */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white border-[3px] border-green-300 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Current · CSN</div>
                <h3 className="text-lg font-semibold">Board of Student Finance</h3>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold border-2 border-green-300">Active</div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><div className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Study pace</div><div className="text-lg font-semibold text-gray-900">50%</div></div>
                <div><div className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Period</div><div className="text-lg font-semibold text-gray-900">Aug–Dec 2025</div></div>
                <div><div className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Grant/week</div><div className="text-lg font-semibold text-gray-900">978 SEK</div></div>
                <div><div className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Loan/week</div><div className="text-lg font-semibold text-gray-900">1,245 SEK</div></div>
              </div>
              <div className="pt-3 border-t-2 border-gray-100">
                <div className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Total approved</div>
                <div className="text-3xl tracking-tight font-light">37,791 SEK</div>
                <div className="text-xs text-gray-400 mt-0.5">16,626 grant + 21,165 loan</div>
              </div>
            </div>
          </motion.div>

          {/* Previous payments — clickable */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <button onClick={() => setPrevExpanded((e) => !e)}
              className="w-full text-left bg-white border-[3px] border-gray-300 rounded-2xl p-6 hover:border-gray-400 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Previous</div>
                    <h3 className="text-lg font-semibold text-gray-700">Activity Support</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold border-2 border-gray-300">Completed</div>
                  {prevExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span><span className="text-gray-400 text-xs uppercase tracking-wider mr-1">Period</span>Jan–Jun 2025</span>
                <span><span className="text-gray-400 text-xs uppercase tracking-wider mr-1">Total</span>43,680 SEK</span>
              </div>
              <AnimatePresence>
                {prevExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="mt-4 pt-4 border-t-2 border-gray-100 grid grid-cols-2 gap-3">
                      <div><div className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Support type</div><div className="text-base font-semibold text-gray-800">Activity support</div></div>
                      <div><div className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Time period</div><div className="text-base font-semibold text-gray-800">Jan–Jun 2025</div></div>
                      <div><div className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Occupation</div><div className="text-base font-semibold text-gray-800">100% (full-time)</div></div>
                      <div><div className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Total amount</div><div className="text-base font-semibold text-gray-800">43,680 SEK net</div></div>
                      <div><div className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Source</div><div className="text-base font-semibold text-gray-800">AF + FK</div></div>
                      <div><div className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Status</div><div className="text-base font-semibold text-gray-800">Completed</div></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        {/* Combined overview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-gradient-to-br from-purple-50 via-teal-50 to-green-50 border-[3px] border-gray-300 rounded-2xl p-8 shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <div className="text-xs uppercase tracking-wider text-gray-600 font-semibold ml-1">
                  Combined Overview
                </div>
              </div>

              <div className="text-xl text-gray-800 leading-relaxed max-w-md">
                Jane has received a total of <strong className="text-2xl">81,471 SEK</strong> in financial support across both periods.
              </div>
            </div>

            <div className="text-right">
              <div className="text-5xl tracking-tight font-light text-gray-900 mb-1">
                81,471
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">SEK Total</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Why This Matters — strong blobs ──────────────────────────────────────────
function TestConnection() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
  setLoading(true);

  try {
    const res = await fetch("https://backendprototype-prce.onrender.com/api/test-pipeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: "income",
      }),
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();

    if (typeof data === "string") {
      setOutput(data);
    } else if (data?.output) {
      setOutput(JSON.stringify(data.output, null, 2));
    } else {
      setOutput(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    setOutput(
      error instanceof Error
        ? `hej: ${error.message}`
        : "då."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 relative overflow-hidden"
    >
      <DG style={{ width: 220, height: 220, top: -55, right: -45 }} />
      <DPu style={{ width: 150, height: 150, bottom: -35, left: -35 }} />

      <div className="max-w-4xl w-full space-y-6 relative z-10">
        <div>
          <h1
            className="text-5xl tracking-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Working on backend...
          </h1>
          <p className="text-sm text-gray-500 mt-2">
           Vashti is currently mapping concepts one by one.
          </p>
        </div>

        <div className="bg-white border-[3px] border-black-200 rounded-3xl p-6 space-y-5">
          <button
            onClick={runTest}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-black/100 text-white hover:bg-blue-800 disabled:opacity-50 transition-all text-sm"
          >
            {loading ? "Running..." : "Try me"}
          </button>

          <div className="border-2 border-gray-200 rounded-2xl bg-gray-50 p-4 min-h-[260px]">
            <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
              Terminal Output
            </div>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words font-mono">
              {output || "This will take some time..."}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
function Value() {
  const benefits = [
    { n: "1", title: "Enables Consistent Understanding", desc: "Aligning data through shared semantics ensures that the same information is understood in the same way, regardless of source." },
    { n: "2", title: "Supports Concept-Driven Design", desc: "By structuring data around shared concepts, complex information can be presented in a way that is intuitive and meaningful to users." },
    { n: "3", title: "Improves Decision-Making", desc: "Clear and comparable information allows individuals to make informed decisions without relying on assumptions or guesswork." },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 relative overflow-hidden">
      <GreenBlob style={{ width: 300, height: 300, top: -75, right: -70, opacity: 0.62 }} />
      <PinkBlob style={{ width: 220, height: 220, bottom: 55, left: -60, opacity: 0.58 }} />
      <TealBlob style={{ width: 150, height: 150, bottom: 210, right: 80, opacity: 0.52 }} />
      <OrangeBlob style={{ width: 100, height: 100, top: 100, left: 80, opacity: 0.48 }} />
      <PurpleBlob style={{ width: 80, height: 80, top: "30%", left: 50, opacity: 0.42 }} />
      <BlueBlob style={{ width: 75, height: 75, bottom: 120, right: 220, opacity: 0.42 }} />

      <div className="max-w-6xl space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <h1 className="text-7xl tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Why This Matters
          </h1>
          <p className="text-base text-gray-400">Transparent transformation creates trust and understanding</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const colors = ["bg-purple-500", "bg-teal-500", "bg-green-500"];
            return (
              <motion.div
                key={i}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.18 + i * 0.14 }}
                className="p-8 bg-white border-[3px] border-gray-200 rounded-2xl space-y-4"
              >
                <div className={`w-10 h-10 rounded-full ${colors[i]} text-white flex items-center justify-center text-base font-semibold`}>
                  {b.n}
                </div>
                <h3 className="text-lg tracking-tight font-semibold">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
          