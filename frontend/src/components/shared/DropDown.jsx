/* DropDown.jsx */
import React from 'react';

const DropDown = ({ 
  options = [], 
  selected, 
  onChange, 
  label = "Select",
  placeholder = "-- Choose --",
  disabled = false,
  required = false,
  className = "",
  valueKey = "_id",
  labelKey = "name"
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={selected || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={`w-full border rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white
            ${disabled ? 'bg-gray-100 text-gray-500' : ''}`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt[valueKey] || opt.id} value={opt[valueKey] || opt.id}>
              {opt[labelKey] || opt.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
