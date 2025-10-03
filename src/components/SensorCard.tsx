import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SensorReading } from "@/types/crop";
import { Activity, Droplets, TestTube, Waves } from "lucide-react";

interface SensorCardProps {
  name: string;
  reading: SensorReading;
  unit: string;
}

const sensorIcons = {
  VOC: Activity,
  TDS: Droplets,
  pH: TestTube,
  Turbidity: Waves,
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Normal":
      return "bg-success text-success-foreground";
    case "High":
      return "bg-warning text-warning-foreground";
    case "Low":
      return "bg-info text-info-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const SensorCard = ({ name, reading, unit }: SensorCardProps) => {
  const Icon = sensorIcons[name as keyof typeof sensorIcons] || Activity;

  return (
    <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">{name}</h3>
          </div>
          <Badge className={getStatusColor(reading.status)}>
            {reading.status}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-foreground">
            {reading.value.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">{unit}</p>
        </div>
      </div>
    </Card>
  );
};
