import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import { Route } from 'react-router-dom'
import axios from 'axios'
import UserBuilder from './UserBuilder'
import Key from './Key'
import Test from './Test'
import Canvas from './Canvas'

import LoadGif from '../assets/loading2.gif'

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recentRepos: {},
      languageRepos: {},
      languageArray: [],
      commitArray: [],
    }
  }

  repoBro = () => {
    const promiseArray = this.state.recentRepos.map(e => {

      return axios.get(`http://api.github.com/repos/${e.owner.login}/${e.name}/languages`)
    })
    axios.all(promiseArray)
      .then((response) => {

        response.reduce((curr, next) => {
          for (let key in next.data) {
            if(curr[key]){
              curr[key] = curr[key] + next.data[key]
            } else {
              curr[key] = next.data[key]
            }

          }
          this.setState({languageRepos:curr})
          return curr
        },{})
      })
      .then(test => {

        let langArray = []
        for (let value in this.state.languageRepos) {
            langArray.push([value, this.state.languageRepos[value]])
        }
        langArray.sort(function(a, b) {
            return b[1] - a[1]
        });
        this.setState({
          languageArray: langArray
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  getCommits = (username) => {
    axios.get(`http://localhost:8080/commits/${username}`)
      .then(res => {
        console.log('Got commits???', res.data);
        this.setState({
          commitArray: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getUserLang = (username) => {
    axios.get(`https://api.github.com/users/${username}/repos?sort=pushed`)
      .then((response) => {

        let recentRepos = response.data.slice(0,7)

        this.setState({
          recentRepos: recentRepos
        })

        this.repoBro()
      })
      .catch(e => {

        console.log(e)
      })
  }

  componentWillReceiveProps(nextProps) {
    // console.log('username', nextProps.username);
    if (nextProps.username) {
      this.getUserLang(nextProps.username)
      this.getCommits(nextProps.username)
    }
  }

  render() {
    return(
      <Row className="Main">
        <Col s={3} className="lefty">
        { this.props.username
          ? <UserBuilder languageArray={this.state.languageArray} username={this.props.username} id={this.props.id} avatar={this.props.avatar} location={this.props.location}/>
          : null
        }
        </Col>
        <Col s={6} className="middy">
          { this.state.commitArray.length ? <Canvas width={600} height={400} commits={this.state.commitArray}/> : null}
        </Col>
        <Col s={3} className="righty">
          <Key />
        </Col>
      </Row>
    )
  }
}

export default Main

// <Route path="/test" component={UserBuilder} />
// <Route path ="/test" component={Key} />
//<Col s={8} className='Middle'></Col>
