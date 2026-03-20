import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  MeridianReading,
  Patient,
  Practitioner,
  Session,
} from "../backend.d";
import { useActor } from "./useActor";

export type { Patient, Session, MeridianReading, Practitioner };

export function usePatients() {
  const { actor, isFetching } = useActor();
  return useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPatients();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSessions() {
  const { actor, isFetching } = useActor();
  return useQuery<Session[]>({
    queryKey: ["sessions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSessions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePractitioner() {
  const { actor, isFetching } = useActor();
  return useQuery<Practitioner>({
    queryKey: ["practitioner"],
    queryFn: async () => {
      if (!actor) return { name: "", role: "Practitioner" };
      return actor.getPractitioner();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPatient() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: {
      name: string;
      age: bigint;
      gender: string;
      dob: string;
      phone: string;
      email: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addPatient(
        p.name,
        p.age,
        p.gender,
        p.dob,
        p.phone,
        p.email,
        p.notes,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["patients"] }),
  });
}

export function useDeletePatient() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deletePatient(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["patients"] }),
  });
}

export function useAddSession() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (s: {
      patientId: bigint;
      date: string;
      modalities: string[];
      meridianReadings: MeridianReading[];
      notes: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addSession(
        s.patientId,
        s.date,
        s.modalities,
        s.meridianReadings,
        s.notes,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sessions"] }),
  });
}

export function useSetPractitioner() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: { name: string; role: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setPractitioner(p.name, p.role);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["practitioner"] }),
  });
}
