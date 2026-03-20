import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Session {
    id: bigint;
    patientId: bigint;
    date: string;
    meridianReadings: Array<MeridianReading>;
    modalities: Array<string>;
    notes: string;
}
export interface Practitioner {
    name: string;
    role: string;
}
export interface Patient {
    id: bigint;
    age: bigint;
    dob: string;
    name: string;
    email: string;
    gender: string;
    notes: string;
    phone: string;
}
export interface MeridianReading {
    qi: bigint;
    vata: bigint;
    acidBase: bigint;
    meridianName: string;
    pitta: bigint;
    kapha: bigint;
}
export interface backendInterface {
    addPatient(name: string, age: bigint, gender: string, dob: string, phone: string, email: string, notes: string): Promise<bigint>;
    addSession(patientId: bigint, date: string, modalities: Array<string>, meridianReadings: Array<MeridianReading>, notes: string): Promise<bigint>;
    deletePatient(id: bigint): Promise<void>;
    getPatient(id: bigint): Promise<Patient>;
    getPatients(): Promise<Array<Patient>>;
    getPractitioner(): Promise<Practitioner>;
    getSessions(): Promise<Array<Session>>;
    getSessionsByPatient(patientId: bigint): Promise<Array<Session>>;
    setPractitioner(name: string, role: string): Promise<void>;
    updatePatient(id: bigint, name: string, age: bigint, gender: string, dob: string, phone: string, email: string, notes: string): Promise<void>;
}
