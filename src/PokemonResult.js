import React from 'react';


export default class PokemonResult extends React.Component {

	render() {
		const query = this.props.pokemon;
		const typesList = this.props.types.map(function(type, index){
			return <span key={index}>{type}</span>
		});
		const abilitiesList = this.props.abilities.map(function(ability, index){
			return <span key={index}>{ability}</span>
		});
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
							<p>Height: {this.props.height}</p>
							<p>Weight: {this.props.weight}</p>
							<p>Entry: {this.props.entry}</p>
						</div>
						<div className="col text-center">
							<img src={this.props.url} alt="Sprite" height="100px" width="100px" />
						</div>
						<div className="col"></div>
					</div>
				</div>
			)
		} else {
			return <div></div>
		}
	}
}