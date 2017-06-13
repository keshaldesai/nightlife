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
			if (parsed['?token']) {
				const token = parsed['?token'];
				this.props.checkAuth(token).then(() => {
					localStorage.setItem('token', token);
					this.props.fetchUserInfo(token).then(() => {
						this.props.history.push('/');
						this.handleSearch();
					});
				});
			} else {
				const token = localStorage.getItem('token');
				if (token) {
					this.props.checkAuth(token).then(() => {
						this.props.fetchUserInfo(token)
					}).then(() => {
						this.handleSearch();
					});

				}
			}
		}
	}

	handleSearch() {
		const lastSearch = localStorage.getItem('lastSearch');
		const token = localStorage.getItem('token');
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
		address: state.address.address
	}
}

export default connect(mapStateToProps, actions)(App);