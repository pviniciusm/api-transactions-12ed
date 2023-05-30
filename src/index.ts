import cors from "cors";
import express, { Request, Response } from "express";
import { appRoutes } from "./routes/user.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", appRoutes());

//http://localhost:7007
app.listen(3333, () => {
    console.log("servidor rodando!");
});
