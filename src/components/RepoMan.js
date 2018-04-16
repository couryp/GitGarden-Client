import React, { Component } from 'react'
import { Col } from 'react-materialize'


class RepoMan extends Component {

  render() {

    let holder = this.props.languageArray.map((lang, i) => {
      return <p key={i}>{lang[0]} : {lang[1]}</p>
    })

    return (
      <div className="RepoMan">
        {holder}
      </div>
    )
  }
}

export default RepoMan;
