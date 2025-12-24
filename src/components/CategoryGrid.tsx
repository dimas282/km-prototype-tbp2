import { 
  Ruler, 
  ShieldCheck, 
  Truck, 
  Cog,
  Monitor,
  Users,
  FileSignature,
  AlertTriangle,
  TrendingUp,
  ClipboardList,
  Handshake,
  Scale,
  Wallet,
  BarChart3,
  Building2,
  Rocket,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { departments } from '@/data/departmentsData';

const categoryIcons: Record<string, any> = {
  'design-engineering': Ruler,
  'qhse': ShieldCheck,
  'logistics': Truck,
  'equipment': Cog,
  'it': Monitor,
  'hcd': Users,
  'corporate-secretary': Briefcase,
  'risk-integration': AlertTriangle,
  'marketing': TrendingUp,
  'estimation': ClipboardList,
  'project': ClipboardList,
  'customer-care': Handshake,
  'legal': Scale,
  'accounting': Wallet,
  'project-control': BarChart3,
  'property': Building2,
  'digital-transformation': Rocket,
};

const categoryColors: Record<string, string> = {
  'design-engineering': 'bg-blue-500/10 text-blue-600',
  'qhse': 'bg-red-500/10 text-red-600',
  'logistics': 'bg-amber-500/10 text-amber-600',
  'equipment': 'bg-slate-500/10 text-slate-600',
  'it': 'bg-cyan-500/10 text-cyan-600',
  'hcd': 'bg-purple-500/10 text-purple-600',
  'corporate-secretary': 'bg-indigo-500/10 text-indigo-600',
  'risk-integration': 'bg-orange-500/10 text-orange-600',
  'marketing': 'bg-pink-500/10 text-pink-600',
  'estimation': 'bg-teal-500/10 text-teal-600',
  'project': 'bg-emerald-500/10 text-emerald-600',
  'customer-care': 'bg-rose-500/10 text-rose-600',
  'legal': 'bg-violet-500/10 text-violet-600',
  'accounting': 'bg-lime-500/10 text-lime-600',
  'project-control': 'bg-sky-500/10 text-sky-600',
  'property': 'bg-stone-500/10 text-stone-600',
  'digital-transformation': 'bg-fuchsia-500/10 text-fuchsia-600',
};

export function CategoryGrid() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleCategoryClick = (departmentId: string) => {
    navigate(`/explorer?department=${departmentId}`);
  };

  const handleViewAll = () => {
    navigate('/explorer');
  };

  return (
    <section className="py-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{t.categories.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t.categories.subtitle}</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary hover:text-primary-hover"
          onClick={handleViewAll}
        >
          {t.categories.viewAll} <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {departments.map((dept) => {
          const Icon = categoryIcons[dept.id] || ClipboardList;
          const colorClass = categoryColors[dept.id] || 'bg-gray-500/10 text-gray-600';
          
          return (
            <button
              key={dept.id}
              onClick={() => handleCategoryClick(dept.id)}
              className="card-surface-hover p-4 text-left group"
            >
              <div className={`inline-flex p-2.5 rounded-lg ${colorClass} mb-3 transition-transform group-hover:scale-105`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">
                {language === 'id' ? dept.nameId : dept.name}
              </h3>
              <p className="text-xs text-muted-foreground">{dept.itemCount} {t.categories.items}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
