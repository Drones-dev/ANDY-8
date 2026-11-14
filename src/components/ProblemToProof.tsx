import { motion, useReducedMotion } from "framer-motion";
import { Mountain, Network, FlaskConical } from "lucide-react";

const stages = [
  {
    icon: Mountain,
    eyebrow: "01 · The problem",
    title: "Line of sight eventually ends",
    text: "Mountains, buildings, and the horizon interrupt a direct radio path between an operator and a forward aircraft.",
    color: "#EF4444",
  },
  {
    icon: Network,
    eyebrow: "02 · The system",
    title: "The network carries the signal",
    text: "Drone 3 passes telemetry through Drone 2 and Drone 1. No single radio has to reach the ground station.",
    color: "#2491FF",
  },
  {
    icon: FlaskConical,
    eyebrow: "03 · The evidence",
    title: "The prototype reroutes itself",
    text: "When Drone 2 drops out, the simulator selects the remaining path and restores delivery in approximately four seconds.",
    color: "#22C55E",
  },
];

export default function ProblemToProof() {
  const reduced = useReducedMotion();
  const wireframe = `${import.meta.env.BASE_URL}visuals/andy8-wireframe.png`;

  return (
    <section
      className="relative overflow-hidden border-y border-white/5 bg-black py-20 lg:py-28"
      aria-labelledby="problem-story-title"
    >
      <img
        src={wireframe}
        alt=""
        className="absolute inset-y-0 right-0 h-full w-auto max-w-none opacity-[0.16]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,#02070d_0%,rgba(2,7,13,.96)_45%,rgba(2,7,13,.45)_100%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.24em] text-[#A9B8CA]">
            Problem · system · proof
          </p>
          <h2 id="problem-story-title" className="mb-4 text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
            A radio path that survives the terrain
          </h2>
          <p className="leading-relaxed text-[#A9B8CA]">
            ANDY 8 turns three aircraft into a self-forming telemetry path between a remote node and its operator.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {stages.map(({ icon: Icon, eyebrow, title, text, color }, index) => (
            <motion.article
              key={title}
              className="relative min-h-64 overflow-hidden border border-white/15 bg-black/65 p-6 backdrop-blur-sm"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <span className="absolute left-0 top-0 h-7 w-px" style={{ backgroundColor: color }} aria-hidden="true" />
              <span className="absolute left-0 top-0 h-px w-7" style={{ backgroundColor: color }} aria-hidden="true" />
              <Icon size={24} style={{ color }} aria-hidden="true" />
              <p className="mt-8 text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color }}>
                {eyebrow}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[#F8FAFC]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A9B8CA]">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
