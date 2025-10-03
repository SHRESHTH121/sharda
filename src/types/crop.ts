export interface SensorReading {
  value: number;
  status: "Normal" | "Low" | "High";
}

export interface SensorReadings {
  VOC: SensorReading;
  TDS: SensorReading;
  Turbidity: SensorReading;
  pH: SensorReading;
}

export interface Analysis {
  CQI_heuristic: number;
  CQI_rf: number;
  CQI_xgb: number;
  CQI_ensemble: number;
  adulteration_pct: number;
  quality_index: number;
  confidence_percent: number;
  chemical_confidence: number;
  microbial_confidence: number;
  overall_quality_score: number;
  assessment: string;
  feedback: string;
  sensor_readings: SensorReadings;
}

export interface CropData {
  _id: string;
  herb: string;
  analysis: Analysis;
}

export interface ApiResponse {
  message: string;
  data: CropData[];
}

export type CropType = "Tulsi" | "Amla" | "Cabbage" | "Cauliflower" | "Cucumber" | "Radish";
