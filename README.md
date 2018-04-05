<Route exact path="/test" render={props => (
  <UserBuilder saveUser = {this.saveUser} {...props} />
)} />


class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      allData: {},
      username: '',
      id: null,
      repoCount: null,
      url: null,
      avatar: null,
    }
  }

  saveUser = (allData, username, id, repoCount, url, avatar) => {
    this.setState{

      username: username,
      id: id,
      repoCount: repoCount,
      url: url,
      avatar: avatar
    }
  }
