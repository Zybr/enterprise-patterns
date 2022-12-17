import DoctorType from "../Enums/DoctorType";

const {faker} = require("@faker-js/faker");
const {PrismaClient} = require("@prisma/client");

describe('user', () => {
  const db = new PrismaClient();

  test('Make appointment for patient and doctor', async () => {
    let patient = await db.patient.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      }
    });
    let doctor = await db.doctor.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        type: DoctorType.Therapist
      }
    });
    await db.appointment.create({
      data: {
        patient_id: patient.id,
        doctor_id: doctor.id,
        start: new Date(),
        end: new Date(),
      }
    });

    patient = await db.patient.findUnique({
      where: {
        id: patient.id
      },
      include: {
        appointments: {
          include: {
            doctor: true,
          }
        },
      }
    });
    doctor = await db.doctor.findUnique({
      where: {
        id: doctor.id
      },
      include: {
        appointments: {
          include: {
            patient: true,
          }
        },
      }
    });

    expect(doctor.appointments[0].patient.id).toEqual(patient.id); // Doctor has an appointment with patient
    expect(patient.appointments[0].doctor.id).toEqual(doctor.id); // Patient has an appointment with doctor
  });
});
