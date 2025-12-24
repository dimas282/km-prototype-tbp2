import { MessageSquare, Users, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';

const recentQuestions = [
  { 
    id: '1', 
    question: 'What are the updated safety protocols for hazardous materials handling?',
    askedBy: 'John D.',
    answeredBy: 'Dr. Sarah Mitchell',
    status: 'answered',
    domain: 'Safety'
  },
  { 
    id: '2', 
    question: 'How do I submit a change request for the engineering standards?',
    askedBy: 'Emma L.',
    answeredBy: null,
    status: 'pending',
    domain: 'Engineering'
  },
  { 
    id: '3', 
    question: 'Where can I find the latest IT security training materials?',
    askedBy: 'Mike T.',
    answeredBy: 'Alex Johnson',
    status: 'answered',
    domain: 'IT & Technology'
  },
];

const featuredExperts = [
  { name: 'Dr. Sarah Mitchell', domain: 'Safety & Compliance', questions: 156 },
  { name: 'James Chen', domain: 'Engineering', questions: 89 },
  { name: 'Lisa Wong', domain: 'HR & Policy', questions: 67 },
];

export function AskExpertSection() {
  const { t } = useLanguage();

  return (
    <section className="card-surface p-5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t.askExpert.title}</h3>
            <p className="text-xs text-muted-foreground">{t.askExpert.subtitle}</p>
          </div>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary-hover text-primary-foreground">
          {t.askExpert.askQuestion} <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Recent Questions */}
      <div className="space-y-3 mb-5">
        {recentQuestions.map((q) => (
          <div key={q.id} className="p-3 rounded-lg border border-border bg-card hover:bg-accent/30 transition-colors cursor-pointer">
            <div className="flex items-start gap-2">
              {q.status === 'answered' ? (
                <CheckCircle2 className="h-4 w-4 text-status-success flex-shrink-0 mt-0.5" />
              ) : (
                <Clock className="h-4 w-4 text-status-warning flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground line-clamp-1">{q.question}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{t.askExpert.by} {q.askedBy}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs text-primary">{q.domain}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Experts */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t.askExpert.featuredExperts}</p>
        </div>
        <div className="space-y-2">
          {featuredExperts.map((expert, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  {expert.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{expert.name}</p>
                <p className="text-xs text-muted-foreground truncate">{expert.domain}</p>
              </div>
              <span className="text-xs text-muted-foreground">{expert.questions} Q&A</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
