import React, { Component } from 'react';
import axios from 'axios'
import { Col } from 'react-materialize'


class RepoMan extends Component {
  constructor() {
    super()
    this.state = {
      recentRepos: {},
      languageRepos: {},
      languageArray: [],
    }
  }

  repoBro = () => {
    const promiseArray = this.state.recentRepos.map(e => {
      return axios.get(`http://api.github.com/repos/${e.owner.login}/${e.name}/languages`)
    })
    axios.all(promiseArray)
      .then((response) => {
        response.reduce((curr, next) => {
          for (var key in next.data) {
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
      .catch(e => console.log(e))
  }

  componentDidMount() {
    let userName = 'just-hey'
    axios.get(`https://api.github.com/users/${userName}/repos?sort=pushed`)
      .then((response) => {
        this.setState({
          recentRepos: response.data.slice(0,7)
        })
        this.repoBro()
      })
      .catch(e => console.log(e))
  }


  render() {

    let holder = this.state.languageArray.map((lang, i) => {
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
