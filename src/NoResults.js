import React from 'react';

export default class NoResults extends React.Component {
	render() {
		return (
			<div className="row">
				<div className="col"></div>
				<div className="col">
					<h1>Your search could not be found</h1>
				</div>
				<div className="col"></div>
			</div>
		)
	}
}