import { initiatives } from "../../utils/content";
import SectionTitle from "../ui/SectionTitle";

const AboutSection = () => (
  <section id="about" className="section-shell mt-20 grid gap-10 lg:grid-cols-2">
    <div>
      <SectionTitle
        eyebrow="About Us"
        title="A Women-First Movement Focused on Education, Dignity, and Leadership"
        subtitle="She Can Foundation partners with communities to remove barriers to learning and economic opportunity for women and girls."
      />
      <p className="text-muted">Our mission is to create equitable pathways where women can build confidence, skills, and long-term independence. We design high-impact initiatives through local collaboration and measurable outcomes.</p>
    </div>
    <div className="space-y-4">
      {initiatives.map((initiative) => (
        <div key={initiative.title} className="glass-card rounded-2xl p-5 shadow-premium">
          <h3 className="font-display text-xl font-bold text-foreground">{initiative.title}</h3>
          <p className="mt-2 text-muted">{initiative.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default AboutSection;

