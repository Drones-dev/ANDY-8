import { motion, useReducedMotion } from "framer-motion";
import { Plane, Braces, Cpu, FileJson, Monitor } from "lucide-react";

const pipeline = [
  { icon: Plane, title: "PX4 SITL ×3", text: "Three simulated quadcopters run real PX4 flight code." },
  { icon: Braces, title: "MAVLink UDP", text: "Telemetry streams on ports 14540–14542." },
  { icon: Cpu, title: "ANDY_MESH_SIM", text: "Four nodes run the same routing classes used by the firmware." },
  { icon: FileJson, title: "status.json", text: "Routes, links, telemetry, and events update twice each second." },
  { icon: Monitor, title: "Dashboard", text: "The browser reads the current state and visualizes the route." },
];

export default function SimulatorPipeline() {
  const reduced = useReducedMotion();
  return (
    <div className="mb-10 rounded-2xl border border-white/10 bg-[#020912] p-6">
      <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[#70B7FF]">
        Prototype simulation pipeline
      </p>
      <h2 className="text-xl font-bold text-[#F8FAFC]">From PX4 flight data to the browser</h2>
      <div className="relative mt-8 grid gap-3 lg:grid-cols-5">
        <div className="absolute left-[8%] right-[8%] top-6 hidden h-px bg-[#2491FF]/30 lg:block" aria-hidden="true" />
        {pipeline.map(({ icon: Icon, title, text }, index) => (
          <motion.div
            key={title}
            className="relative rounded-xl border border-white/10 bg-[#0B1B30] p-4"
            initial={reduced ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#2491FF]/40 bg-[#061426] text-[#70B7FF]">
              <Icon size={19} aria-hidden="true" />
            </div>
            <p className="mt-4 text-xs font-mono text-[#70B7FF]">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-1 text-sm font-semibold text-[#F8FAFC]">{title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#A9B8CA]">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function RoutingDecisions() {
  const rules = [
    ["Route selection", "Fewest hops wins. RSSI breaks a tie."],
    ["Heartbeats", "Each node sends HELLO every two seconds. Five seconds of silence marks it lost."],
    ["Loop protection", "A node will not choose a neighbor whose route already passes through it."],
    ["Duplicate filter", "Relays retain the last 32 origin and sequence pairs."],
    ["Radio profile", "915 MHz, 125 kHz bandwidth, SF7, coding rate 4/7, 12 dBm."],
    ["Shared code", "The ESP32-S3 firmware and PC simulator build the same C++ routing classes."],
  ];
  return (
    <div className="mt-10">
      <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[#70B7FF]">Routing decisions</p>
      <h2 className="text-xl font-bold text-[#F8FAFC]">How the mesh chooses a path</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {rules.map(([title, text], index) => (
          <article key={title} className="rounded-xl border border-white/10 bg-[#0B1B30] p-5">
            <p className="text-[10px] font-mono text-[#7F93AA]">RULE {String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-4 text-sm font-semibold text-[#F8FAFC]">{title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#A9B8CA]">{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
