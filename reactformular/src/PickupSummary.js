import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const PickupSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { salutation, title, firstName, lastName, street, housenumber, city, postalCode, clothingType, region, timestamp, selectedDate } = state;

  // Button um zurück zum Formular zu kommen
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div class="bg-body-tertiary mb-4 pt-5 px-5 pb-5 rounded">
      <h3>Das Sammelfahrzeug wurde erfolgreich bestellt!</h3>
      <p>Hier findest du eine Zusammenfassung deiner übermittelten Daten:</p>
      <div class="container mb-5">
        <strong>Name:</strong> {salutation} {title} {firstName} {lastName}  <br />
        <strong>Straße:</strong> {street} {housenumber}  <br />
        <strong>Ort:</strong> {postalCode} {city}  <br />
        <strong>Art der Kleidung:</strong> {clothingType} <br />
        <strong>Gewählte Krisenregion:</strong> {region} <br />
        <strong>Gewählte Abholzeit:</strong> {format(new Date(selectedDate), 'dd.MM.yyyy HH:mm')}<br />
        <strong>Datum und Uhrzeit der Übertragung:</strong> {format(new Date(timestamp), 'dd.MM.yyyy HH:mm')} <br />
      </div>
      <p>Bitte stelle deine Spende pünktlich zum nächsten Abholtermin an den Straßenrand.</p>
      <button class="form-control" onClick={handleBackClick}>Zurück</button>
    </div>
  );
};

export default PickupSummary;