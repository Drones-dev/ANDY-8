import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Radio, Route, Laptop, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Cpu,
    label: "Capture",
    title: "PX4 creates telemetry",
    text: "The MicroAir743v2 flight controller produces MAVLink position, health, and flight-state messages.",
  },
  {
    icon: Radio,
    label: "Package",
    title: "The radio node validates it",
    text: "ESP32-S3 firmware identifies the sender, checks integrity, and prepares each packet for the 915 MHz LoRa mesh.",
  },
  {
    icon: Route,
    label: "Relay",
    title: "Three drones form a route",
    text: "SX1262 radios forward telemetry across D3 → D2 → D1 while TTL and duplicate checks keep traffic controlled.",
  },
  {
    icon: Laptop,
    label: "Visualize",
    title: "The ground station receives it",
    text: "A fourth communications node bridges validated packets to the laptop dashboard for live monitoring.",
  },
  {
    icon: RefreshCw,
    label: "Recover",
    title: "A failed relay is bypassed",
    text: "Heartbeat loss invalidates the stale route; the mesh selects a viable alternate path and resumes delivery.",
  },
];

export default function HowItWorks() {
  const reduced = useReducedMotion();
  return (
    <section className="py-20 lg:py-28 overflow-hidden" aria-labelledby="how-it-works-title">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] mb-3 text-[#70B7FF]">
            Animated system walkthrough
          </p>
          <h2 id="how-it-works-title" className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4">
            How ANDY 8 works
          </h2>
          <p className="text-[#A9B8CA] leading-relaxed">
            Follow one telemetry message from the remote aircraft to the ground station—and see what changes when the
            primary relay disappears.
          </p>
        </div>
        <div className="relative grid gap-4 md:grid-cols-5">
          <motion.div
            aria-hidden="true"
            className="hidden md:block absolute top-[2.25rem] left-[10%] right-[10%] h-px origin-left"
            style={{ background: "linear-gradient(90deg,#2491FF,#70B7FF,#22C55E)" }}
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />
          {steps.map(({ icon: Icon, label, title, text }, index) => (
            <motion.article
              key={title}
              className="relative rounded-2xl border border-white/10 bg-[#0B1B30]/95 p-5"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.09 }}
            >
              <div className="relative z-10 w-9 h-9 rounded-full bg-[#061426] border border-[#2491FF]/50 text-[#70B7FF] flex items-center justify-center mb-5 shadow-[0_0_24px_rgba(36,145,255,.22)]">
                <Icon size={17} aria-hidden="true" />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#70B7FF] mb-2">
                0{index + 1} · {label}
              </p>
              <h3 className="text-sm font-semibold text-[#F8FAFC] mb-2">{title}</h3>
              <p className="text-xs leading-relaxed text-[#A9B8CA]">{text}</p>
            </motion.article>
          ))}
        </div>
        <p className="mt-6 text-xs text-[#7F93AA]">
          Recovery timing and delivery targets shown elsewhere on this site are engineering goals until physical trials
          are completed.
        </p>
      </div>
    </section>
  );
}
