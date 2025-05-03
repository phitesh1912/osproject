import React, { useState } from 'react';
import './TestAndSetSimulation.css';

export default function TestAndSetSimulation() {
  // lock: 0 = unlocked, 1 = locked
  // myFlag: 0 = not requesting, 1 = requesting
  const [lock, setLock] = useState(0);
  const [myFlag, setMyFlag] = useState(0);
  const [log, setLog] = useState([]);
  const [testing, setTesting] = useState(false);

  // Simulate test-and-set lock acquisition
  const testAndSet = () => {
    setTesting(true);
    setMyFlag(1);
    setTimeout(() => {
      if (lock === 0) {
        setLock(1);
        setLog((prev) => [...prev, 'Lock acquired (entered critical section)']);
      } else {
        setLog((prev) => [...prev, 'Lock busy, spinning...']);
      }
      setTesting(false);
    }, 800);
  };

  // Simulate releasing the lock
  const releaseLock = () => {
    setTesting(true);
    setTimeout(() => {
      setLock(0);
      setMyFlag(0);
      setLog((prev) => [...prev, 'Lock released (exited critical section)']);
      setTesting(false);
    }, 800);
  };

  return (
    <div className="tas-root">
      <h2>Test-and-Set Simulation</h2>
      <div className="tas-visual-container">
        <div className={`circle lock-circle ${testing ? 'testing' : ''} ${lock === 1 ? 'locked' : 'unlocked'}`}>
          <span className="circle-label">Lock</span>
          <span className="circle-value">{lock}</span>
        </div>
        <div className="lock-symbol-container">
          {lock === 1 ? (
            <span className={`lock-symbol locked ${testing ? 'testing' : ''}`} title="Locked">&#128274;</span>
          ) : (
            <span className={`lock-symbol unlocked ${testing ? 'testing' : ''}`} title="Unlocked">&#128275;</span>
          )}
        </div>
        <div className={`circle flag-circle ${testing ? 'testing' : ''} ${myFlag === 1 ? 'requesting' : 'idle'}`}>
          <span className="circle-label">My Flag</span>
          <span className="circle-value">{myFlag}</span>
        </div>
      </div>
      <div className="buttons">
        <button onClick={testAndSet} disabled={lock === 1 || myFlag === 1 || testing}>
          Test-and-Set Lock
        </button>
        <button onClick={releaseLock} disabled={lock === 0 || testing}>
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
