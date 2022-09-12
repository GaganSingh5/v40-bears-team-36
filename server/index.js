import express from "express";
import cors from "cors";
import { router } from './src/routes/api/v1/questions.js';
import dotenv from 'dotenv';
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== "PROD") {
  dotenv.config({ path: "src/config/.env" });
}
// const corsOptions = {
//   origin: "*",
// };
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server Running on port: ${PORT}`);
})