import { FileText, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { useRole } from '@/contexts/RoleContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function StatsOverview() {
  const { currentRole } = useRole();
  const { t } = useLanguage();

  const globalStats = [
    { label: t.stats.totalDocuments, value: '2,847', icon: FileText, change: '+12%', color: 'text-primary' },
    { label: t.stats.activeSMEs, value: '89', icon: Users, change: '+3', color: 'text-role-sme' },
    { label: t.stats.questionsAnswered, value: '1,234', icon: MessageSquare, change: '+8%', color: 'text-status-success' },
    { label: t.stats.monthlyViews, value: '45.2K', icon: TrendingUp, change: '+15%', color: 'text-status-info' },
  ];

  const adminStats = [
    { label: t.stats.pendingApprovals, value: '12', icon: FileText, change: '-3', color: 'text-status-warning' },
    { label: t.stats.activeSMEs, value: '89', icon: Users, change: '+3', color: 'text-role-sme' },
    { label: t.stats.openTickets, value: '7', icon: MessageSquare, change: '-2', color: 'text-status-success' },
    { label: t.stats.systemHealth, value: '99.9%', icon: TrendingUp, change: t.common.stable, color: 'text-status-success' },
  ];

  const smeStats = [
    { label: t.stats.pendingReviews, value: '5', icon: FileText, change: '+2', color: 'text-status-warning' },
    { label: t.stats.yourDocuments, value: '47', icon: FileText, change: '+1', color: 'text-primary' },
    { label: t.stats.openQuestions, value: '3', icon: MessageSquare, change: t.common.new, color: 'text-role-sme' },
    { label: t.stats.domainScore, value: '4.8', icon: TrendingUp, change: '+0.2', color: 'text-status-success' },
  ];

  const stats = currentRole === 'admin' ? adminStats : currentRole === 'sme' ? smeStats : globalStats;

  return (
    <div className="card-surface p-5 animate-slide-up">
      <h3 className="font-semibold text-foreground mb-4">{t.stats.totalDocuments.split(' ')[0]} Overview</h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div 
            key={stat.label} 
            className="p-3 rounded-lg border border-border bg-card hover:bg-accent/30 transition-colors"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className={`text-xs font-medium ${
                stat.change.startsWith('+') ? 'text-status-success' : 
                stat.change.startsWith('-') ? 'text-destructive' : 
                'text-muted-foreground'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-xl font-semibold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1 truncate">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
