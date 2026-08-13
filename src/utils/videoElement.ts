class VideoElement {
  private _video: HTMLVideoElement;

  constructor() {
    this._video = this.initElement();
  }

  get video(): HTMLVideoElement {
    return this._video;
  }

  private initElement(): HTMLVideoElement {
    const video = document.createElement('video');

    video.controls = true;
    video.volume = 0.5;
    video.className = 'main__video';

    return video;
  }
}

export default VideoElement;