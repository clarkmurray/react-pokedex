import React from 'react';
import $ from 'jquery';

export default class AllPokemon extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			allPokemon: []
		}
	}

	componentDidMount() {
		let vm = this;
		$.ajax({
			url: "https://pokeapi.co/api/v2/pokemon/?limit=949",
			method: "GET",
			dataType: 'json',
			success: function(data){
				// vm.setState({ allPokemon: data.results});
				for (let i=0; i < 802; i++) {
					let tempArray = vm.state.allPokemon.slice();
					tempArray.push(data.results[i]);
					vm.setState({ allPokemon: tempArray});
				}
			},
			error: function(xhr, status, err) {
				console.log("The error code is " + err);
			}
		})
	}

	render() {
		return (
			<div className="row mt-3">
					{this.state.allPokemon.map(function(pokemon, index) {
						index = index + 1;
						if (index < 10) {
							index = "00" + index;
						} else if (index < 100) {
							index = "0" + index;
						}
						return(
							<div className="col-6 col-md-4 col-lg-3 text-center mt-3" key={index}>
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
							</div>
						)
					})}
			</div>
		)
	}

} 