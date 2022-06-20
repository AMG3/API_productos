export class Products {
  products = [];
  constructor() {}

  getAll() {
    return this.products;
  }

  getById(id) {
    return this.products.find((p) => p.id === id);
  }

  addProduct(newProduct) {
    this.products.push(newProduct);
  }

  updateProduct(product, id) {
    const productFound = this.products.find((product) => product.id === id);
    productFound.name = product.name;
    productFound.price = product.price;
    productFound.thumbnail = product.thumbnail;

    return productFound;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    this.products.splice(index, 1);
  }
}
