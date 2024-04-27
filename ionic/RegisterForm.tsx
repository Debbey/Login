import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonText } from '@ionic/react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const RegisterForm = () => {
  const [guestfname, setGuestfname] = useState('');
  const [guestlname, setGuestlname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        guestfname: guestfname,
        guestlname: guestlname,
        email: email,
        password: password,
        phone: phone, 
      });
      // Handle successful registration 
      console.log('Registration successful:', response.data);
      setRegistered(true); // Set registered state to true
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while processing your request');
      }
      history.push('/dashboard');
    }
  };

  return (
    <IonContent className="register-form">
      <h2>Register</h2>
      {registered && <p className="success">Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <IonInput
          type="text"
          value={guestfname}
          onIonChange={(e:any) => setGuestfname(e.detail.value)}
          placeholder="First Name"
        />
        <IonInput
          type="text"
          value={guestlname}
          onIonChange={(e:any) => setGuestlname(e.target.value)}
          placeholder="Last Name"
        />
        <IonInput
          type="email"
          value={email}
          onIonChange={(e:any) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <IonInput
          type="password"
          value={password}
          onIonChange={(e:any) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <IonInput
          type="password"
          value={confirmPassword}
          onIonChange={(e:any) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <IonInput
          type="text"   
          value={phone}
          onIonChange={(e:any) => setPhone(e.target.value)}
          placeholder="Phone Number"
        />
        <IonButton type="submit">Register</IonButton>
        {error && <IonText color="danger">{error}</IonText>}
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </IonContent>
  );
};

export default RegisterForm;