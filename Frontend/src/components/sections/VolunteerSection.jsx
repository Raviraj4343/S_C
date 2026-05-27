import { useState } from "react";
import { toast } from "react-toastify";
import { submitVolunteer } from "../../services/formService";
import { useSubmitState } from "../../hooks/useSubmitState";
import SectionTitle from "../ui/SectionTitle";
import Spinner from "../common/Spinner";
import SuccessPopup from "../common/SuccessPopup";

const initial = { fullName: "", email: "", phone: "", skills: "", interests: "", message: "" };

const VolunteerSection = () => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const { loading, submit } = useSubmitState(submitVolunteer);

  const validate = () => {
    const next = {};
    if (form.fullName.trim().length < 2) next.fullName = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (form.phone.trim().length < 7) next.phone = "Enter a valid phone number";
    if (form.message.trim().length < 10) next.message = "Message must be at least 10 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      await submit({ ...form, skills: form.skills.split(","), interests: form.interests.split(",") });
      setForm(initial);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2200);
      toast.success("Volunteer application submitted");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to submit volunteer form");
    }
  };

  const inputClass = "rounded-xl border border-edge bg-card px-4 py-3 text-foreground outline-none ring-cyan-300 transition focus:ring";

  return (
    <section id="volunteer" className="section-shell mt-24">
      <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="glass-card rounded-3xl p-7">
          <SectionTitle eyebrow="Volunteer" title="Become a She Can Volunteer" subtitle="Use your skills to mentor, teach, and support women-led community change." />
          <ul className="space-y-3 text-sm text-muted">
            <li>Flexible participation windows</li>
            <li>High-impact community initiatives</li>
            <li>Structured volunteer coordination</li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="glass-card grid gap-4 rounded-3xl p-6 shadow-premium md:grid-cols-2 md:p-8">
          <input name="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full Name" className={inputClass} />
          <input name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className={inputClass} />
          <input name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className={inputClass} />
          <input name="skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="Skills (comma separated)" className={inputClass} />
          <input name="interests" value={form.interests} onChange={(e) => setForm({ ...form, interests: e.target.value })} placeholder="Interests (comma separated)" className={`${inputClass} md:col-span-2`} />
          <textarea name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us how you want to contribute" className="min-h-32 rounded-xl border border-edge bg-card px-4 py-3 text-foreground outline-none ring-cyan-300 transition focus:ring md:col-span-2" />
          {(errors.fullName || errors.email || errors.phone || errors.message) ? <p className="text-sm text-rose-500 md:col-span-2">{errors.fullName || errors.email || errors.phone || errors.message}</p> : null}
          <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-70 md:col-span-2 dark:bg-cyan-700">
            {loading ? <Spinner /> : "Submit Registration"}
          </button>
        </form>
      </div>
      <SuccessPopup open={showSuccess} message="Volunteer form submitted successfully" />
    </section>
  );
};

export default VolunteerSection;
