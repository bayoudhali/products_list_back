import express from "express";
import { connectDB } from "./config/database";
import productRoutes from "./routes/productRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger/swaggerConfig";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", productRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
