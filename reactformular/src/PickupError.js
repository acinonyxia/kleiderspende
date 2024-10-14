import React from 'react';
import { useNavigate } from 'react-router-dom';

const PickupError = () => {
  const navigate = useNavigate();

  // Button um zurück zum Formular zu kommen
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div class="bg-body-tertiary mb-4 pt-5 px-5 pb-5 rounded">
      <h3>Tut uns Leid!</h3>
      <p>Dein Wohnort befindet sich leider nicht im Einsatzgebiet unseres Sammelfahrzeugs!</p>
      <button class="form-control" onClick={handleBackClick}>Zurück</button>
    </div>
  );
};

export default PickupError;