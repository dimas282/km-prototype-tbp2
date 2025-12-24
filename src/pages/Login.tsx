import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Building2, AlertCircle } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error === 'invalidCredentials' ? t.login.invalidCredentials : result.error || 'Error');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t.login.companyName}</h2>
              <p className="text-sm text-white/80">{t.login.portalName}</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            {t.hero.title}
          </h1>
          <p className="text-lg text-white/90 max-w-md">
            {t.hero.subtitle}
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Language Switcher */}
        <div className="flex justify-end p-4">
          <LanguageSwitcher />
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Building2 className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-lg font-semibold text-foreground">{t.login.companyName}</h2>
              <p className="text-sm text-muted-foreground">{t.login.portalName}</p>
            </div>

            {/* Form Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold text-foreground">{t.login.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{t.login.subtitle}</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    {t.login.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.login.emailPlaceholder}
                    className="h-11"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    {t.login.password}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.login.passwordPlaceholder}
                    className="h-11"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  t.login.signingIn
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    {t.login.signIn}
                  </>
                )}
              </Button>
            </form>

            {/* Demo Accounts Info */}
            <div className="mt-8 p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-xs font-medium text-muted-foreground mb-3">Demo Accounts:</p>
              <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-role-admin">Admin:</span>
                  <code className="text-foreground">admin1@km.local / Admin123!</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-role-sme">SME:</span>
                  <code className="text-foreground">sme1@km.local / Sme123!</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-role-user">User:</span>
                  <code className="text-foreground">user1@km.local / User123!</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
