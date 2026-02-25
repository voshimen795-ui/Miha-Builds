import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Lock, LogOut, Users, Mail, Building2, Clock, DollarSign,
  CheckCircle2, XCircle, AlertCircle, Eye, ChevronDown, ChevronUp,
  LayoutDashboard, Briefcase
} from "lucide-react";
import type { BetaApplication } from "@shared/schema";

const ADMIN_PASSWORD = "mihabuilds2026";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-10 max-w-md w-full"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-gold-400/10 flex items-center justify-center">
              <Lock size={24} className="text-gold-400" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-offwhite" data-testid="text-admin-login-title">
                Admin Access
              </h1>
              <p className="text-sm text-muted-foreground">Enter your password to continue</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-md bg-navy-600/60 border border-gold-400/10 text-offwhite text-sm outline-none focus:border-gold-400/30 transition-colors"
                data-testid="input-admin-password"
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-400 mt-2"
                  data-testid="text-login-error"
                >
                  {error}
                </motion.p>
              )}
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 rounded-md bg-gold-400 text-navy-500 font-semibold text-sm"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              data-testid="button-admin-login"
            >
              Log In
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { toast } = useToast();

  const { data: applications, isLoading } = useQuery<BetaApplication[]>({
    queryKey: ["/api/beta-applications"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/beta-applications/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/beta-applications"] });
      toast({ title: "Status updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Update failed", description: err.message, variant: "destructive" });
    },
  });

  const totalApps = applications?.length || 0;
  const pendingApps = applications?.filter(a => a.status === "pending").length || 0;
  const approvedApps = applications?.filter(a => a.status === "approved").length || 0;
  const rejectedApps = applications?.filter(a => a.status === "rejected").length || 0;

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center">
              <LayoutDashboard size={20} className="text-gold-400" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-offwhite" data-testid="text-admin-title">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">Manage beta applications</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-offwhite transition-colors border border-gold-400/10 hover:border-gold-400/20"
            data-testid="button-admin-logout"
          >
            <LogOut size={14} />
            Log Out
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard icon={Users} label="Total" value={totalApps} color="text-offwhite" testId="stat-total" />
          <StatCard icon={AlertCircle} label="Pending" value={pendingApps} color="text-yellow-400" testId="stat-pending" />
          <StatCard icon={CheckCircle2} label="Approved" value={approvedApps} color="text-green-400" testId="stat-approved" />
          <StatCard icon={XCircle} label="Rejected" value={rejectedApps} color="text-red-400" testId="stat-rejected" />
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Loading applications...</p>
          </div>
        ) : applications && applications.length > 0 ? (
          <div className="space-y-4" data-testid="list-applications">
            {applications.map((app) => (
              <ApplicationRow
                key={app.id}
                application={app}
                onUpdateStatus={(status) => updateStatusMutation.mutate({ id: app.id, status })}
                isPending={updateStatusMutation.isPending}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card rounded-xl p-16 text-center"
            data-testid="empty-applications"
          >
            <Briefcase size={40} className="text-gold-400/30 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-semibold text-offwhite mb-2">No Applications Yet</h3>
            <p className="text-sm text-muted-foreground">
              Applications will appear here when people submit the beta form.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, testId }: {
  icon: any; label: string; value: number; color: string; testId: string;
}) {
  return (
    <div className="glass-card rounded-lg p-5" data-testid={testId}>
      <Icon size={18} className={`${color} mb-3`} />
      <p className={`text-2xl font-serif font-bold ${color}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function ApplicationRow({ application, onUpdateStatus, isPending }: {
  application: BetaApplication;
  onUpdateStatus: (status: string) => void;
  isPending: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    approved: "bg-green-400/10 text-green-400 border-green-400/20",
    rejected: "bg-red-400/10 text-red-400 border-red-400/20",
  };

  const statusColor = statusColors[application.status] || statusColors.pending;

  return (
    <motion.div
      layout
      className="glass-card rounded-lg"
      data-testid={`application-row-${application.id}`}
    >
      <div
        className="flex items-center gap-4 p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        data-testid={`button-expand-${application.id}`}
      >
        <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-gold-400">
            {application.fullName.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-offwhite" data-testid={`text-app-name-${application.id}`}>
              {application.fullName}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColor}`}>
              {application.status}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Mail size={10} /> {application.email}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Building2 size={10} /> {application.businessName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground hidden sm:block">
            {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : ""}
          </span>
          {expanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-gold-400/5">
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <DetailField icon={Building2} label="Business Type" value={application.businessType} />
                <DetailField icon={DollarSign} label="Budget" value={application.budget} />
                <DetailField icon={Clock} label="Timeline" value={application.timeline} />
                <DetailField icon={Eye} label="How They Found Us" value={application.howDidYouHear || "Not specified"} />
                {application.websiteUrl && (
                  <DetailField icon={Eye} label="Current Website" value={application.websiteUrl} isLink />
                )}
              </div>

              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-1 font-medium">Project Description</p>
                <p className="text-sm text-offwhite/80 leading-relaxed bg-navy-600/30 rounded-md p-3" data-testid={`text-app-description-${application.id}`}>
                  {application.projectDescription}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gold-400/5">
                <span className="text-xs text-muted-foreground mr-2">Set status:</span>
                {["pending", "approved", "rejected"].map((status) => (
                  <button
                    key={status}
                    onClick={(e) => { e.stopPropagation(); onUpdateStatus(status); }}
                    disabled={isPending || application.status === status}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all disabled:opacity-40 ${
                      application.status === status
                        ? statusColors[status] + " border"
                        : "bg-navy-600/50 text-muted-foreground hover:text-offwhite border border-transparent hover:border-gold-400/10"
                    }`}
                    data-testid={`button-status-${status}-${application.id}`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailField({ icon: Icon, label, value, isLink }: {
  icon: any; label: string; value: string; isLink?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={12} className="text-gold-400 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        {isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-gold-400 underline underline-offset-2">
            {value}
          </a>
        ) : (
          <p className="text-sm text-offwhite/80">{value}</p>
        )}
      </div>
    </div>
  );
}
