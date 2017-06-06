import React, { Component } from 'react';
import AutoForm from './AutoForm';
import { Container } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Container>
        <AutoForm />
      </Container>
    );
  }
}

export default App;