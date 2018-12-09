import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator/error-indicator';
import PeoplePage from '../people-page/people-page';

import './app.css';

export default class App extends Component {

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

		const planet = this.state.showRandomPlanet ?
			<RandomPlanet /> :
			null;

		return (
			<div>
				<Header />
				{planet}

				<div className="row mb2 button-row db">
					<button
						className="toggle-planet btn btn-warning btn-lg"
						onClick={this.toggleRandomPlanet}>
						Toggle Random Planet
				</button>
					<ErrorButton />
				</div>
				<PeoplePage />
				<PeoplePage />
				<PeoplePage />
			</div >
		)
	}
};