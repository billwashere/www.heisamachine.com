import React, { Component } from 'react';
import MyCard from './components/MyCard'
import './App.scss';

class App extends Component {


  render() {
    return (
      <div>
      <div className={"App-header"}>William Claydon - Business Intelligence Reporting Analyst</div>
        <div className="viewport">
            <div className="scene3D-container">
              <div className="scene3D">
              {this.props.cards.map((item, key) =>
    <MyCard key={key} title={item.title} content={item.content} />
)}

                
              </div>
            </div>
          </div>
          </div>
    );
  }
}

export default App;
