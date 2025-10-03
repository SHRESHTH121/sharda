import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Analysis } from "@/types/crop";
import { Award, TrendingUp, Shield, AlertCircle } from "lucide-react";

interface QualityMetricsProps {
  analysis: Analysis;
}

export const QualityMetrics = ({ analysis }: QualityMetricsProps) => {
  const metrics = [
    {
      label: "Quality Index",
      value: analysis.quality_index,
      icon: Award,
      color: "text-primary",
    },
    {
      label: "Confidence Score",
      value: analysis.confidence_percent,
      icon: TrendingUp,
      color: "text-success",
    },
    {
      label: "Chemical Confidence",
      value: analysis.chemical_confidence,
      icon: Shield,
      color: "text-info",
    },
    {
      label: "Microbial Confidence",
      value: analysis.microbial_confidence,
      icon: Shield,
      color: "text-accent",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-6 shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${metric.color} bg-opacity-10`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  {metric.label}
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-foreground">
                  {metric.value.toFixed(1)}%
                </p>
                <Progress value={metric.value} className="h-2" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 shadow-card">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">Adulteration</h3>
            </div>
            <p className="text-3xl font-bold text-warning">
              {analysis.adulteration_pct.toFixed(2)}%
            </p>
            <Progress value={analysis.adulteration_pct} className="h-2" />
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Overall Quality Score</h3>
            </div>
            <p className="text-3xl font-bold text-primary">
              {analysis.overall_quality_score.toFixed(1)}%
            </p>
            <Progress value={analysis.overall_quality_score} className="h-2" />
          </div>
        </Card>
      </div>
    </div>
  );
};
