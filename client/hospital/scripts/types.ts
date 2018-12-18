export enum TransportationType {
  GURNEY = "на каталке",
  ARMCHAIR = "на кресле",
  CAN_GO = "может идти"
}

export enum Gender {
  MALE = "мужской пол",
  FEMALE = "женский пол"
}

export interface Diagnosis {
  text: string;
  date: Date;
}

export interface ClinicalDiagnosis {}

export interface PatientCard {
  number: number;
  receiptDate: Date;
  dischargeDate: Date;
  department: string;
  roomNumber: number;
  attendingDoctor: string;
  transportationType: TransportationType;
  intolerance: string;
  fullName: string;
  gender: Gender;
  phoneNumber: string;
  dateOfBirth: Date;
  age: number;
  residence: string;
  job: string;
  disability: string;
  emergencyDelivery: boolean;
  injuryHours: number;
  admissionDiagnosis: string;
  diagnoses: Diagnosis[];
  clinicalDiagnosisA: string;
  clinicalDiagnosisB: string;
  clinicalDiagnosisC: string;
  operations: string;
}
