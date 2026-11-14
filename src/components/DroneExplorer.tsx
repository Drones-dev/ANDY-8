import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const parts = [
  {
    id: "flight",
    label: "MicroAir743v2",
    detail: "PX4 flight control and MAVLink telemetry source.",
    position: "left-[47%] top-[56%]",
  },
  {
    id: "mesh",
    label: "ESP32-S3 mesh node",
    detail: "Validates, addresses, and forwards mesh packets.",
    position: "left-[52%] top-[40%]",
  },
  {
    id: "radio",
    label: "SX1262 LoRa",
    detail: "Long-range 915 MHz transport between aircraft.",
    position: "left-[58%] top-[28%]",
  },
  {
    id: "power",
    label: "Flight battery",
    detail: "Supplies the aircraft and isolated communications stack.",
    position: "left-[45%] top-[76%]",
  },
];

export default function DroneExplorer() {
  const [active, setActive] = useState(parts[0]);
  const reduced = useReducedMotion();
  const image = `${import.meta.env.BASE_URL}visuals/andy8-drone-cutaway.jpg`;
  return (
    <section className="py-20 lg:py-28 border-y border-white/5 bg-[#08182A]" aria-labelledby="explorer-title">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.3fr_.7fr] gap-10 items-center">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] mb-3 text-[#70B7FF]">Interactive 3D design</p>
          <h2 id="explorer-title" className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4">
            Inside an ANDY 8 node
          </h2>
          <p className="text-[#A9B8CA] leading-relaxed max-w-2xl mb-7">
            Explore the layered communications stack. The render is a design visualization; final mounting and wiring
            should be verified against the physical build.
          </p>
          <div className="relative rounded-3xl border border-[#2491FF]/20 bg-[#020912] overflow-hidden min-h-[390px] shadow-[0_30px_90px_rgba(0,0,0,.35)] [perspective:1200px]">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(36,145,255,.2),transparent_58%)]"
              aria-hidden="true"
            />
            <motion.img
              src={image}
              alt="3D exploded visualization of the ANDY 8 quadcopter communications stack"
              className="relative w-full h-full min-h-[390px] object-cover object-center"
              animate={reduced ? undefined : { y: [0, -7, 0], rotateY: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            {parts.map((part) => (
              <button
                key={part.id}
                onClick={() => setActive(part)}
                className={`absolute ${part.position} w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-[#70B7FF] focus:ring-offset-2 focus:ring-offset-[#020912]`}
                style={{
                  backgroundColor: active.id === part.id ? "#22C55E" : "#2491FF",
                  borderColor: "#F8FAFC",
                  boxShadow: "0 0 0 7px rgba(36,145,255,.16),0 0 24px #2491FF",
                }}
                aria-label={`Show ${part.label}`}
              />
            ))}
          </div>
        </div>
        <div className="space-y-3" aria-live="polite">
          {parts.map((part, index) => (
            <button
              key={part.id}
              onClick={() => setActive(part)}
              className="w-full text-left rounded-xl border p-4 transition-colors"
              style={{
                backgroundColor: active.id === part.id ? "rgba(36,145,255,.12)" : "#0B1B30",
                borderColor: active.id === part.id ? "rgba(36,145,255,.55)" : "rgba(148,163,184,.12)",
              }}
            >
              <span className="text-[10px] font-mono text-[#70B7FF]">LAYER 0{index + 1}</span>
              <span className="block text-sm font-semibold text-[#F8FAFC] mt-1">{part.label}</span>
              <span className="block text-xs leading-relaxed text-[#A9B8CA] mt-1">{part.detail}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
