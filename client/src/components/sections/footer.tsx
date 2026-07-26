import { useI18n } from "@/lib/i18n";
import logoImg from "@assets/IMG_20260225_201123_554_1772047207845.webp";

export default function Footer() {
  const { tr, t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold-400/10 py-12 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-3 group">
          <img src={logoImg} alt="Miha Builds" className="h-8 w-8 rounded-md object-cover" />
          <span className="font-serif text-sm text-muted-foreground group-hover:text-offwhite transition-colors">
            Miha Builds
          </span>
        </a>
        <p className="text-xs text-muted-foreground">{tr(t.footer.tagline)}</p>
        <p className="text-xs text-muted-foreground">
          © {year} Miha Builds. {tr(t.footer.rights)}
        </p>
      </div>
    </footer>
  );
}
