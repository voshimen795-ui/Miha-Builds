import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, Check, Rocket, User, Briefcase, FileText } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.string().min(1, "Please select a business type"),
  websiteUrl: z.string().optional(),
  projectDescription: z.string().min(20, "Please describe your project (min 20 characters)"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  howDidYouHear: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const initialFormData: FormData = {
  fullName: "",
  email: "",
  businessName: "",
  businessType: "",
  websiteUrl: "",
  projectDescription: "",
  budget: "",
  timeline: "",
  howDidYouHear: "",
};

const steps = [
  { label: "About You", icon: User },
  { label: "Your Business", icon: Briefcase },
  { label: "Project Details", icon: FileText },
];

const businessTypes = [
  "Startup", "E-Commerce", "SaaS", "Agency", "Personal Brand", "Non-Profit", "Other"
];
const budgetRanges = [
  "Free Beta Tier", "$1k - $3k", "$3k - $5k", "$5k - $10k", "$10k+"
];
const timelines = [
  "ASAP (1-2 weeks)", "1 Month", "2-3 Months", "Flexible"
];

export default function Beta() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await apiRequest("POST", "/api/beta-applications", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.fullName || formData.fullName.length < 2) newErrors.fullName = "Name is required";
      if (!formData.email || !formData.email.includes("@")) newErrors.email = "Valid email is required";
    } else if (step === 1) {
      if (!formData.businessName || formData.businessName.length < 2) newErrors.businessName = "Business name is required";
      if (!formData.businessType) newErrors.businessType = "Select a business type";
    } else if (step === 2) {
      if (!formData.projectDescription || formData.projectDescription.length < 20) newErrors.projectDescription = "Describe your project (min 20 chars)";
      if (!formData.budget) newErrors.budget = "Select a budget range";
      if (!formData.timeline) newErrors.timeline = "Select a timeline";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 2));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    if (validateStep()) {
      mutation.mutate(formData);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-xl p-12 max-w-lg text-center glow-gold relative overflow-visible"
          data-testid="success-message"
        >
          <motion.img
            src="/images/3d-helix.png"
            alt=""
            className="absolute -top-8 -right-8 w-20 opacity-50 hidden md:block"
            animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="w-20 h-20 rounded-full bg-gold-400/20 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-gold-400" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-offwhite mb-4">
            Application Received!
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Thank you for applying to the Miha Builds Beta Program.
            We'll review your application and get back to you within 48 hours.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 text-gold-400 text-sm font-medium">
            <Rocket size={16} />
            You're one step closer to launch
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-gold-sm mb-8">
            <Rocket size={14} className="text-gold-400" />
            <span className="text-xs font-medium text-gold-300 tracking-[0.3em] uppercase">
              Beta Program
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-offwhite mb-4" data-testid="text-beta-title">
            Apply for <span className="text-gold-gradient">Free Beta</span>
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-beta-description">
            Only 3 spots available. Tell us about your project.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2" data-testid={`step-indicator-${i}`}>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  i === step
                    ? "bg-gold-400/20 text-gold-400 border border-gold-400/30"
                    : i < step
                    ? "bg-gold-400/10 text-gold-400/70"
                    : "text-muted-foreground"
                }`}
              >
                {i < step ? (
                  <Check size={14} />
                ) : (
                  <s.icon size={14} />
                )}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-px transition-colors ${i < step ? "bg-gold-400/40" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-xl p-8 md:p-10 relative overflow-visible"
        >
          <motion.img
            src="/images/3d-cone.png"
            alt=""
            className="absolute -top-6 -left-6 w-16 opacity-40 hidden md:block pointer-events-none"
            animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepContent key="step0">
                <FormField
                  label="Full Name"
                  error={errors.fullName}
                  testId="input-full-name"
                >
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="John Doe"
                    className="form-input"
                    data-testid="input-full-name"
                  />
                </FormField>
                <FormField
                  label="Email Address"
                  error={errors.email}
                  testId="input-email"
                >
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="john@company.com"
                    className="form-input"
                    data-testid="input-email"
                  />
                </FormField>
              </StepContent>
            )}

            {step === 1 && (
              <StepContent key="step1">
                <FormField
                  label="Business Name"
                  error={errors.businessName}
                  testId="input-business-name"
                >
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => updateField("businessName", e.target.value)}
                    placeholder="Acme Corp"
                    className="form-input"
                    data-testid="input-business-name"
                  />
                </FormField>
                <FormField
                  label="Business Type"
                  error={errors.businessType}
                  testId="select-business-type"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateField("businessType", type)}
                        className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                          formData.businessType === type
                            ? "bg-gold-400/20 text-gold-400 border border-gold-400/30"
                            : "bg-navy-600/50 text-muted-foreground border border-transparent hover:border-gold-400/10"
                        }`}
                        data-testid={`button-type-${type.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </FormField>
                <FormField
                  label="Current Website (optional)"
                  testId="input-website-url"
                >
                  <input
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => updateField("websiteUrl", e.target.value)}
                    placeholder="https://example.com"
                    className="form-input"
                    data-testid="input-website-url"
                  />
                </FormField>
              </StepContent>
            )}

            {step === 2 && (
              <StepContent key="step2">
                <FormField
                  label="Project Description"
                  error={errors.projectDescription}
                  testId="textarea-project-description"
                >
                  <textarea
                    value={formData.projectDescription}
                    onChange={(e) => updateField("projectDescription", e.target.value)}
                    placeholder="Tell us about your vision. What problem are you solving? What does your dream website look like?"
                    rows={4}
                    className="form-input resize-none"
                    data-testid="textarea-project-description"
                  />
                </FormField>
                <FormField
                  label="Budget Range"
                  error={errors.budget}
                  testId="select-budget"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {budgetRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => updateField("budget", range)}
                        className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                          formData.budget === range
                            ? "bg-gold-400/20 text-gold-400 border border-gold-400/30"
                            : "bg-navy-600/50 text-muted-foreground border border-transparent hover:border-gold-400/10"
                        }`}
                        data-testid={`button-budget-${range.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </FormField>
                <FormField
                  label="Timeline"
                  error={errors.timeline}
                  testId="select-timeline"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {timelines.map((tl) => (
                      <button
                        key={tl}
                        type="button"
                        onClick={() => updateField("timeline", tl)}
                        className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                          formData.timeline === tl
                            ? "bg-gold-400/20 text-gold-400 border border-gold-400/30"
                            : "bg-navy-600/50 text-muted-foreground border border-transparent hover:border-gold-400/10"
                        }`}
                        data-testid={`button-timeline-${tl.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      >
                        {tl}
                      </button>
                    ))}
                  </div>
                </FormField>
                <FormField
                  label="How did you hear about us? (optional)"
                  testId="input-how-did-you-hear"
                >
                  <input
                    type="text"
                    value={formData.howDidYouHear}
                    onChange={(e) => updateField("howDidYouHear", e.target.value)}
                    placeholder="Twitter, friend, search..."
                    className="form-input"
                    data-testid="input-how-did-you-hear"
                  />
                </FormField>
              </StepContent>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-gold-400/10">
            {step > 0 ? (
              <motion.button
                onClick={prevStep}
                className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-offwhite transition-colors"
                whileHover={{ x: -2 }}
                data-testid="button-prev-step"
              >
                <ArrowLeft size={16} />
                Back
              </motion.button>
            ) : (
              <div />
            )}
            {step < 2 ? (
              <motion.button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold bg-gold-400 text-navy-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-next-step"
              >
                Next
                <ArrowRight size={16} />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={mutation.isPending}
                className="flex items-center gap-2 px-8 py-2.5 rounded-md text-sm font-semibold bg-gold-400 text-navy-500 disabled:opacity-50 glow-gold-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-submit-application"
              >
                {mutation.isPending ? (
                  <>Submitting...</>
                ) : (
                  <>
                    Submit Application
                    <Rocket size={16} />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          background: rgba(26, 32, 44, 0.6);
          border: 1px solid rgba(212, 175, 55, 0.1);
          color: #F7FAFC;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .form-input:focus {
          border-color: rgba(212, 175, 55, 0.3);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.05);
        }
        .form-input::placeholder {
          color: hsl(220 10% 45%);
        }
      `}</style>
    </div>
  );
}

function StepContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {children}
    </motion.div>
  );
}

function FormField({
  label,
  error,
  children,
  testId,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  testId?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-offwhite/80 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 mt-1.5"
          data-testid={`error-${testId}`}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
