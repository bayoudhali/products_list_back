import express from "express";
import { connectDB } from "./config/database";
import productRoutes from "./routes/productRoutes";

const app = express();
app.use(express.json());

app.use("/api", productRoutes);

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
