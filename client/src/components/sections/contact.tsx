import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { fadeUp } from "@/lib/motion";
import { useToast } from "@/hooks/use-toast";

// Set VITE_WEB3FORMS_ACCESS_KEY in your .env (see .env.example) to receive
// submissions by email. Get a free key at https://web3forms.com (no backend
// needed — it emails messages straight to your inbox).
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
const CONTACT_EMAIL = "voshimen795@gmail.com";

const inputClass =
  "w-full px-4 py-3 rounded-md bg-navy-600/60 border border-gold-400/10 text-offwhite text-sm outline-none focus:border-gold-400/30 transition-colors placeholder:text-muted-foreground/60";

export default function Contact() {
  const { tr, t } = useI18n();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!ACCESS_KEY) {
      toast({
        title: tr(t.contact.errorTitle),
        description: tr(t.contact.errorDesc),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New message from Miha Builds",
          from_name: "Miha Builds Website",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSent(true);
        form.reset();
        toast({ title: tr(t.contact.successTitle), description: tr(t.contact.successDesc) });
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch {
      toast({
        title: tr(t.contact.errorTitle),
        description: tr(t.contact.errorDesc),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 md:py-32 px-6 relative z-10">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-gold-sm mb-8">
            <Mail size={14} className="text-gold-400" />
            <span className="text-xs font-medium text-gold-300 tracking-[0.3em] uppercase">
              {tr(t.contact.badge)}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-offwhite mb-5">
            {tr(t.contact.title)}
            <span className="text-gold-gradient">{tr(t.contact.titleAccent)}</span>
          </h2>
          <p className="text-lg text-muted-foreground">{tr(t.contact.description)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-10"
        >
          {sent ? (
            <div className="text-center py-10" data-testid="contact-success">
              <CheckCircle2 size={48} className="text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-offwhite mb-2">
                {tr(t.contact.successTitle)}
              </h3>
              <p className="text-muted-foreground">{tr(t.contact.successDesc)}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-contact">
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="text-xs text-muted-foreground mb-1.5 block">{tr(t.contact.name)}</span>
                  <input name="name" required placeholder={tr(t.contact.namePlaceholder)} className={inputClass} data-testid="input-contact-name" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground mb-1.5 block">{tr(t.contact.email)}</span>
                  <input type="email" name="email" required placeholder={tr(t.contact.emailPlaceholder)} className={inputClass} data-testid="input-contact-email" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs text-muted-foreground mb-1.5 block">{tr(t.contact.message)}</span>
                <textarea name="message" required rows={5} placeholder={tr(t.contact.messagePlaceholder)} className={inputClass} data-testid="input-contact-message" />
              </label>
              <motion.button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-md bg-gold-400 text-navy-500 font-semibold text-sm glow-gold-sm disabled:opacity-60"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                data-testid="button-contact-submit"
              >
                {submitting ? tr(t.contact.sending) : tr(t.contact.send)}
                {!submitting && <Send size={15} />}
              </motion.button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-gold-400/10 text-center">
            <p className="text-xs text-muted-foreground">
              {tr(t.contact.orReachMe)}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-400 hover:underline" data-testid="link-contact-email">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
