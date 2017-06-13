import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Segment, Item, Loader } from 'semantic-ui-react';
import BarItem from './BarItem';

class BarList extends Component {
	renderList() {
		const { bars } = this.props;
		if (!bars) {
			return 'Server error.';
		}
		const keys = Object.keys(bars);
		if (keys.length === 0) {
			return <Loader active />;
		} else {
			return keys.map((key) => {
				const bar = bars[key];
				return (
					<BarItem bar={bar} key={bar.id} />
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
		bars: state.bars.all,
	};
}

export default connect(mapStateToProps, actions)(BarList);