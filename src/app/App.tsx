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
    id: "context", label: "Context",
    screens: [
      { id: "context/reality", label: "Decentralized Systems" },
      { id: "context/persona", label: "Meet Jane" },
      { id: "context/scattered", label: "Scattered View" },
      { id: "context/confusion", label: "Reduce Ambiguity" },
    ]
  },
  {
    id: "transformation", label: "Transformation",
    screens: [
      { id: "transformation/intro", label: "The Transformation Process" },
      { id: "transformation/mapping-csn", label: "Mapping Logic: Example 1" },
      { id: "transformation/mapping-af", label: "Mapping Logic: Example 2" },
      { id: "transformation/mapping-fk", label: "Mapping Logic: Example 3" },
    ]
  },
  {
    id: "unified", label: "Unified View",
    screens: [
      { id: "unified/overview", label: "Unified View" },
      { id: "unified/value", label: "Why This Matters" },
    ]
  },
  {
    id: "backend", label: "Backend",
    screens: [{ id: "unified/test", label: "Under Development" }]
  },
];

const PAGE_INFO = {
  "homepage": {
    title: "Semantic Interoperability",
    content: [
      "Systems can successfully exchange data and still fail to make it understandable to end users.",
      "This is where semantic integration matters.",
      "Shared definitions, common context, and clear presentation enable human understanding."
    ]
  },
  "context/reality": {
    title: "Swedish Context",
    content: [
      "Current developments aim to digitize the application process for financial aid.",
      "Efforts focus on cleaning and re-structuring data.",
      "By 2027, a new e-service portal will allow citizens to make applications independently.",
    ]
  },
  "context/persona": { title: "The E-service", content: ["As users manage their own data, clear information becomes crucial.", "Intuitive design and visual guidance facilitate informed decision-making."] },
  "context/scattered": { title: "Fragmented Data", content: "With the current solution, case workers must interpret siloed data to provide assistance.\n\nFollowing complaints regarding understandability, areas for improvement include providing clearer presentation of information." },
  "context/confusion": {
    title: "Ontologies and Mapping",
    content: ["Ontologies structure the meaning of data, formalizing real-world concepts into explicit representations.", "Semantic mapping links data elements to these defined representations.", "Together they enable consistent interpretation across systems."]
  },
  "transformation/intro": { title: "The Logic", content: ["Each authority's data structure is mapped individually, allowing the system to transform and unify the data through a backend pipeline."] },
  "transformation/mapping-csn": { title: "Dataset Analysis", content: ["A decision-based structure is used, providing information on eligibility and participation.", "In contrast to the other datasets, there is only one relevant table for this example.", "Several attributes must be inferred from temporal fields rather than explicitly stated.", "The absence of monetary values requires integration with data from the Social Insurance Agency to provide a complete view."] },
  "transformation/mapping-af": { title: "Dataset Analysis", content: ["Status is not explicitly stored, but can accurately be inferred from decision dates.", "In contrast, determining occupation can only be done by integrating with data from The Public Employment Service."] },
  "transformation/mapping-fk": { title: "Dataset Analysis", content: ["The raw data for the concepts time period and amount is initially presented in weeks, requiring conversion into a standardized format."] },
  "unified/overview": { title: "Unified View", content: ["This is a conceptual illustration.", "Visual details of the upcoming e-service have not yet been disclosed.", "The aim is to enable citizens to access relevant information, simplifying the application process."] },
  "unified/value": { title: "Wider Context", content: ["EU's digital strategy emphasizes accessible, human-centered digital services.", "By 2030, the goal is for all key public services to be fully available online.", "In alignment, Sweden is steadily progressing - enabling interoperability step by step."] },
  "unified/test": { title: "Work in Progress", content: "" }
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

      {/* Nav — minimal badge-only bar on homepage, full nav on inner pages */}
      {isHomepage
        ? <HomepageNav />
        : <CategoryNav currentScreenId={screens[currentScreen]} onJumpToCategory={jumpToCategory} onGoHome={goHome} />
      }

      <div className="flex-1 overflow-hidden relative" style={{ zoom: 0.60 }}>
        <AnimatePresence mode="wait">
          {screens[currentScreen] === "homepage" && <Homepage key="hp" onNext={nextScreen} onJumpToCategory={jumpToCategory} />}
          {screens[currentScreen] === "context/reality" && <Reality key="cr" />}
          {screens[currentScreen] === "context/persona" && <Persona key="cp" />}
          {screens[currentScreen] === "context/scattered" && <ScatteredView key="cs" />}
          {screens[currentScreen] === "context/confusion" && <Confusion key="cc" />}
          {screens[currentScreen] === "transformation/intro" && <TransformationIntro key="ti" />}
          {screens[currentScreen] === "transformation/mapping-csn" && <MappingAF key="mc" />}
          {screens[currentScreen] === "transformation/mapping-af" && <MappingFK key="ma" />}
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

// ── Blobs ─────────────────────────────────────────────────────────────────────

function Blob({ color, style }) {
  return <div className="absolute pointer-events-none select-none" style={{ background: color, ...style }} />;
}
function GreenBlob({ style }) { return <Blob color="#4ADE80" style={{ borderRadius: "62% 38% 46% 54% / 60% 44% 56% 40%", ...style }} />; }
function PinkBlob({ style }) { return <Blob color="#F472B6" style={{ borderRadius: "45% 55% 65% 35% / 50% 62% 38% 50%", ...style }} />; }
function TealBlob({ style }) { return <Blob color="#2DD4BF" style={{ borderRadius: "55% 45% 38% 62% / 48% 55% 45% 52%", ...style }} />; }
function PurpleBlob({ style }) { return <Blob color="#A78BFA" style={{ borderRadius: "38% 62% 55% 45% / 52% 40% 60% 48%", ...style }} />; }
function OrangeBlob({ style }) { return <Blob color="#FB923C" style={{ borderRadius: "50% 50% 40% 60% / 44% 56% 44% 56%", ...style }} />; }
function BlueBlob({ style }) { return <Blob color="#60A5FA" style={{ borderRadius: "48% 52% 58% 42% / 55% 45% 55% 45%", ...style }} />; }
function DG({ style }) { return <GreenBlob style={{ opacity: 0.22, ...style }} />; }
function DP({ style }) { return <PinkBlob style={{ opacity: 0.22, ...style }} />; }
function DT({ style }) { return <TealBlob style={{ opacity: 0.22, ...style }} />; }
function DPu({ style }) { return <PurpleBlob style={{ opacity: 0.22, ...style }} />; }
function DO({ style }) { return <OrangeBlob style={{ opacity: 0.20, ...style }} />; }
function DB({ style }) { return <BlueBlob style={{ opacity: 0.22, ...style }} />; }

// ── Null warning — red, fixed size, consistent everywhere ─────────────────────

function NullWarningBadge() {
  return (
    <span
      className="inline-flex items-center justify-center flex-shrink-0"
      style={{ width: 8, height: 20, borderRadius: 3, border: "0px solid #EF4444", color: "#EF4444", fontSize: 9, fontWeight: 700, background: "transparent", lineHeight: 1 }}
    >✕</span>
  );
}

function NullCell({ label = "NULL" }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm font-mono text-gray-500">{label}</span>
      <NullWarningBadge />
    </div>
  );
}

