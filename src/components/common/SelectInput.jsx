import React from 'react';
import PropTypes from 'prop-types';

function SelectInput({ name, label, onChange, defaultOption, value, error, options }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={onChange} className="form-control">
        <option value="">{defaultOption}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

SelectInput.defaultProps = {
  defaultOption: '...Select',
  value: '',
  error: '',
  options: [],
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default SelectInput;
