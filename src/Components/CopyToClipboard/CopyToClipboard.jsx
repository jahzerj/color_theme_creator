import React, { useState, useEffect } from 'react';
import './CopyToClipboard.css';

export default function CopyToClipboard({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopying() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true); //success message!
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Failed to copy to clipboard. Please try again.');
    }
  }

  useEffect(() => {
    let timerId;

    if (copied) {
      timerId = setTimeout(() => setCopied(false), 3000); //starts are timer for resetting alert
    }

    return () => {
      // cleanup to reset timer
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [copied]); //dependency relies on copied state change

  return (
    <span className="copy-to-clipboard">
      {copied ? (
        <div className="copied-feedback">Successfully Copied!</div> // success message
      ) : (
        <button className="copy-button" onClick={handleCopying}>
          COPY
        </button>
      )}
    </span>
  );
}
