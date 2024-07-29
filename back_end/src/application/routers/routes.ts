import * as express from 'express';
import userRouters from './users.routers.js';
const router = express.Router();

const routes = [
    {
        path: '/users',
        route: userRouters,
    }
];

routes.forEach(
    (route) => {
        router.use(route.path, route.route);
    }
);

export default router;