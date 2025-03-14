const productModel = require("../Model/productModel");

async function productCreateController(req, res) {
  const {
    name,
    description,
    price,
    discountPrice,
    stock,
    category,
    brand,
    sizes,
    colors,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimensions,
    weight,
    sku,
    user,
  } = req.body;
  try {
    const product = new productModel({
      name,
      description,
      price,
      discountPrice,
      stock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user,
    });

    const createproduct = await product.save();

    return res.status(201).send({
      success: true,
      message: "product create successfully",
      data: createproduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function productUpdateController(req, res) {
  const {
    name,
    description,
    price,
    discountPrice,
    stock,
    category,
    brand,
    sizes,
    colors,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimensions,
    weight,
    sku,
    user,
  } = req.body;
  const { id } = req.params;

  try {
    const product = await productModel.findByIdAndUpdate(id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.stock = stock || product.stock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;
      product.user = user || product.user;
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    const updateproduct = await product.save();
    return res.status(200).send({
      success: true,
      message: "product update successfully",
      data: updateproduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function productDeleteController(req, res) {
  const { id } = req.params;
  try {
    const product = await productModel.findOneAndDelete(id);
    if (product) {
      return res
        .status(200)
        .send({ success: false, message: "product delete succefully" });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "product not found" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

module.exports = {
  productCreateController,
  productUpdateController,
  productDeleteController,
};