function NullMeaningCell({ label = "Not provided" }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm font-mono text-gray-500">{label}</span>
      <NullWarningBadge />
    </div>
  );
}

// ── Mapping rows ──────────────────────────────────────────────────────────────

function MappingDataRow({ row, animate = false, delay = 0 }) {
  const inner = (
    <div className="grid grid-cols-3 gap-3">
      <div className={`rounded-2xl border-2 p-4 ${row.isEmpty ? "bg-gray-50 border-dashed border-gray-200" : "bg-red-50 border-red-300"}`}>
        <div className="text-sm leading-snug font-mono text-gray-700">
          {row.isEmpty ? <NullCell /> : row.raw}
        </div>
      </div>
      <div className="rounded-2xl border-2 p-4 bg-amber-50 border-amber-300">
        <div className="text-sm leading-snug text-gray-800 font-medium">{row.concept}</div>
      </div>
      <div className={`rounded-2xl border-2 p-4 ${row.isEmpty ? "bg-gray-50 border-dashed border-gray-200" : "bg-green-50 border-green-300"}`}>
        <div className="text-sm leading-snug text-gray-800">
          {row.isEmpty ? <NullMeaningCell /> : row.meaning}
        </div>
      </div>
    </div>
  );
  if (!animate) return inner;
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      {inner}
    </motion.div>
  );
}

function MappingColumnHeaders() {
  return (
    <div className="grid grid-cols-3 gap-3 px-1">
      <div className="text-xs text-red-600 uppercase tracking-widest font-semibold">Raw Data</div>
      <div className="text-xs text-amber-700 uppercase tracking-widest font-semibold">Concept</div>
      <div className="text-xs text-green-700 uppercase tracking-widest font-semibold">Meaning</div>
    </div>
  );
}

// ── TransformationPipelinePanel ───────────────────────────────────────────────

