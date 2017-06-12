import React, { Component } from 'react';
import { Item, Rating } from 'semantic-ui-react';
import BarButton from './BarButton';

class BarItem extends Component {
	render() {
		const { icon, name, rating, vicinity, usersGoing, going, id } = this.props.bar;
		let usersGoingDesc;
		if (!usersGoing) {
			usersGoingDesc = 'Be the first to RSVP!';
		} else {
			usersGoingDesc = usersGoing === 1 ? `1 person going!` : `${usersGoing} people going!`;
		}
		return (
			<Item>
				<Item.Image size="medium" src={icon} className="center-cropped" />
				<Item.Content>
					<Item.Header as="a">{name}</Item.Header>
					<Item.Meta>
						<Rating defaultRating={rating} maxRating={5} icon="star" size="large" disabled />
					</Item.Meta>
					<Item.Description>{vicinity}</Item.Description>
					<Item.Description>{usersGoingDesc}</Item.Description>
					<Item.Extra>
						<BarButton going={going} barId={id} />
					</Item.Extra>
				</Item.Content>
			</Item>
		);
	}
}

export default BarItem;