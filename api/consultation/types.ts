export interface ConsultationCategory {
  id: string;
  name: string;
  isactive: boolean;
}

export interface ConsultationMutation {
  customerId: string;
  categoryid: string;
  id: string;
}

export interface AddConsultationMessage {
  senderRole: string;
  message: string;
  roomId: string;
  messageType: string;
}

export interface ConsultationMessage {
  id: string;
  roomId: string;
  message: string;
  messageType: "text" | "image";
  senderRole: "customer" | "doctor";
  createdAt?: string;
}

export interface ConsultationRoom {
  expiredAt: Date;
  consultationCategory: ConsultationCategory;
  customerId: string;
  status: string;
}
