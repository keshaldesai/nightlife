import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Segment, Item, Button, Rating, Loader } from 'semantic-ui-react';

class BarList extends Component {
	renderList() {
		const { bars } = this.props;
		const keys = Object.keys(bars);
		if (keys.length === 0) {
			return <Loader active />;
		} else {
			return keys.map((key) => {
				const bar = bars[key];
				return (
					<Item key={bar.id}>
						<Item.Image size="medium" src={bar.icon} className="center-cropped" />
						<Item.Content>
							<Item.Header as="a">{bar.name}</Item.Header>
							<Item.Meta>
								<Rating defaultRating={bar.rating} maxRating={5} icon="star" size="large" disabled />
							</Item.Meta>
							<Item.Description>{bar.vicinity}</Item.Description>
							<Item.Extra>
								<Button>
									<Button.Content>Are you going?</Button.Content>
								</Button>
							</Item.Extra>
						</Item.Content>
					</Item>
				);
			});
		}
	}
	render() {
		return (
			<Segment style={{ marginBottom: "15px" }}>
				<Item.Group divided>
					{this.renderList()}
				</Item.Group>
			</Segment>
		);
	}
}

function mapStateToProps(state) {
	return {
		bars: state.bars.all
	};
}

export default connect(mapStateToProps, actions)(BarList);