import express from 'express';

import main from './main';
import authentication from './authentication';

const router = express.Router();

export default (): express.Router => {
    main(router);
    authentication(router);
    return router;
}