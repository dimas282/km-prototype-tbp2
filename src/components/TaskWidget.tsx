import { useNavigate } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContribution } from '@/contexts/ContributionContext';
import { Task } from '@/types/roles';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  Upload,
  MessageSquare,
  Users,
  FileCheck,
  FolderTree,
  Calendar,
  PenLine,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TaskWidget() {
  const { currentRole } = useRole();
  const { t } = useLanguage();
  const { getContributionsByStatus } = useContribution();
  const navigate = useNavigate();

  const pendingCount = getContributionsByStatus('pending').length;

  const adminTasks: Task[] = [
    { id: '1', title: t.tasks.reviewTaxonomy, description: `3 ${t.tasks.pendingCategoryChanges}`, type: 'pending', count: 3 },
    { id: '2', title: t.tasks.assignSME, description: t.tasks.newSMERequest, type: 'urgent', count: 1 },
    { id: '3', title: t.tasks.approveCoP, description: t.tasks.engineeringCoPQ4, type: 'pending', count: 2 },
  ];

  const smeTasks: Task[] = [
    { id: '1', title: t.tasks.reviewContributions, description: t.tasks.pendingSubmissions, type: 'urgent', count: pendingCount, href: '/review' },
    { id: '2', title: t.tasks.answerExpertQuestions, description: t.tasks.openThreads, type: 'pending', count: 3 },
    { id: '3', title: t.tasks.updateDomainKnowledge, description: t.tasks.lastUpdated, type: 'info' },
  ];

  const userTasks: Task[] = [
    { id: '1', title: t.tasks.completeDraft, description: t.tasks.safetyProcedureUpdate, type: 'pending', count: 1, href: '/my-submissions' },
    { id: '2', title: t.tasks.checkAnswered, description: t.tasks.questionsAnswered, type: 'info', count: 2 },
    { id: '3', title: t.tasks.joinUpcoming, description: t.tasks.meetupTomorrow, type: 'info' },
  ];

  const adminActions = [
    { icon: FolderTree, label: t.tasks.manageTaxonomies, color: 'bg-primary/10 text-primary', href: '/explorer' },
    { icon: Users, label: t.tasks.manageSMEs, color: 'bg-role-sme/10 text-role-sme' },
    { icon: Calendar, label: t.tasks.manageCoP, color: 'bg-status-info/10 text-status-info' },
    { icon: FileCheck, label: t.tasks.approvalQueue, color: 'bg-status-success/10 text-status-success', href: '/review' },
  ];

  const smeActions = [
    { icon: FileCheck, label: t.tasks.approvalQueue, color: 'bg-primary/10 text-primary', href: '/review' },
    { icon: MessageSquare, label: t.tasks.answerQuestions, color: 'bg-role-sme/10 text-role-sme' },
    { icon: Upload, label: t.tasks.uploadExpert, color: 'bg-status-success/10 text-status-success', href: '/contribute' },
  ];

  const userActions = [
    { icon: PenLine, label: t.tasks.contributeKnowledge, color: 'bg-primary/10 text-primary', href: '/contribute' },
    { icon: Users, label: t.tasks.exploreCoP, color: 'bg-status-info/10 text-status-info', href: '/cop' },
    { icon: MessageSquare, label: t.tasks.askAnExpert, color: 'bg-role-sme/10 text-role-sme' },
  ];

  const tasks = currentRole === 'admin' ? adminTasks : currentRole === 'sme' ? smeTasks : userTasks;
  const actions = currentRole === 'admin' ? adminActions : currentRole === 'sme' ? smeActions : userActions;

  const roleTitle = {
    admin: t.tasks.adminDashboard,
    sme: t.tasks.expertDashboard,
    user: t.tasks.myDashboard,
  };

  const getTaskIcon = (type: Task['type']) => {
    switch (type) {
      case 'urgent': return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'pending': return <Clock className="h-4 w-4 text-status-warning" />;
      default: return <CheckCircle2 className="h-4 w-4 text-status-success" />;
    }
  };

  return (
    <div className="card-surface p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-foreground text-lg">{roleTitle[currentRole]}</h3>
      </div>

      {/* Quick Actions - Square Grid Layout */}
      <div className={`grid gap-4 mb-6 ${actions.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => action.href && navigate(action.href)}
            className="card-surface-hover p-4 text-center group flex flex-col items-center"
          >
            <div className={`inline-flex p-3 rounded-xl ${action.color} mb-3 transition-transform group-hover:scale-105`}>
              <action.icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium text-foreground leading-tight">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Pending Tasks */}
      <div className="border-t border-border pt-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          {t.tasks.pendingTasks}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => task.href && navigate(task.href)}
              className="task-item cursor-pointer"
            >
              {getTaskIcon(task.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                <p className="text-xs text-muted-foreground truncate">{task.description}</p>
              </div>
              {task.count && task.count > 0 && (
                <span className="flex-shrink-0 h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {task.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
