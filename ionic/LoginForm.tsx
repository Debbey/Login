import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonText } from '@ionic/react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      // Handle successful login
      setError(null); // Clear any previous errors

      // Redirect to dashboard
      history.push('/dashboard');

    } catch (error) {
      setError(error.response.data.message || 'Login failed'); // Handle errors
    }
  };

  return (
    <IonContent className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <IonInput
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value)}
          required
        />
        <IonInput
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value)}
          required
        />
    
        <IonButton type="submit">Login</IonButton>
        {error && <IonText color="danger">{error}</IonText>}
      </form>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </IonContent>
  );
};

export default LoginForm;