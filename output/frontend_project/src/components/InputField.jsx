import React from 'react'

const InputField = ({ label, type = 'text', placeholder, value, onChange, error, required = false }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent ${
          error ? 'border-error' : 'border-neutral-300'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  )
}

export default InputField