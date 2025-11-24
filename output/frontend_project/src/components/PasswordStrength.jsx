import React from 'react'

const PasswordStrength = ({ strength = 0 }) => {
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['bg-error', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success']
  
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full ${
              level <= strength ? strengthColors[strength - 1] : 'bg-neutral-200'
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-neutral-600">
        Password strength: <span className="font-medium">{strengthLabels[strength - 1] || 'None'}</span>
      </p>
    </div>
  )
}

export default PasswordStrength