const metrics = [
  { value: "3 / 3", label: "Test suites pass", note: "Packet protocol, simulated radio, and routing" },
  { value: "≈4 s", label: "Simulated reroute", note: "Drone 2 off to first packet on the alternate path" },
  { value: "3", label: "Longest route", note: "Drone 3 through two relays to the ground station" },
  { value: "9%", label: "ESP32-S3 flash", note: "323 KB across the mesh firmware builds" },
];

const evidence = [
  ["Software simulation", "Multi-hop delivery and self-healing route selection"],
  ["Unit testing", "Loop protection and duplicate filtering"],
  ["Hardware bench test", "ESP32-S3 and SX1262 radios exchanged packets"],
  ["PX4 integration", "Telemetry came from PX4 rather than typed-in values"],
];

export default function PrototypeEvidence() {
  return (
    <section className="border-y border-white/5 bg-[#020912] py-20 lg:py-28" aria-labelledby="evidence-title">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.22em] text-[#70B7FF]">
              Prototype evidence · November 2026
            </p>
            <h2 id="evidence-title" className="text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
              What the team has verified
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[#A9B8CA]">
            These results combine software simulation, unit tests, and a radio bench test. Full three-drone field
            validation remains a next step.
          </p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="bg-[#0B1B30] p-6">
              <p className="font-mono text-4xl font-bold text-[#F8FAFC]">{metric.value}</p>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-[#70B7FF]">{metric.label}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A9B8CA]">{metric.note}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {evidence.map(([source, result]) => (
            <div key={source} className="flex gap-4 rounded-xl border border-white/10 bg-[#08182A] p-4">
              <span
                className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#22C55E] shadow-[0_0_14px_#22C55E]"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#22C55E]">{source}</p>
                <p className="mt-1 text-sm text-[#F8FAFC]">{result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
