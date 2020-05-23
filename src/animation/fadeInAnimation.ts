import {css, keyframes} from "styled-components";
const fadeIn = keyframes`
        0% {
			opacity: 0;
		}
		25% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.5;
		}
		75% {
			opacity: 0.8;
		}
		100% {
			opacity: 1;
		}
`;

const fadeInAnimation = css`
	animation: ${fadeIn} 1.3s cubic-bezier(0.42, 0, 0.52, 0.46);
`;

export default fadeInAnimation;
