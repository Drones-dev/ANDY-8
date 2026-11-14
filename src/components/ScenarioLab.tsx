import { useState } from "react";

type Scenario = {
  id: string;
  label: string;
  evidence: "Verified simulation" | "Planned scenario";
  description: string;
  route: string;
  down: string[];
  metrics: [string, string][];
  events: string[];
};

const scenarios: Scenario[] = [
  {
    id: "nominal",
    label: "Nominal route",
    evidence: "Verified simulation",
    description: "All nodes are healthy and telemetry uses the shortest available route.",
    route: "D3 → D2 → D1 → GS",
    down: [],
    metrics: [
      ["Delivery", "Stable"],
      ["Reroute", "N/A"],
      ["Link state", "Healthy"],
    ],
    events: ["HELLO heartbeats received", "Three-hop route selected", "Telemetry reaches ground station"],
  },
  {
    id: "relay",
    label: "Relay failure",
    evidence: "Verified simulation",
    description: "Drone 2 powers off. The mesh marks the route stale and sends Drone 3 traffic through Drone 1.",
    route: "D3 → D1 → GS",
    down: ["D2"],
    metrics: [
      ["Reroute", "≈4 s"],
      ["Result", "Recovered"],
      ["Evidence", "Simulation"],
    ],
    events: [
      "Drone 2 heartbeat stops",
      "Five-second silence threshold reached",
      "Alternate route selected",
      "First packet arrives on new path",
    ],
  },
  {
    id: "fading",
    label: "Fading link",
    evidence: "Planned scenario",
    description: "Signal strength drops gradually so the routing score can react before a total disconnect.",
    route: "Candidate: D3 → D1 → GS",
    down: [],
    metrics: [
      ["Delivery", "TBD"],
      ["Packet loss", "TBD"],
      ["Link score", "Under design"],
    ],
    events: ["RSSI and SNR decline", "Primary route score falls", "Backup neighbor evaluated"],
  },
  {
    id: "anchor",
    label: "Anchor failure",
    evidence: "Planned scenario",
    description: "Drone 1 fails, exposing the current line topology’s weak point near the ground station.",
    route: "No route to GS",
    down: ["D1"],
    metrics: [
      ["Delivery", "0% expected"],
      ["Split", "Detected"],
      ["Recovery", "No path"],
    ],
    events: ["Drone 1 heartbeat stops", "Forward mesh loses its gateway", "Ground station reports network split"],
  },
  {
    id: "dual",
    label: "Two failures",
    evidence: "Planned scenario",
    description: "Two aircraft fail together to test whether any viable path remains.",
    route: "No viable route",
    down: ["D1", "D2"],
    metrics: [
      ["Delivery", "0% expected"],
      ["Failures", "2"],
      ["Recovery", "No path"],
    ],
    events: ["Two heartbeat streams stop", "Route table invalidated", "No neighbor reaches the destination"],
  },
  {
    id: "moving",
    label: "Moving ground station",
    evidence: "Planned scenario",
    description: "The destination changes position, forcing nodes to revise route quality during operation.",
    route: "Dynamic destination",
    down: [],
    metrics: [
      ["Delivery", "TBD"],
      ["Route changes", "TBD"],
      ["Mobility", "Planned"],
    ],
    events: ["Ground-station position changes", "Neighbor scores update", "Best path recalculated"],
  },
  {
    id: "scale",
    label: "More drones",
    evidence: "Planned scenario",
    description: "Additional nodes reveal how the shared channel and route selection behave beyond three aircraft.",
    route: "Multi-route mesh",
    down: [],
    metrics: [
      ["Nodes", ">3"],
      ["Channel load", "TBD"],
      ["Collisions", "TBD"],
    ],
    events: ["New nodes announce themselves", "Neighbor tables expand", "Channel utilization measured"],
  },
];

