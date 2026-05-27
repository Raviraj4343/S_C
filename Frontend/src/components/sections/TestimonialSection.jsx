import { testimonials } from "../../utils/content";
import SectionTitle from "../ui/SectionTitle";

const TestimonialSection = () => (
  <section className="section-shell mt-20">
    <SectionTitle eyebrow="Voices" title="Stories From Our Community" />
    <div className="grid gap-4 md:grid-cols-2">
      {testimonials.map((item) => (
        <article key={item.name} className="glass-card rounded-2xl p-6 shadow-premium">
          <p className="text-muted">"{item.quote}"</p>
          <p className="mt-4 font-semibold text-foreground">{item.name}</p>
          <p className="text-sm text-muted">{item.role}</p>
        </article>
      ))}
    </div>
  </section>
);

export default TestimonialSection;

