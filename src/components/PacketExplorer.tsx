import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const fields = [
  { name: "Position", bytes: "GPS latitude and longitude", detail: "Where the aircraft is operating." },
  { name: "Altitude", bytes: "Height above reference", detail: "Reported by the PX4 flight controller." },
  { name: "Heading & speed", bytes: "Direction and ground speed", detail: "Describes how the aircraft is moving." },
  { name: "Battery", bytes: "Percentage and voltage", detail: "Allows the operator to monitor remaining power." },
  { name: "GPS fix", bytes: "Satellite-fix quality", detail: "Indicates whether the position data is trustworthy." },
  { name: "Flight mode", bytes: "Mode and armed state", detail: "Shows the current PX4 operating state." },
  { name: "System health", bytes: "Sensor and vehicle status", detail: "Carries PX4 health warnings to the operator." },
  { name: "Packet ID", bytes: "Origin, sequence, time", detail: "Supports attribution and duplicate rejection." },
];

export default function PacketExplorer() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const selected = fields[active];

  return (
    <section className="bg-[#061426] py-20 lg:py-28" aria-labelledby="packet-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-[.78fr_1.22fr] lg:px-8">
        <div>
          <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.22em] text-[#70B7FF]">
            Telemetry packet explorer
          </p>
          <h2 id="packet-title" className="mb-4 text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
            45 bytes every two seconds
          </h2>
          <p className="leading-relaxed text-[#A9B8CA]">
            Each drone packages a 13-byte mesh header with 32 bytes of telemetry. Select a field to see what the
            operator receives.
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#0B1B30]">
            <div className="flex h-12 text-[10px] font-mono uppercase tracking-widest">
              <div className="flex w-[29%] items-center justify-center bg-[#F59E0B]/15 text-[#F59E0B]">
                13-byte header
              </div>
              <div className="relative flex flex-1 items-center justify-center bg-[#2491FF]/15 text-[#70B7FF]">
                32-byte telemetry
                {!reduced && (
                  <motion.span
                    className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-500%", "500%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-[#2491FF]/30 bg-[#0B1B30] p-5" aria-live="polite">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#70B7FF]">{selected.name}</p>
            <p className="mt-2 text-sm font-semibold text-[#F8FAFC]">{selected.bytes}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#A9B8CA]">{selected.detail}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="list" aria-label="Telemetry packet fields">
          {fields.map((field, index) => (
            <button
              key={field.name}
              onClick={() => setActive(index)}
              className="group min-h-36 rounded-xl border p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-[#70B7FF]"
              style={{
                backgroundColor: active === index ? "rgba(36,145,255,.14)" : "#0B1B30",
                borderColor: active === index ? "rgba(36,145,255,.65)" : "rgba(148,163,184,.12)",
              }}
              aria-pressed={active === index}
              role="listitem"
            >
              <span className="text-[10px] font-mono text-[#7F93AA]">FIELD {String(index + 1).padStart(2, "0")}</span>
              <span className="mt-8 block text-sm font-semibold text-[#F8FAFC]">{field.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
