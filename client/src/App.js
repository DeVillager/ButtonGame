import React, { Component } from 'react';
import './App.css';


class App extends Component {

  // Initialize state
  state = { passwords: [], count: 0, points: 20, pointsToNextWin: -1 }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(count => this.setState({ count }));
  }

  render() {
    return ( 
      <div className="App">
        {/* Render the passwords if we have them */}
        
          <div>
            <h1>BUTTON GAME</h1>
            <h1>Your points {this.state.points}</h1>
              {this.state.points < 1 ? <h2>You are out of points.</h2> : ''}
              <h1>Current button count {this.state.count}</h1>
              {this.state.points > 0 ? <button className="more" onClick={this.ResolveClick}>CLICK</button> : ''}
              {this.state.points < 1 ? <button className="more" onClick={this.Restart}>RESTART</button> : ''}
              {this.state.pointsToNextWin != -1 ? <h2>Next win in {this.state.pointsToNextWin} clicks</h2> : ''}
          </div>

      </div>
    );
  }

  ResolveClick = () => {
    this.getPasswords();
    var points = this.state.points;
    var counter = this.state.count;
    
    if (points < 1) {
        return;
    }

    points--;
    counter++;

    if (counter % 500 == 0) {
        points += 250;
    } else if (counter % 100 == 0) {
        points += 40;
    } else if (counter % 10 == 0) {
        points += 5;
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