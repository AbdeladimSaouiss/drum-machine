import React, { Component } from 'react';
import sample from './start-of-a-new-day.mp3'
import './App.css';

// const sample = './start-of-a-new-day.mp3'

let drumpadData = [
  {id: "Q", song: sample},
  {id: "W", song: sample},
  {id: "E", song: sample},
  {id: "A", song: sample},
  {id: "S", song: sample},
  {id: "D", song: sample},
  {id: "Z", song: sample},
  {id: "X", song: sample},
  {id: "C", song: sample},
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
    super(props)

    this.state = {
      drumpads : drumpadData
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (e) => {
    // console.log(e.target.childNodes[0].src);
    e.target.childNodes[0].play();
  }

  render() {
    return (
      <div className="drum-machine" id="drum-machine">
        <div id="display"></div>
        <div className="drum-pads">
          {this.state.drumpads.map((drumpad, i) => <Drumpad id={drumpad.id} key={`${drumpad.id}${i}`} song={drumpad.song} onClick={this.handleClick} />)}
        </div>
      </div>
    );
  }
}

export default DrumMachine;
