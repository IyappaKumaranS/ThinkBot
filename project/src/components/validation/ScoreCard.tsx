// import { Card } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { Gauge, Sparkles, TrendingUp, Users, Target } from 'lucide-react';
// import { MetricItem } from './MetricItem';

// interface ScoreCardProps {
//   progress: number;
// }

// export function ScoreCard({ progress }: ScoreCardProps) {
//   const metrics = [
//     { name: 'Uniqueness', value: 0, description: 'How unique your idea is compared to existing solutions', icon: Sparkles },
//     { name: 'Market Trends', value: 0, description: 'Alignment with current market trends and demands', icon: TrendingUp },
//     { name: 'User Engagement', value: 0, description: 'Predicted user engagement and retention rates', icon: Users },
//   ];

//   return (
//     <Card className="relative overflow-hidden p-6 transition-all duration-300 hover:shadow-xl">
//       {/* Animated Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[move_20s_linear_infinite]"></div>
//       </div>

//       {/* Glowing Orb Effect */}
//       <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
//       <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>

//       <div className="relative">
//         {/* Header Section */}
//         <div className="mb-6">
//           <div className="flex items-center justify-between">
//             <div className="space-y-1">
//               <h2 className="text-2xl font-bold tracking-tight">Validation Score</h2>
//               <p className="text-sm text-muted-foreground">Project Health Analysis</p>
//             </div>
//             <div className="relative">
//               <Gauge className="h-12 w-12 text-primary animate-pulse" />
//               <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
//                 {progress}%
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Score Section */}
//         <div className="mb-6">
//           <div className="relative mb-4 flex items-center justify-center">
//             <div className="absolute inset-0 flex items-center">
//               <Progress value={progress} className="h-3 rounded-full" />
//             </div>
//             {/* <div className="relative z-10 rounded-full bg-background px-4 py-1">
//               <span className="text-sm font-medium">Overall Progress</span>
//             </div> */}
//           </div>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid gap-4">
//           {metrics.map((metric, index) => (
//             <div
//               key={metric.name}
//               className={`transform transition-all duration-300 hover:scale-[1.02] ${
//                 index === metrics.length - 1 ? '' : 'border-b border-border/50 pb-4'
//               }`}
//             >
//               <MetricItem
//                 name={metric.name}
//                 value={metric.value}
//                 description={metric.description}
//               />
//               <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
//                 <metric.icon className="h-3.5 w-3.5" />
//                 <span>{getMetricStatus(metric.value)}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Badge */}
//         <div className="mt-6 flex items-center justify-center">
//           <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
//             <Target className="h-3.5 w-3.5" />
//             <span>Project Health Score</span>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

// function getMetricStatus(value: number): string {
//   if (value >= 90) return 'Exceptional Performance';
//   if (value >= 80) return 'Strong Performance';
//   if (value >= 70) return 'Good Progress';
//   if (value >= 60) return 'Needs Attention';
//   return 'Requires Improvement';
// }


import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gauge, Sparkles, TrendingUp, Users, Target } from 'lucide-react';
import { MetricItem } from './MetricItem';

interface ScoreCardProps {
  progress: number;
  uniqueness: number;
  marketTrend: number;
  userEngagement: number;
}

export function ScoreCard({ progress, uniqueness, marketTrend, userEngagement }: ScoreCardProps) {
  const metrics = [
    { 
      name: 'Uniqueness', 
      value: uniqueness, 
      description: 'How unique your idea is compared to existing solutions', 
      icon: Sparkles 
    },
    { 
      name: 'Market Trends', 
      value: marketTrend, 
      description: 'Alignment with current market trends and demands', 
      icon: TrendingUp 
    },
    { 
      name: 'User Engagement', 
      value: userEngagement, 
      description: 'Predicted user engagement and retention rates', 
      icon: Users 
    },
  ];

  return (
    <Card className="relative overflow-hidden p-6 transition-all duration-300 hover:shadow-xl">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[move_20s_linear_infinite]"></div>
      </div>

      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>

      <div className="relative">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Validation Score</h2>
              <p className="text-sm text-muted-foreground">Project Health Analysis</p>
            </div>
            <div className="relative">
              <Gauge className="h-12 w-12 text-primary animate-pulse" />
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {progress}%
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative mb-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <Progress value={progress} className="h-3 rounded-full" />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.name}
              className={`transform transition-all duration-300 hover:scale-[1.02] ${
                index === metrics.length - 1 ? '' : 'border-b border-border/50 pb-4'
              }`}
            >
              <MetricItem
                name={metric.name}
                value={metric.value}
                description={metric.description}
              />
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <metric.icon className="h-3.5 w-3.5" />
                <span>{getMetricStatus(metric.value)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Target className="h-3.5 w-3.5" />
            <span>Project Health Score</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function getMetricStatus(value: number): string {
  if (value >= 90) return 'Exceptional Performance';
  if (value >= 80) return 'Strong Performance';
  if (value >= 70) return 'Good Progress';
  if (value >= 60) return 'Needs Attention';
  return 'Requires Improvement';
}