export default function ScenarioLab() {
  const [activeId, setActiveId] = useState("relay");
  const active = scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0];
  const verified = active.evidence === "Verified simulation";
  return (
    <section className="mb-8 rounded-2xl border border-white/10 bg-[#020912] p-5" aria-labelledby="scenario-lab-title">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#70B7FF]">
            Interactive validation plan
          </p>
          <h2 id="scenario-lab-title" className="mt-2 text-xl font-bold text-[#F8FAFC]">
            Scenario laboratory
          </h2>
        </div>
        <p className="max-w-xl text-xs leading-relaxed text-[#A9B8CA]">
          Verified scenarios reproduce completed simulator work. Planned scenarios show the intended test behavior
          without claiming measured results.
        </p>
      </div>
      <div className="mt-5 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Network scenarios">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            role="tab"
            aria-selected={scenario.id === active.id}
            onClick={() => setActiveId(scenario.id)}
            className="whitespace-nowrap rounded border px-3 py-2 text-xs font-medium"
            style={{
              color: scenario.id === active.id ? "#F8FAFC" : "#A9B8CA",
              backgroundColor: scenario.id === active.id ? "rgba(36,145,255,.15)" : "transparent",
              borderColor: scenario.id === active.id ? "rgba(36,145,255,.55)" : "rgba(148,163,184,.15)",
            }}
          >
            {scenario.label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-xl border border-white/10 bg-[#071426] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#F8FAFC]">{active.label}</p>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-[#A9B8CA]">{active.description}</p>
            </div>
            <span
              className="shrink-0 rounded border px-2 py-1 text-[10px] font-mono"
              style={{
                color: verified ? "#22C55E" : "#F59E0B",
                borderColor: verified ? "rgba(34,197,94,.35)" : "rgba(245,158,11,.35)",
              }}
            >
              {active.evidence}
            </span>
          </div>
          <ScenarioTopology scenario={active} />
          <p className="mt-2 text-center text-xs font-mono text-[#70B7FF]">{active.route}</p>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {active.metrics.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-[#0B1B30] p-3">
                <p className="text-[9px] font-mono uppercase tracking-wider text-[#7F93AA]">{label}</p>
                <p className="mt-2 text-sm font-semibold text-[#F8FAFC]">{value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0B1B30] p-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#70B7FF]">Event sequence</p>
            <ol className="mt-3 space-y-2">
              {active.events.map((event, index) => (
                <li key={event} className="flex gap-3 text-xs text-[#A9B8CA]">
                  <span className="font-mono text-[#2491FF]">0{index + 1}</span>
                  {event}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScenarioTopology({ scenario }: { scenario: Scenario }) {
  const nodes = [
    ["D3", 50],
    ["D2", 180],
    ["D1", 310],
    ["GS", 445],
  ] as const;
  return (
    <svg viewBox="0 0 500 150" className="mt-4 w-full" role="img" aria-label={`${scenario.label}: ${scenario.route}`}>
      <line
        x1="50"
        y1="75"
        x2="445"
        y2="75"
        stroke="#2491FF"
        strokeWidth="2"
        strokeDasharray={scenario.id === "fading" ? "3 7" : undefined}
        opacity={scenario.id === "anchor" || scenario.id === "dual" ? 0.35 : 1}
      />
      {scenario.id === "relay" && (
        <path d="M50 75 Q180 15 310 75" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeDasharray="7 4" />
      )}
      {scenario.id === "scale" && (
        <>
          <circle cx="120" cy="25" r="14" fill="#102640" stroke="#70B7FF" />
          <circle cx="250" cy="125" r="14" fill="#102640" stroke="#70B7FF" />
          <line x1="120" y1="25" x2="310" y2="75" stroke="#2491FF" strokeDasharray="4 3" />
          <line x1="250" y1="125" x2="310" y2="75" stroke="#2491FF" strokeDasharray="4 3" />
        </>
      )}
      {nodes.map(([label, x]) => {
        const down = scenario.down.includes(label);
        return (
          <g key={label}>
            <circle
              cx={x}
              cy="75"
              r="22"
              fill="#102640"
              stroke={down ? "#EF4444" : label === "GS" ? "#22C55E" : "#2491FF"}
              strokeWidth="2"
              strokeDasharray={down ? "4 3" : undefined}
            />
            <text
              x={x}
              y="79"
              textAnchor="middle"
              fill={down ? "#EF4444" : "#F8FAFC"}
              fontFamily="JetBrains Mono"
              fontSize="11"
              fontWeight="700"
            >
              {label}
            </text>
            {down && (
              <path d={`M${x - 10} 65 L${x + 10} 85 M${x + 10} 65 L${x - 10} 85`} stroke="#EF4444" strokeWidth="2" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
