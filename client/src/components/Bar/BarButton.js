import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class BarButton extends Component {
	handleClick(barId, rsvp) {
		const token = localStorage.getItem('token');
		const { address } = this.props;
		this.props.rsvpSet(barId, token, rsvp).then(() => {
			geocodeByAddress(address)
				.then(results => getLatLng(results[0]))
				.then(latLng => {
					this.props.postLocation(latLng.lat + ',' + latLng.lng, token);
				})
				.catch(error => console.error('Error', error))
		})
	}
	renderButton() {
		const { going, barId, authenticated } = this.props;
		if (!authenticated) {
			return (
				<Button color='google plus' href="http://localhost:8000/auth/google">
					<Icon name='google plus' /> Sign in to RSVP
    			</Button>
			);
		}
		if (going) {
			return (
				<Button color="green" onClick={this.handleClick.bind(this, barId, false)}>
					<Button.Content>I'm going!</Button.Content>
				</Button>

			);
		} else {
			return (
				<Button color="blue" onClick={this.handleClick.bind(this, barId, true)}>
					<Button.Content>Are you going?</Button.Content>
				</Button>
			);
		}
	}
	render() {
		return (
			<div>
				{this.renderButton()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		address: state.address.address,
	};
}

export default connect(mapStateToProps, actions)(BarButton);