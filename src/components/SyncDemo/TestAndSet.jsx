import { useState } from "react";
import "./TestAndSet.css";

export default function TestAndSet() {
  const [lock, setLock] = useState(false);
  const [output, setOutput] = useState("");

  function handleAcquire() {
    if (!lock) {
      setLock(true);
      setOutput("Lock acquired! Critical section entered.");
      setTimeout(() => {
        setLock(false);
        setOutput("Lock released automatically after 2 seconds.");
      }, 2000);
    } else {
      setOutput("Lock already acquired. Please wait...");
    }
  }

  return (
    <div className="tas-root">
      <h2>TestAndSet Demo</h2>
      <div className="tas-status">
        Status: <b>{lock ? "🔒 Locked" : "🔓 Unlocked"}</b>
      </div>
      <button className="tas-btn" onClick={handleAcquire} disabled={lock}>
        {lock ? "Locked..." : "Acquire Lock"}
      </button>
      <div className="tas-output">{output}</div>
    </div>
  );
}
