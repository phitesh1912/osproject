import "./Documentation.css";

export default function Documentation() {
  return (
    <div className="doc-root">
      <h1>Documentation</h1>
      <p>
        <b>Inter Process Communication (IPC)</b> enables processes to coordinate and share data. This project focuses on hardware-based synchronization using <b>TestAndSet</b> and <b>Swap</b> instructions.
      </p>
      <h2>TestAndSet</h2>
      <p>
        <b>TestAndSet</b> is an atomic instruction that tests a lock and sets it in a single operation. It is used to implement spinlocks and ensures mutual exclusion in critical sections.
      </p>
      <pre>
{`while (TestAndSet(&lock)) {
  // busy wait
}
// critical section
lock = false;`}
      </pre>
      <h2>Swap</h2>
      <p>
        <b>Swap</b> atomically exchanges values of two variables. It can also be used to implement locks and mutual exclusion.
      </p>
      <pre>
{`key = true;
do {
  Swap(&lock, &key);
} while (key);
// critical section
lock = false;`}
      </pre>
      <p>
        Both methods are illustrated interactively on the Home page.
      </p>
    </div>
  );
}
