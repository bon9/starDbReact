import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator/error-indicator';
import PeoplePage from '../people-page';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import ItemDetails from '../item-details'

import './app.css';

export default class App extends Component {

	swapiService = new SwapiService();

	state = {
		showRandomPlanet: true,
		hasError: false
	};

	toggleRandomPlanet = () => {
		this.setState((state) => {
			return {
				showRandomPlanet: !state.showRandomPlanet
			}
		});
	};

	componentDidCatch() {
		console.log('componentDidCatch()');
		this.setState({ hasError: true });
	}

	render() {

		if (this.state.hasError) {
			return <ErrorIndicator />
		}
		const { getPerson, getStarship,
			getPersonImage, getStarshipImage } = this.swapiService;

		const planet = this.state.showRandomPlanet ?
			<RandomPlanet /> :
			null;

		const personDetails = (
			<ItemDetails
				itemId={11}
				getData={getPerson}
				getImageUrl={getPersonImage} />
		);

		const starshipDetails = (
			<ItemDetails
				itemId={5}
				getData={getStarship}
				getImageUrl={getStarshipImage} />
		);

		return (
			<ErrorBoundry>
				<div className="stardb-app">
					<Header />
					{/* {planet}

					<div className="row mb2 button-row db">
						<button
							className="toggle-planet btn btn-warning btn-lg"
							onClick={this.toggleRandomPlanet}>
							Toggle Random Planet
					</button>
						<ErrorButton />
					</div>

					<PeoplePage /> */}
					<Row
						left={personDetails}
						right={starshipDetails}
					/>
				</div>
			</ErrorBoundry>
		);
	}
};