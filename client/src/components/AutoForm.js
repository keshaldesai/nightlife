import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Form, Button, Input, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AutoForm extends React.Component {
	componentWillMount() {
		const lastSearch = localStorage.getItem('lastSearch');
		if (lastSearch) {
			this.props.updateForm(lastSearch);
			geocodeByAddress(lastSearch)
				.then(results => getLatLng(results[0]))
				.then(latLng => {
					this.props.postLocation(latLng.lat + ',' + latLng.lng);
				})
				.catch(error => console.error('Error', error))
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
				this.props.postLocation(latLng.lat + ',' + latLng.lng);
			})
			.catch(error => console.error('Error', error))
	}

	render() {
		const inputProps = {
			value: this.props.address,
			onChange: this.handleChange.bind(this),
		}
		return (
			<Segment style={{ marginTop: "15px" }}>
				<Form onSubmit={this.handleFormSubmit.bind(this)} style={{ width: "300px" }}>
					<Form.Field>
						<label>Where are you located?</label>
						<Input as={PlacesAutocomplete} inputProps={inputProps} />
					</Form.Field>
					<Button type="submit" color="red">Submit</Button>
				</Form>
			</Segment>
		)
	}
}

function mapStateToProps(state) {
	return {
		address: state.address.address
	};
}

export default connect(mapStateToProps, actions)(AutoForm);