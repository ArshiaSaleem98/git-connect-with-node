import express from 'express';
import cors from 'cors';
import {
  repositoriesRouter,
  repositoryDetailsRouter,
} from './routes/repositoryRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/repositories', repositoriesRouter);
// Use a separate route for /repositoryDetails
app.use('/repositoryDetails', repositoryDetailsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
