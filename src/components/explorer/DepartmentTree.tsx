import { useState } from 'react';
import { ChevronRight, ChevronDown, Building2, Folder, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { departments } from '@/data/departmentsData';

interface DepartmentTreeProps {
  selectedDepartment: string | null;
  selectedTopic: string | null;
  onDepartmentSelect: (deptId: string, deptName: string) => void;
  onTopicSelect: (topicId: string, topicName: string, path: { id: string; name: string }[]) => void;
  language: 'en' | 'id';
}

interface TopicNodeProps {
  topic: {
    id: string;
    name: string;
    nameId: string;
    itemCount: number;
    children?: any[];
  };
  depth: number;
  selectedTopic: string | null;
  onSelect: (topicId: string, topicName: string, path: { id: string; name: string }[]) => void;
  parentPath: { id: string; name: string }[];
  language: 'en' | 'id';
}

function TopicNode({ topic, depth, selectedTopic, onSelect, parentPath, language }: TopicNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = topic.children && topic.children.length > 0;
  const isSelected = selectedTopic === topic.id;
  const displayName = language === 'id' ? topic.nameId : topic.name;
  
  const currentPath = [...parentPath, { id: topic.id, name: displayName }];

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onSelect(topic.id, displayName, currentPath);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors text-left",
          "hover:bg-accent/50",
          isSelected && "bg-primary/10 text-primary font-medium",
          !isSelected && "text-foreground"
        )}
        style={{ paddingLeft: `${depth * 12 + 12}px` }}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          )
        ) : (
          <span className="w-4" />
        )}
        {isExpanded ? (
          <FolderOpen className="h-4 w-4 text-primary flex-shrink-0" />
        ) : (
          <Folder className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}
        <span className="flex-1 truncate">{displayName}</span>
        <Badge variant="secondary" className="text-xs">
          {topic.itemCount}
        </Badge>
      </button>
      
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {topic.children!.map((child) => (
            <TopicNode
              key={child.id}
              topic={child}
              depth={depth + 1}
              selectedTopic={selectedTopic}
              onSelect={onSelect}
              parentPath={currentPath}
              language={language}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function DepartmentTree({
  selectedDepartment,
  selectedTopic,
  onDepartmentSelect,
  onTopicSelect,
  language,
}: DepartmentTreeProps) {
  const { t } = useLanguage();
  const [expandedDepts, setExpandedDepts] = useState<string[]>([]);

  const toggleDepartment = (deptId: string, deptName: string) => {
    if (expandedDepts.includes(deptId)) {
      setExpandedDepts(expandedDepts.filter(id => id !== deptId));
    } else {
      setExpandedDepts([...expandedDepts, deptId]);
    }
    onDepartmentSelect(deptId, deptName);
  };

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          {t.explorer?.departments || 'Departments'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-3">
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {departments.map((dept) => {
            const isExpanded = expandedDepts.includes(dept.id);
            const isSelected = selectedDepartment === dept.id;
            const displayName = language === 'id' ? dept.nameId : dept.name;

            return (
              <div key={dept.id}>
                <button
                  onClick={() => toggleDepartment(dept.id, displayName)}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors text-left",
                    "hover:bg-accent/50 border-l-2",
                    isSelected ? "border-l-primary bg-primary/5" : "border-l-transparent",
                  )}
                >
                  {dept.topics.length > 0 ? (
                    isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )
                  ) : (
                    <span className="w-4" />
                  )}
                  <span className="text-lg">{dept.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "font-medium truncate",
                      isSelected ? "text-primary" : "text-foreground"
                    )}>
                      {displayName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {dept.owner}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {dept.itemCount}
                  </Badge>
                </button>

                {/* Topics */}
                {isExpanded && dept.topics.length > 0 && (
                  <div className="bg-muted/30 py-1">
                    {dept.topics.map((topic) => (
                      <TopicNode
                        key={topic.id}
                        topic={topic}
                        depth={1}
                        selectedTopic={selectedTopic}
                        onSelect={(topicId, topicName, path) => {
                          onTopicSelect(topicId, topicName, [
                            { id: dept.id, name: displayName },
                            ...path
                          ]);
                        }}
                        parentPath={[]}
                        language={language}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
