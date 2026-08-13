import type { ErrorData } from 'hls.js';

class ErrorElement{
  private element: HTMLElement;

  constructor(data: ErrorData){
    this.element = this.initDataElem(data);
  }

  get error(): HTMLElement {
    return this.element;
  }

  private initDataElem(data: ErrorData): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'main__video-error';

    const typeElement = document.createElement('p');
    typeElement.className = 'main__error-type';
    typeElement.textContent = data.type;

    wrapper.appendChild(typeElement);

    const detailsElement = document.createElement('p');
    detailsElement.className = 'main__error-details';
    detailsElement.textContent = data.details;

    wrapper.appendChild(detailsElement);

    const errMSGElement = document.createElement('p');
    errMSGElement.className = 'main__error-msg';
    errMSGElement.textContent = data.error.message;

    wrapper.appendChild(errMSGElement);

    return wrapper;
  }
}

export default ErrorElement;