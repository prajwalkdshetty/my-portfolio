import { AsyncContact, AsyncHome } from './dynamic';
import Home from './../components/modules/home/Home';

const routes = [
    { path: '/', exact: true, component: Home },
    { path: '/contact', component: AsyncContact }
];
export default routes;

