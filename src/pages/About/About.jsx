import "./About.css";

export default function About() {
  return (
    <div className="about-root">
      <h1>About the Project</h1>
      <p>
        This project demonstrates Inter Process Communication (IPC) using hardware synchronization primitives such as <b>TestAndSet</b> and <b>Swap</b>. The aim is to visualize and understand how mutual exclusion is achieved at a low level.
      </p>

      <h2>Faculty In-Charge</h2>
      <div className="about-section">
        <div className="about-card">
          <img
            className="profile-picture"
            src="/images/deepthi-shetty.jpg"
            alt="Ms. Deepthi Shetty"
          />
          <div className="person-details">
            <div className="person-name">Ms. Deepthi Shetty</div>
            <div className="person-role">Faculty In-Charge</div>
          </div>
        </div>
      </div>

      <h2>Team Members</h2>
      <div className="about-section about-team-cards">
         <div className="about-card">
          <img
            className="profile-picture"
            src="/images/abhijna.jpg"
            alt="abhijna"
          />
          <div className="person-details">
            <div className="person-name">Abhijna S P</div>
            <div className="person-role">Team Member</div>
          </div>
        </div>
        <div className="about-card">
          <img
            className="profile-picture"
            src="/images/hitesh.jpg"
            alt="hitesh"
          />
          <div className="person-details">
            <div className="person-name">P Hitesh</div>
            <div className="person-role">Team Member</div>
          </div>
        </div>
      </div>
    </div>
  );
}
