import express from "express";
import { Router } from "express";
import { Products } from "./Products.js";

const app = express();
const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

app.use("/api/productos", router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ocurrió un error, por favor intenta más tarde");
});

const PORT = 8080;
const products = new Products();

router.get("/", (req, res) => {
  res.json(products.getAll());
});

router.get("/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.getById(id);

  if (product) {
    res.json(product);
  } else {
    res.json({ error: "Producto no encontrado" });
  }
});

router.post("/", (req, res) => {
  const product = req.body;
  let newId = 0;
  const allProducts = products.getAll();

  if (allProducts.length > 0) {
    newId = allProducts[allProducts.length - 1].id + 1;
  }

  const newProduct = { id: newId, ...product };
  products.addProduct(newProduct);
  res.json(newProduct);
});

router.put("/:id", (req, res) => {
  const product = req.body;
  const id = +req.params.id;
  const productFound = products.updateProduct(product, id);

  res.json({ product: productFound });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  products.deleteProduct(id);

  res.json({ message: "Producto eliminado" });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando puerto ${PORT}`);
});
