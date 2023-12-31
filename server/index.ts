import express, { Express} from 'express';
import dotenv from 'dotenv';
import AuthRouter from './Routes/auth.route';
import { sessionMiddleware } from './Utils/session';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import cors from "cors"


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(helmet());
app.use(hpp());


const corsOptions = {
    origin: [process.env.CLIENT_URL as string],
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))

app.use(express.json());

app.use(cookieParser());
app.use(sessionMiddleware);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


app.use('/auth', AuthRouter);
