import express from 'express';

import { generator } from '../controllers/ORCodeGenerator';

export default (router: express.Router) => {
    router.post('/generator', generator)
}