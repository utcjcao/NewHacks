import React from 'react';

const TextInput = ({ id, name, type, label, placeholder, value, onChange }) => (
    <div className="input-field">
        <label htmlFor={id} className="input-title">{label}</label>
        <input
            id={id}
            name={name}
            type={type}
            className="text-input"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default TextInput;