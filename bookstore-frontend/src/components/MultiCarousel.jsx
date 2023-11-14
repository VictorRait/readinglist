import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ArrowButton = ({direction, onClick}) => (
	<button
		className={`arrow-button ${direction} hover:bg-[#00000056] absolute -bottom-12 border-2 border-gray-400 f   !z-10 ${
			direction === "prev"
				? "left-0"
				: "right-[80%] md:right-[20vw] lg:right-[10-vw]"
		} text-2xl font-bold text-sky-800 pb-1 px-1 `}
		onClick={onClick}>
		{direction === "prev" ? "<" : ">"}
	</button>
);
const MultiCarousel = ({children}) => {
	const settings = {
		// dots: true, // Show dots for pagination
		infinite: true,
		speed: 400,
		slidesToShow: 4, // Number of slides to show at once
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		prevArrow: <ArrowButton direction="prev" />,
		nextArrow: <ArrowButton direction="next" />,
	};

	return (
		<div className="multi-carousel ">
			<Slider className="flex relative " {...settings}>
				{children}
			</Slider>
		</div>
	);
};

export default MultiCarousel;
