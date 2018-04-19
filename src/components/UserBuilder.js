import React, { Component } from 'react';
import axios from 'axios'
import { Col } from 'react-materialize'


class UserBuilder extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      id: null,
      repoCount: null,
      url: null,
      avatar: null
    }
  }


  getUser(username) {
    axios.get(`https://api.github.com/users/${username}`)
      .then(response => {
        let data = response.data
        this.setState({
          username: data.login,
          repoCount: data.public_repos,
          id: data.id,
          url: data.url,
          avatar: data.avatar_url
        })
        console.log('data', data)
        console.log('state', this.state);
        return response
      })
      .catch(e => console.log(e))
  }

  usernameSubmit(e) {
    e.preventDefault()
    let user = this.getUser(this.refs.username.value)
    console.log('user', user)
  }



  render() {

    let holder = this.props.languageArray.map((lang, i) => {
      return <p className="langTest" key={i}>{lang[0]} -> {lang[1]}</p>
    })

    let userCard =
      <div className="UserStyle">
        <p>
          Welcome {this.props.username}<br />
          Id number {this.props.id}<br />
          From {this.props.location}<br />
        </p>
        <img className="UserPic" border='3px solid rgba(21,171,195,1.0)' height ='64' width='64'src={this.props.avatar}/>
      </div>

    return (
      <div className="UserBuilder">

        {userCard}
        <p className="langTest">TOTAL CODE AMOUNT:</p>
        {holder}
      </div>
    );
  }
}

export default UserBuilder;

//  <form onSubmit={e => this.usernameSubmit(e)}>
  //   <input ref="username" type="text" placeholder="username"/>
  // </form>
