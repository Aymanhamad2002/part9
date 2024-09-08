import { ChangeEvent, useState } from "react";
import { Diagnosis, newEntry } from "../../../types";
import { HealthCheckRating } from "../../../types";

interface Props {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialList: React.Dispatch<React.SetStateAction<string>>;
  diagCode: Array<string>;
  setDiagCode: React.Dispatch<React.SetStateAction<Array<string>>>;
  diagnoses: Diagnosis[];
  id: string;
  createEntry: (id: string, entry: newEntry) => void;
}

const NewHealthCheck = ({
  description,
  setDescription,
  date,
  setDate,
  specialist,
  setSpecialList,
  setDiagCode,
  diagCode,
  diagnoses,
  id,
  createEntry,
}: Props): JSX.Element => {
  const [HealthCheckRate, setHCR] = useState<number>(0);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntr: newEntry = {
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: diagCode,
      type: "HealthCheck",
      healthCheckRating: HealthCheckRate,
    };
    createEntry(id, newEntr);
  };

  const handleRateChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setHCR(Number(event.target.value));
  };

  const handleDiagChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedCodes = Array.from(event.target.selectedOptions, option => option.value);
    setDiagCode(selectedCodes);
  };

  function handleDescriptionChange(event: ChangeEvent<HTMLInputElement>): void {
    setDescription(event.target.value);
  }

  function handleDateChange(event: ChangeEvent<HTMLInputElement>): void {
    setDate(event.target.value);
  }

  function handleSpecialistChange(event: ChangeEvent<HTMLInputElement>): void {
    setSpecialList(event.target.value);
  }

  // Filter to get only the enum's string values (skip numeric ones)
  const healthCheckRatingOptions = Object.keys(HealthCheckRating)
    .filter((key) => isNaN(Number(key))) // This filters out numeric keys
    .map((key) => {
      return (
        <option value={HealthCheckRating[key as keyof typeof HealthCheckRating]} key={key}>
          {key}
        </option>
      );
    });

  return (
    <div>
      <form onSubmit={addEntry}>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            value={description}
            type="text"
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input id="date" value={date} type="date" onChange={handleDateChange} />
        </div>
        <div>
          <label htmlFor="specialist">Specialist</label>
          <input
            id="specialist"
            value={specialist}
            type="text"
            onChange={handleSpecialistChange}
          />
        </div>
        <div>
          <label htmlFor="diagnosisCodes">Diagnosis Codes</label>
          <select name="diagnosisCodes" multiple onChange={handleDiagChange}>
            {diagnoses.map((s, i) => (
              <option value={s.code} key={i}>
                {s.code}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="healthCheckRating">Health Check Rating</label>
          <select name="rate" onChange={handleRateChange}>
            {healthCheckRatingOptions}
          </select>
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default NewHealthCheck;
