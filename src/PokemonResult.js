import React from 'react';
import EvolutionChain from './EvolutionChain';


export default class PokemonResult extends React.Component {

	render() {
		const query = this.props.pokemon;
		const typesList = this.props.types.map(function(type, index){
			return <span key={index}>{type}</span>
		});
		const abilitiesList = this.props.abilities.map(function(ability, index){
			return <span key={index}>{ability}</span>
		});
		const imgSrc = 'https://img.pokemondb.net/artwork/' + this.props.pokemon.toLowerCase() + '.jpg';
		if (query) {
			return (
				<div>
					<div className="row mt-4">
						<div className="col"></div>
						<div className="col text-center">
							<h1>{this.props.pokemon.toUpperCase()} (#{this.props.id})</h1>
							<div>
								<span>Types: {typesList}</span>
							</div>
							<div>
								<span>Abilities: {abilitiesList} </span>
							</div>
						</div>
						<div className="col"></div>
					</div>
					<div className="row mt-1">
						<div className="col"></div>
						<div className="col text-center">
							<p>{this.props.category}</p>
							<p>Height: {this.props.height}</p>
							<p>Weight: {this.props.weight}</p>
							<p>Entry: {this.props.entry}</p>
						</div>
						<div className="col text-center">
							<img src={imgSrc} alt="Sprite "/>
						</div>
						<div className="col"></div>
					</div>
					<EvolutionChain evolutions={this.props.evolutions} />
				</div>
			)
		} else {
			return <div></div>
		}
	}
}