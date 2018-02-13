import React from 'react';
import $ from 'jquery';


import LoadingSpinner from './LoadingSpinner.js';
import AllPokemon from './AllPokemon.js';


export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allPokemon: [],
		}
	}

	componentDidMount() {
		let vm = this;
		this.props.toggleLoading(true);
		$.ajax({
			url: "https://pokeapi.co/api/v2/pokemon/?limit=949",
			method: "GET",
			dataType: 'json',
			success: function(data){
				vm.setState({ 
					allPokemon: data.results.slice(0, 802),
				});
				vm.props.toggleLoading(false);
			},
			error: function(xhr, status, err) {
				console.log("The error code is " + err);
			}
		})
		console.log(this.props);
	}

	render() {
		const loading = this.props.loading;
		return (
			<div>
				{loading ? <LoadingSpinner /> : <AllPokemon pokemon={this.state.allPokemon} />}
			</div>

		)
	}
}