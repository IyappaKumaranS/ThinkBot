import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MetricItemProps {
  name: string;
  value: number;
  description: string;
}

export function MetricItem({ name, value, description }: MetricItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-4 transition-colors hover:bg-accent/50 rounded-lg p-2">
          <div className="flex-1">
            <div className="mb-1 text-sm font-medium">{name}</div>
            <Progress 
              value={value} 
              className={`h-1 [&>div]:bg-gradient-to-r ${
                value >= 80 ? '[&>div]:from-indigo-500 [&>div]:to-blue-500' :
                value >= 60 ? '[&>div]:from-amber-500 [&>div]:to-orange-500' : '[&>div]:from-red-500 [&>div]:to-rose-500'
              }`}
            />
          </div>
          <span className="text-sm font-medium">{value}%</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">{description}</p>
      </TooltipContent>
    </Tooltip>
  );
}