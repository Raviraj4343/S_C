import { useState } from "react";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { toast } from "react-toastify";
import SectionTitle from "../ui/SectionTitle";
import { submitContact } from "../../services/formService";
import { useSubmitState } from "../../hooks/useSubmitState";
import Spinner from "../common/Spinner";

const initial = { fullName: "", email: "", subject: "", message: "" };

const ContactSection = () => {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const { loading, submit } = useSubmitState(submitContact);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 10) {
      setError("Enter a valid email and a meaningful message.");
      return;
    }

    try {
      await submit(form);
      toast.success("Message sent successfully");
      setForm(initial);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to send message");
    }
  };

  return (
    <section id="contact" className="section-shell mt-24 pb-8">
      <SectionTitle eyebrow="Contact" title="Partner, Sponsor, or Reach Out" subtitle="Collaborate with She Can Foundation to scale real impact." />
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <form onSubmit={onSubmit} className="glass-card space-y-4 rounded-3xl p-6 shadow-premium">
          {[ ["fullName", "Full Name"], ["email", "Email"], ["subject", "Subject"] ].map(([name, placeholder]) => (
            <input key={name} required name={name} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder} className="w-full rounded-xl border border-edge bg-card px-4 py-3 text-foreground outline-none ring-cyan-300 transition focus:ring" />
          ))}
          <textarea required name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message" className="min-h-32 w-full rounded-xl border border-edge bg-card px-4 py-3 text-foreground outline-none ring-cyan-300 transition focus:ring" />
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-70 dark:bg-cyan-700">
            {loading ? <Spinner /> : "Send Message"}
          </button>
        </form>

        <aside className="glass-card rounded-3xl p-7 shadow-premium">
          <h3 className="font-display text-2xl font-bold text-foreground">Foundation Office</h3>
          <p className="mt-3 text-muted">2nd Floor, Community Development Hub, New Delhi, India</p>
          <p className="mt-2 text-muted">hello@shecanfoundation.org</p>
          <p className="mt-2 text-muted">Mon-Sat, 9:30 AM - 6:30 PM</p>
          <div className="mt-6 flex gap-3 text-xl text-cyan-700">
            <FiInstagram /><FiLinkedin /><FiFacebook />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ContactSection;
