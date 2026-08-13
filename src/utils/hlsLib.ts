import Hls, { Events, type ErrorData } from 'hls.js';
import config from './hlsConfig';
import VideoElement from './videoElement';
import ErrorElement from './errorVideo';

class HLSLib {
  private hls: Hls;
  private isPlaying: boolean | ErrorElement = false;

  constructor(url: string) {
    const videoElem = new VideoElement();
    this.hls = new Hls(config);
    this.hls.loadSource(url);
    this.hls.attachMedia(videoElem.video);
    this.addListeners(videoElem.video);
  }

  get video(): HTMLVideoElement {
    return this.hls.media as HTMLVideoElement;
  }

  public destroy(): void {
    if (this.isPlaying instanceof ErrorElement) {
      this.isPlaying.error.remove();
    } else {
      this.hls.media?.remove();
    }
    // this.hls.stopLoad();
    // this.hls.detachMedia();
    this.hls.destroy();
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

    this.hls.once(Events.MANIFEST_PARSED, () => {
      this.video.play()
        .catch(() => this.isPlaying = false)
        .then(() => this.isPlaying = true)
    });

    this.hls.once(Events.ERROR, (_, data: ErrorData) => {

      console.warn(data.type);
      console.warn(data.details);
      console.warn(data.error.message);

      if (data.fatal) {
        const errElem = new ErrorElement(data);
        this.hls.media?.parentElement?.replaceChildren(errElem.error);
        this.isPlaying = errElem;
      }
    });
  }
}

export default HLSLib;