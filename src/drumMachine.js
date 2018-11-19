import React, { Component } from 'react';
// import sample from './start-of-a-new-day.mp3'
import './App.css';

// const sample = './start-of-a-new-day.mp3'

let drumpadData = [
  {id: "Q", song: "http://files.sampulator.com/sounds/claps/normal3.mp3"},
  {id: "W", song: "http://files.sampulator.com/sounds/snare/snare-huge-reverb.mp3"},
  {id: "E", song: "http://files.sampulator.com/sounds/kicks/punchy-trap.mp3"},
  {id: "A", song: "http://files.sampulator.com/sounds/snare/snare-rim-real.mp3"},
  {id: "S", song: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
  {id: "D", song: "http://files.sampulator.com/sounds/808/8084.mp3"},
  {id: "Z", song: "http://files.sampulator.com/sounds/perc/triangle.mp3"},
  {id: "X", song: "http://files.sampulator.com/sounds/perc/tom.mp3"},
  {id: "C", song: "http://files.sampulator.com/sounds/cymbals/crash2.mp3"},
]


class Drumpad extends Component {
  render() {
    return (
      <div className="drum-pad" id={this.props.id} onClick={this.props.onClick}>
        <audio className="audio" src={this.props.song}></audio>
      </div>
    );
  }
}


class DrumMachine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drumpads: drumpadData
    };

    // this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  // Play the drum sample
  playDrum = elem => {
    let drumSample = elem.childNodes[0];
    drumSample.pause();
    drumSample.currentTime = 0;
    drumSample.play();
  };

  handleClick = e => {
    // // console.log("Event type : ", e.type);
    // console.log("Event : ", e.target);
    // // console.log(e.type);
    this.playDrum(e.target);
  };
  
  handleKeyDown = (e) => {
    // console.log("Event : ", e.key.toUpperCase());
    let filtered = this.state.drumpads.filter(drumpad => drumpad.id === e.key.toUpperCase());
    if(filtered.length !== 0){
      this.playDrum(document.getElementById(filtered[0].id));
    }    
  };

  render() {
    return (
      <div className="drum-machine" id="drum-machine">
        <div id="display" />
        <div className="drum-pads">
          {this.state.drumpads.map((drumpad, i) => (
            <Drumpad
              id={drumpad.id}
              key={`${drumpad.id}${i}`}
              song={drumpad.song}
              onClick={this.handleClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default DrumMachine;
