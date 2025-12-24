import { FileText, Download, Eye, MoreVertical, CheckCircle, Shield, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { knowledgeAssets } from '@/data/departmentsData';

interface KnowledgeListProps {
  departmentId: string | null;
  topicId: string | null;
  viewMode: 'grid' | 'list';
  canManage: boolean;
  language: 'en' | 'id';
  searchQuery?: string;
  statusFilter?: string;
  documentTypeFilter?: string;
}

const statusConfig = {
  official: {
    label: { en: 'Official', id: 'Resmi' },
    icon: Shield,
    className: 'bg-status-success/10 text-status-success border-status-success/20',
  },
  validated: {
    label: { en: 'Validated', id: 'Tervalidasi' },
    icon: CheckCircle,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  reference: {
    label: { en: 'Reference', id: 'Referensi' },
    icon: BookOpen,
    className: 'bg-status-warning/10 text-status-warning border-status-warning/20',
  },
};

export function KnowledgeList({
  departmentId,
  topicId,
  viewMode,
  canManage,
  language,
  searchQuery = '',
  statusFilter = 'all',
  documentTypeFilter = 'all',
}: KnowledgeListProps) {
  const { t } = useLanguage();

  // Filter assets based on selection and search/filters
  const filteredAssets = knowledgeAssets.filter((asset) => {
    // Department filter
    if (departmentId && asset.department !== departmentId) return false;
    
    // Topic filter
    if (topicId && asset.documentType !== topicId.split('-').slice(1).join('-')) return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = asset.title.toLowerCase().includes(query);
      const matchesTags = asset.tags.some(tag => tag.toLowerCase().includes(query));
      const matchesAuthor = asset.author.toLowerCase().includes(query);
      if (!matchesTitle && !matchesTags && !matchesAuthor) return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && asset.type !== statusFilter) return false;
    
    // Document type filter
    if (documentTypeFilter !== 'all' && asset.documentType !== documentTypeFilter) return false;
    
    return true;
  });

  // Show prompt to select department only if no search/filters are active
  if (!departmentId && !searchQuery && statusFilter === 'all' && documentTypeFilter === 'all') {
    return (
      <Card className="h-64 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">
            {t.explorer?.selectDepartment || 'Select a department to view knowledge assets'}
          </p>
          <p className="text-sm mt-1">
            {t.explorer?.browseHint || 'Browse the department tree on the left to explore topics'}
          </p>
        </div>
      </Card>
    );
  }

  if (filteredAssets.length === 0) {
    return (
      <Card className="h-64 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">
            {t.explorer?.noAssets || 'No knowledge assets found'}
          </p>
          <p className="text-sm mt-1">
            {t.explorer?.noAssetsHint || 'Try selecting a different topic or department'}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div>
      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {t.explorer?.showing || 'Showing'}{' '}
          <span className="font-medium text-foreground">{filteredAssets.length}</span>{' '}
          {t.explorer?.assets || 'assets'}
        </p>
      </div>

      {/* Grid/List View */}
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          : "space-y-3"
      )}>
        {filteredAssets.map((asset) => {
          const status = statusConfig[asset.type];
          const StatusIcon = status.icon;

          if (viewMode === 'list') {
            return (
              <Card key={asset.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* File icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-destructive" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground truncate">
                          {language === 'id' && 'titleId' in asset ? (asset as any).titleId : asset.title}
                        </h4>
                        <Badge variant="outline" className={cn("text-xs", status.className)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label[language]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {asset.author} • {asset.date}
                      </p>
                      <div className="flex gap-1 mt-2">
                        {asset.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      {canManage && (
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }

          return (
            <Card key={asset.id} className="hover:shadow-md transition-shadow group">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-destructive" />
                  </div>
                  <Badge variant="outline" className={cn("text-xs", status.className)}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label[language]}
                  </Badge>
                </div>

                {/* Title */}
                <h4 className="font-medium text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
                  {language === 'id' && 'titleId' in asset ? (asset as any).titleId : asset.title}
                </h4>

                {/* Meta */}
                <p className="text-xs text-muted-foreground mb-3">
                  {asset.author} • {asset.date}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {asset.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {asset.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{asset.tags.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    {t.explorer?.view || 'View'}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  {canManage && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
