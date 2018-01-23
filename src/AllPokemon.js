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
				console.log(data.results);
				vm.setState({ allPokemon: data.results});
				// for (let i=0; i < 20; i++) {
				// 	vm.setState({ allPokemon: vm.state.allPokemon.push(data.results[i])});
				// }
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
						return(
							<div className="col-xs-3 col-md-2 text-center m-3" key={index + 1}>
								<div>#{index + 1}</div>
								<img src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`} height="100px" width="100px" />
								<div>{pokemon.name}</div>
							</div>
						)
					})}
			</div>
		)
	}

} 