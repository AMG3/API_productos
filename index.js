import express from "express";
import { Router } from "express";

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
const products = [];

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.json({ error: "Producto no encontrado" });
  }
});

router.post("/", (req, res) => {
  const product = req.body;
  let newId = 0;

  if (products.length > 0) {
    newId = products[products.length - 1].id + 1;
  }

  const newProduct = { id: newId, ...product };
  products.push(newProduct);
  res.json(newProduct);
});

router.put("/:id", (req, res) => {
  const product = req.body;
  const id = +req.params.id;
  const productFound = products.find((product) => product.id === id);
  productFound.name = product.name;
  productFound.price = product.price;
  productFound.thumbnail = product.thumbnail;

  res.json({ product: productFound });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = products.findIndex((product) => product.id === id);
  products.splice(index, 1);

  res.json({ message: "Producto eliminado" });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando puerto ${PORT}`);
});
