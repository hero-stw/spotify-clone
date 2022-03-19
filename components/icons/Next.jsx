import React from 'react'

const NextButton = () => {
  return (
    <button
      className="button"
      aria-label="Next"
      data-testid="control-button-skip-forward"
    >
      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
        <path
          d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"
          fill="#ffffff"
        ></path>
      </svg>
    </button>
  )
}

export default NextButton
