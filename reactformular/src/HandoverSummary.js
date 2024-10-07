import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HandoverSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { salutation, title, firstName, lastName, clothingType, region, timestamp } = state;

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div class="bg-body-tertiary mb-4 rounded">
        <h3>Vielen Dank für deine Spende!</h3>
        <p>Hier findest du eine Zusammenfassung deiner übermittelten Daten:</p>
        <div class="container mb-5">
            <strong>Name:</strong> {salutation} {title} {firstName} {lastName}  <br/>
            <strong>Art der Kleidung:</strong> {clothingType} <br/>
            <strong>Gewählte Krisenregion:</strong> {region} <br/>
            <strong>Datum und Uhrzeit:</strong> {timestamp} <br/>
        </div>
        <button class="form-control" onClick={handleBackClick}>Zurück</button>
    </div>
  );
};

export default HandoverSummary;