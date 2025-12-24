import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Users, Tag, BookOpen, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { knowledgeAssets, departments } from '@/data/departmentsData';
import heroBackground from '@/assets/hero-background.jpg';

export function HeroSearch() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Filter knowledge assets based on query
  const filteredAssets = query.length >= 2
    ? knowledgeAssets.filter((asset) =>
        asset.title.toLowerCase().includes(query.toLowerCase()) ||
        asset.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        asset.author.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  // Filter departments based on query
  const filteredDepartments = query.length >= 2
    ? departments.filter((dept) =>
        dept.name.toLowerCase().includes(query.toLowerCase()) ||
        dept.nameId.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 2)
    : [];

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/explorer?search=${encodeURIComponent(query)}`);
    }
  };

  const handleAssetClick = (asset: typeof knowledgeAssets[0]) => {
    navigate(`/explorer?department=${asset.department}&search=${encodeURIComponent(asset.title)}`);
    setShowSuggestions(false);
  };

  const handleDepartmentClick = (deptId: string) => {
    navigate(`/explorer?department=${deptId}`);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const hasSuggestions = filteredAssets.length > 0 || filteredDepartments.length > 0;

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Company Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
            <span className="text-sm font-medium text-primary">{t.hero.companyBadge}</span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            {t.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
            {t.hero.subtitle}
          </p>

          {/* Search Bar */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.hero.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={handleKeyDown}
                className="h-14 pl-12 pr-24 text-base border-2 border-border bg-card rounded-xl shadow-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  className="h-10 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg"
                  onClick={handleSearch}
                >
                  {t.hero.search}
                </Button>
              </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && hasSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-elevated overflow-hidden z-10 animate-scale-in">
                <div className="p-2">
                  {/* Department Results */}
                  {filteredDepartments.length > 0 && (
                    <>
                      <p className="text-xs text-muted-foreground px-3 py-2">
                        {language === 'en' ? 'Departments' : 'Departemen'}
                      </p>
                      {filteredDepartments.map((dept) => (
                        <button
                          key={dept.id}
                          onClick={() => handleDepartmentClick(dept.id)}
                          className="flex items-center gap-3 w-full px-3 py-2.5 text-left text-sm hover:bg-accent rounded-lg transition-colors"
                        >
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span className="text-foreground">
                            {language === 'id' ? dept.nameId : dept.name}
                          </span>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {dept.itemCount} {language === 'en' ? 'items' : 'item'}
                          </span>
                        </button>
                      ))}
                    </>
                  )}

                  {/* Knowledge Asset Results */}
                  {filteredAssets.length > 0 && (
                    <>
                      <p className="text-xs text-muted-foreground px-3 py-2">
                        {language === 'en' ? 'Knowledge Assets' : 'Aset Pengetahuan'}
                      </p>
                      {filteredAssets.map((asset) => (
                        <button
                          key={asset.id}
                          onClick={() => handleAssetClick(asset)}
                          className="flex items-center gap-3 w-full px-3 py-2.5 text-left text-sm hover:bg-accent rounded-lg transition-colors"
                        >
                          <FileText className="h-4 w-4 text-destructive" />
                          <div className="flex-1 min-w-0">
                            <span className="text-foreground block truncate">{asset.title}</span>
                            <span className="text-xs text-muted-foreground">{asset.author}</span>
                          </div>
                          <span className="ml-auto text-xs text-muted-foreground capitalize">{asset.type}</span>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* No Results */}
            {showSuggestions && query.length >= 2 && !hasSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-elevated overflow-hidden z-10 animate-scale-in">
                <div className="p-4 text-center text-muted-foreground text-sm">
                  {language === 'en' ? 'No results found' : 'Tidak ada hasil ditemukan'}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-sm text-muted-foreground">{t.hero.popular}</span>
            {t.hero.popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  navigate(`/explorer?search=${encodeURIComponent(tag)}`);
                }}
                className="text-sm text-primary hover:text-primary-hover hover:underline transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
