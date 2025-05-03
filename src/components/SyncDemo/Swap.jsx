import { useState } from "react";
import "./Swap.css";

export default function Swap() {
  const [lock, setLock] = useState(false);
  const [key, setKey] = useState(false);
  const [output, setOutput] = useState("");

  function handleSwap() {
    const temp = lock;
    setLock(key);
    setKey(temp);

    if (!temp) {
      setOutput("Lock acquired! Critical section entered.");
      setTimeout(() => {
        setLock(false);
        setKey(false);
        setOutput("Lock released automatically after 2 seconds.");
      }, 2000);
    } else {
      setOutput("Lock already acquired. Please wait...");
    }
  }

  return (
    <div className="swap-root">
      <h2>Swap Demo</h2>
      <div className="swap-status">
        Lock: <b>{lock ? "🔒" : "🔓"}</b> | Key: <b>{key ? "🔑" : "🚫"}</b>
      </div>
      <button className="swap-btn" onClick={handleSwap}>
        Perform Swap
      </button>
      <div className="swap-output">{output}</div>
    </div>
  );
}
