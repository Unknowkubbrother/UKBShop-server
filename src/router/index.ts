import express from 'express';

import main from './main';

const router = express.Router();

export default (): express.Router => {
    main(router);
    return router;
}