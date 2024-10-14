import React, { useState } from 'react';
import PickupForm from './PickupForm';
import HandoverForm from './HandoverForm';

function FormSelection() {
  const [selectedForm, setSelectedForm] = useState('Pickup'); // Abholung ist der Default

  const handleFormChange = (e) => {
    setSelectedForm(e.target.value);
  };

  return (
    <div class="bg-body-tertiary pt-5 px-5 pb-5 rounded">
      <h3>Spende registrieren</h3>
      <label htmlFor="formSelection">Abholung oder Abgabe in der Geschäftsstelle: </label>
      <select id="formSelection" class="form-select mb-4" value={selectedForm} onChange={handleFormChange}>
        <option value="Pickup">Abholung durch das Sammelfahrzeug</option>
        <option value="Handover">Abgabe in der Geschäftsstelle</option>
      </select>

      {selectedForm === 'Pickup' ? <PickupForm /> : <HandoverForm />}
    </div>
  );
}

export default FormSelection;