const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const productModel = require("./Model/productModel");
const userModel = require("./Model/UserModel");
const products = require("./data/products");
const cartModel = require("./Model/Cart");

mongoose.connect(process.env.db_url);

const seedData = async () => {
  try {
    await productModel.deleteMany();
    await userModel.deleteMany();
    await cartModel.deleteMany();

    const createuser = await userModel.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    const userid = createuser._id;

    const simpleProduct = products.map((item) => {
      return { ...item, user: userid };
    });
    await productModel.insertMany(simpleProduct);

    console.log("product data seeded succefully");
    process.exit();
  } catch (error) {
    console.error("error seeding the data", error);
    process.exit(1);
  }
};

seedData();
