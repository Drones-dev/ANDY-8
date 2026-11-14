import { CheckCircle2, CircleDashed, FlaskConical, Radio, ShieldAlert } from "lucide-react";

const verifiedMetrics = [
  { value: "3 / 3", label: "Test suites pass", note: "Protocol, simulated radio, and routing" },
  { value: "≈4 s", label: "Simulated reroute", note: "Relay loss to first packet on the new path" },
  { value: "3", label: "Maximum hops shown", note: "Drone 3 through Drone 2 and Drone 1" },
  { value: "9%", label: "ESP32-S3 flash", note: "323 KB across the firmware build" },
];

const stages = [
  {
    name: "Unit tests",
    status: "Verified",
    detail: "Packet protocol, simulated radio, routing, loop protection, and duplicate filtering.",
    icon: CheckCircle2,
  },
  {
    name: "PX4 simulation",
    status: "Verified",
    detail: "Three PX4 SITL aircraft provide MAVLink telemetry to the four-node mesh simulator.",
    icon: CheckCircle2,
  },
  {
    name: "Radio bench test",
    status: "Verified",
    detail: "ESP32-S3 and SX1262 boards exchange packets in a stationary ping-pong test.",
    icon: Radio,
  },
  {
    name: "Stationary physical mesh",
    status: "Next",
    detail: "Validate multiple real nodes, fading links, and failure timing without flight.",
    icon: CircleDashed,
  },
  {
    name: "Incremental flight test",
    status: "Next",
    detail: "Test one aircraft, then the relay pair, before the complete formation.",
    icon: CircleDashed,
  },
  {
    name: "Three-drone validation",
    status: "Planned",
    detail: "Measure delivery, latency, and recovery with a controlled obstacle and relay shutdown.",
    icon: CircleDashed,
  },
];

const definitions = [
  {
    term: "Reroute time",
    meaning: "Seconds from the relay shutdown to the first packet delivered on the alternate path.",
  },
  {
    term: "Detection time",
    meaning:
      "Time between the last heartbeat and the node being marked lost. The prototype uses a five-second silence threshold.",
  },
  {
    term: "Packet loss",
    meaning: "The share of telemetry frames that do not reach the ground station during the hand-off.",
  },
  { term: "End-to-end latency", meaning: "Delay from Drone 3 creating a packet to the ground station receiving it." },
  { term: "Delivery ratio", meaning: "The share of Drone 3 packets that arrive at the ground station during a run." },
];

const scenarios = [
  ["Nominal multi-hop route", "Verified in simulation", "D3 → D2 → D1 → ground station"],
  ["Relay failure", "Verified in simulation", "Power off D2 and measure the alternate path"],
  ["Fading link", "Planned", "Reduce signal gradually instead of an instant cutoff"],
  ["Anchor failure", "Planned", "Remove D1 and confirm the network split is reported"],
  ["Two simultaneous failures", "Planned", "Measure whether any viable route remains"],
  ["Moving ground station", "Planned", "Recalculate routes as the destination changes position"],
  ["More than three drones", "Planned", "Observe channel loading and route choice at a larger scale"],
];

export default function Testing({ navOffset }: { navOffset: string }) {
  return (
    <div className={`min-h-screen ${navOffset}`} style={{ backgroundColor: "#061426" }}>
      <header
        className="border-b bg-grid"
        style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
      >
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-mono uppercase tracking-widest text-[#70B7FF]">Validation</p>
          <h1 className="mb-3 text-3xl font-bold text-[#F8FAFC] sm:text-4xl">Testing and Results</h1>
          <p className="max-w-3xl text-base leading-relaxed text-[#A9B8CA]">
            Verified software and bench-test evidence from the November 2026 prototype, separated from the physical
            flight work that remains.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded border border-[#F59E0B]/35 bg-[#F59E0B]/[0.07] px-3 py-2 text-xs text-[#F59E0B]">
            <ShieldAlert size={14} aria-hidden="true" /> No complete three-drone field trial has been claimed.
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <section aria-labelledby="verified-results">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#22C55E]">Prototype evidence</p>
              <h2 id="verified-results" className="mt-2 text-xl font-bold text-[#F8FAFC]">
                Verified results
              </h2>
            </div>
            <p className="text-xs text-[#7F93AA]">Source: prototype presentation, November 10, 2026</p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {verifiedMetrics.map((metric) => (
              <article key={metric.label} className="rounded-xl border border-white/10 bg-[#0B1B30] p-5">
                <p className="font-mono text-3xl font-bold text-[#F8FAFC]">{metric.value}</p>
                <h3 className="mt-3 text-sm font-semibold text-[#70B7FF]">{metric.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#A9B8CA]">{metric.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="test-stages">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#70B7FF]">Evidence ladder</p>
          <h2 id="test-stages" className="mt-2 text-xl font-bold text-[#F8FAFC]">
            Test stages
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stages.map(({ name, status, detail, icon: Icon }) => {
              const done = status === "Verified";
              return (
                <article
                  key={name}
                  className="rounded-xl border p-5"
                  style={{
                    backgroundColor: "#0B1B30",
                    borderColor: done ? "rgba(34,197,94,.3)" : "rgba(148,163,184,.12)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={20} style={{ color: done ? "#22C55E" : "#F59E0B" }} aria-hidden="true" />
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider"
                      style={{ color: done ? "#22C55E" : "#F59E0B" }}
                    >
                      {status}
                    </span>
                  </div>
                  <h3 className="mt-5 text-sm font-semibold text-[#F8FAFC]">{name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#A9B8CA]">{detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[.78fr_1.22fr]" aria-labelledby="metric-definitions">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#70B7FF]">Measurement glossary</p>
            <h2 id="metric-definitions" className="mt-2 text-xl font-bold text-[#F8FAFC]">
              What each metric means
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A9B8CA]">
              Using consistent definitions keeps simulated, bench, and field results comparable.
            </p>
          </div>
          <dl className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-[#0B1B30]">
            {definitions.map(({ term, meaning }) => (
              <div key={term} className="grid gap-2 p-4 sm:grid-cols-[150px_1fr]">
                <dt className="text-sm font-semibold text-[#F8FAFC]">{term}</dt>
                <dd className="text-sm leading-relaxed text-[#A9B8CA]">{meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12" aria-labelledby="scenario-plan">
          <div className="flex items-center gap-3">
            <FlaskConical className="text-[#70B7FF]" size={22} aria-hidden="true" />
            <h2 id="scenario-plan" className="text-xl font-bold text-[#F8FAFC]">
              Scenario validation plan
            </h2>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-[#0B1B30]">
                  <tr>
                    {["Scenario", "Evidence status", "Purpose"].map((label) => (
                      <th
                        key={label}
                        className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-widest text-[#A9B8CA]"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map(([name, status, purpose]) => (
                    <tr key={name} className="border-t border-white/10 bg-[#08182A]">
                      <td className="px-4 py-3 text-sm font-medium text-[#F8FAFC]">{name}</td>
                      <td
                        className="px-4 py-3 text-xs font-mono"
                        style={{ color: status.startsWith("Verified") ? "#22C55E" : "#F59E0B" }}
                      >
                        {status}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#A9B8CA]">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
