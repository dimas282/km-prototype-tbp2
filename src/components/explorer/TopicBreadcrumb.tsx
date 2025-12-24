import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface TopicBreadcrumbProps {
  breadcrumbs: { id: string; name: string }[];
  onNavigate: (index: number) => void;
}

export function TopicBreadcrumb({ breadcrumbs, onNavigate }: TopicBreadcrumbProps) {
  const { t } = useLanguage();

  return (
    <nav className="flex items-center gap-1 text-sm overflow-x-auto pb-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate(-1)}
        className="h-8 px-2 text-muted-foreground hover:text-foreground"
      >
        <Home className="h-4 w-4 mr-1" />
        {t.explorer?.allDepartments || 'All Departments'}
      </Button>

      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.id} className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate(index)}
            className={`h-8 px-2 ${
              index === breadcrumbs.length - 1
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {crumb.name}
          </Button>
        </div>
      ))}
    </nav>
  );
}
