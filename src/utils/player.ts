import HLSLib from './hlsLib';

class Player {
  private videoWrapper: HTMLElement;
  private input: HTMLInputElement;
  private hls: HLSLib | null = null;
  private url: string | null = null;

  constructor(page: HTMLTemplateElement) {
    const [ videoWrapper, input ] = this.initApp(page);

    this.videoWrapper = videoWrapper;
    this.input = input;
  }

  public start(): void {
    this.addListeners();
  }

  private initApp(page: HTMLTemplateElement): [HTMLElement, HTMLInputElement] {

    document.body.appendChild(page.content.children[0]);

    const videoElem: HTMLVideoElement | null = document.querySelector('.main__video-wrapper');

    if (!videoElem) this.throwAppError('Video element is apson on page!!!');

    const inputElement = document.querySelector('.main__input-link');

    if (!inputElement) this.throwAppError('Input element is apson on page!!!');

    return [videoElem as HTMLElement, inputElement as HTMLInputElement];
  }

  private addListeners(): void {
    const btnElement = document.querySelector('.main__play-link');
    if (!btnElement) this.throwAppError('Play button is apson on page!!!');

    btnElement?.addEventListener('click', this.playHandler.bind(this));

    this.input.addEventListener('focus', this.focusHandler.bind(this));

    this.input.addEventListener('blur', this.blurHandler.bind(this));
  }

  private playHandler(): void {
    if (!this.input.value) {
      this.input.value = 'Введите или проверьте URL';
      this.input.disabled = true;

      setTimeout(() => {
        this.input.value = '';
        this.input.disabled = false;
      }, 1500);
    } else {
      const hls = new HLSLib(this.input.value);
      if (hls) {
        this.hls?.destroy();
      }
      this.videoWrapper.appendChild(hls.video);
      this.hls = hls;
    }
  }

  private focusHandler(): void {
    this.url = this.input.value;
    this.input.value = '';
  }

  private blurHandler(): void {
    if (!this.input.value) {
      this.input.value = this.url ? this.url : '';
      this.url = null;
    }
  }

  private throwAppError(msg: string = 'Unkonwn error!'): void {
    const err = new Error(msg);
    err.name = 'AppTypeError';

    throw err;
  }
}

export default Player;