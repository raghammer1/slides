// In your components/SelectWithLabel.js or .jsx file
import React from 'react';

const SelectWithLabel = ({ label, value, setValue, options }) => {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={(e) => setValue(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectWithLabel;
