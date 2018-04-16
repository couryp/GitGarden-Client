import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import { Route } from 'react-router-dom'
import axios from 'axios'
import UserBuilder from './UserBuilder'
import RepoMan from './RepoMan'
import Test from './Test'
import Side from './Side'

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recentRepos: {},
      languageRepos: {},
      languageArray: [],
      commitArray: []
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

        let swag = []
        for (let value in this.state.languageRepos) {
            swag.push([value, this.state.languageRepos[value]]);
        }
        swag.sort(function(a, b) {
            return b[1] - a[1];
        });
        this.setState({
          languageArray: swag
        })
        console.log('final', this.state.languageArray);
      })
      .catch(e => {

        console.log(e)
      })
  }

  getRepoCommit = () => {
    axios.post('http://localhost:8080/watson/analyzeTone', this.state.recentRepos)
      .then(res => {
        this.setState({
          commitArray: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })

  }

  componentDidMount() {
    let userName = 'couryp'


    axios.get(`https://api.github.com/users/${userName}/repos?sort=pushed`)
      .then((response) => {

        //limit repos
        let recentRepos = response.data.slice(0,1)

        this.setState({
          recentRepos: recentRepos
        })

        this.repoBro()
        this.getRepoCommit()
      })
      .catch(e => {

        console.log(e)
      })
  }

  render() {
    return(
      <Row className="Main">
        <Col s={3} className="lefty">
          <UserBuilder />
        </Col>
        <Col s={6} className="middy">
          { this.state.commitArray.length ? <Side width={600} height={400} commits={this.state.commitArray}/> : null}
        </Col>
        <Col s={3} className="righty">
          <RepoMan languageArray={this.state.languageArray} />
        </Col>
      </Row>
    )
  }
}

export default Main

// <Route path="/test" component={UserBuilder} />
// <Route path ="/test" component={RepoMan} />
//<Col s={8} className='Middle'></Col>
