const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const productModel = require("./Model/productModel");
const userModel = require("./Model/UserModel");
const products = require("./data/products");

mongoose.connect(process.env.db_url);

const seedData = async () => {
  try {
    await productModel.deleteMany();
    await userModel.deleteMany();

    const createuser = await userModel.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    const uderid = createuser._id;

    const simpleProduct = products.map((item) => {
      return { ...item, uderid };
    });

    console.log("product data seeded succefully");
    process.exit();

    await productModel.insertMany(simpleProduct);
  } catch (error) {
    console.error("error seeding the data", error);
    process.exit(1);
  }
};

seedData();
