import express from 'express';
import cors from 'cors';
import repositoryRoutes from './routes/repositoryRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/repositories', repositoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
