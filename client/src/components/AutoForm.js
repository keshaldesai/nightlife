import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Form, Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AutoForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = { address: '' }
		this.onChange = (address) => this.setState({ address })
	}

	handleFormSubmit = (event) => {
		event.preventDefault()

		geocodeByAddress(this.state.address)
			.then(results => getLatLng(results[0]))
			.then(latLng => {
				console.log(latLng.lat + ',' + latLng.lng);
				this.props.postLocation(latLng.lat + ',' + latLng.lng);
			})
			.catch(error => console.error('Error', error))
	}

	render() {
		const inputProps = {
			value: this.state.address,
			onChange: this.onChange,
		}
		return (
			<Form onSubmit={this.handleFormSubmit} style={{ width: '300px' }}>
				<Form.Field>
					<label>Where are you located?</label>
					<Input as={PlacesAutocomplete} inputProps={inputProps} />
				</Form.Field>
				<Button type="submit" color="red">Submit</Button>
			</Form>
		)
	}
}

function mapStateToProps(state) {
	return {
		bars: state.bars.all
	};
}

export default connect(mapStateToProps, actions)(AutoForm);