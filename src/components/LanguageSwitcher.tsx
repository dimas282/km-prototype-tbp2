import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-0.5">
      <Globe className="h-4 w-4 text-muted-foreground ml-2" />
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        className={`h-7 px-2.5 text-xs font-medium ${
          language === 'en' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        onClick={() => setLanguage('en')}
      >
        EN
      </Button>
      <Button
        variant={language === 'id' ? 'default' : 'ghost'}
        size="sm"
        className={`h-7 px-2.5 text-xs font-medium ${
          language === 'id' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        onClick={() => setLanguage('id')}
      >
        ID
      </Button>
    </div>
  );
}
