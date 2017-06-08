import React, { Component } from 'react';
import AutoForm from './AutoForm';
import { Container } from 'semantic-ui-react';
import BarList from './BarList';
import qs from 'qs';
import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component {
  componentWillMount() {
    if (!this.props.authenticated) {
      const query = this.props.location.search;
      const parsed = qs.parse(query);
      console.log(parsed);
      if (parsed['?token']) {
        const token = parsed.token;
        this.props.checkAuth(token).then(() => {
          localStorage.setItem('token', token);
          this.props.fetchUserInfo(token).then(() => {
            this.props.history.push('/');
          });
        });
      } else {
        const token = localStorage.getItem('token');
        if (token) {
          this.props.checkAuth(token).then(this.props.fetchUserInfo(token));
        }
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
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, actions)(App);