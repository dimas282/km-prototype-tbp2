import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/Footer';
import { HeroSearch } from '@/components/HeroSearch';
import { CategoryGrid } from '@/components/CategoryGrid';
import { KnowledgeSection } from '@/components/KnowledgeSection';
import { TaskWidget } from '@/components/TaskWidget';
import { AskExpertSection } from '@/components/AskExpertSection';
import { CoPHighlights } from '@/components/CoPHighlights';
import { RoleProvider } from '@/contexts/RoleContext';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Search Section */}
        <HeroSearch />

        {/* Main Content */}
        <div className="container mx-auto px-4 lg:px-8 pb-12">
          {/* Dashboard Widget - Now below search bar */}
          <TaskWidget />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Main Content - 2/3 */}
            <div className="lg:col-span-2 space-y-2">
              <CategoryGrid />
              <CoPHighlights />
            </div>

            {/* Sidebar - 1/3 */}
            <div className="space-y-6">
              <KnowledgeSection />
              <AskExpertSection />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const Index = () => {
  return (
    <RoleProvider>
      <HomePage />
    </RoleProvider>
  );
};

export default Index;
