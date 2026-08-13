import './style.scss';
import Player from './utils/player';

const page: HTMLTemplateElement | null = document.querySelector('.app');

if(!page) throw new Error('Critical app error!');

const app = new Player(page as HTMLTemplateElement);

app.start();