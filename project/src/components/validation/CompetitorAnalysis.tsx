import { Card } from '@/components/ui/card';
import { Users, TrendingUp, Award } from 'lucide-react';

interface Competitor {
  name: string;
  similarity: number;
  strengths: string[];
  weaknesses: string[];
}

interface CompetitorAnalysisProps {
  competitors: Competitor[];
}

export function CompetitorAnalysis({ competitors }: CompetitorAnalysisProps) {
  return (
    <Card className="p-4 lg:p-6">
      <div className="mb-4 lg:mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg lg:text-xl font-semibold">Similar Projects</h2>
          <p className="text-sm text-muted-foreground">Matching your description</p>
        </div>
        <Users className="h-6 w-6 text-primary" />
      </div>

      <div className="grid gap-3">
        {competitors.map((competitor, index) => (
          <div
            key={index}
            className="rounded-lg border bg-card p-3 transition-all hover:bg-accent/50"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Award className={`h-5 w-5 ${
                  competitor.similarity >= 80 ? 'text-red-500' : 'text-amber-500'
                }`} />
                <h3 className="font-medium">{competitor.name}</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{competitor.similarity}% Match</span>
              </div>
            </div>

            <div className="grid gap-3 text-sm">
              <div>
                <span className="text-xs font-medium text-primary">Key Features:</span>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  {competitor.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-xs font-medium text-destructive">Limitations:</span>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  {competitor.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-destructive"></span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}