import FadeIn from "../ui/FadeIn";
import SectionTitle from "../ui/SectionTitle";
import { stats } from "../../utils/content";

const StatsSection = () => (
  <section className="section-shell mt-16">
    <SectionTitle eyebrow="Impact" title="Numbers That Reflect Real Community Change" />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item, index) => (
        <FadeIn key={item.label} delay={index * 0.08}>
          <div className="glass-card rounded-2xl p-6 shadow-premium">
            <p className="font-display text-3xl font-extrabold text-cyan-700">{item.value}</p>
            <p className="mt-2 text-muted">{item.label}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);

export default StatsSection;

