import React from 'react';
import Gifs from './pages/Gifs';
import Images from './pages/Images';

const Results = ({ gifs, images, isActiveImages }) => {
	return (
		<div>
			<div className={`resultsWrapper ${isActiveImages ? '' : 'opaqueImages'}`}>
				<div className="wrapperGifs">
					<Gifs gifs={gifs} />
				</div>
				<div className="wrapperImages">
					<Images images={images} />
				</div>
			</div>
		</div>
	);
};

export default Results;
