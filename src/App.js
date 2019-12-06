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
<div>
  <h2 className="logo">Contact Me</h2>
  <p class="h-card">
    <p>
  <a class="p-name u-url" href="/">William Claydon</a>
  </p><p>
  <a class="u-email" href="mailto:will@heisamachine.com">Email will@heisamachine.com</a>, 
  </p>
  <p>
  <span class="p-locality">Wollongong</span>
  </p>
  <p>
  <span class="p-country-name">Australia</span>
  </p>
</p>
<p>
    <a href="https://www.linkedin.com/in/william-claydon-25101853" target="_blank" rel="noopener noreferrer">Linkdin Profile</a>
    </p>
  <p>
    <a href="https://github.com/billwashere/www.heisamachine.com" target="_blank" rel="noopener noreferrer">Want to see the website source? It's written in React and Redux</a>
    </p>
    <p>
    <a href="https://www.freecodecamp.org/news/css-3d-scrolling-on-the-z-axis-92503c3ecf3f/" target="_blank" rel="noopener noreferrer">Disclaimer: much of the Vincent Humeau freecodecamp Article</a>
    </p>
</div>
                
              </div>
            </div>
          </div>
          </div>
    );
  }
}

export default App;
