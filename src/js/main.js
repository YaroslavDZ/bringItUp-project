import MainSlider from './modules/sliders/slider-main';
import VideoPlayer from './modules/videoPlayer';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({btns: '.next', page: '.page'});
    slider.render();
    const videoPlayer = new VideoPlayer('.showup .play', '.overlay');
    videoPlayer.init();
});