import React, { useState } from 'react';
import './SwapSimulation.css';

export default function SwapSimulation() {
  // lock: 0 = unlocked, 1 = locked
  // key: 1 = has key, 0 = no key
  const [lock, setLock] = useState(0);
  const [key, setKey] = useState(1);
  const [log, setLog] = useState([]);
  const [swapping, setSwapping] = useState(false);

  // Simulate Swap lock acquisition
  const swap = () => {
    if (lock === 0 && key === 1) {
      setSwapping(true);
      setTimeout(() => {
        setLock(1);
        setKey(0);
        setLog((prev) => [...prev, 'Lock acquired (entered critical section)']);
        setSwapping(false);
      }, 800);
    } else {
      setLog((prev) => [...prev, 'Waiting for lock']);
    }
  };

  // Simulate releasing the lock
  const releaseLock = () => {
    if (lock === 1) {
      setSwapping(true);
      setTimeout(() => {
        setLock(0);
        setKey(1);
        setLog((prev) => [...prev, 'Lock released (exited critical section)']);
        setSwapping(false);
      }, 800);
    }
  };

  return (
    <div className="swap-root">
      <h2>Swap Simulation</h2>
      <div className="swap-visual-container">
        <div className={`circle lock-circle ${swapping ? 'swapping' : ''} ${lock === 1 ? 'locked' : 'unlocked'}`}>
          <span className="circle-label">Lock</span>
          <span className="circle-value">{lock}</span>
        </div>
        <div className="lock-symbol-container">
          {lock === 1 ? (
            <span className={`lock-symbol locked ${swapping ? 'swapping' : ''}`} title="Locked">&#128274;</span>
          ) : (
            <span className={`lock-symbol unlocked ${swapping ? 'swapping' : ''}`} title="Unlocked">&#128275;</span>
          )}
        </div>
        <div className={`circle key-circle ${swapping ? 'swapping' : ''} ${key === 1 ? 'has-key' : 'no-key'}`}>
          <span className="circle-label">Key</span>
          <span className="circle-value">{key}</span>
        </div>
      </div>
      <div className="buttons">
        <button onClick={swap} disabled={lock === 1 || key === 0 || swapping}>
          Acquire Lock
        </button>
        <button onClick={releaseLock} disabled={lock === 0 || swapping}>
          Release Lock
        </button>
      </div>
      <div className="log">
        <h3>Event Log:</h3>
        <ul>
          {log.map((entry, index) => (
            <li key={index} className="log-entry">
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
