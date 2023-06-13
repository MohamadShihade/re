import React from "react";
import "./DropDownSelect.css";

const DropDownSelect = ({ options, onChange }) => {
  return (
    <div className="filter_select">
      <div className="form-group">
        <label htmlFor="filter" className="filter_label">
          Filter by{" "}
        </label>
        <select id="filter" name="role" onChange={onChange}>
          {options.map((op) => (
            <option value={op.value}>{op.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropDownSelect;
