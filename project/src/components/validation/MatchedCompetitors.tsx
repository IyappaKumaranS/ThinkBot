import { Card } from '@/components/ui/card';
import { Users, TrendingUp, Star, Shield, AlertTriangle, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Competitor {
  name: string;
  logo: string;
  similarity: number;
  strengths: string[];
  weaknesses: string[];
}

interface MatchedCompetitorsProps {
  competitors: Competitor[];
}

export function MatchedCompetitors({ competitors }: MatchedCompetitorsProps) {
  return (
    <Card className="p-4 lg:p-6 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative">
        <div className="mb-4 lg:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg lg:text-xl font-semibold flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Market Competitors
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {competitors.length} competitors analyzed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">Top Matches</span>
            </div>
          </div>
        </div>

        {competitors.length === 0 ? (
          <div className="text-center py-12 bg-accent/20 rounded-lg">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No Competitors Found</p>
            <p className="text-sm text-muted-foreground">
              Upload your project details to discover potential competitors
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {competitors.map((competitor, index) => (
              <div
                key={index}
                className="group relative rounded-xl border bg-gradient-to-br from-card to-card/95 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
              >
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="flex items-start gap-4">
                  {/* Logo Section */}
                  <div className="relative">
                    <div className="h-16 w-16 rounded-xl border-2 border-primary/10 overflow-hidden">
                      <img
                        src={competitor.logo}
                        alt={competitor.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 rounded-full bg-background border-2 border-primary/20 px-2 py-0.5">
                      <span className="text-xs font-bold">{competitor.similarity}%</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{competitor.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                        competitor.similarity >= 90 ? 'bg-red-500/15 text-red-500' :
                        competitor.similarity >= 80 ? 'bg-amber-500/15 text-amber-500' :
                        'bg-emerald-500/15 text-emerald-500'
                      }`}>
                        {competitor.similarity >= 90 ? <AlertTriangle className="h-3.5 w-3.5" /> :
                         competitor.similarity >= 80 ? <TrendingUp className="h-3.5 w-3.5" /> :
                         <Shield className="h-3.5 w-3.5" />}
                        {competitor.similarity >= 90 ? 'Direct Competitor' :
                         competitor.similarity >= 80 ? 'Strong Match' :
                         'Potential Match'}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <Progress 
                        value={competitor.similarity} 
                        className="h-1.5"
                      />
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-xs font-medium text-primary flex items-center gap-1.5 mb-1.5">
                          <Star className="h-3.5 w-3.5 fill-primary" />
                          Key Strengths
                        </p>
                        <ul className="space-y-1">
                          {competitor.strengths.map((strength, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-1.5">
                              <ChevronRight className="h-3 w-3 text-primary" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-destructive flex items-center gap-1.5 mb-1.5">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Limitations
                        </p>
                        <ul className="space-y-1">
                          {competitor.weaknesses.map((weakness, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-1.5">
                              <ChevronRight className="h-3 w-3 text-destructive" />
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}