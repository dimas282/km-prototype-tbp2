import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleProvider } from "@/contexts/RoleContext";
import { ContributionProvider } from "@/contexts/ContributionContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import KnowledgeExplorer from "./pages/KnowledgeExplorer";
import ContributeKnowledge from "./pages/ContributeKnowledge";
import ReviewDashboard from "./pages/ReviewDashboard";
import MySubmissions from "./pages/MySubmissions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <RoleProvider>
          <ContributionProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route 
                    path="/" 
                    element={
                      <ProtectedRoute>
                        <Index />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/explorer" 
                    element={
                      <ProtectedRoute>
                        <KnowledgeExplorer />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/contribute" 
                    element={
                      <ProtectedRoute>
                        <ContributeKnowledge />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/review" 
                    element={
                      <ProtectedRoute>
                        <ReviewDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/my-submissions" 
                    element={
                      <ProtectedRoute>
                        <MySubmissions />
                      </ProtectedRoute>
                    } 
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ContributionProvider>
        </RoleProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
