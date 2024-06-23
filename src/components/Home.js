import React from 'react';
import { useState } from 'react';
import Results from './Results';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
	const API_KEY_GIPHY = process.env.REACT_APP_API_KEY_GIPHY;
	const API_KEY_IMAGES = process.env.REACT_APP_API_KEY_IMAGES;

	const [ topTerm, setTopTerm ] = useState([ `` ]);
	const [ isActiveGifs, setIsActiveGifs ] = useState([ true ]);
	const [ isActiveImages, setIsActiveImages ] = useState([ true ]);
	let backArrow = <FontAwesomeIcon icon={faChevronLeft} />;

	function refreshPage() {
		window.location.reload(false);
	}

	// Handling gifs and images data
	const [ gifs, setGifs ] = useState([]);
	const [ images, setImages ] = useState([]);

	async function fetchDataUnsplash(URL) {
		const result = await fetch(URL);
		result.json().then((json) => {
			setImages(json.results);
		});
	}

	async function fetchDataGiphy(URL) {
		document.body.style.backgroundColor = `black`;
		const result = await fetch(URL);
		result.json().then((json) => {
			setGifs(json.data);
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		let searchTerm = e.target[0].value.toLowerCase();

		if (searchTerm === 'apache') {
			searchTerm = 'Native+American';
			setTopTerm(`apache`.toUpperCase());
		} else if (searchTerm === 'cherokee') {
			searchTerm = 'Native+American';
			setTopTerm(`cherokee`.toUpperCase());
		} else if (searchTerm === 'cute kids') {
			searchTerm = `african+american+kids`;
			setTopTerm(searchTerm.split('+ '));
		} else {
			searchTerm = `black+` + e.target[0].value.toLowerCase();
			setTopTerm(searchTerm.split('+')[1]);
		}
		let unsplashURL = `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=9&client_id=${API_KEY_IMAGES}`;

		let giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=_${API_KEY_GIPHY}&q=${searchTerm}&limit=9&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

		setIsActiveImages(false);
		setIsActiveGifs(false);
		fetchDataGiphy(giphyURL);
		fetchDataUnsplash(unsplashURL);
	};

	return (
		<div className="outerWrapper">
			<p className="searchTerm">
				<button onClick={refreshPage}>{backArrow}back</button>
				{topTerm}
			</p>
			<div className={`homeContainer ${isActiveGifs ? '' : 'opaque'}`}>
				<div className="searchStyle">
					<div className="searchContent">
						<form onSubmit={handleSubmit}>
							<input placeholder="see yourself" />
							<button>search</button>
						</form>
					</div>
				</div>
				<div className="logoStyle">
					<div>
						<h2>mais</h2>
						<h1>noir</h1>
					</div>
				</div>
			</div>
			<p className={`${isActiveGifs ? '' : 'opaque'}`}>
				you belong <span className="strike">too</span>
			</p>
			<Results gifs={gifs} images={images} isActiveImages={isActiveImages} />
		</div>
	);
};

export default Home;
