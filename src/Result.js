import React from 'react';
import $ from 'jquery';

import LoadingSpinner from './LoadingSpinner.js';
import PokemonResult from './PokemonResult.js';
import NoResults from './NoResults.js';


export default class Result extends React.Component {

	constructor(props){
		super(props);
		this.ajaxCalls = this.ajaxCalls.bind(this);
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
			evolutions: []
		}
	}

	render(){
		const loading = this.props.loading;
		const searchFailed = this.props.searchFailed;
		if (loading) {
			return <LoadingSpinner loading={loading}/>;
		} else if (searchFailed) {
			return <NoResults pokemon={this.props.match.params.name} />;
		} else {
			return <PokemonResult {...this.state} />;
		}
	}

	componentDidMount() {
		this.props.toggleLoading(true);
		console.log("Props are" + this.props);
		console.log("searchFailed is " + this.props.searchFailed);
		this.ajaxCalls(this.props.match.params.name);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.location.pathname !== this.props.location.pathname) {
			this.ajaxCalls(nextProps.match.params.name);
		}
	}

	ajaxCalls(search) {
		let searchedPokemon = search;
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
									evolutions: evolutions
								});
								this.props.toggleLoading(false);
								this.props.searchSuccess(false);
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
					entry: null
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.log("There was an error");
				this.props.searchSuccess(true);
				this.props.toggleLoading(false);
				console.log("searchFailed is now " + this.props.searchFailed);
			}.bind(this)
		});
	}

}