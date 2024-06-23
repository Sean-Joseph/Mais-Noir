import React from 'react';

const Gifs = ({ gifs }) => {
    const array = new Uint32Array(10);
    let values = crypto.getRandomValues(array);
	return (
		<>
			{gifs.map((gif,index) => (
				<div key={values[index++]} >
					<img src={`${gif.images.fixed_height.url}`} />
				</div>
			))}
		</>
	);
};

export default Gifs;
