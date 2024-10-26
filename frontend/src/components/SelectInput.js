import React from 'react';

const SelectInput = ({ id, name, label, value, onChange, children }) => (
    <div className="input-field">
        <label htmlFor={id} className="input-title">{label}</label>
        <select id={id} name={name} className="dropdown" value={value} onChange={onChange}>
            {children}
        </select>
    </div>
);

export default SelectInput;