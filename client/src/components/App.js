import React, { Component } from 'react';
import AutoForm from './AutoForm';
import { Container } from 'semantic-ui-react';
import BarList from './Bar/BarList';
import qs from 'qs';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class App extends Component {
	componentWillMount() {
		if (!this.props.authenticated) {
			const query = this.props.location.search;
			const parsed = qs.parse(query);
			parsed['?token'] ? this.initialLoad(parsed['?token'], true) : this.initialLoad(localStorage.getItem('token'), false);
		}
	}

	initialLoad(token, parsed) {
		if (!token) {
			return this.handleSearch(token);
		}
		this.props.checkAuth(token).then(() => {
			if (parsed) {
				localStorage.setItem('token', token);
				this.props.history.push('/');
			}
			return this.handleSearch(token);
		});
	}

	handleSearch(token) {
		const lastSearch = localStorage.getItem('lastSearch');
		if (lastSearch) {
			this.props.updateForm(lastSearch);
			geocodeByAddress(lastSearch)
				.then(results => getLatLng(results[0]))
				.then(latLng => {
					this.props.postLocation(latLng.lat + ',' + latLng.lng, token);
				})
				.catch(error => console.error('Error', error))
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
		authenticated: state.auth.authenticated,
		address: state.address.address,
	}
}

export default connect(mapStateToProps, actions)(App);