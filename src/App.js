import React, { Component } from "react";
import "./scss/main.css";
import Sound from "./music/ocean-waves.mp3";

class App extends Component {
  state = {
    isMeditating: false,
    isMusicAllowed: true,
    breatheDirection: "Breathe In and Out"
  };

  startMeditation(time) {
    let { breatheDirection, isMusicAllowed } = this.state;

    // Start playing music if allowed
    let sound = new Audio(Sound);
    if (isMusicAllowed) {
      sound.play();
    }

    this.setState({ isMeditating: true });

    // Changing text from breah in to breath out and back
    let timer = setInterval(() => {
      if (breatheDirection === "Breath Out") {
        breatheDirection = "Breath In";
      } else {
        breatheDirection = "Breath Out";
      }
      this.setState({ breatheDirection });
    }, 5000);

    setTimeout(() => {
      clearInterval(timer); // Deleting the timer for text changing
      this.setState({ isMeditating: false }); // back to the main screen

      // Stop playing music
      sound.pause();
      sound.currentTime = 0;
    }, 60000 * time); // Stop meditation
  }

  render() {
    const { isMeditating, breatheDirection, isMusicAllowed } = this.state;

    const meditating = (
      <div className="meditating">
        <div className="outer-circle">
          <div className="inner-circle" />
        </div>
        <p className="tip">{breatheDirection}</p>
      </div>
    );

    const notMeditating = (
      <div>
        <h1 className="heading">Choose time to meditate:</h1>
        <div className="meditation-time">
          <button onClick={() => this.startMeditation(1)}>1 min</button>
          <button onClick={() => this.startMeditation(2)}>2 min</button>
          <button onClick={() => this.startMeditation(5)}>5 min</button>
        </div>
        <label
          className="music"
          htmlFor="music"
          onClick={() => this.setState({ isMusicAllowed: !isMusicAllowed })}
        >
          Music
          <input type="checkbox" defaultChecked={isMusicAllowed} id="music" />
        </label>
      </div>
    );

    return (
      <div className="App">{isMeditating ? meditating : notMeditating}</div>
    );
  }
}

export default App;
