import z, { string } from 'zod';
export const DiagnoseSchema = z.object ({
    code : z.string(),
    name : z.string(),
    latin: z.string().optional()
});
export type diagnoseData = z.infer<typeof DiagnoseSchema>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
};

const sickLeaveSchema = z.object({
    startDate : z.string().date(),
    endDate: z.string().date()
});
const dischargeSchema = z.object({
    
        date: z.string().date(),
        criteria: z.string(),    
});
const newEntryBaseSchema = z.object({
    description : z.string(),
    date: z.string().date(),
    specialist:z.string(),
    diagnosisCodes : z.array(DiagnoseSchema.shape.code).optional()

});

const newHealthCheckEntrySchema = newEntryBaseSchema.extend({
    type : z.literal('HealthCheck'),
    healthCheckRating : z.nativeEnum(HealthCheckRating),

}).strict();
 export const  HealthCheckEntrySchema = newHealthCheckEntrySchema.extend({
    id: z.string(),
});
export  type HealthCheckEntry= z.infer<typeof HealthCheckEntrySchema>;
const newHospitalEntrySchema = newEntryBaseSchema.extend({
    type : z.literal('Hospital'),
    discharge: dischargeSchema

}).strict();
export const HospitalEntrySchema = newHospitalEntrySchema.extend({
   id: z.string()
});

export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

export const newOccupationalHealthcareEntrySchema = newEntryBaseSchema.extend({
    type : z.literal('OccupationalHealthcare'),
    employerName : z.string(),
    sickLeave: sickLeaveSchema.optional()

}).strict();
export const OccupationalHealthcareEntrySchema = newOccupationalHealthcareEntrySchema.extend({
    id:string()
}) ;
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema >;


export const newEntrySchema =z.discriminatedUnion('type',[newHealthCheckEntrySchema,newHospitalEntrySchema,newOccupationalHealthcareEntrySchema]);
export const EntrySchema = z.discriminatedUnion('type',[HospitalEntrySchema,OccupationalHealthcareEntrySchema,HealthCheckEntrySchema]);

export type newEntry = z.infer<typeof newEntrySchema >;
export type Entry = z.infer<typeof EntrySchema>;
export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries : z.array(EntrySchema),

});
export type NewPatient = z.infer<typeof newPatientSchema>;
export interface patientData extends NewPatient {
    id:string;   
}
export type NonSensitivePatientData = Omit<patientData, 'ssn' | 'entries'>;

