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
  } = req.body;
  try {
    const product = new productModel({
      name:name,
      description:description,
      price:price,
      discountPrice:discountPrice,
      stock:stock,
      category:category,
      brand:brand,
      sizes:sizes,
      colors:colors,
      collections:collections,
      material:material,
      gender:gender,
      images:images,
      isFeatured:isFeatured,
      isPublished:isPublished,
      tags:tags,
      dimensions:dimensions,
      weight:weight,
      sku:sku,
      user: req.user_id,
    });

    const createproduct = await product.save();

    return res.status(201).send({
      success: true,
      message: "product create successfully",
      data: createproduct,
    });
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        message: error.message || "something went wrong",
      });
  }
}

module.exports = { productCreateController };
