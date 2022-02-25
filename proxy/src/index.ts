import 'dotenv/config';

import express, { Application, Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const PROXY_TARGET = process.env.PROXY_TARGET;
if (!PROXY_TARGET) {
  throw new Error('PROXY_TARGET must be defined');
}

const PORT = process.env.PORT ?? 80;

const app: Application = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(createProxyMiddleware({
  target: PROXY_TARGET,
  changeOrigin: true,
}));

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
