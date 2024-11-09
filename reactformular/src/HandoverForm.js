import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HandoverForm = () => {
    const [formData, setFormData] = useState({
        salutation: '',
        title: '',
        firstName: '',
        lastName: '',
        clothingType: '',
        region: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Verhindert Neuladen der Seite

        const timestamp = new Date().toLocaleString(); // Zeitstempel mit Datum und Uhrzeit

        navigate('/handoversummary', { state: { ...formData, timestamp } }); // Anzeigen der Zusammenfassung

    };

    return (
        <form class="bg-body-tertiary mb-4 rounded" onSubmit={handleSubmit}>
            <h4>Abgabe in der Geschäftsstelle</h4>
            <div class="row justify-content-center">
                <div class="col-lg-4">
                    <div class="row justify-content-center">
                        <div class="col-6 mb-3">
                            <label for="salutation" class="form-label">Anrede</label>
                            <select name="salutation" class="form-select" value={formData.salutation} onChange={handleChange}>
                                <option selected="selected"></option>
                                <option value="Herr">Herr</option>
                                <option value="Frau">Frau</option>
                                <option value="">Divers</option>
                            </select>
                        </div>
                        <div class="col-6 mb-3">
                            <label for="title" class="form-label">Titel</label>
                            <input type="text" name="title" class="form-control" value={formData.title} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="row justify-content-center">
                        <div class="col-lg-6 mb-3">
                            <label for="firstName" class="form-label">Vorname *</label>
                            <input type="text" name="firstName" class="form-control" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="lastName" class="form-label">Nachname *</label>
                            <input type="text" name="lastName" class="form-control" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-6 mb-3">
                    <label for="clothingType" class="form-label">Art der Kleidungsstücke</label>
                    <select name="clothingType" class="form-select" defaultValue="Nicht ausgewählt" value={formData.clothingType} onChange={handleChange}>
                        <option value="Nicht ausgewählt">Bitte wählen</option>
                        <option value="Damenkleidung">Damenkleidung</option>
                        <option value="Herrenkleidung">Herrenkleidung</option>
                        <option value="Kinderkleidung">Kinderkleidung</option>
                        <option value="Heimtextilien">Heimtextilien</option>
                    </select>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="region" class="form-label">Krisenregion</label>
                    <select name="region" class="form-select" defaultValue="Nicht ausgewählt" value={formData.region} onChange={handleChange}>
                        <option value="Nicht ausgewählt">Bitte wählen</option>
                        <option value="Mittelerde">Mittelerde</option>
                        <option value="Westeros">Westeros</option>
                        <option value="Narnia">Narnia</option>
                        <option value="Temerien">Temerien</option>
                    </select>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="dsgvoCheck" required />
                        <label class="form-check-label" for="dsgvoCheck">
                            Ich bin mit der Speicherung meiner Daten gemäß <a href="pages/datenschutz.html">Datenschutzvereinbarung</a> einverstanden. *
                        </label>
                    </div>
                </div>
            </div>
            <button type="submit" class="form-control">Submit</button>
        </form>
    );
};

export default HandoverForm;