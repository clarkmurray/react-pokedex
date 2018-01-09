import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

import SearchBar from './SearchBar';
import PokemonResult from './PokemonResult';
import LoadingSpinner from './LoadingSpinner';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = { 
			pokemon: '',
			height: 0,
			weight: 0,
			url: '',
			id: null,
			types: [],
			abilities: [],
			isLoading: false
		}
		this.onSearch = this.onSearch.bind(this);
	}

	render() {
		return (
			<div>
				<div className="col text-center">
					<h1>React Pokedex</h1>
				</div>
				<SearchBar onSearch={this.onSearch} />
				{!this.state.isLoading && <PokemonResult pokemon={this.state.pokemon} height={this.state.height} weight={this.state.weight} url={this.state.url} id={this.state.id} types={this.state.types} entry={this.state.entry} abilities={this.state.abilities} />}
				{this.state.isLoading && <LoadingSpinner />}
			</div>
		)
	}

	onSearch(pokemon) {
		let searchedPokemon = pokemon;
		this.setState({ isLoading: true });
		$.ajax({
			url: 'https://pokeapi.co/api/v2/pokemon/' + searchedPokemon,
			dataType: 'json',
			success: function (data) {
				$.ajax({
					url: 'https://pokeapi.co/api/v2/pokemon-species/' + searchedPokemon,
					dataType: 'json',
					success: function (data) {
						console.log(data);
						let flavorText;
						for (let i=0; i < data.flavor_text_entries.length; i++) {
							if (data.flavor_text_entries[i].language.name === 'en') {
								flavorText = data.flavor_text_entries[i].flavor_text;
								break;
							}
						}
						console.log("The flavor text is " + flavorText);
						this.setState({
							entry: flavorText
						});
						let evolutionURL = data.evolution_chain.url;
						$.ajax({
							url: evolutionURL,
							dataType: 'json',
							success: function (data) {
								console.log(data);
							}.bind(this), // make sure to bind the success function in order to set state
							error: function(xhr, status, err) {
								console.log(err);
							}
						});
					}.bind(this), // make sure to bind the success function in order to set state
					error: function(xhr, status, err) {
						console.log(err);
					}

				});
				this.setState({ 
					pokemon: data.name,
					height: data.height,
					weight: data.weight,
					url: data.sprites.front_default,
					id: data.id,
					types: data.types.map(function(type) {
						return type.type.name;
					}),
					abilities: data.abilities.map(function(ability){
						return ability.ability.name;
					}),
					entry: null,
					isLoading: false
				});
				console.log(data);
				console.log(this.state.types);
			}.bind(this), // make sure to bind the success function in order to set state
			error: function(xhr, status, err) {
				console.log(err);
			}

		});
		
	}


}



ReactDOM.render(<App />, document.getElementById('root'));