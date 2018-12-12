import React, { Component } from 'react';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import './people-page.css';

export default class PeoplePage extends Component {

	swapiService = new SwapiService();

	state = {
		selectedPerson: null
	};



	onPersonSelected = (id) => {
		this.setState({
			selectedPerson: id
		});
	};

	render() {

		if (this.state.hasError) {
			return <ErrorIndicator />;
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onPersonSelected}
				getData={this.swapiService.getAllPeople} >

				{(i) => (
					`${i.name} (${i.birthYear})`
				)}

			</ItemList>

		);

		const personalDetails = (
			<ErrorBoundry>
				<ItemDetails itemId={this.state.selectedPerson} />
			</ErrorBoundry>
		);

		return (
			<Row left={itemList} right={personalDetails} />
		);
	}

}