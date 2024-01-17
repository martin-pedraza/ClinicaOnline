export class Appointment {
  specialty?: string;
  specialistDni?: string;
  specialistName?: string;
  day?: string;
  time?: string;
  status?: string;
  //pending -> new
  //reserved -> pending-approval
  //rejected
  //accepted
  //cancelled
  //done
  comment?: string;
  reason?: string;
  patientDni?: string;
  patientName?: string;
  opinion?: string;
  availability?: string;
  survey?: any;
  atention?: any;
}
