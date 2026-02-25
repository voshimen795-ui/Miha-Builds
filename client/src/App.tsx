import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Floating3D from "@/components/floating-3d";
import StickyCTA from "@/components/sticky-cta";
import ScrollProgress from "@/components/scroll-progress";
import Home from "@/pages/home";
import Lab from "@/pages/lab";
import Beta from "@/pages/beta";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lab" component={Lab} />
      <Route path="/beta" component={Beta} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen navy-gradient relative">
          <ScrollProgress />
          <Floating3D />
          <Navigation />
          <div className="relative z-10">
            <Router />
          </div>
          <StickyCTA />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
