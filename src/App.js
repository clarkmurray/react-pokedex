import React from 'react';
import $ from 'jquery';

import SearchBar from './SearchBar';
import AllPokemon from './AllPokemon';
import PokemonResult from './PokemonResult';


import { Route } from 'react-router-dom';

export default class App extends React.Component {

	constructor(props){
		super(props);
		this.state = { 
			searchFailed: false,
			isLoading: false
		}
	}

	render() {
		return (
			<div>
				<SearchBar />
				<div className="container">
					<Route exact path="/" component={AllPokemon} />
					<Route path="/:name" component={PokemonResult} />
				</div>
			</div>
		)
	}

}