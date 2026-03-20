import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";

actor {
  module MeridianReading {
    public func compare(a : MeridianReading, b : MeridianReading) : Order.Order {
      Text.compare(a.meridianName, b.meridianName);
    };
  };

  module Patient {
    public func compareById(a : Patient, b : Patient) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module Session_ {
    public func compareById(a : Session, b : Session) : Order.Order {
      Nat.compare(a.id, b.id);
    };

    public func compareByPatientId(a : Session, b : Session) : Order.Order {
      Nat.compare(a.patientId, b.patientId);
    };

    public func compareByDate(a : Session, b : Session) : Order.Order {
      Text.compare(a.date, b.date);
    };
  };

  type Patient = {
    id : Nat;
    name : Text;
    age : Nat;
    gender : Text;
    dob : Text;
    phone : Text;
    email : Text;
    notes : Text;
  };

  type MeridianReading = {
    meridianName : Text;
    qi : Int;
    pitta : Int;
    kapha : Int;
    vata : Int;
    acidBase : Int;
  };

  type Session = {
    id : Nat;
    patientId : Nat;
    date : Text;
    modalities : [Text];
    meridianReadings : [MeridianReading];
    notes : Text;
  };

  type Practitioner = {
    name : Text;
    role : Text;
  };

  var nextPatientId = 0;
  var nextSessionId = 0;

  let patients = Map.empty<Nat, Patient>();
  let sessions = Map.empty<Nat, Session>();

  var practitioner : ?Practitioner = null;

  public shared ({ caller }) func addPatient(name : Text, age : Nat, gender : Text, dob : Text, phone : Text, email : Text, notes : Text) : async Nat {
    let id = nextPatientId;
    let patient : Patient = {
      id;
      name;
      age;
      gender;
      dob;
      phone;
      email;
      notes;
    };
    patients.add(id, patient);
    nextPatientId += 1;
    id;
  };

  public query ({ caller }) func getPatients() : async [Patient] {
    patients.values().toArray().sort(Patient.compareById);
  };

  public query ({ caller }) func getPatient(id : Nat) : async Patient {
    switch (patients.get(id)) {
      case (null) { Runtime.trap("Patient not found") };
      case (?patient) { patient };
    };
  };

  public shared ({ caller }) func updatePatient(id : Nat, name : Text, age : Nat, gender : Text, dob : Text, phone : Text, email : Text, notes : Text) : async () {
    switch (patients.get(id)) {
      case (null) { Runtime.trap("Patient not found") };
      case (_patient) {
        let updatedPatient : Patient = {
          id;
          name;
          age;
          gender;
          dob;
          phone;
          email;
          notes;
        };
        patients.add(id, updatedPatient);
      };
    };
  };

  public shared ({ caller }) func deletePatient(id : Nat) : async () {
    if (not patients.containsKey(id)) { Runtime.trap("Patient not found") };
    patients.remove(id);
  };

  public shared ({ caller }) func addSession(patientId : Nat, date : Text, modalities : [Text], meridianReadings : [MeridianReading], notes : Text) : async Nat {
    let id = nextSessionId;
    let session : Session = {
      id;
      patientId;
      date;
      modalities;
      meridianReadings;
      notes;
    };
    sessions.add(id, session);
    nextSessionId += 1;
    id;
  };

  public query ({ caller }) func getSessions() : async [Session] {
    sessions.values().toArray().sort(Session_.compareById);
  };

  public query ({ caller }) func getSessionsByPatient(patientId : Nat) : async [Session] {
    sessions.values().toArray().filter(func(session) { session.patientId == patientId }).sort(Session_.compareByDate);
  };

  public shared ({ caller }) func setPractitioner(name : Text, role : Text) : async () {
    practitioner := ?{ name; role };
  };

  public query ({ caller }) func getPractitioner() : async Practitioner {
    switch (practitioner) {
      case (null) { Runtime.trap("Practitioner not set") };
      case (?practitioner) { practitioner };
    };
  };
};
