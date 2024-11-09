import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HandoverSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { salutation, title, firstName, lastName, clothingType, region, timestamp } = state;

  // Button um zurück zum Formular zu kommen
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div class="bg-body-tertiary mb-4 pt-5 px-5 pb-5 rounded">
      <h3>Vielen Dank für deine Spende!</h3>
      <p>Hier findest du eine Zusammenfassung deiner übermittelten Daten:</p>
      <div class="container mb-5">
        <strong>Name:</strong> {salutation} {title} {firstName} {lastName}  <br />
        <strong>Art der Kleidung:</strong> {clothingType} <br />
        <strong>Gewählte Krisenregion:</strong> {region} <br />
        <strong>Datum und Uhrzeit:</strong> {timestamp} Uhr <br />
      </div>
      <button class="form-control" onClick={handleBackClick}>Zurück</button>
    </div>
  );
};

export default HandoverSummary;