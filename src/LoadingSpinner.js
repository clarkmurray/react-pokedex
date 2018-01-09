import React from 'react';

export default class LoadingSpinner extends React.Component {
	render() {
		return (
			<div className="row mt-4">
				<div className="col"></div>
				<div className="col text-center">
					<h1>Loading</h1>
				</div>
				<div className="col"></div>
			</div>
		);
	}
}