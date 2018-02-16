import React from 'react';

export default class NoResults extends React.Component {

	render() {
		return (
			<div>
				<div className="row mt-4">
					<div className="col text-center">
						<h1>Oops!</h1>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div class="text-center mt-4">
							<img src="https://vignette.wikia.nocookie.net/pixelmon/images/d/d8/MissingNo..png/revision/latest?cb=20160706195946" />
						</div>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col text-center">
						<h3>Your search "{this.props.pokemon}" could not be found</h3>
					</div>
				</div>
			</div>
		)
	}
	
}