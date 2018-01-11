import React from 'react';
import $ from 'jquery';

import SearchBar from './SearchBar';
import PokemonResult from './PokemonResult';
import NoResults from './NoResults';
import LoadingSpinner from './LoadingSpinner';

export default class App extends React.Component {

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
			category: '',
			entry: '',
			evolutions: [],
			searchFailed: false,
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
				{this.state.isLoading && <LoadingSpinner />}
				{!this.state.isLoading && this.state.searchFailed && <NoResults pokemon={this.state.pokemon} />}
				{
					!this.state.isLoading && !this.state.searchFailed && 
					<PokemonResult
						 pokemon={this.state.pokemon}
						 height={this.state.height} 
						 weight={this.state.weight}
						 url={this.state.url} 
						 id={this.state.id} 
						 types={this.state.types} 
						 entry={this.state.entry} 
						 abilities={this.state.abilities} 
						 category={this.state.category} 
						 evolutions={this.state.evolutions} 
					/>
				}
			</div>
		)
	}

	onSearch(pokemon) {
		let searchedPokemon = pokemon;
		if  (searchedPokemon === 'smudge') {
			return this.setState({
				pokemon: 'Smudge',
				height: 0,
				weight: 0,
				id: 0,
				types: ['Cat'],
				entry: 'A cute cat',
				abilities: ['Napping'],
				category: 'Fluffy butt',
				evolutions: ['Smudge']
			})
		}
		this.setState({ isLoading: true });
		$.ajax({
			url: 'https://pokeapi.co/api/v2/pokemon/' + searchedPokemon,
			dataType: 'json',
			success: function (data) {
				$.ajax({
					url: 'https://pokeapi.co/api/v2/pokemon-species/' + searchedPokemon,
					dataType: 'json',
					success: function (data) {
						let flavorText;
						let genus;
						for (let i=0; i < data.flavor_text_entries.length; i++) {
							if (data.flavor_text_entries[i].language.name === 'en') {
								flavorText = data.flavor_text_entries[i].flavor_text;
								break;
							}
						}
						for (let i=0; i < data.genera.length; i++) {
							if (data.genera[i].language.name === 'en') {
								genus = data.genera[i].genus;
								break;
							}
						}
						this.setState({
							entry: flavorText,
							category: genus
						});
						let evolutionURL = data.evolution_chain.url;
						$.ajax({
							url: evolutionURL,
							dataType: 'json',
							success: function (data) {
								let base = data.chain.species.name;
								let evolutions = [];
								if (data.chain.evolves_to.length) {
									for (let i=0; i < data.chain.evolves_to.length; i++) {
										if (data.chain.evolves_to[i].evolves_to.length){ 
											for (let j=0; j < data.chain.evolves_to[i].evolves_to.length; j++) {
												let evolutionChain = [base, data.chain.evolves_to[i].species.name, data.chain.evolves_to[i].evolves_to[j].species.name];
												evolutions.push(evolutionChain);
											}
										} else {
											let evolutionChain = [base, data.chain.evolves_to[i].species.name];
											evolutions.push(evolutionChain);
										}
									}
								} else {
									evolutions.push(base);
								}
								this.setState({
									evolutions: evolutions,
									isLoading: false
								})
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
					searchFailed: false
				});
			}.bind(this), // make sure to bind the success function in order to set state
			error: function(xhr, status, err, data) {
				console.log(err);
				this.setState({
					searchFailed: true,
					isLoading: false,
					pokemon: searchedPokemon
				});
			}.bind(this)
		});
		
	}


}