

  import { useState } from 'react';
  import { Sidebar } from '@/components/layout/Sidebar';
  import { ScoreCard } from '@/components/validation/ScoreCard';
  import { UploadSection } from '@/components/validation/UploadSection';
  import { Recommendations } from '@/components/validation/Recommendations';
  import { NewValidationButton } from '@/components/validation/NewValidationButton';
  import { TooltipProvider } from '@/providers/TooltipProvider';
  import { ChatInterface } from '@/components/chat/ChatInterface';
  import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
  import { LayoutDashboard, MessageSquare } from 'lucide-react';
  
  // Define interfaces for type safety
  interface ValidationScores {
    validationScore: number;
    uniquenessScore: number;
    marketTrendScore: number;
    userEngagementScore: number;
  }
  
  function App() {
    // State for managing scores
    const [scores, setScores] = useState<ValidationScores>({
      validationScore: 0,
      uniquenessScore: 0,
      marketTrendScore: 0,
      userEngagementScore: 0
    });
    
    const [showResults, setShowResults] = useState(false);
    const [activeTab, setActiveTab] = useState('analysis');
  
    // Handler for form/file submission success
    const handleSubmissionSuccess = (data: ValidationScores) => {
      setScores({
        validationScore: data.validationScore,
        uniquenessScore: data.uniquenessScore,
        marketTrendScore: data.marketTrendScore,
        userEngagementScore: data.userEngagementScore
      });
      setShowResults(true);
    };
  
    // Handler for starting a new validation
    const handleNewValidation = () => {
      setShowResults(false);
      setScores({
        validationScore: 0,
        uniquenessScore: 0,
        marketTrendScore: 0,
        userEngagementScore: 0
      });
    };
  
    return (
      <TooltipProvider>
        <div className="flex min-h-screen bg-background text-foreground">
          <Sidebar />
          
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto max-w-7xl p-4 lg:p-8">
              {/* Interface Toggle */}
              <div className="mb-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="analysis" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Analysis Dashboard
                    </TabsTrigger>
                    <TabsTrigger value="chat" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      AI Assistant
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
  
              {activeTab === 'analysis' ? (
                <>
                  <div className="mb-6 lg:mb-8">
                    <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                      Project Validation
                    </h1>
                    <p className="text-muted-foreground">
                      Analyze and validate your project metrics
                    </p>
                  </div>
  
                  <div className="grid gap-4 md:gap-6">
                    {/* Score and Upload Section */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <ScoreCard 
                        progress={scores.validationScore}
                        uniqueness={scores.uniquenessScore}
                        marketTrend={scores.marketTrendScore}
                        userEngagement={scores.userEngagementScore}
                      />
                      <UploadSection onSubmitSuccess={handleSubmissionSuccess} />
                    </div>
  
                    {/* Recommendations Section */}
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Recommendations />
                    </div>
                  </div>
                </>
              ) : (
                <ChatInterface />
              )}
            </div>
  
            {/* New Validation Button */}
            {showResults && activeTab === 'analysis' && (
              <NewValidationButton onClick={handleNewValidation} />
            )}
          </main>
        </div>
      </TooltipProvider>
    );
  }
  
  export default App;