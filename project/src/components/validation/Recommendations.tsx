import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const recommendations = [
  {
    title: 'Improve Market Research',
    description: 'Consider conducting more in-depth market research to validate your assumptions.',
    priority: 'high',
  },
  {
    title: 'Enhance User Engagement',
    description: 'Focus on implementing features that drive user interaction and retention.',
    priority: 'medium',
  },
  {
    title: 'Optimize Performance',
    description: 'Look into ways to improve the overall performance and efficiency of your project.',
    priority: 'low',
  },
];

export function Recommendations() {
  return (
    <Card className="p-4 lg:p-6">
      <div className="mb-4 lg:mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg lg:text-xl font-semibold">Recommendations</h2>
          <p className="text-sm text-muted-foreground">Based on your current metrics</p>
        </div>
        <TrendingUp className="h-6 w-6 text-primary" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((item, index) => (
          <div 
            key={index} 
            className={`rounded-lg border p-4 transition-all duration-300
              hover:scale-[1.02] hover:bg-accent
              ${item.priority === 'high' ? 'border-l-4 border-l-red-500' :
                item.priority === 'medium' ? 'border-l-4 border-l-amber-500' :
                'border-l-4 border-l-emerald-500'}`}
          >
            <h3 className="mb-1 font-medium">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}