import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Analysis } from "@/types/crop";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface AssessmentCardProps {
  analysis: Analysis;
}

const getAssessmentConfig = (assessment: string) => {
  switch (assessment.toLowerCase()) {
    case "excellent":
    case "good":
      return {
        icon: CheckCircle,
        color: "text-success",
        bgColor: "bg-success/10",
        badgeClass: "bg-success text-success-foreground",
      };
    case "moderate":
    case "fair":
      return {
        icon: AlertTriangle,
        color: "text-warning",
        bgColor: "bg-warning/10",
        badgeClass: "bg-warning text-warning-foreground",
      };
    case "poor":
    case "bad":
      return {
        icon: XCircle,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        badgeClass: "bg-destructive text-destructive-foreground",
      };
    default:
      return {
        icon: AlertTriangle,
        color: "text-muted-foreground",
        bgColor: "bg-muted/10",
        badgeClass: "bg-muted text-muted-foreground",
      };
  }
};

export const AssessmentCard = ({ analysis }: AssessmentCardProps) => {
  const config = getAssessmentConfig(analysis.assessment);
  const Icon = config.icon;

  return (
    <Card className="p-8 shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Quality Assessment</h2>
          <Badge className={config.badgeClass}>
            {analysis.assessment}
          </Badge>
        </div>

        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${config.bgColor}`}>
            <Icon className={`w-8 h-8 ${config.color}`} />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg text-foreground">Analysis Feedback</h3>
            <p className="text-muted-foreground leading-relaxed">
              {analysis.feedback}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">CQI Heuristic</p>
            <p className="text-lg font-semibold text-foreground">
              {analysis.CQI_heuristic.toFixed(2)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">CQI Random Forest</p>
            <p className="text-lg font-semibold text-foreground">
              {analysis.CQI_rf.toFixed(2)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">CQI XGBoost</p>
            <p className="text-lg font-semibold text-foreground">
              {analysis.CQI_xgb.toFixed(2)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">CQI Ensemble</p>
            <p className="text-lg font-semibold text-foreground">
              {analysis.CQI_ensemble.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
