import React, { Component } from 'react';
// import sample from './start-of-a-new-day.mp3'
import './App.css';

// const sample = './start-of-a-new-day.mp3'

let drumpadData = [
  {id: "Q", name:"Claps", song: "http://files.sampulator.com/sounds/claps/normal3.mp3"},
  {id: "W", name:"Snare huge", song: "http://files.sampulator.com/sounds/snare/snare-huge-reverb.mp3"},
  {id: "E", name:"kicks", song: "http://files.sampulator.com/sounds/kicks/punchy-trap.mp3"},
  {id: "A", name:"Snare rim", song: "http://files.sampulator.com/sounds/snare/snare-rim-real.mp3"},
  {id: "S", name:"Heater", song: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
  {id: "D", name:"Dom", song: "http://files.sampulator.com/sounds/808/8084.mp3"},
  {id: "Z", name:"triangle", song: "http://files.sampulator.com/sounds/perc/triangle.mp3"},
  {id: "X", name:"Tom", song: "http://files.sampulator.com/sounds/perc/tom.mp3"},
  {id: "C", name:"crash", song: "http://files.sampulator.com/sounds/cymbals/crash2.mp3"},
]


class Drumpad extends Component {
  render() {
    return (
      <div className="drum-pad" onClick={this.props.onClick} data-name={this.props.name}>
        <audio className="clip" src={this.props.song} id={this.props.id}></audio>
        <span>{this.props.id}</span>
      </div>
    );
  }
}

class Display extends Component {
  render() {
    return (
      <div id="display" className="display">{this.props.drumName}</div>
    );
  }
}


class DrumMachine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drumpads: drumpadData,
      drumName: ""
    };

    // this.handleClick = this.handleClick.bind(this); // Don't need this if use arrow function
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  // Play the drum sample
  playDrum = elem => {
    let drumSample = elem;
    drumSample.pause();
    drumSample.currentTime = 0;
    drumSample.play();
  };

  // Drup pad click handler
  handleClick = e => {
    this.playDrum(e.target.childNodes[0]);
    this.setState({
      drumName: e.target.dataset.name
    })
  };
  
  // Keydown handler
  handleKeyDown = (e) => {
    /**
     * Get the content of the right clicked keyboard key in filtered variable
     * by comparing the event.key to the id of this.state.drumpads
     */
    let filtered = this.state.drumpads.filter(drumpad => drumpad.id === e.key.toUpperCase());
    /**
     * Make sure that filtered variable contains one explicit item and do the logic
     */
    if(filtered.length !== 0){
      this.playDrum(document.getElementById(filtered[0].id));
      this.setState({
        drumName: filtered[0].name
      })
    }    
  };

  render() {
    return (
      <div className="drum-machine" id="drum-machine">
        <Display drumName={this.state.drumName} />
        <div className="drum-pads">
          {this.state.drumpads.map((drumpad, i) => (
            <Drumpad
              id={drumpad.id}
              key={`${drumpad.id}${i}`}
              song={drumpad.song}
              onClick={this.handleClick}
              name={drumpad.name}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default DrumMachine;
