import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/Footer';
import { DepartmentTree } from '@/components/explorer/DepartmentTree';
import { KnowledgeList } from '@/components/explorer/KnowledgeList';
import { TopicBreadcrumb } from '@/components/explorer/TopicBreadcrumb';
import { ExplorerSearchFilter } from '@/components/explorer/ExplorerSearchFilter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRole } from '@/contexts/RoleContext';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Settings, Plus } from 'lucide-react';

export interface Department {
  id: string;
  name: string;
  nameId: string;
  icon: string;
  owner: string;
  itemCount: number;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  nameId: string;
  itemCount: number;
  children?: Topic[];
}

export interface KnowledgeAsset {
  id: string;
  title: string;
  type: 'official' | 'validated' | 'reference';
  department: string;
  topic: string;
  author: string;
  date: string;
  fileType: 'pdf';
  tags: string[];
}

export default function KnowledgeExplorer() {
  const { t, language } = useLanguage();
  const { currentRole } = useRole();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    searchParams.get('department')
  );
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string }[]>([]);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState('all');
  const [documentTypeFilter, setDocumentTypeFilter] = useState('all');

  const isAdmin = currentRole === 'admin';
  const isSME = currentRole === 'sme';
  const canManage = isAdmin || isSME;

  // Sync URL params with state
  useEffect(() => {
    const deptFromUrl = searchParams.get('department');
    const searchFromUrl = searchParams.get('search');
    
    if (deptFromUrl && deptFromUrl !== selectedDepartment) {
      setSelectedDepartment(deptFromUrl);
    }
    if (searchFromUrl && searchFromUrl !== searchQuery) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  const handleDepartmentSelect = (deptId: string, deptName: string) => {
    setSelectedDepartment(deptId);
    setSelectedTopic(null);
    setBreadcrumbs([{ id: deptId, name: deptName }]);
    setSearchParams({ department: deptId });
  };

  const handleTopicSelect = (topicId: string, topicName: string, path: { id: string; name: string }[]) => {
    setSelectedTopic(topicId);
    setBreadcrumbs(path);
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setSelectedDepartment(null);
      setSelectedTopic(null);
      setBreadcrumbs([]);
      setSearchParams({});
    } else if (index === 0) {
      setSelectedTopic(null);
      setBreadcrumbs(breadcrumbs.slice(0, 1));
    } else {
      setSelectedTopic(breadcrumbs[index].id);
      setBreadcrumbs(breadcrumbs.slice(0, index + 1));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t.explorer?.title || 'Knowledge Explorer'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t.explorer?.subtitle || 'Browse knowledge by department and topic'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Admin/SME Actions */}
            {canManage && (
              <>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  {t.explorer?.manageTopics || 'Manage Topics'}
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.explorer?.addKnowledge || 'Add Knowledge'}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <TopicBreadcrumb 
          breadcrumbs={breadcrumbs} 
          onNavigate={handleBreadcrumbClick}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
          {/* Department/Topic Tree - Sidebar */}
          <div className="lg:col-span-1">
            <DepartmentTree
              selectedDepartment={selectedDepartment}
              selectedTopic={selectedTopic}
              onDepartmentSelect={handleDepartmentSelect}
              onTopicSelect={handleTopicSelect}
              language={language}
            />
          </div>

          {/* Knowledge List - Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter Bar */}
            <ExplorerSearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              documentTypeFilter={documentTypeFilter}
              onDocumentTypeChange={setDocumentTypeFilter}
            />
            
            <KnowledgeList
              departmentId={selectedDepartment}
              topicId={selectedTopic}
              viewMode={viewMode}
              canManage={canManage}
              language={language}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              documentTypeFilter={documentTypeFilter}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
