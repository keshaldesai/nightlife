import React, { Component } from 'react';
import AutoForm from './AutoForm';
import { Container } from 'semantic-ui-react';
import BarList from './BarList';

class App extends Component {
  render() {
    return (
      <Container text>
        <AutoForm />
        <BarList />
      </Container>
    );
  }
}

export default App;