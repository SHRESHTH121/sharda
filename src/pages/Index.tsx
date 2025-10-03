import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Sprout } from "lucide-react";
import { CropSelector } from "@/components/CropSelector";
import { SensorCard } from "@/components/SensorCard";
import { QualityMetrics } from "@/components/QualityMetrics";
import { AssessmentCard } from "@/components/AssessmentCard";
import { CropType, ApiResponse } from "@/types/crop";
import { toast } from "sonner";

const fetchCropData = async (): Promise<ApiResponse> => {
  const response = await fetch("https://sih-4fwi.onrender.com/api/output");
  if (!response.ok) {
    throw new Error("Failed to fetch crop data");
  }
  return response.json();
};

const Index = () => {
  const [selectedCrop, setSelectedCrop] = useState<CropType>("Tulsi");

  const { data, isLoading, error } = useQuery({
    queryKey: ["cropData"],
    queryFn: fetchCropData,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load crop data. Please try again.");
    }
  }, [error]);

  const cropData = data?.data.find(
    (item) => item.herb === selectedCrop && item.analysis.sensor_readings
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Sprout className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AgriSense</h1>
              <p className="text-sm text-muted-foreground">
                Advanced Crop Quality Analysis System
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        <CropSelector selectedCrop={selectedCrop} onSelectCrop={setSelectedCrop} />

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground">Loading crop data...</p>
            </div>
          </div>
        )}

        {cropData && !isLoading && (
          <>
            {/* Sensor Readings */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Sensor Readings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SensorCard
                  name="VOC"
                  reading={cropData.analysis.sensor_readings.VOC}
                  unit="ppb"
                />
                <SensorCard
                  name="TDS"
                  reading={cropData.analysis.sensor_readings.TDS}
                  unit="ppm"
                />
                <SensorCard
                  name="pH"
                  reading={cropData.analysis.sensor_readings.pH}
                  unit="pH"
                />
                <SensorCard
                  name="Turbidity"
                  reading={cropData.analysis.sensor_readings.Turbidity}
                  unit="NTU"
                />
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Quality Metrics</h2>
              <QualityMetrics analysis={cropData.analysis} />
            </div>

            {/* Assessment */}
            <AssessmentCard analysis={cropData.analysis} />
          </>
        )}

        {!cropData && !isLoading && !error && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No data available for the selected crop.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 AgriSense. Advanced crop quality monitoring for sustainable agriculture.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
