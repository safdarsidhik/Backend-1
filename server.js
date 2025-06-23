const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = 5000;  

const{sql, pool, poolConnect, GetMethod} = require('./db');
app.use(express.json());

app.get('/Doctors',async (req, res) => {
    
    const result =await GetMethod('SELECT * FROM Doctors');
    res.json(result.recordset);
});

app.get('/Appointments',async (req, res) => {
    
    const result =await GetMethod('SELECT  AppointmentID,Patients.Name as patient,Doctors.Name as doctor  FROM Appointments join Doctors on Appointments.DoctorID = Doctors.DoctorID join Patients on Appointments.PatientID = Patients.PatientID');
    res.json(result.recordset);
});

app.get('/Patients',async (req, res) => {
    
    const result =await GetMethod('SELECT * FROM Patients');
    res.json(result.recordset);
});



//sample post request

app.post('/signup', async (req, res) => {
  await poolConnect;
  const { email, password, phone } = req.body;

  await pool.request()
    .input('email', sql.VarChar, email)
    .input('password', sql.VarChar, password)
    .input('phone', sql.VarChar, phone)
    .query(
        `INSERT INTO Users1 (Email, Password, PhoneNumber) VALUES (@email, @password, @phone)`
    );
    res.json({ message: 'User signed up successfully' });
});

app.post('/Doctors/new', async (req, res) => {
  await poolConnect;
  const { DoctorID, Name, Specialty } = req.body;

  await pool.request()
    .input('DoctorID', sql.Int, DoctorID)
    .input('Name', sql.VarChar, Name)
    .input('Specialty', sql.VarChar, Specialty)
    .query('INSERT INTO Doctors (DoctorID, Name, Specialty) VALUES (@DoctorID, @Name, @Specialty)');

  res.send('Doctor added');
});

app.post('/Patients/new', async (req, res) => {
  await poolConnect;
  const { PatientID, Name, Age, Gender } = req.body;

  await pool.request()
    .input('PatientID', sql.Int, PatientID)
    .input('Name', sql.VarChar, Name)
    .input('Age', sql.Int, Age)
    .input('Gender', sql.VarChar, Gender)
    .query('INSERT INTO Patients (PatientID, Name, Age, Gender) VALUES (@PatientID, @Name, @Age, @Gender)');

  res.send('Patient added');
});

app.post('/Appointments/new', async (req, res) => {
  await poolConnect;
  const { AppointmentID, PatientID, DoctorID, AppointmentDate } = req.body;

  await pool.request()
    .input('AppointmentID', sql.Int, AppointmentID)
    .input('PatientID', sql.Int, PatientID)
    .input('DoctorID', sql.Int, DoctorID)
    .input('AppointmentDate', sql.DateTime, AppointmentDate)
    .query('INSERT INTO Appointments (AppointmentID, PatientID, DoctorID, AppointmentDate) VALUES (@AppointmentID, @PatientID, @DoctorID, @AppointmentDate)');

  res.send('Appointment added');
});

app.put('/Appointments/new', async (req, res) => {
  await poolConnect;
  const { AppointmentID, PatientID, DoctorID, AppointmentDate } = req.body;

  await pool.request()
    .input('AppointmentID', sql.Int, AppointmentID)
    .input('PatientID', sql.Int, PatientID)
    .input('DoctorID', sql.Int, DoctorID)
    .input('AppointmentDate', sql.DateTime, AppointmentDate)
    .query(
        `UPDATE Appointments SET PatientID = @PatientID, DoctorID = @DoctorID, AppointmentDate = @AppointmentDate WHERE AppointmentID = @AppointmentID`
    );
  res.send('Appointment updated');
});

app.put('/Patients/new', async (req, res) => {
  await poolConnect;
  const { PatientID, Name, Age, Gender } = req.body;

  await pool.request()
    .input('PatientID', sql.Int, PatientID)
    .input('Name', sql.VarChar, Name)
    .input('Age', sql.Int, Age)
    .input('Gender', sql.VarChar, Gender)
    .query(
        `UPDATE Patients SET Name = @Name, Age = @Age, Gender = @Gender WHERE PatientID = @PatientID`
    );
  res.send('Patient updated');
});

app.put('/Doctors/new', async (req, res) => {
  await poolConnect;
  const { DoctorID, Name, Specialty } = req.body;

  await pool.request()
    .input('DoctorID', sql.Int, DoctorID)
    .input('Name', sql.VarChar, Name)
    .input('Specialty', sql.VarChar, Specialty)
    .query(
        `UPDATE Doctors SET Name = @Name, Specialty = @Specialty WHERE DoctorID = @DoctorID`
    );

  res.send('Doctor updated');
});

app.delete('/doctors/:id', async (req, res) => {
  await poolConnect;
  await pool.request()
    .input('id', sql.Int, req.params.id)
    .query('DELETE FROM Doctors WHERE DoctorID = @id');
  res.send('Doctor deleted');
});

app.delete('/patients/:id', async (req, res) => {
  await poolConnect;
  await pool.request()
    .input('id', sql.Int, req.params.id)
    .query('DELETE FROM Patients WHERE PatientID = @id');
  res.send('Patient deleted');
});

app.delete('/appointments/:id', async (req, res) => {
  await poolConnect;
  await pool.request()
    .input('id', sql.Int, req.params.id)
    .query('DELETE FROM Appointments WHERE AppointmentID = @id');
  res.send('Appointment deleted');
});





app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
