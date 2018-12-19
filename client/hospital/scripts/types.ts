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
  number: string;
  receiptDate: Date;
  dischargeDate: Date;
  department: string;
  roomNumber: string;
  attendingDoctor: string;
  transportationType: TransportationType;
  intolerance: string;
  fullName: string;
  gender: Gender;
  phoneNumber: string;
  dateOfBirth: Date;
  age: string;
  residence: string;
  job: string;
  disability: string;
  injuryHours: string;
  admissionDiagnosis: string;
  clinicalDiagnosisA: string;
  clinicalDiagnosisB: string;
  clinicalDiagnosisC: string;
  operations: string;
}
