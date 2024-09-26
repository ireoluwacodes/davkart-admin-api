import { Router } from 'express';
import { Controller } from './app.controller';

const controller = new Controller();

export const appRouter = Router();

appRouter.get('/', controller.getHello);
