import React, { Component } from 'react';

class MyCard extends Component {
  render() {
    return (
        <div><h2 className="logo">{this.props.title}</h2><h3>{this.props.subtitle}</h3> {this.props.content.map((item, key) =>
          <p key={key} >{item}</p>
      )}</div>
    )
  }
}


export default MyCard;
