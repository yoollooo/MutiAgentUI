import React, { useEffect } from 'react'

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const typeStyles = {
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-warning text-white',
    info: 'bg-primary-600 text-white'
  }

  return (
    <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg ${typeStyles[type]} z-50`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-neutral-100 focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Toast