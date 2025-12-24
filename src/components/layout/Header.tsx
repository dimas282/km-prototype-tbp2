import { Bell, HelpCircle, Settings, LogOut, FolderTree } from 'lucide-react';
import { useRole } from '@/contexts/RoleContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const { currentUser, currentRole } = useRole();
  const { logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const roleLabel = {
    admin: t.roles.admin,
    sme: t.roles.sme,
    user: t.roles.user,
  };

  const roleBadgeClass = {
    admin: 'badge-role-admin',
    sme: 'badge-role-sme',
    user: 'badge-role-user',
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">T</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">{t.header.brand}</h1>
              <p className="text-xs text-muted-foreground">{t.header.subtitle}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/explorer')}
              className={isActive('/explorer') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}
            >
              <FolderTree className="h-4 w-4 mr-1" />
              {t.header.browse}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              {t.header.communities}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              {t.header.askExpert}
            </Button>
            {currentRole === 'admin' && (
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                {t.header.admin}
              </Button>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
            </Button>

            {/* Help */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </Button>

            {/* Logout */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              title={t.header.logout}
            >
              <LogOut className="h-5 w-5 text-muted-foreground" />
            </Button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-2 border-l border-border">
              <div className="hidden lg:block text-right">
                <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
                <span className={roleBadgeClass[currentRole]}>{roleLabel[currentRole]}</span>
              </div>
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
