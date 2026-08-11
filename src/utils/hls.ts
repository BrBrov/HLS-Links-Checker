import Hls from 'hls.js';
import config from './hlsConfig';

class HLSLib {
  private hls: Hls;
  private isPlaying: boolean = false;

  constructor(video: HTMLVideoElement) {
    this.hls = new Hls(config);
    this.hls.attachMedia(video);
    this.addListeners(video);
  }

  public setNewURL(url: string): void {
    this.hls.stopLoad();
    this.hls.loadSource(url);
    this.hls.on(Hls.Events.MANIFEST_LOADED, this.hlsLoadListener.bind(this));
  }

  private hlsLoadListener(): void {
    this.hls.media?.play();
    this.isPlaying = true;
  }

  private addListeners(video: HTMLVideoElement): void {

    video.addEventListener('pause', () => {
      if (this.isPlaying) {
        this.hls.stopLoad();
        this.isPlaying = false;
      }
    });

    video.addEventListener('play', () => {
      if (!this.isPlaying) {
        this.hls.startLoad();
        this.isPlaying = true;
      }
    })
  }

}

export default HLSLib;