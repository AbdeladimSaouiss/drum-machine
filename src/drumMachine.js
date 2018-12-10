import React, { Component } from 'react';
// import sample from './start-of-a-new-day.mp3'
import './App.css';

// const sample = './start-of-a-new-day.mp3'
const drumStyle = {
  boxShadow: "0px 3px 1px 4px rgba(255, 45, 45, 0.8)"
};

const drumActiveStyle = {
  transform: "translateY(3px)",
  boxShadow: "0px 1px 1px 2px rgba(255, 45, 45, 0.8)"
};

let drumpadData = [
  {index: 0 ,id: "Q", name:"Claps", style: drumStyle, song: "http://files.sampulator.com/sounds/claps/normal3.mp3"},
  {index: 1 ,id: "W", name:"Snare huge", style: drumStyle, song: "http://files.sampulator.com/sounds/snare/snare-huge-reverb.mp3"},
  {index: 2 ,id: "E", name:"kicks", style: drumStyle, song: "http://files.sampulator.com/sounds/kicks/punchy-trap.mp3"},
  {index: 3 ,id: "A", name:"Snare rim", style: drumStyle, song: "http://files.sampulator.com/sounds/snare/snare-rim-real.mp3"},
  {index: 4 ,id: "S", name:"Heater", style: drumStyle, song: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
  {index: 5 ,id: "D", name:"Dom", style: drumStyle, song: "http://files.sampulator.com/sounds/808/8084.mp3"},
  {index: 6 ,id: "Z", name:"triangle", style: drumStyle, song: "http://files.sampulator.com/sounds/perc/triangle.mp3"},
  {index: 7 ,id: "X", name:"Tom", style: drumStyle, song: "http://files.sampulator.com/sounds/perc/tom.mp3"},
  {index: 8 ,id: "C", name:"crash", style: drumStyle, song: "http://files.sampulator.com/sounds/cymbals/crash2.mp3"},
]


class Drumpad extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.props.handleKeyDown, false);
    document.addEventListener("keyup", this.props.handleKeyUp, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.props.handleKeyDown, false);
    document.addEventListener("keyup", this.props.handleKeyUp, false);
  }

  render() {
    return (
      <div className="drum-pad" onMouseDown={this.props.mouseDown} onMouseUp={this.props.mouseUp} data-name={this.props.drumpad.name} data-index={this.props.drumpad.index} style={this.props.drumpad.style}>
        <audio className="clip" src={this.props.drumpad.song} id={this.props.drumpad.id} />
        <span>{this.props.drumpad.id}</span>
      </div>
    )
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
      drumName: "",
      drumStyle: drumStyle
    };

    // this.handleClick = this.handleClick.bind(this); // Don't need this if use arrow function
  }

  // Play the drum sample
  playDrum = elem => {
    let drumSample = elem;
    drumSample.pause();
    drumSample.currentTime = 0;
    drumSample.play();
  };

  // Drup pad click handler
  handleMouseDown = e => {
    let drumpads = this.state.drumpads;
    drumpads[e.target.dataset.index].style = drumActiveStyle;
    this.playDrum(e.target.childNodes[0]);
    this.setState({
      drumpads: drumpads,
      drumName: e.target.dataset.name
    });
  };

  handleMouseUp = e => {
    let drumpads = this.state.drumpads;
    drumpads[e.target.dataset.index].style = drumStyle;
    this.setState({
      drumpads: drumpads,
    });
  }

  // Keydown handler
  handleKeyDown = e => {
    /**
     * Get the content of the right clicked keyboard key in filtered variable
     * by comparing the event.key to the id of this.state.drumpads
     */
    let filtered = this.state.drumpads.filter(
      drumpad => drumpad.id === e.key.toUpperCase()
    );
    /**
     * Make sure that filtered variable contains one explicit item and do the logic
     */
    if (filtered.length !== 0) {
      let drumpads = this.state.drumpads;
      drumpads[filtered[0].index].style = drumActiveStyle;
      this.playDrum(document.getElementById(filtered[0].id));
      this.setState({
        drumpads: drumpads,
        drumName: filtered[0].name
      });
    }
  };

  handleKeyUp = e => {
    let filtered = this.state.drumpads.filter(drumpad => drumpad.id === e.key.toUpperCase());
    if (filtered.length !== 0) {
      let drumpads = this.state.drumpads;
      drumpads[filtered[0].index].style = drumStyle;
      this.setState({
        drumpads: drumpads,
      });
    }
  }

  render() {
    return <div className="drum-machine" id="drum-machine">
        <Display drumName={this.state.drumName} />
        <div className="drum-pads">
          {this.state.drumpads.map((drumpad, i) => (
            <Drumpad
              key={`${drumpad.id}${i}`}
              drumpad={drumpad}
              mouseDown={this.handleMouseDown}
              mouseUp={this.handleMouseUp}
              handleKeyDown={this.handleKeyDown}
              handleKeyUp={this.handleKeyUp}
            />
          ))}
        </div>
      </div>;
  }
}

export default DrumMachine;
