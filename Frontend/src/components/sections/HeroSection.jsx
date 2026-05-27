import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section className="section-shell pt-8 md:pt-10">
    <div className="glass-card relative overflow-hidden rounded-3xl p-8 shadow-premium md:p-14">
      <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="absolute -bottom-16 left-12 h-44 w-44 rounded-full bg-amber-300/25 blur-3xl" />
      <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl font-display text-4xl font-extrabold leading-tight text-foreground md:text-6xl">
        Empower Women. Build Opportunities. Transform Communities.
      </motion.h1>
      <p className="mt-6 max-w-2xl text-base text-muted md:text-lg">Join a high-impact movement enabling women through education, mentorship, leadership, and grassroots action.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/volunteer" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-cyan-700">Join as Volunteer <FiArrowRight /></Link>
        <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-edge bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5">Learn About Us</Link>
      </div>
    </div>
  </section>
);

export default HeroSection;
