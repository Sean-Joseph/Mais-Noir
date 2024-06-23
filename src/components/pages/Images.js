import React from 'react';

const Images = ({ images }) => {
	const array = new Uint32Array(10);
    let values = crypto.getRandomValues(array);
	return (
        <>
			{images.map((image,index) => (
				<div key={values[index]}>
					<img src={`${image.urls.thumb}`} />
				</div>
            ))}
        </>
	);
};

export default Images;
