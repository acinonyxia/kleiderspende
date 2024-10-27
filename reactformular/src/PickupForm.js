import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes, getDay, addDays, subDays } from 'date-fns';
import de from 'date-fns/locale/de';

const PickupForm = () => {
    const [formData, setFormData] = useState({
        salutation: '',
        title: '',
        firstName: '',
        lastName: '',
        street: '',
        housenumber: '',
        city: '',
        postalCode: '',
        clothingType: '',
        region: '',
    });

    const [selectedDate, setSelectedDate] = useState(null);

    registerLocale('de', de);

    const officePostalCode = '74405'; // PLZ der Filiale

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Verhindert Neuladen der Seite

        const timestamp = new Date().toLocaleString(); // Zeitstempel mit Datum und Uhrzeit

        if (!selectedDate) {
            alert('Bitte wähle ein Datum und eine Uhrzeit für die Abholung aus!');
            return;
        }

        // Vergleicht die ersten 2 Ziffern der Postleitzahlen
        if (formData.postalCode.substring(0, 2) !== officePostalCode.substring(0, 2)) {
            // Seite mit Fehlermeldung
            navigate('/error');
        } else {
            // Daten in den Router senden und Anzeige der Summary
            navigate('/summary', { state: { ...formData, selectedDate, timestamp } });
        }
    };

    // Erlaubt nur Montag bis Freitag
    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6; // 0 = Sonntag, 6 = Samstag
    };

    // Zeit zwischen 10:00 und 17:00 erlauben
    const filterTime = (time) => {
        const selectedHour = time.getHours();
        return selectedHour >= 10 && selectedHour <= 17;
    };

    // Berechne den nächsten Wochentag
    const getNextWeekday = (date) => {
        const day = getDay(date);
        if (day === 6) {
            // Wenn es Samstag ist, füge 2 Tage hinzu (Montag)
            return addDays(date, 2);
        }
        // Ansonsten für 1 Tag hinzu (Abholung nicht mehr am selben Tag möglich)
        return addDays(date, 1);
    };

    // Setze die Startzeit auf 10:00 Uhr
    const getNextWeekdayWithStartTime = (date) => {
        const nextWeekday = getNextWeekday(date);
        return setHours(setMinutes(nextWeekday, 0), 10); // Setzt die Uhrzeit auf 10:00
    };

    // Berechne das Startdatum: Nächster Wochentag, 10:00 Uhr
    const nextWeekday = getNextWeekdayWithStartTime(new Date());

    return (
        <form class="bg-body-tertiary mb-4 rounded" onSubmit={handleSubmit}>
            <h4>Abholung durch das Sammelfahrzeug</h4>
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="row justify-content-center">
                        <div class="col-md-6 col-sm-5 mb-3">
                            <label for="salutation" class="form-label">Anrede</label>
                            <select name="salutation" class="form-select" value={formData.salutation} onChange={handleChange}>
                                <option selected="selected"></option>
                                <option value="Herr">Herr</option>
                                <option value="Frau">Frau</option>
                                <option value="">Divers</option>
                            </select>
                        </div>
                        <div class="col-md-6 col-sm-5 mb-3">
                            <label for="title" class="form-label">Titel</label>
                            <input type="text" name="title" class="form-control" value={formData.title} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="row justify-content-center">
                        <div class="col-md-6 col-sm-10 mb-3">
                            <label for="firstName" class="form-label">Vorname *</label>
                            <input type="text" name="firstName" class="form-control" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div class="col-md-6 col-sm-10 mb-3">
                            <label for="lastName" class="form-label">Nachname *</label>
                            <input type="text" name="lastName" class="form-control" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-9 col-sm-8 mb-3">
                    <label for="street" class="form-label">Straße *</label>
                    <input type="text" name="street" class="form-control" value={formData.street} onChange={handleChange} required />
                </div>
                <div class="col-md-3 col-sm-2 mb-3">
                    <label for="housenumber" class="form-label">Hausnr. *</label>
                    <input type="text" name="housenumber" class="form-control" value={formData.housenumber} onChange={handleChange} required />
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-3 col-sm-10 mb-3">
                    <label for="postalCode" class="form-label">PLZ *</label>
                    <input type="text" name="postalCode" class="form-control" value={formData.postalCode} onChange={handleChange} required />
                </div>
                <div class="col-md-9 col-sm-10 mb-3">
                    <label for="city" class="form-label">Ort *</label>
                    <input type="text" name="city" class="form-control" value={formData.city} onChange={handleChange} required />
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-10 mb-3">
                    <label for="clothingType" class="form-label">Art der Kleidungsstücke</label>
                    <select name="clothingType" class="form-select" defaultValue="Nicht ausgewählt" value={formData.clothingType} onChange={handleChange}>
                        <option value="Nicht ausgewählt">Bitte wählen</option>
                        <option value="Damenkleidung">Damenkleidung</option>
                        <option value="Herrenkleidung">Herrenkleidung</option>
                        <option value="Kinderkleidung">Kinderkleidung</option>
                        <option value="Heimtextilien">Heimtextilien</option>
                    </select>
                </div>
                <div class="col-md-4 col-sm-10 mb-3">
                    <label for="region" class="form-label">Krisenregion</label>
                    <select name="region" class="form-select" defaultValue="Nicht ausgewählt" value={formData.region} onChange={handleChange}>
                        <option value="Nicht ausgewählt">Bitte wählen</option>
                        <option value="Mittelerde">Mittelerde</option>
                        <option value="Westeros">Westeros</option>
                        <option value="Narnia">Narnia</option>
                        <option value="Temerien">Temerien</option>
                    </select>
                </div>
                <div class="col-md-4 col-sm-10 mb-3">
                    <label class="form-label mb-2">Abholtermin auswählen *</label><br />
                    <DatePicker
                        className="form-control w-100"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        openToDate={nextWeekday} // Setzt Startdatum auf den nächsten Wochentag
                        locale="de" // Locale auf Deutsch setzen
                        showTimeSelect // Zeitauswahl anzeigen
                        filterDate={isWeekday} // Nur Wochentage zulassen
                        filterTime={filterTime} // Zeit auf 10:00 bis 17:00 beschränken
                        maxDate={addDays(new Date(), 14)} // Nur 14 Tage in die Zukunft
                        minDate={subDays(new Date(), -1)} // Keine Tage in der Vergangenheit
                        dateFormat="Pp"
                        minTime={setHours(setMinutes(new Date(), 0), 9)} // 10:00 Uhr
                        maxTime={setHours(setMinutes(new Date(), 0), 17)} // 17:00 Uhr
                        placeholderText='Bitte auswählen'
                        onKeyDown={(e) => e.preventDefault()} // Verhindert Freitext-Eingabe
                    />
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-12 col-sm-10 mb-3">
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

export default PickupForm;