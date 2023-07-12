import express from 'express';
import cors from 'cors';
import {
  repositoriesRouter,
  repositoryDetailsRouter,
  repositoryReadmeRouter,
} from './routes/repositoryRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/repositories', repositoriesRouter);
app.use('/repositoryDetails', repositoryDetailsRouter);
app.use('/getreadme', repositoryReadmeRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
