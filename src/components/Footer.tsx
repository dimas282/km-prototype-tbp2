import { HelpCircle, Book, Mail, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left - Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <span className="text-sm font-bold text-primary-foreground">K</span>
            </div>
            <span className="text-sm font-medium text-foreground">{t.footer.brand}</span>
            <span className="text-xs text-muted-foreground">© 2024</span>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <HelpCircle className="h-4 w-4" />
              {t.footer.helpCenter}
            </a>
            <a href="#" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Book className="h-4 w-4" />
              {t.footer.documentation}
            </a>
            <a href="#" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" />
              {t.footer.contact}
            </a>
            <a href="#" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Shield className="h-4 w-4" />
              {t.footer.privacy}
            </a>
          </div>

          {/* Right - Version */}
          <div className="text-xs text-muted-foreground">
            {t.footer.version} 2.4.1
          </div>
        </div>
      </div>
    </footer>
  );
}
