import { Calendar, FileText, MessageCircle, ChevronRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const events = [
  { 
    id: '1', 
    title: 'Engineering CoP Monthly Meetup',
    date: 'Dec 15, 2024',
    time: '2:00 PM EST',
    type: 'event',
    community: 'Engineering',
    attendees: 45
  },
  { 
    id: '2', 
    title: 'Safety Best Practices Q4 Report',
    date: 'Dec 12, 2024',
    type: 'publication',
    community: 'Safety',
    downloads: 128
  },
  { 
    id: '3', 
    title: 'IT Security Discussion Forum',
    date: 'Dec 18, 2024',
    type: 'discussion',
    community: 'IT & Technology',
    participants: 23
  },
];

export function CoPHighlights() {
  const { t } = useLanguage();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'publication': return <FileText className="h-4 w-4" />;
      case 'discussion': return <MessageCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'publication': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'discussion': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'event': return t.cop.event;
      case 'publication': return t.cop.publication;
      case 'discussion': return t.cop.discussion;
      default: return type;
    }
  };

  return (
    <section className="py-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{t.cop.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t.cop.subtitle}</p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
          {t.cop.viewAll} <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="card-surface-hover p-4 group cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <Badge variant="outline" className={`${getTypeColor(event.type)} text-xs capitalize`}>
                <span className="mr-1">{getTypeIcon(event.type)}</span>
                {getTypeLabel(event.type)}
              </Badge>
              <span className="text-xs text-muted-foreground">{event.date}</span>
            </div>
            <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors mb-2">
              {event.title}
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-primary font-medium">{event.community}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                {event.attendees || event.downloads || event.participants}
              </div>
            </div>
            {'time' in event && event.time && (
              <p className="text-xs text-muted-foreground mt-2">{event.time}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
