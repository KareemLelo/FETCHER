// middleware.js
import express from 'express';
import cors from 'cors';
import { corsOptions } from './config.js';

export function applyMiddlewares(app) {
  app.use(cors(corsOptions));
  app.use(express.json());
}
