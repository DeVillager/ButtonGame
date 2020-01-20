import React, { Component } from 'react';
import './App.css';


class App extends Component {

  // Initialize state
  state = { count: 0, points: 20, pointsToNextWin: -1, win: -1 };
  winValues = {500:250, 100:40, 10:5};
  

  // Fetch data after first mount
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Get the data and store them in state
    fetch('/api')
      .then(res => res.json())
      .then(count => this.setState({ count }));
  }

  pushData = () => {
    fetch('/api/data')
    .then(res => res.json())
    .then(count => this.setState({ count }));
  }

  render() {
    return ( 
      <div className="App">
          <div>
            <h1>BUTTON GAME</h1>
            <h1>Your points {this.state.points}</h1>
              {this.state.points < 1? <h2>You are out of points.</h2> : ''}
              {this.state.win > 0 ? <h2>You won {this.state.win} points!</h2> : <h2>----</h2>}
              <h1>Current button count {this.state.count}</h1>
              {this.state.points > 0 ? <button className="more" onClick={this.ResolveClick}>CLICK</button> : ''}
              {this.state.points < 1 ? <button className="more" onClick={this.Restart}>RESTART</button> : ''}
              {this.state.pointsToNextWin != -1 ? <h2>Next win in {this.state.pointsToNextWin} clicks</h2> : ''}
          </div>
      </div>
    );
  }

  ResolveClick = () => {
    this.pushData();
    var points = this.state.points;
    var counter = this.state.count;
    
    if (points < 1) {
        return;
    }

    points--;
    counter++;

    if (counter % 500 == 0) {
        points += 250;
        this.state.win = 250;
    } else if (counter % 100 == 0) {
        points += 40;
        this.state.win = 40;
    } else if (counter % 10 == 0) {
        points += 5;
        this.state.win = 5;
    } else {
        this.state.win = 0;
    }

    var x = Math.min(500 - counter % 500, 100 - counter % 100, 10 - counter % 10);
    this.setState({
        counter: counter,
        points: points,
        pointsToNextWin: x,
        });
    }

    Restart = () => {
        this.setState({
            points: 20,
        });
    }

}

export default App;