function TransformationPipelinePanel({ onClose }) {
  const steps = [
    { n: "01", label: "User Click", desc: "The user makes a categorized selection in the interface.", boxBg: "bg-purple-100", boxText: "text-purple-700", boxBorder: "border-purple-300" },
    { n: "02", label: "API Request", desc: "The click sends a structured request to the API based on category.", boxBg: "bg-blue-100", boxText: "text-blue-700", boxBorder: "border-blue-300" },
    { n: "03", label: "Query Analysis", desc: "The API identifies the request intent and determines which concept group applies.", boxBg: "bg-indigo-100", boxText: "text-indigo-700", boxBorder: "border-indigo-300" },
    { n: "04", label: "Concept Setup", desc: "Concept fields are initialized as empty targets that need to be filled.", boxBg: "bg-amber-100", boxText: "text-amber-700", boxBorder: "border-amber-300" },
    { n: "05", label: "Source Loop", desc: "The system iteratively searches relevant organizations connected to the required concepts.", boxBg: "bg-pink-100", boxText: "text-pink-700", boxBorder: "border-pink-300" },
    { n: "06", label: "Field Matching", desc: "Within each organization, relevant tables and priority fields are matched to the concepts.", boxBg: "bg-orange-100", boxText: "text-orange-700", boxBorder: "border-orange-300" },
    { n: "07", label: "Fallback", desc: "If concepts remain unfilled, the API tries alternative identifiers and related mappings.", boxBg: "bg-red-100", boxText: "text-red-700", boxBorder: "border-red-300" },
    { n: "08", label: "Check", desc: "The loop continues until all required concept fields are filled or valid matches run out.", boxBg: "bg-teal-100", boxText: "text-teal-700", boxBorder: "border-teal-300" },
    { n: "09", label: "Interpretation", desc: "Technical API output is translated into a format that is understandable for the user.", boxBg: "bg-emerald-100", boxText: "text-emerald-700", boxBorder: "border-emerald-300" },
    { n: "10", label: "Response", desc: "The interpreted result is returned to the interface as a clear response.", boxBg: "bg-green-100", boxText: "text-green-700", boxBorder: "border-green-300" },
  ];
  return (
    <div className="p-7">
      <div className="flex justify-end mb-1">
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-3.5 h-4" strokeWidth={2} /></button>
      </div>
      <div className="flex items-start gap-0 overflow-x-auto pb-5">
        {steps.map((step, i) => (
          <div key={step.n} className="flex items-start flex-shrink-0">
            <div className="w-[150px] flex flex-col items-center">
              <div className={`w-12 h-12 rounded-xl border-2 ${step.boxBg} ${step.boxBorder} flex items-center justify-center mb-3`}>
                <span className={`text-sm font-bold ${step.boxText}`}>{step.n}</span>
              </div>
              <div className="text-xs font-semibold text-gray-800 text-center leading-tight mb-2 px-1">{step.label}</div>
              <div className="text-[10px] text-gray-500 text-center leading-relaxed px-2">{step.desc}</div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-start pt-6 px-3 flex-shrink-0">
                <div className="w-8 h-px bg-gray-300 mt-4" />
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
  const info = PAGE_INFO[screenId] || { title: "Info", content: "Placeholder." };
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
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl z-50"
              style={{ width: 320 }}>
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
                <div className="space-y-3 text-xs text-gray-500 leading-relaxed">
                  {(Array.isArray(info.content) ? info.content : [info.content]).map((p, i) => (
                    <p key={i} className="whitespace-pre-line">{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Homepage nav — minimal bar matching inner pages ───────────────────────────

function HomepageNav() {
  return (
    <div className="flex-shrink-0 border-b-2 border-gray-200 bg-[#F8F8F6] px-8 pt-2.5 pb-3">
      <div className="max-w-7xl mx-auto flex justify-end">
        <PageInfoBadge screenId="homepage" />
      </div>
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

function StatCard({ value, label, dot, delay, tooltip, tooltipWidth = "w-72" }) {
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
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}
            className={`absolute bottom-full mb-2 left-0 bg-white border-2 border-gray-200 rounded-2xl p-5 shadow-xl z-50 ${tooltipWidth}`}>
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Homepage ──────────────────────────────────────────────────────────────────

function Homepage({ onNext, onJumpToCategory }) {
  const flowSteps = [
    { id: "context", label: "Context" },
    { id: "transformation", label: "Transformation" },
    { id: "unified", label: "Unified View" },
    { id: "backend", label: "Backend" },
  ];

  const stats = [
    {
      value: "8", label: "Data Tables", dot: "#FB923C", delay: 0.42, tooltipWidth: "w-80",
      tooltip: (
        <div className="space-y-5">
          <div className="text-xs font-semibold text-gray-900">Public authority systems hold tables containing relevant data</div>
          <div className="space-y-4">
            {[
              {
                label: "Public Employment Service", color: "bg-orange-400",
                tables: ["Job Seeker Status", "Financial Decision"]
              },
              {
                label: "Social Insurance Agency", color: "bg-purple-400",
                tables: ["Payment Record", "Decision Period Grant Decision", "Decision"]
              },
              {
                label: "Board of Student Finance", color: "bg-green-400",
                tables: ["Approved Period", "Approved Amount", "Grant Decision"]
              },
            ].map((org) => (
              <div key={org.label}>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">{org.label}</div>
                <div className="space-y-1.5">
                  {org.tables.map((t) => (
                    <div key={t} className="flex items-center gap-2.5 text-xs text-gray-700">
                      <span className={`w-1.5 h-1.5 rounded-full ${org.color} flex-shrink-0`} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      value: "5", label: "Concepts", dot: "#2DD4BF", delay: 0.49, tooltipWidth: "w-72",
      tooltip: (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-900">Concepts structure real-world context into categories</div>
          <div className="w-full h-px bg-gray-100" />
          <div className="space-y-3">
            {[
              { c: "Support type", d: "Contains data about financial aid" },
              { c: "Time period", d: "Start and end dates" },
              { c: "Amount", d: "Monetary values" },
              { c: "Occupation", d: "Studying or job-seeking" },
              { c: "Status", d: "Current state of an application" },
            ].map(({ c, d }) => (
              <div key={c} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-medium text-gray-800">{c}</div>
                  <div className="text-xs text-gray-400 leading-snug mt-0.5">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      value: "3", label: "Data Sources", dot: "#60A5FA", delay: 0.35, tooltipWidth: "w-72",
      tooltip: (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-900">Public authority systems hold the data</div>
          <div className="w-full h-px bg-gray-100" />
          <div className="space-y-4">
            {[
              { name: "The Public Employment Service", swedish: "Arbetsförmedlingen" },
              { name: "The Social Insurance Agency", swedish: "Försäkringskassan" },
              { name: "The Board of Student Finance", swedish: "Centrala studiestödsnämnden" },
            ].map((s) => (
              <div key={s.name} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-gray-800">{s.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.swedish}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      value: "1", label: "Unified view", dot: "#A78BFA", delay: 0.56, tooltipWidth: "w-64",
      tooltip: (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-900">The data is presented in an interface</div>
          <div className="w-full h-px bg-gray-100" />
          <div className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#A78BFA" }} />
            <p className="text-xs text-gray-500 leading-relaxed">
              The unified view combines data from the three authority systems and visualizes it in a clear, accessible format.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="size-full flex flex-col items-center justify-center px-12 relative overflow-hidden">

      <PinkBlob style={{ width: 360, height: 360, top: -130, left: -110, opacity: 0.65 }} />
      <GreenBlob style={{ width: 260, height: 260, top: -80, right: -65, opacity: 0.62 }} />
      <TealBlob style={{ width: 200, height: 200, bottom: 10, right: -60, opacity: 0.6 }} />
      <PurpleBlob style={{ width: 220, height: 220, bottom: -5, left: -70, opacity: 0.58 }} />
      <OrangeBlob style={{ width: 130, height: 130, top: "38%", left: -40, opacity: 0.55 }} />
      <GreenBlob style={{ width: 100, height: 100, bottom: 180, right: 180, opacity: 0.5 }} />
      <PinkBlob style={{ width: 80, height: 80, top: 120, right: 200, opacity: 0.5 }} />
      <BlueBlob style={{ width: 70, height: 70, bottom: 80, left: 200, opacity: 0.45 }} />

      <div className="flex flex-col items-center text-center space-y-8 relative z-10 max-w-3xl">
        {/* Logo pill */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-3 px-5 py-3 rounded-full border-2 border-gray-200 bg-white">
          <img src="/uva.png" alt="UVA" className="h-8 object-contain" />
          <div className="w-px h-7 bg-gray-300" />
          <img src="/adc.png" alt="ADC" className="h-9 object-contain" />
        </motion.div>

        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 }}
          className="text-6xl tracking-tight leading-[1.08]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Harmonizing income data for financial aid
        </motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.28 }}
          className="text-base text-gray-500 leading-relaxed">
          Explore how fragmented public authority data can transform into a unified context
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
        <div className="absolute top-0 right-0 z-20 w-14 h-14 flex items-center justify-center">
          <img src="/swe.png" alt="Swedish flag" className="w-full h-full object-contain drop-shadow-md" />
        </div>
        <div>
          <h1 className="text-6xl tracking-tight leading-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Decentralized Systems</h1>
          <p className="text-lg text-gray-500 mt-4 max-w-4xl">
            In Sweden, financial aid decisions rely on data from multiple public authority systems. Because each system is structured differently, the information can be fragmented and hard to interpret.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[
            { tag: "AF", image: "/arbetsform.png", title: "Public Employment Service", body: "Data on employment status and job-seeking activity.", delay: 0.2 },
            { tag: "FK", image: "/forsakring.png", title: "Social Insurance Agency", body: "Data on payments, social benefits and support.", delay: 0.3 },
            { tag: "CSN", image: "/csn.png", title: "Board of Student Finance", body: "Data on student funding, grants and loans.", delay: 0.4 },
          ].map((c) => (
            <motion.div key={c.tag} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: c.delay }}
              className="p-7 pr-20 border-[3px] border-gray-200 rounded-2xl bg-white relative">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-gray-100 shadow-sm bg-white flex items-center justify-center">
                <img src={c.image} alt={c.tag} className="w-full h-full object-contain p-1" />
              </div>
              <h3 className="text-lg mb-1 tracking-tight font-semibold">{c.title}</h3>
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
          <img src="/girl.png" alt="Jane" className="w-44 h-44 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1 space-y-6">
            <p className="text-2xl text-gray-800 leading-relaxed">Jane has applied for a student grant for part-time studies.</p>
            <p className="text-lg text-gray-500 leading-relaxed">She previously received activity support as a job seeker.</p>
            <p className="text-lg text-gray-500 leading-relaxed">She visits the citizen portal to get an overview of her finances — but the information is scattered and confusing.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Scattered View ────────────────────────────────────────────────────────────

function ScatteredView() {
  const TableCard = ({ title, source, rows, image }) => (
    <div className="bg-white border-[3px] border-gray-300 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <div className="w-8 h-8 rounded-full border-2 border-gray-100 shadow-sm bg-white flex items-center justify-center flex-shrink-0">
          <img src={image} alt={source} className="w-full h-full object-contain p-1" />
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-100">
            <th className="text-left py-1.5 px-2 font-semibold text-gray-400 text-xs w-1/2">Field</th>
            <th className="text-left py-1.5 px-2 font-semibold text-gray-400 text-xs w-1/2">Value</th>
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="size-full overflow-auto px-8 py-7 relative">
      <DG style={{ width: 200, height: 200, top: -50, right: -40 }} />
      <DPu style={{ width: 150, height: 150, bottom: -30, left: -40 }} />

      <div className="max-w-6xl mx-auto space-y-5 relative z-10">
        <div>
          <h1 className="text-5xl tracking-tight mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>The Scattered View</h1>
          <p className="text-sm text-gray-400">Jane's data today across the three authority systems</p>
        </div>

        {/* 3-column grid — AF, FK, CSN in order */}
        <div className="grid grid-cols-3 gap-4">

          {/* ── AF: Employment Service ─────────────── */}
          <TableCard title="Job Seeker Status" source="AF" image="/arbetsform.png" rows={[
            ["Support", "Activity support"],
            ["Job seeker", "true"],
            ["Category", "Openly unemployed"],
            ["Scope", "100"],
            ["Start", "2025-09-01"],
            ["End", "2025-12-31"],
            ["De-registered", "2025-12-31"],
          ]} />

          <TableCard title="Financial Decision" source="AF" image="/arbetsform.png" rows={[
            ["Decision", "Granted"],
            ["Type", "Activity Support"],
            ["Daily rate", "455 SEK"],
            ["Start", "2025-09-01"],
            ["End", "2025-12-31"],
            ["Days", "80"],
            ["Gross total", "36 400"],
          ]} />

          {/* ── FK: Social Insurance ──────────────── */}
          <TableCard title="Payment Record" source="FK" image="/forsakring.png" rows={[
            ["Type", "Activity Support"],
            ["Scope", "100"],
            ["Start", "2025-09-01"],
            ["End", "2025-12-31"],
            ["Payment", "Month"],
            ["Gross", "36 400"],
            ["Net", "29 120"],
          ]} />

          <TableCard title="Decision Period Grant Decision" source="FK" image="/forsakring.png" rows={[
            ["Type", "Activity Support"],
            ["Decision", "Approved"],
            ["Start", "2025-09-01"],
            ["End", "2025-12-31"],
            ["Scope", "100%"],
            ["Decision date", "2025-08-20"],
            ["Reference", "AS-20254821"],
          ]} />

          <TableCard title="Decision" source="FK" image="/forsakring.png" rows={[
            ["Benefit", "Aktivitetsstöd"],
            ["Code", "AS"],
            ["Gross/day", "455 SEK"],
            ["Tax/day", "91 SEK"],
            ["Net/day", "364 SEK"],
            ["Days", "80"],
            ["Net total", "29 120"],
          ]} />

          {/* ── CSN: Student Finance ──────────────── */}
          <TableCard title="Approved Period" source="CSN" image="/csn.png" rows={[
            ["Start week", "202617"],
            ["End week", "202627"],
            ["Study pace", "50"],
            ["Additional pace", "0"],
            ["Total amount", "18 689"],
          ]} />

          <TableCard title="Approved Amount" source="CSN" image="/csn.png" rows={[
            ["Type", "GRUNDB"],
            ["Benefit", "Grant"],
            ["Amount/week", "978"],
            ["Total", "10 758"],
            ["Type", "GRUNDL"],
            ["Benefit", "Loan"],
            ["Amount/week", "721"],
            ["Total", "7 931"],
          ]} />

          <TableCard title="Grant Decision" source="CSN" image="/csn.png" rows={[
            ["Decision type", "Grant"],
            ["Study form", "Distance"],
            ["Scope", "50%"],
            ["Period start", "202617"],
            ["Period end", "202627"],
            ["Grant", "GRUNDB"],
            ["Status", "Initiated"],
          ]} />

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
    { text: "What does GRUNDB mean?", x: "12%", y: "8%" },
    { text: "What is GRUNDL?", x: "82%", y: "12%" },
    { text: "Is 978 per week or total?", x: "26%", y: "26%" },
    { text: "What is week 202617?", x: "75%", y: "36%" },
    { text: "Why two separate amounts?", x: "6%", y: "48%" },
    { text: "What period does this cover?", x: "60%", y: "70%" },
    { text: "Is this active right now?", x: "30%", y: "68%" },
    { text: "What is AS / DAG?", x: "78%", y: "82%" },
    { text: "What is open unemployment?", x: "8%", y: "82%" },
    { text: "What does 50 mean?", x: "46%", y: "18%" },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="size-full relative flex items-center justify-center px-8 bg-[#F8F8F6] overflow-hidden">
      <DG style={{ width: 220, height: 220, top: -60, left: -55 }} />
      <DP style={{ width: 170, height: 170, bottom: -40, right: -45 }} />
      <DT style={{ width: 100, height: 100, top: "75%", left: 70 }} />
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
        <h1 className="text-7xl tracking-tight text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Reduce Ambiguity</h1>
        <p className="text-base text-gray-500">How can we turn technical terminology into understandable information?</p>
      </motion.div>
    </motion.div>
  );
}

// ── Transformation Intro ──────────────────────────────────────────────────────

function TransformationIntro() {
  const [showPipeline, setShowPipeline] = useState(false);
  const steps = [
    { label: "User Action", sub: "Jane selects a topic in the interface", bg: "bg-purple-100", border: "border-purple-500", text: "text-purple-700", delay: 0.1 },
    { label: "Query Analysis", sub: "A query is triggered and analyzed by type", bg: "bg-blue-100", border: "border-blue-500", text: "text-blue-700", delay: 0.28 },
    { label: "Concept Matching", sub: "Concepts are prepared to be matched", bg: "bg-amber-100", border: "border-amber-500", text: "text-amber-800", delay: 0.46 },
    { label: "Source Search", sub: "Relevant sources are searched iteratively", bg: "bg-pink-100", border: "border-pink-500", text: "text-pink-700", delay: 0.64 },
    { label: "Readable Response", sub: "The result is interpreted and presented", bg: "bg-green-100", border: "border-green-500", text: "text-green-700", delay: 0.82 },
  ];
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
        className="size-full flex items-center justify-center px-8 relative overflow-hidden">
        <DPu style={{ width: 200, height: 200, top: -60, right: -55 }} />
        <DT style={{ width: 130, height: 130, bottom: -35, left: -35 }} />
        <div className="max-w-[1500px] w-full space-y-10 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>The Transformation Process</h1>
            <p className="text-base text-gray-500 mt-4">A simplified representation of the events following Jane's actions on the platform</p>
          </div>
          <div className="flex items-stretch justify-center gap-3 w-full">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center flex-1 min-w-0">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: s.delay }}
                  className={`flex-1 h-[150px] ${s.bg} border-[3px] ${s.border} rounded-2xl flex flex-col items-center justify-center text-center px-4`}>
                  <h3 className={`text-base mb-1 font-semibold ${s.text}`}>{s.label}</h3>
                  <p className="text-gray-600 text-[11px] leading-relaxed">{s.sub}</p>
                </motion.div>
                <div className="w-6 flex items-center justify-center flex-shrink-0">
                  {i < steps.length - 1 && <ArrowRight className="w-5 h-5 text-gray-400" strokeWidth={2} />}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button onClick={() => setShowPipeline(true)}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-300 bg-white/80 text-sm font-medium text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-all duration-200">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 shadow-sm" />
              <span>See how it works</span>
              <span>›</span>
            </button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showPipeline && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowPipeline(false)} />
            <motion.div initial={{ opacity: 0, y: 14, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }} transition={{ duration: 0.18 }}
              className="fixed left-1/2 top-20 -translate-x-1/2 z-50 bg-white border-2 border-gray-200 rounded-[26px] shadow-2xl"
              style={{ width: "min(1280px, 96vw)" }}>
              <TransformationPipelinePanel onClose={() => setShowPipeline(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Example 1: Employment Service (AF) ────────────────────────────────────────

function MappingAF() {
  const [showDetails, setShowDetails] = useState(false);
  const visibleRows = [
    { raw: "Activity support", concept: "Support Type", meaning: "Type of support" },
    { raw: "2025-09-01 – 2025-12-31", concept: "Time Period", meaning: "1 Sep 2025 – 31 Dec 2025" },
    { isEmpty: true, concept: "Amount", meaning: "" },
  ];
  const remainingRows = [
    { raw: "100", concept: "Occupation", meaning: "Full-time job seeker (100%)" },
    { raw: "Openly unemployed", concept: "Occupation", meaning: "Unemployed job-seeker" },
    { raw: "true", concept: "Status", meaning: "Registered as job seeker" },
    { raw: "2025-12-31", concept: "Status", meaning: "De-registered as a job-seeker" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 overflow-auto relative">
      <DB style={{ width: 190, height: 190, top: -55, right: -45 }} />
      <DO style={{ width: 130, height: 130, bottom: -35, left: -35 }} />
      <div className="max-w-5xl w-full space-y-5 py-6 relative z-10">
        <div className="relative">
          <div className="absolute top-0 right-0 w-16 h-16 rounded-2xl border-2 border-gray-200 bg-white shadow-sm flex items-center justify-center p-2">
            <img src="/arbetsform.png" alt="AF" className="w-full h-full object-contain" />
          </div>
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-1.5">Example 1</div>
          <h1 className="text-5xl tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>The Public Employment Service</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white border-[3px] border-blue-300 rounded-3xl p-7 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-black mb-3 font-semibold">Result</div>
          <p className="text-2xl leading-relaxed text-gray-900 max-w-4xl">
            Jane was a <strong>full-time job seeker</strong> receiving <strong>activity support</strong> from <strong>September to December 2025</strong>. She is <strong>no longer registered</strong> as a job seeker.
          </p>
          <p className="mt-3 text-sm text-gray-500 max-w-3xl flex items-start gap-2">
            <NullWarningBadge />
            <span>Data from this source does not hold monetary values.</span>
          </p>
        </motion.div>

        <div className="bg-white border-[3px] border-blue-300 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-wider text-black font-semibold">Data mapping</div>
            <button onClick={() => setShowDetails((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-200 hover:border-blue-400 transition-all text-sm text-blue-700">
              {showDetails ? "Hide" : "View"}
              {showDetails ? <ChevronUp className="w-4 h-4" strokeWidth={1.5} /> : <ChevronDown className="w-4 h-4" strokeWidth={1.5} />}
            </button>
          </div>
          <div className="space-y-3">
            <MappingColumnHeaders />
            {visibleRows.map((row, i) => <MappingDataRow key={i} row={row} />)}
            <AnimatePresence>
              {showDetails && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                  <div className="space-y-3 pt-1">
                    {remainingRows.map((row, i) => <MappingDataRow key={i} row={row} animate delay={0.04 * i} />)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Example 2: Social Insurance Agency (FK) ───────────────────────────────────

function MappingFK() {
  const [showDetails, setShowDetails] = useState(false);
  const visibleRows = [
    { raw: "Activity Support", concept: "Support type", meaning: "Type of benefit" },
    { raw: "100", concept: "Support Type", meaning: "Received full scope of support" },
    { raw: "2025-09-01", concept: "Time period", meaning: "Start date September 1, 2025" },
  ];
  const remainingRows = [
    { raw: "2025-12-31", concept: "Time period", meaning: "End date December 31, 2025" },
    { isEmpty: true, concept: "Occupation", meaning: "" },
    { raw: "Month", concept: "Amount", meaning: "Payments are monthly based" },
    { raw: "36 400", concept: "Amount", meaning: "Total gross amount for full period" },
    { raw: "29 120", concept: "Amount", meaning: "Total net amount for full period" },
    { raw: "2025-12-31", concept: "Status", meaning: "Inactive" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 overflow-auto relative">
      <DPu style={{ width: 190, height: 190, top: -55, right: -45 }} />
      <DP style={{ width: 130, height: 130, bottom: -35, left: -35 }} />
      <div className="max-w-5xl w-full space-y-5 py-6 relative z-10">
        <div className="relative">
          <div className="absolute top-0 right-0 w-16 h-16 rounded-2xl border-2 border-gray-200 bg-white shadow-sm flex items-center justify-center p-2">
            <img src="/forsakring.png" alt="FK" className="w-full h-full object-contain" />
          </div>
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-1.5">Example 2</div>
          <h1 className="text-5xl tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Social Insurance Agency</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white border-[3px] border-purple-300 rounded-3xl p-7 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-black mb-3 font-semibold">Result</div>
          <p className="text-2xl leading-relaxed text-gray-900 max-w-4xl">
            Jane received <strong>activity support</strong> at <strong>full scope (100%)</strong> from <strong>September – December 2025</strong>, with a total net payment of <strong>29,120 SEK</strong>.
          </p>
          <p className="mt-3 text-sm text-gray-500 max-w-3xl flex items-start gap-2">
            <NullWarningBadge />
            <span>Data from this source does not infer Jane's occupation.</span>
          </p>
        </motion.div>

        <div className="bg-white border-[3px] border-purple-300 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-wider text-black font-semibold">Data mapping</div>
            <button onClick={() => setShowDetails((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-purple-200 hover:border-purple-400 transition-all text-sm text-purple-700">
              {showDetails ? "Hide data mapping" : "Show data mapping"}
              {showDetails ? <ChevronUp className="w-4 h-4" strokeWidth={1.5} /> : <ChevronDown className="w-4 h-4" strokeWidth={1.5} />}
            </button>
          </div>
          <div className="space-y-3">
            <MappingColumnHeaders />
            {visibleRows.map((row, i) => <MappingDataRow key={i} row={row} />)}
            <AnimatePresence>
              {showDetails && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                  <div className="space-y-3 pt-1">
                    {remainingRows.map((row, i) => <MappingDataRow key={i} row={row} animate delay={0.04 * i} />)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Example 3: Board of Student Finance (CSN) ─────────────────────────────────

function MappingCSN() {
  const [showDetails, setShowDetails] = useState(false);
  const visibleRows = [
    { raw: "GRUNDB", concept: "Support Type", meaning: "Study grant" },
    { raw: "GRUNDL", concept: "Support Type", meaning: "Study loan" },
    { raw: "202617 – 202627", concept: "Time Period", meaning: "2026-04-20 – 2026-07-05" },
  ];
  const remainingRows = [
    { raw: "1 699", concept: "Amount", meaning: "1,699 SEK/week (grant + loan)" },
    { raw: "18 689", concept: "Amount", meaning: "18,689 SEK in total" },
    { raw: "50%", concept: "Occupation", meaning: "Part-time student (50%)" },
    { raw: "Initiated", concept: "Status", meaning: "Case is active" },
    { raw: "Planned", concept: "Status", meaning: "Planned payment, not yet disbursed" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 overflow-auto relative">
      <GreenBlob style={{ width: 190, height: 190, top: -55, right: -45, opacity: 0.55 }} />
      <TealBlob style={{ width: 130, height: 130, bottom: -35, left: -35, opacity: 0.45 }} />
      <BlueBlob style={{ width: 80, height: 80, top: "50%", left: 40, opacity: 0.35 }} />
      <div className="max-w-5xl w-full space-y-5 py-6 relative z-10">
        <div className="relative">
          <div className="absolute top-0 right-0 w-16 h-16 rounded-2xl border-2 border-gray-200 bg-white shadow-sm flex items-center justify-center p-2">
            <img src="/csn.png" alt="CSN" className="w-full h-full object-contain" />
          </div>
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-1.5">Example 3</div>
          <h1 className="text-5xl tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Board of Student Finance</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white border-[3px] border-yellow-300 rounded-3xl p-7 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-black mb-3 font-semibold">Result</div>
          <p className="text-2xl leading-relaxed text-gray-900 max-w-4xl">
            Jane has planned payments from <strong>April 20</strong> to <strong>July 5, 2026</strong>, combining a <strong>study grant</strong> and <strong>study loan</strong> totaling <strong>18,689 SEK</strong> at a study pace of <strong>50%</strong>.
          </p>
          <p className="mt-3 text-sm text-gray-500 max-w-3xl flex items-start gap-2">
            <span className="text-green-500 mt-0.5">○</span>
            <span>Jane's study support information is comprehensive and self-explanatory.</span>
          </p>
        </motion.div>

        <div className="bg-white border-[3px] border-yellow-300 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-wider text-black font-semibold">Data mapping</div>
            <button onClick={() => setShowDetails((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-yellow-200 hover:border-yellow-400 transition-all text-sm text-yellow-700">
              {showDetails ? "Hide" : "View"}
              {showDetails ? <ChevronUp className="w-4 h-4" strokeWidth={1.5} /> : <ChevronDown className="w-4 h-4" strokeWidth={1.5} />}
            </button>
          </div>
          <div className="space-y-3">
            <MappingColumnHeaders />
            {visibleRows.map((row, i) => <MappingDataRow key={i} row={row} />)}
            <AnimatePresence>
              {showDetails && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                  <div className="space-y-3 pt-1">
                    {remainingRows.map((row, i) => <MappingDataRow key={i} row={row} animate delay={0.04 * i} />)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Unified View ──────────────────────────────────────────────────────────────
// Grant/month: 978 × (52/12) ≈ 4,238 SEK | Loan/month: 721 × (52/12) ≈ 3,124 SEK

function UnifiedView() {
  const [activityHovered, setActivityHovered] = useState(false);
  const [prevExpanded, setPrevExpanded] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
        className="size-full overflow-auto px-8 py-7 relative">
        <DG style={{ width: 210, height: 210, top: -55, right: -45 }} />
        <DPu style={{ width: 150, height: 150, bottom: -35, left: -35 }} />
        <DT style={{ width: 90, height: 90, top: "55%", right: 50 }} />

        <div className="max-w-4xl mx-auto space-y-5 relative z-10">

          {/* ── Title ── */}
          <div>
            <h1 className="text-5xl tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Unified View</h1>
            <p className="text-sm text-gray-400 mt-1">Jane's financial situation</p>
          </div>

          {/* ── Profile card ── */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white border-[3px] border-gray-200 rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <img src="/girl.png" alt="Jane" className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm" />
              <div>
                <div className="text-xl font-semibold text-gray-900">Jane Doe</div>
                <div className="text-xs text-gray-400 font-mono mt-0.5">20000421-1234</div>
              </div>
            </div>
            <div className="relative cursor-default"
              onMouseEnter={() => setActivityHovered(true)}
              onMouseLeave={() => setActivityHovered(false)}>
              <AnimatePresence mode="wait">
                {activityHovered ? (
                  <motion.div key="exp" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15 }} className="flex items-center gap-3">
                 <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 border-2 border-yellow-400 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-sm font-semibold text-yellow-800">Student</span>
                      <span className="text-sm text-yellow-700 font-mono">50%</span>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-2 border-gray-300 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                      <span className="text-sm font-semibold text-gray-700">Job-seeker</span>
                      <span className="text-sm text-gray-600 font-mono">Inactive</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-full hover:border-gray-400 transition-all">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-sm text-gray-600">Student</span>
                    <span className="text-gray-300">·</span>
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="text-sm text-gray-600">Job seeker</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Two-column: CSN card + Previous card ── */}
          <div className="grid grid-cols-2 gap-5 items-stretch">

  {/* Left: Current — CSN */}
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
    className="bg-white border-[3px] border-yellow-300 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Current · CSN</div>
                  <h3 className="text-lg font-semibold">Board of Student Finance</h3>
                </div>
                <div className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-semibold border-2 border-yellow-200">
                  Planned
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-5">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Period</div>
                  <div className="text-xl font-semibold text-gray-900">Apr 20 – Jul 5, 2026</div>
                </div>
                <div>
                  
                   <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Study pace</div>
                  <div className="text-xl font-semibold text-gray-900">50%</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Grant / month</div>
                  <div className="text-xl font-semibold text-gray-900">4,238 SEK</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Loan / month</div>
                  <div className="text-xl font-semibold text-gray-900">3,124 SEK</div>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Total approved</div>
                <div className="text-4xl tracking-tight font-light text-gray-900">18,689 SEK</div>
                <div className="text-xs text-gray-400 mt-1">10,758 grant · 7,931 loan · 11 weeks</div>
              </div>
            </motion.div>

            {/* Right: Previous — Activity Support (expands to match CSN) */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <button onClick={() => setPrevExpanded((e) => !e)}
                className="w-full text-left bg-white border-[3px] border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-all">

                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-3">
                    {/* Subtle grey circle */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB" }}>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#D1D5DB" }} />
                    </div>
                    <div>
  <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Previous </div>
  <h3 className="text-lg font-semibold text-gray-700">Activity Support</h3>
</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold border-2 border-gray-200">
                      Inactive
                    </div>
                    {prevExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>

                {/* Collapsed summary */}
        
   

                {/* Expanded — mirrors CSN layout */}
                <AnimatePresence>
                  {prevExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-15">
                        <div>
                          <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Support type</div>
                          <div className="text-xl font-semibold text-gray-800">Activity support</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Period</div>
                          <div className="text-xl font-semibold text-gray-800">Sep – Dec 2025</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Occupation</div>
                          <div className="text-xl font-semibold text-gray-800">100% full-time</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Gross amount</div>
                          <div className="text-xl font-semibold text-gray-800">36,400 SEK</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Total received</div>
                        <div className="text-4xl tracking-tight font-light text-gray-900">29,120 SEK</div>
                        <div className="text-xs text-gray-400 mt-1">Monthly payments · 4 months</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>

          {/* ── Combined overview ── */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="bg-gradient-to-br from-purple-50 via-teal-50 to-green-50 border-[3px] border-gray-300 rounded-2xl p-8 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  
                  <div className="text-xs uppercase tracking-wider text-gray-600 font-semibold ml-1">Combined Overview</div>
                </div>
                <div className="text-xl text-gray-800 leading-relaxed max-w-md">
                  Jane has received a total of{" "}
                  <strong className="text-2xl">29,120 SEK</strong> in activity support, and has a been granted a total of {" "}
                  <strong className="text-2xl">18,689 SEK</strong> for part-time studies.
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl tracking-tight font-light text-gray-900 mb-1">47,809</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">SEK Total</div>
              </div>
            </div>
          </motion.div>

          {/* ── Apply CTA ── */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="bg-white border-[3px] border-gray-200 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Next step</div>
              <h3 className="text-lg font-semibold text-gray-900">Make a new application</h3>
              <p className="text-sm text-gray-500 mt-1">Start an application based on your current situation.</p>
            </div>
            <button onClick={() => setShowApplicationModal(true)}
              className="px-5 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-all text-sm flex items-center gap-2">
              Apply now <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </motion.div>

        </div>
      </motion.div>

      <AnimatePresence>
        {showApplicationModal && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowApplicationModal(false)} />
            <motion.div initial={{ opacity: 0, y: 14, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }} transition={{ duration: 0.18 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white border-2 border-gray-200 rounded-[26px] shadow-2xl p-7"
              style={{ width: "min(520px, 92vw)" }}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Prototype notice</div>
                  <h3 className="text-xl font-semibold text-gray-900">New application is not active</h3>
                </div>
                <button onClick={() => setShowApplicationModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">This button is a placeholder.</p>
              <div className="flex justify-end">
                <button onClick={() => setShowApplicationModal(false)}
                  className="px-5 py-2.5 rounded-xl border-2 border-gray-200 hover:border-gray-400 text-sm transition-all">Close</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Why This Matters ──────────────────────────────────────────────────────────

function Value() {
  const benefits = [
    { n: "1", title: "Enables Consistent Understanding", desc: "Data means the same thing everywhere." },
    { n: "2", title: "Clarity by Design", desc: "Complex data becomes easy to understand." },
    { n: "3", title: "Decisions With Certainty", desc: "Insights lead to intentional decision-making." },
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
        <div className="text-center space-y-6">
          <h1 className="text-7xl tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Why This Matters</h1>
          <p className="text-base text-gray-400">Semantic interoperability turns data into understanding</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const colors = ["bg-purple-500", "bg-teal-500", "bg-green-500"];
            return (
              <motion.div key={i} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 + i * 0.14 }}
                className="p-8 bg-white border-[3px] border-gray-200 rounded-2xl space-y-4">
                <div className={`w-10 h-10 rounded-full ${colors[i]} text-white flex items-center justify-center text-base font-semibold`}>{b.n}</div>
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

// ── Test Connection ───────────────────────────────────────────────────────────

function TestConnection() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const runTest = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://backendprototype-prce.onrender.com/api/test-pipeline", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category: "income" }),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const data = await res.json();
      if (typeof data === "string") setOutput(data);
      else if (data?.output) setOutput(JSON.stringify(data.output, null, 2));
      else setOutput(JSON.stringify(data, null, 2));
    } catch (error) {
      setOutput(error instanceof Error ? `hej: ${error.message}` : "då.");
    } finally { setLoading(false); }
  };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="size-full flex items-center justify-center px-8 relative overflow-hidden">
      <DG style={{ width: 220, height: 220, top: -55, right: -45 }} />
      <DPu style={{ width: 150, height: 150, bottom: -35, left: -35 }} />
      <div className="max-w-4xl w-full space-y-6 relative z-10">
        <div>
          <h1 className="text-5xl tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Under Development</h1>
          <p className="text-sm text-gray-500 mt-2">Vashti is currently mapping concepts one by one.</p>
        </div>
        <div className="bg-white border-[3px] border-gray-200 rounded-3xl p-6 space-y-5">
          <button onClick={runTest} disabled={loading}
            className="px-6 py-3 rounded-xl bg-black text-white hover:bg-blue-800 disabled:opacity-50 transition-all text-sm">
            {loading ? "Running..." : "Try me"}
          </button>
          <div className="border-2 border-gray-200 rounded-2xl bg-gray-50 p-4 min-h-[260px]">
            <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">Terminal Output</div>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words font-mono">
              {output || "Prepare for something groundbreaking..."}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
