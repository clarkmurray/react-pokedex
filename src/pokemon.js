import React from 'react';


export default class Pokemon extends React.Component {

	render() {
		const query = this.props.pokemon;
		if (query) {
			return (
				<div>
					<div className="row mt-4">
						<div className="col"></div>
						<div className="col text-center">
							<h1>{this.props.pokemon.toUpperCase()}</h1>
							<span>{this.props.types[1]}, {this.props.types[0]}</span>
						</div>
						<div className="col"></div>
					</div>
					<div className="row mt-1">
						<div className="col"></div>
						<div className="col text-center">
							<p>#{this.props.id}</p>
							<p>{this.props.weight}</p>
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