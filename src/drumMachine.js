import React, { Component } from 'react';
import './App.css';

class Drumpad extends Component {
  render() {
    return (
      <div className="drum-pad" id="Q">
        this is a druum pad
      </div>
    );
  }
}


class DrumMachine extends Component {
  render() {
    return (
      <div className="drum-machine" id="drum-machine">
        <div id="display">

        </div>

        <Drumpad />
      </div>
    );
  }
}

export default DrumMachine;
