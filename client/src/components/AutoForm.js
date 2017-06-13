import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Form, Button, Input, Segment, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AutoForm extends React.Component {
	renderSign() {
		if (this.props.authenticated) {
			return (
				<Button color="google plus" onClick={() => { this.props.signOutUser(localStorage.getItem('token')).then(localStorage.removeItem('token')) }}>
					<Icon name="google plus" /> Sign out
				</Button>
			);
		} else {
			return (
				<Button color="google plus" href="http://localhost:8000/auth/google">
					<Icon name="google plus" /> Sign in
    			</Button>
			);
		}
	}

	handleChange(address) {
		this.props.updateForm(address);
	}

	handleFormSubmit(event) {
		event.preventDefault()
		localStorage.setItem('lastSearch', this.props.address);
		geocodeByAddress(this.props.address)
			.then(results => getLatLng(results[0]))
			.then(latLng => {
				console.log(this.props.info.googleId);
				this.props.postLocation(latLng.lat + ',' + latLng.lng, this.props.info.googleId);
			})
			.catch(error => console.error('Error', error))
	}

	render() {
		const inputProps = {
			value: this.props.address,
			onChange: this.handleChange.bind(this),
		}
		return (
			<Segment style={{ marginTop: "15px" }} clearing>
				<Grid>
					<Grid.Column width={10}>
						<Form onSubmit={this.handleFormSubmit.bind(this)}>
							<Form.Field>
								<label>Where are you located?</label>
								<Input as={PlacesAutocomplete} inputProps={inputProps} />
							</Form.Field>
							<Button type="submit" color="grey">Submit</Button>
						</Form>
					</Grid.Column>
					<Grid.Column width={2}>
					</Grid.Column>
					<Grid.Column width={4}>
						{this.renderSign()}
					</Grid.Column>
				</Grid>
			</Segment>
		)
	}
}

function mapStateToProps(state) {
	return {
		address: state.address.address,
		authenticated: state.auth.authenticated,
		info: state.user.info
	};
}

export default connect(mapStateToProps, actions)(AutoForm);