import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import Navigation from "@/components/navigation";
import Floating3D from "@/components/floating-3d";
import ScrollProgress from "@/components/scroll-progress";
import Home from "@/pages/home";

function App() {
  return (
    <I18nProvider>
      <TooltipProvider>
        <div className="min-h-screen navy-gradient relative">
          <ScrollProgress />
          <Floating3D />
          <Navigation />
          <div className="relative z-10">
            <Home />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </I18nProvider>
  );
}

export default App;
