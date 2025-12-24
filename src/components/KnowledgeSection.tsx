import { FileText, Video, BookOpen, File, Clock, Star, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const recommendedKnowledge = [
  { id: '1', title: 'Safety Procedures Handbook 2024', category: 'Safety', author: 'Dr. Sarah Mitchell', date: 'Dec 5, 2024', type: 'document', tags: ['compliance', 'procedures'] },
  { id: '2', title: 'Engineering Standards Overview', category: 'Engineering', author: 'James Chen', date: 'Dec 4, 2024', type: 'video', tags: ['standards', 'best-practices'] },
  { id: '3', title: 'HR Policy Updates Q4', category: 'Human Resources', author: 'Lisa Wong', date: 'Dec 3, 2024', type: 'document', tags: ['policy', 'hr'] },
  { id: '4', title: 'IT Security Guidelines', category: 'IT & Technology', author: 'Mike Anderson', date: 'Dec 2, 2024', type: 'sop', tags: ['security', 'it'] },
];

const recentKnowledge = [
  { id: '5', title: 'New Compliance Requirements 2025', category: 'Compliance', author: 'Legal Team', date: 'Dec 8, 2024', type: 'document', tags: ['legal', 'compliance'] },
  { id: '6', title: 'Equipment Maintenance Checklist', category: 'Operations', author: 'Operations Dept.', date: 'Dec 7, 2024', type: 'sop', tags: ['maintenance', 'equipment'] },
  { id: '7', title: 'Remote Work Policy Update', category: 'Human Resources', author: 'HR Team', date: 'Dec 6, 2024', type: 'document', tags: ['remote', 'policy'] },
  { id: '8', title: 'Data Protection Best Practices', category: 'IT & Technology', author: 'Security Team', date: 'Dec 5, 2024', type: 'article', tags: ['data', 'privacy'] },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video': return <Video className="h-4 w-4" />;
    case 'sop': return <BookOpen className="h-4 w-4" />;
    case 'article': return <File className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'video': return 'bg-purple-500/10 text-purple-600';
    case 'sop': return 'bg-blue-500/10 text-blue-600';
    case 'article': return 'bg-green-500/10 text-green-600';
    default: return 'bg-amber-500/10 text-amber-600';
  }
};

interface KnowledgeCardProps {
  item: typeof recommendedKnowledge[0];
}

function KnowledgeCard({ item }: KnowledgeCardProps) {
  return (
    <div className="card-surface-hover p-4 group cursor-pointer">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${getTypeColor(item.type)} flex-shrink-0`}>
          {getTypeIcon(item.type)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2">
            {item.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground">{item.author}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {item.date}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function KnowledgeSection() {
  const { t } = useLanguage();

  return (
    <section className="card-surface p-5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <Tabs defaultValue="recommended" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="recommended" className="text-sm gap-1.5">
              <Star className="h-3.5 w-3.5" />
              {t.knowledge.recommended}
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-sm gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              {t.knowledge.recentlyAdded}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="recommended" className="mt-0">
          <div className="space-y-3">
            {recommendedKnowledge.map((item) => (
              <KnowledgeCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          <div className="space-y-3">
            {recentKnowledge.map((item) => (
              <KnowledgeCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
