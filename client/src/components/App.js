import React, { Component } from 'react';
import AutoForm from './AutoForm';
import { Container } from 'semantic-ui-react';
import BarList from './BarList';

class App extends Component {
  componentWillMount() {
    if (!this.props.authenticated) {
      const query = this.props.location.search;
      const parsed = queryString.parse(query);
      if (parsed.token) {
        const token = parsed.token;
        this.props.checkAuth(token).then(() => {
          localStorage.setItem('token', token);
          this.props.fetchUserInfo(token).then(() => {
            this.props.history.push('/profile');
          });
        });
      } else {
        const token = localStorage.getItem('token')
        this.props.checkAuth(token).then(this.props.fetchUserInfo(token));
      }
    }

  }
  render() {
    return (
      <Container style={{ width: "600px" }}>
        <AutoForm />
        <BarList />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    checking: state.auth.checking,
    info: state.user.info
  }
}

export default App;