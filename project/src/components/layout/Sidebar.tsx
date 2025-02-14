import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  BarChart3,
  Layout,
  LineChart,
  Settings,
  Sparkles,
  Target,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`relative border-r border-border/50 bg-gradient-to-b from-background to-background/95 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 z-50 h-8 w-8 rounded-full border bg-background"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="flex h-14 items-center gap-2 border-b border-border/50 px-4">
        <Sparkles className="h-6 w-6 text-primary animate-pulse" />
        {!isCollapsed && (
          <span className="font-semibold tracking-tight">Think Bot</span>
        )}
      </div>
      
      <ScrollArea className="h-[calc(100vh-3.5rem)] px-4 py-6">
        <div className="space-y-6">
          <div>
            {!isCollapsed && (
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Recent Projects
              </h3>
            )}
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 transition-colors hover:text-primary ${
                  isCollapsed ? 'px-2' : ''
                }`}
              >
                <Layout className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && "Market Analysis Tool"}
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 bg-accent ${
                  isCollapsed ? 'px-2' : ''
                }`}
              >
                <Target className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && "Customer Feedback Hub"}
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 ${
                  isCollapsed ? 'px-2' : ''
                }`}
              >
                <Users className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && "Team Collaboration"}
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            {!isCollapsed && (
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Analytics
              </h3>
            )}
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 transition-colors hover:text-primary ${
                  isCollapsed ? 'px-2' : ''
                }`}
              >
                <BarChart3 className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && "Performance"}
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 transition-colors hover:text-primary ${
                  isCollapsed ? 'px-2' : ''
                }`}
              >
                <LineChart className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && "Trends"}
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 transition-colors hover:text-primary ${
                  isCollapsed ? 'px-2' : ''
                }`}
              >
                <Settings className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && "Settings"}
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}