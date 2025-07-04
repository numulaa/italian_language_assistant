import express from "express";
import dotenv from "dotenv";
import { Clients } from "./src/types";
import { createResources } from "./src/startup/createResources";
import { createRoutes } from "./src/startup/createRoutes";
import cors from "cors";

dotenv.config();

const run = async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000", // Allow only this origin
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
      credentials: true, // Allow cookies and credentials
    })
  );

  const clients: Clients = await createResources();

  app.use(express.json());
  app.use(createRoutes(clients));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

run();
