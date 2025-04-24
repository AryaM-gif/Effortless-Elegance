const Product = require("../models/productSchema");

const addProduct = async (req, res) => {
  try {
    const { id, name, category, price, description, image1, image2, image3, image4 } = req.body;
    const product = new Product({ id, name, category, price, description, image1, image2, image3, image4 });
    await product.save();
    res.status(200).send("Product added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding product");
  }
};

const getProducts = async (req, res) => {
  try {
    console.log('Fetching products...');
    const products = await Product.find();
    console.log('Products fetched:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};


const updatedProduct = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, category, price, description, image1, image2, image3, image4 } = req.body;

      console.log("update", req.body);

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, category, price, description, image1, image2, image3, image4 },
          { new: true });

      if (!updatedProduct) {
          return res.status(404).send("Employee not found");
      }

      res.status(200).send("Employee updated successfully!");
  } catch (error) {
      console.log("Error updating employee:", error);
      res.status(500).send("Error updating employee");
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.send("Product deleted successfully!");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Error deleting product");
  }
};

module.exports = {
  addProduct,
  getProducts,
  updatedProduct,
  deleteProduct,
  
};




// // const Product = require("../models/productSchema");

// // const addProduct = async (req, res) => {
// //   try {
// //     const { id, name, category, price, description, image1, image2, image3, image4 } = req.body;
// //     const product = new Product({ id, name, category, price, description, image1, image2, image3, image4 });
// //     await product.save();
// //     res.status(200).send("Product added successfully");
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("Error adding product");
// //   }
// // };

// // // const getProducts = async (req, res) => {
// // //   try {
// // //     console.log('Fetching products...');
// // //     const products = await Product.find();
// // //     console.log('Products fetched:', products);
// // //     res.status(200).json(products);
// // //   } catch (error) {
// // //     console.error('Error fetching products:', error);
// // //     res.status(500).json({ error: 'Error fetching products' });
// // //   }
// // // };
// // const getProducts = async (req, res) => {
// //   try {
// //     console.log('Fetching products...');
// //     const products = await Product.find();
// //     console.log('Products fetched:', products);
// //     res.status(200).json(products);
// //   } catch (error) {
// //     console.error('Error fetching products:', error);
// //     res.status(500).json({ error: 'Error fetching products' });
// //   }
// // };

// // const updatedProduct = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { name, category, price, description, image1, image2, image3, image4 } = req.body;

// //     console.log("update", req.body);

// //     const updatedProduct = await Product.findByIdAndUpdate(id, { name, category, price, description, image1, image2, image3, image4 }, { new: true });

// //     if (!updatedProduct) {
// //       return res.status(404).send("Product not found");
// //     }

// //     res.status(200).send("Product updated successfully!");
// //   } catch (error) {
// //     console.log("Error updating product:", error);
// //     res.status(500).send("Error updating product");
// //   }
// // };

// // const deleteProduct = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     console.log("productId", id);
// //     await Product.findByIdAndDelete(id);
// //     res.send("Product deleted successfully!");
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).send("Error deleting product");
// //   }
// // };

// // module.exports = { updatedProduct, deleteProduct };


// // module.exports = {
// //   addProduct,
// //   getProducts,
// //   updatedProduct,
// //   deleteProduct,
// // };

// const Product = require("../models/productSchema");

// const addProduct = async (req, res) => {
//   try {
//     const { id, name, category, price, description, image1, image2, image3, image4 } = req.body;
//     const product = new Product({ id, name, category, price, description, image1, image2, image3, image4 });
//     await product.save();
//     res.status(200).send("Product added successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error adding product");
//   }
// };

// const getProducts = async (req, res) => {
//   try {
//     console.log('Fetching products...');
//     const products = await Product.find();
//     console.log('Products fetched:', products);
//     res.status(200).json(products);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ error: 'Error fetching products' });
//   }
// };
// const updatedProduct = async (req, res) => {
//   try {
//       const { id } = req.params;
//       const { name, category, price, description, image1, image2, image3, image4 } = req.body;


//       console.log("update", req.body);

//       const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, email, designation }, { new: true });

//       if (!updatedEmployee) {
//           return res.status(404).send("Employee not found");
//       }

//       res.status(200).send("Employee updated successfully!");
//   } catch (error) {
//       console.log("Error updating employee:", error);
//       res.status(500).send("Error updating employee");
//   }
// }

// // const updatedProduct = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { name, category, price, description, image1, image2, image3, image4 } = req.body;

// //     const updatedProduct = await Product.findByIdAndUpdate(id, { name, category, price, description, image1, image2, image3, image4 }, { new: true });

// //     if (!updatedProduct) {
// //       return res.status(404).send("Product not found");
// //     }

// //     res.status(200).send("Product updated successfully!");
// //   } catch (error) {
// //     console.error("Error updating product:", error);
// //     res.status(500).send("Error updating product");
// //   }
// // };

// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Product.findByIdAndDelete(id);
//     res.send("Product deleted successfully!");
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).send("Error deleting product");
//   }
// };

// module.exports = {
//   addProduct,
//   getProducts,
//   updatedProduct,
//   deleteProduct,
// };




// const updatedProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, category, price, description, image1, image2, image3, image4 } = req.body;

//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       { name, category, price, description, image1, image2, image3, image4 },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).send("Product not found");
//     }

//     res.status(200).send("Product updated successfully!");
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).send("Error updating product");
//   }
// };
