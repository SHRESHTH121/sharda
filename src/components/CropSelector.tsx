import { Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CropType } from "@/types/crop";

interface CropSelectorProps {
  selectedCrop: CropType;
  onSelectCrop: (crop: CropType) => void;
}

const crops: { name: CropType; enabled: boolean; icon: string }[] = [
  { name: "Tulsi", enabled: true, icon: "🌿" },
  { name: "Amla", enabled: false, icon: "🍈" },
  { name: "Cabbage", enabled: false, icon: "🥬" },
  { name: "Cauliflower", enabled: false, icon: "🥦" },
  { name: "Cucumber", enabled: false, icon: "🥒" },
  { name: "Radish", enabled: false, icon: "🥕" },
];

export const CropSelector = ({ selectedCrop, onSelectCrop }: CropSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Leaf className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Select Crop</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {crops.map((crop) => (
          <Card
            key={crop.name}
            className={`
              relative p-6 cursor-pointer transition-all duration-300
              ${crop.enabled ? "hover:shadow-elegant hover:scale-105" : "opacity-50 cursor-not-allowed"}
              ${selectedCrop === crop.name && crop.enabled ? "ring-2 ring-primary shadow-elegant" : ""}
            `}
            onClick={() => crop.enabled && onSelectCrop(crop.name)}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-4xl">{crop.icon}</span>
              <span className="font-semibold text-sm text-center text-foreground">
                {crop.name}
              </span>
              {!crop.enabled && (
                <span className="text-xs text-muted-foreground">Coming Soon</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
