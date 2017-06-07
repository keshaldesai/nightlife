import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Segment, Item, Button, Icon, Rating } from 'semantic-ui-react';

class BarList extends Component {
	renderList() {
		const { bars } = this.props;
		const keys = Object.keys(bars);
		if (keys.length === 0) {
			return 'No bars found.';
		} else {
			return keys.map((key) => {
				const bar = bars[key];
				return (
					<Item key={bar.id}>
						<Item.Image src={bar.icon} />
						<Item.Content>
							<Item.Header as='a'>{bar.name}</Item.Header>
							<Item.Meta>
								<span className='cinema'>
									<Rating defaultRating={bar.rating} maxRating={5} disabled />
								</span>
							</Item.Meta>
							<Item.Extra>
								<Button primary floated='right'>
									I'm going
            					<Icon name='right chevron' />
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
			<Segment>
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