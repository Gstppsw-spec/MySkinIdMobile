export interface SkinAnalysisData {
  id: string; // UUID
  customerId: string; // UUID
  imageUrl: string;
  rawResponse: RawSkinAnalysisResponse;
  acneScore: number;
  wrinkleScore: number;
  oilScore: number;

  skinType: SkinType;
  severity: SeverityLevel;

  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export type SkinType = "oily" | "dry" | "combination" | "normal" | "sensitive";

export type SeverityLevel = "low" | "medium" | "high";

export interface RawSkinAnalysisResponse {
  log_id: string;
  result: SkinAnalysisResult;
  warning: any[];

  error_code: number;
  request_id: string;

  error_detail: ErrorDetail;

  face_rectangle: FaceRectangle;
}

export interface ValueConfidence {
  value: number;
  confidence: number;
}

export interface AISkinTypeDetail {
  value: number;
  confidence: number;
}

export interface AISkinTypeResult {
  details: AISkinTypeDetail[];
  skin_type: number;
}

export interface SkinAnalysisResult {
  acne: ValueConfidence;
  mole: ValueConfidence;
  blackhead: ValueConfidence;
  eye_pouch: ValueConfidence;

  pores_jaw: ValueConfidence;
  pores_forehead: ValueConfidence;
  pores_left_cheek: ValueConfidence;
  pores_right_cheek: ValueConfidence;

  skin_spot: ValueConfidence;

  skin_type: AISkinTypeResult;

  crows_feet: ValueConfidence;
  dark_circle: ValueConfidence;
  eye_finelines: ValueConfidence;

  left_eyelids: ValueConfidence;
  right_eyelids: ValueConfidence;

  nasolabial_fold: ValueConfidence;

  forehead_wrinkle: ValueConfidence;
  glabella_wrinkle: ValueConfidence;
}

export interface ErrorDetail {
  code: string;
  message: string;
  status_code: number;
  code_message: string;
}
export interface FaceRectangle {
  top: number;
  left: number;
  width: number;
  height: number;
}
