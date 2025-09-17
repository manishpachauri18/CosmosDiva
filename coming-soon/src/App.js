//import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [userEmail, setuserEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate on input change (real-time)
  function handleEmailChange(e) {
    const email = e.target.value;
    setuserEmail(email);

    if (email && !emailRegex.test(email)) {
      //setErrorMsg("Please enter a valid email address.");
    } else {
      setErrorMsg("");
    }
  }

  async function SendEmail(event) {
    event.preventDefault();

    if (!userEmail) {
      //setErrorMsg("Email is required.");
      return;
    }
    if (!emailRegex.test(userEmail)) {
      //setErrorMsg("Please enter a valid email address.");
      return;
    }

    setErrorMsg("");
    setIsSending(true); // <-- Disable inputs and show loading

    const emailData = {
      to: "manishp@ibosstech-us.com",
      subject: "✨ New Subscriber Alert - CosmoDiva",
      text: `Hello CosmoDiva Team,

        Good news! 🎉
        A new user has just subscribed to your newsletter.

        Subscriber Email: ${userEmail}

        Make sure to add them to your mailing list and keep them updated with your latest launches, health tips, and exclusive content.

        Cheers,
        Manoj Tiwari`
    };

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });
      const data = await response.json();

      if (data.message === "Email sent successfully") {
        alert("Thank you for your interest we will contact you soon ");
        setuserEmail(""); // Clear email after success
      } else {
        console.log("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsSending(false); // <-- Re-enable inputs/button
    }
  }

  return (
    <div className="App">
      <header>
        <div class="logo">
          <i class="fas fa-venus logo-icon"></i>
          <h1 class="logo-text">CosmoDiva</h1>
        </div>
      </header>

      <div class="container">
        <section class="hero">
          <h1>Know Your Body's Rhythm</h1>
          <p>
            CosmoDiva is a revolutionary health tracker designed specifically
            for women of all age group. Track your periods, monitor your health,
            get pregnancy support, and much more - all in one beautiful app.
          </p>
        </section>

        <section class="features">
          <div class="feature">
            <i class="fas fa-calendar-alt feature-icon"></i>
            <h3>Period Tracker</h3>
            <p>
              Predict your cycle, track symptoms, and never be surprised by your
              period again.
            </p>
          </div>

          <div class="feature">
            <i class="fas fa-heartbeat feature-icon"></i>
            <h3>Health Monitor</h3>
            <p>
              Keep track of your overall health with customized metrics and
              reminders.
            </p>
          </div>

          <div class="feature">
            <i class="fas fa-baby feature-icon"></i>
            <h3>Pregnancy Help</h3>
            <p>
              Weekly guidance, symptom tracking, and expert advice for expecting
              mothers.
            </p>
          </div>
        </section>

        <section class="subscription">
          <h2>Be the First to Know When We Launch!</h2>
          <p>
            Subscribe to our newsletter and we'll notify you when CosmoDiva is
            available.
          </p>

          <form id="subscribe-form" onSubmit={SendEmail}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={userEmail}
                onChange={handleEmailChange}
                required
                disabled={isSending} // <-- disable input while sending
              />
              {errorMsg && (
                <div
                  style={{
                    color: "red",
                    marginTop: "5px",
                    fontSize: "0.9em",
                  }}
                >
                  {errorMsg}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn pulse"
              disabled={!emailRegex.test(userEmail) || !userEmail || isSending} // ✅ fixed condition
              style={{ position: "relative" }}
            >
              {isSending ? (
                <>
                  <img
                    src="https://i.gifer.com/ZZ5H.gif"
                    alt="loading"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                      verticalAlign: "middle",
                    }}
                  />
                  Please wait...
                </>
              ) : (
                "Subscribe Now"
              )}
            </button>
          </form>
        </section>
      </div>

      <footer>
        <div class="social-links">
          <a
            href="https://www.facebook.com/profile.php?id=61580593052474"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-facebook"></i>
          </a>
          <a
            href="https://instagram.com/mycosmodiva"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            href="https://x.com/mycosmodiva"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-twitter"></i>
          </a>
          {/* <a href="#">
            <i class="fab fa-pinterest"></i>
          </a> */}
        </div>
        <p>&copy; 2025 CosmoDiva. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
