
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!eventDate) {
      setTimeLeft(null);
      return;
    }

    const target = new Date(eventDate).getTime();

    const updateTimer = () => {
      const difference = target - Date.now();
      setTimeLeft(Math.max(0, difference));
    };

    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const getTime = (ms) => {
    const total = Math.floor(ms / 1000);

    return {
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60,
    };
  };

  const countdown =
    timeLeft !== null ? getTime(timeLeft) : null;

  return (
    <div className="app">
      <h1>Event Countdown</h1>
      <p>Count every second until your special day!</p>

      <input
        type="text"
        placeholder="Enter event name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />

      <input
        type="datetime-local"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />

      <h2>{eventName || "Your Event"}</h2>

      {!eventDate ? (
        <p>Select your event date and time.</p>
      ) : timeLeft === 0 ? (
        <h2>Your event has started!</h2>
      ) : (
        <div className="timer">
          <div><strong>{countdown.days}</strong>Days</div>
          <div><strong>{countdown.hours}</strong>Hours</div>
          <div><strong>{countdown.minutes}</strong>Minutes</div>
          <div><strong>{countdown.seconds}</strong>Seconds</div>
        </div>
      )}
    </div>
  );
}

export default App;
