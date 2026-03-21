# Quantum Wellness - Bio-Photonic Platform

## Current State
Empty workspace - no App.tsx or feature code exists. Backend has empty actor.

## Requested Changes (Diff)

### Add
- Full patient management: add, list, search, view patients with fields: name, age, gender, contact, date of birth, medical history notes
- Session management: create sessions linked to patients, with date, modalities used, meridian readings (Qi/Pitta/Kapha/Vata/Acid-Base per meridian), and notes
- Dashboard: total patients count, total sessions count, active today count, recent sessions list, recent patients list
- Reference Library: tabs for Pulse Diagnosis, Five Elements, Eight Trigrams, I Ching, Acupuncture, PMA Guide with clinical reference content
- Practitioner Profile: save name and role
- Working Add Patient modal/form that persists data to backend

### Modify
- N/A (new build)

### Remove
- N/A

## Implementation Plan
1. Backend: Patient type with id/name/age/gender/dob/contact/notes, Session type with id/patientId/date/modalities/meridianReadings/notes
2. Backend APIs: addPatient, getPatients, getPatient, addSession, getSessions, getSessionsByPatient, getDashboardStats, saveProfile, getProfile
3. Frontend App.tsx with sidebar navigation and page routing
4. Pages: Dashboard, Patients (with Add Patient modal), NewSession, ReferenceLibrary, Profile
5. Working Add Patient button opens modal form, submits to backend, refreshes list
