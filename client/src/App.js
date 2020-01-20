// Import modules.
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  // Initialize state
  state = { name: "default", count: 0, points: 20, pointsToNextWin: -1, win: -1 };

  // Fetch data after first mount
  componentDidMount() {
    this.getData();
  }

  // Gets data from server
  getData = () => {
    fetch('/api')
      .then(res => res.json())
      .then(count => this.setState({ count }));
  }

  // Pushes data to server
  pushData = () => {
    fetch('/api/data')
    .then(res => res.json())
    .then(count => this.setState({ count }));
  }

  // Renders the following HTML tags
  render() {
    return ( 
      <div className="App">
          <div>
            <h1>BUTTON GAME</h1>
                {/* Player points */}
                <h1>Your points {this.state.points}</h1>
                {/* Information if player is out of points or has won points */}
                {this.state.points < 1? <h2>You are out of points.</h2> : ''}
                {this.state.win > 0 ? <h2>You won {this.state.win} points!</h2> : <h2>----</h2>}
                {/* Play button. Calls function ResolveClick when clicked. */}
                {this.state.points > 0 ? <button className="more" onClick={this.ResolveClick}>CLICK</button> : ''}
                {/* Restart button is shown if player has no points. Next win shows how many click until the next win. */}
                {this.state.points < 1 ? <button className="more" onClick={this.Restart}>RESTART</button> : ''}
                {this.state.pointsToNextWin != -1 ? <h2>Next win in {this.state.pointsToNextWin} clicks</h2> : ''}
          </div>
      </div>
    );
  }

  //Resolves the button click.
  ResolveClick = () => {
    this.pushData();
    //Point and count amount from this.state are copied temporarily for variables.
    var points = this.state.points;
    var counter = this.state.count;
    
    // If player has no points, do nothing.
    if (points < 1) {
        return;
    }

    // Decrease the player's points and increase the button counter.
    points--;
    counter++;

    // If counter is multiply of 500, 100 or 10, increase the points with the corresponding amount and
    // change the state.win to same amount.
    if (counter % 500 == 0) {
        points += 250;
        this.state.win = 250;
    } else if (counter % 100 == 0) {
        points += 40;
        this.state.win = 40;
    } else if (counter % 10 == 0) {
        points += 5;
        this.state.win = 5;
    // If there's no win, set state.win to zero.
    } else {
        this.state.win = 0;
    }

    // Next win is always every 10. click, which is difference between ten and remainder of counter/10.
    var nextWin = (10 - counter % 10);
    // State is updated with the values changed in the function.
    this.setState({
        counter: counter,
        points: points,
        pointsToNextWin: nextWin,
        });
    }

    // Sets the player points to 20.
    Restart = () => {
        this.setState({
            points: 20,
        });
    }

}

export default App;