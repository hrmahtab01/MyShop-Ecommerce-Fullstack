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

async function getALlProductController(req, res) {
  const {
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    brand,
    limit,
    material,
  } = req.query;

  let query = {};
  try {
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "1",
          },
          description: {
            $regex: search,
            $options: "1",
          },
        },
      ];
    }

    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };

          break;
        case "priceDesc":
          sort = { price: -1 };

          break;
        case "popularity":
          sort = { rating: -1 };

          break;
        default:
          break;
      }
    }

    const product = await productModel
      .find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    return res.status(200).send({
      success: true,
      message: "get all product succefully",
      data: product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}
async function getSingleProductController(req, res) {
  const { id } = req.params;

  try {
    const singleproduct = await productModel.findOne({ _id: id });
    if (singleproduct) {
      return res.status(200).send({
        success: true,
        message: "get single product successfully",
        data: singleproduct,
      });
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

async function SimilarProductController(req, res) {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product Not Found" });
    }
    const similarProduct = await productModel
      .find({
        _id: { $ne: id },
        gender: product.gender,
        category: product.category,
      })
      .limit(4);

    res.status(200).send({
      success: true,
      message: "get similar product successfully",
      data: similarProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function bestSellerController(req, res) {
  try {
    const bestseller = await productModel.findOne().sort({ rating: -1 });
    if (bestseller) {
      return res.status(200).send({
        success: true,
        message: "get best-seller product successfully",
        data: bestseller,
      });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Best-sell product not found" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
}

async function newArrivalsController(req, res) {
  try {
    const newarrivals = await productModel
      .find()
      .sort({ createAt: -1 })
      .limit(8);
    return res.status(200).send({ success: true , message:"new-arrivals get successfully" , data:newarrivals});
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
  getALlProductController,
  getSingleProductController,
  SimilarProductController,
  bestSellerController,
  newArrivalsController,
};
