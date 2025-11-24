import React from 'react'

const CheckboxGroup = ({ label, options = [], selectedValues = [], onChange, error }) => {
  const handleCheckboxChange = (value) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]
    onChange(newSelectedValues)
  }

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>}
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
            <span className="ml-2 text-sm text-neutral-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  )
}

export default CheckboxGroup