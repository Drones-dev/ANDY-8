import { RadioTower, Shield, Mountain } from "lucide-react";

export default function ApplicationContext() {
  const contexts = [
    {
      icon: Shield,
      title: "Distributed sensing",
      text: "Keeps separated platforms connected when a direct operator link is unavailable.",
    },
    {
      icon: Mountain,
      title: "Remote operations",
      text: "Extends telemetry around terrain, structures, and other line-of-sight obstacles.",
    },
    {
      icon: RadioTower,
      title: "Resilient field networks",
      text: "Demonstrates the routing principles used by larger networks of mobile sensors.",
    },
  ];
  return (
    <section className="bg-black py-20 lg:py-28" aria-labelledby="context-title">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#70B7FF]">Why it matters</p>
        <h2 id="context-title" className="mt-3 text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
          A small prototype of a larger network problem
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-[#A9B8CA]">
          The project studies the same core challenge found in connected sensor networks: keeping remote platforms
          visible to an operator across contested or obstructed environments.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {contexts.map(({ icon: Icon, title, text }) => (
            <article key={title} className="border border-white/15 bg-[#080808] p-6">
              <Icon size={22} className="text-[#70B7FF]" aria-hidden="true" />
              <h3 className="mt-8 text-lg font-semibold text-[#F8FAFC]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A9B8CA]">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs text-[#7F93AA]">
          The presentation discusses connected-warfare concepts as industry context. ANDY 8 is an independent university
          prototype and does not claim affiliation with a defense company or deployed system.
        </p>
      </div>
    </section>
  );
}
