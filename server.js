import express from 'express';
import routes from './routes/index';

const app = express();
app.use(express.json());
app.use(routes);

const databasePort = process.env.PORT || 5000;
app.listen(databasePort, () => console.log(`Database live on localhost:${databasePort}`));
export default app;
