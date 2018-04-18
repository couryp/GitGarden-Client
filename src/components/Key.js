import React, { Component } from 'react'
import { Col } from 'react-materialize'
import Style from 'style-it'

class Key extends Component {

  render() {


    return Style.it(`
        .ColorMeYellow:hover{
          color: rgb(255, 256, 0);

        }
        .ColorMeGreen:hover{
          color: rgb(8, 224, 52);
        }
        .ColorMeRed:hover{
          color: rgb(206, 10, 62);
        }
        .ColorMeBlue:hover{
          color: rgb(0, 8, 255);
        }
        .ColorMePurple:hover{
          color: rgb(177, 8, 224);
        }
      `,
      <div className="Key">
        <p>Watson Tone Analyzer:</p>
        <p><span className="ColorMeYellow">Yellow</span> -> Joy</p>
        <p><span className="ColorMeGreen">Green</span> -> Disgust</p>
        <p><span className="ColorMeRed">Red</span> -> Anger </p>
        <p><span className="ColorMeBlue">Blue</span> -> Sadness </p>
        <p><span className="ColorMePurple">Purple</span> -> Fear </p>
      </div>
    )
  }
}

export default Key;
