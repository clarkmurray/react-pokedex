import React from 'react';
import $ from 'jquery';
import { Route, Link } from 'react-router-dom';

export default class AllPokemon extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="row mt-3">
					{this.props.pokemon.map(function(pokemon, index) {
						index = index + 1;
						if (index < 10) {
							index = "00" + index;
						} else if (index < 100) {
							index = "0" + index;
						}
						return(
							<div className="col-6 col-md-4 col-lg-3 text-center mt-3" key={index}>
								<Link to={`/${pokemon.name}`}>
								<div className="card">
									<div className="card-header">
										#{index}
									</div>
									<div className="card-body">
										<img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index}.png`} height="100px" width="100px"  />
									</div>
									<div className="card-footer">
										<h6 className="card-title">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h6>
									</div>
								</div>
								</Link>
							</div>
						)
					})}
			</div>
		)
	}

} 