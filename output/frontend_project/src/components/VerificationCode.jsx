import React, { useState, useRef, useEffect } from 'react'

const VerificationCode = ({ length = 6, onComplete }) => {
  const [code, setCode] = useState(Array(length).fill(''))
  const inputRefs = useRef([])

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus()
    }

    if (newCode.every(digit => digit !== '')) {
      onComplete(newCode.join(''))
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').slice(0, length)
    if (/^\d+$/.test(pasteData)) {
      const newCode = pasteData.split('').concat(Array(length - pasteData.length).fill(''))
      setCode(newCode)
      if (pasteData.length === length) {
        onComplete(pasteData)
      }
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
        />
      ))}
    </div>
  )
}

export default VerificationCode