import React, { Component } from 'react';
import axios from 'axios'
import { Col } from 'react-materialize'


class UserBuilder extends Component {
  state = {
      username: '',
      id: null,
      repoCount: null,
      url: null,
      avatar: null,
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
    let userCard;
    if(this.state.username) {
      userCard =
      <div>
        <p className="App-intro">
          welcome {this.state.username}<br />
          id {this.state.id}<br />
          repo count {this.state.repoCount}<br />
          url {this.state.url}<br />
        </p>
        <img height ='64' width='64'src={this.state.avatar}/>
      </div>
    }
    return (
      <div className="UserBuilder">
        <form onSubmit={e => this.usernameSubmit(e)}>
          <input ref="username" type="text" placeholder="username"/>
        </form>
        {userCard}

      </div>
    );
  }
}

export default UserBuilder;
