// // import React, { useContext, useState, useEffect } from "react";
// // import { myContext } from "./context";
// // import axios from "axios";
// // import "../style/Admin.css";
// // import "../style/Edit.css";
// // import { Link } from "react-router-dom";

// // export default function Admin() {
// //   const { products, getProducts } = useContext(myContext);
// //   const [ProdData, setProdData] = useState([]);
// //   const [editingProduct, setEditingProduct] = useState(null); // State for editing a product
// //   const [selectedCategory, setSelectedCategory] = useState("All");
// //   const [expandedProducts, setExpandedProducts] = useState({});
// //   const [zoomedImage, setZoomedImage] = useState(null);

// //   const categories = ["All", "Clutch", "Backpack", "Travel Bag", "Shoulder Bag"];

// //   useEffect(() => {
// //     if (!products.length) {
// //       getProducts();
// //     }
// //   }, [products, getProducts]);

// //   useEffect(() => {
// //     setProdData(products);
// //   }, [products]);

// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/products/deleteProduct/${id}`);
// //       getProducts();
// //     } catch (error) {
// //       console.error("Error deleting product:", error);
// //     }
// //   };

// //   const confirmDelete = (id) => {
// //     const product = ProdData.find((prod) => prod._id === id);
// //     if (window.confirm(`Are you sure you want to delete this product, ${product ? product.name : 'this product'}?`)) {
// //       handleDelete(id);
// //     }
// //   };

// //   const handleCategoryChange = (event) => {
// //     setSelectedCategory(event.target.value);
// //   };

// //   const toggleShowMore = (productId) => {
// //     setExpandedProducts((prev) => ({
// //       ...prev,
// //       [productId]: !prev[productId],
// //     }));
// //   };

// //   const openFullscreen = (image) => {
// //     setZoomedImage(image);
// //   };

// //   const closeFullscreen = () => {
// //     setZoomedImage(null);
// //   };

// //   const startEditing = (product) => {
// //     setEditingProduct(product);
// //   };

// //   const handleEditChange = (event) => {
// //     const { name, value } = event.target;
// //     setEditingProduct((prevProduct) => ({
// //       ...prevProduct,
// //       [name]: value,
// //     }));
// //   };

// //   const saveEdit = async () => {
// //     try {
// //       await axios.put(`http://localhost:5000/api/products/updatedProduct/${editingProduct._id}`, editingProduct);
// //       getProducts();
// //       setEditingProduct(null); // Reset editing state after saving
// //     } catch (error) {
// //       console.error("Error updating product:", error);
// //     }
// //   };

// //   const cancelEdit = () => {
// //     setEditingProduct(null); // Cancel editing by resetting editing state
// //   };

// //   const filteredProducts = selectedCategory === "All"
// //     ? ProdData
// //     : ProdData.filter(product => product.category === selectedCategory);

// //   return (
// //     <div className="admin-container">
// //       <h2>Product Dashboard</h2>
// //       <div className="category-dropdown-admin">
// //         <Link to={'/UserInfo'}>
// //           <button className="userbtnprd">
// //             Users Information
// //           </button>
// //         </Link>
// //         <label htmlFor="category-select">Select Category: </label>
// //         <select id="category-select" onChange={handleCategoryChange}>
// //           {categories.map((category) => (
// //             <option key={category} value={category}>{category}</option>
// //           ))}
// //         </select>
// //         <Link to={'/addproducts'}>
// //           <button className="addbtnprd">
// //             Add new Products
// //           </button>
// //         </Link>
// //       </div>
// //       <table className="product-table">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Name</th>
// //             <th>Category</th>
// //             <th>Price</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredProducts.map((product, index) => (
// //             <React.Fragment key={product._id}>
// //               <tr>
// //                 <td>{index + 1}</td>
// //                 <td>{product.name}</td>
// //                 <td>{product.category}</td>
// //                 <td>{product.price}</td>
// //                 <td>
// //                 <button className="button-admin" onClick={() => startEditing(product)}>
// //                     Edit
// //                   </button>
// //                   <button className="button-admin" onClick={() => toggleShowMore(product._id)}>
// //                     {expandedProducts[product._id] ? "Show Less" : "Show More"}
// //                   </button>
// //                   <button className="button-admin" onClick={() => confirmDelete(product._id)}>
// //                     Delete
// //                   </button>
                
// //                 </td>
// //               </tr>
// //               {expandedProducts[product._id] && (
// //                 <tr key={`${product._id}-details`} className="expanded-row">
// //                   <td colSpan="5">
// //                     <div className="extra-details">
// //                       <div className="image-container-admin">
// //                         <img
// //                           src={product.image1}
// //                           alt={`${product.name} image1`}
// //                           className="image-admin"
// //                           onClick={() => openFullscreen(product.image1)}
// //                         />
// //                         <img
// //                           src={product.image2}
// //                           alt={`${product.name} image2`}
// //                           className="image-admin"
// //                           onClick={() => openFullscreen(product.image2)}
// //                         />
// //                         <img
// //                           src={product.image3}
// //                           alt={`${product.name} image3`}
// //                           className="image-admin"
// //                           onClick={() => openFullscreen(product.image3)}
// //                         />
// //                         <img
// //                           src={product.image4}
// //                           alt={`${product.name} image4`}
// //                           className="image-admin"
// //                           onClick={() => openFullscreen(product.image4)}
// //                         />
// //                       </div>
// //                       <h4>ID: {product._id}</h4>
// //                       <p>{product.description}</p>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               )}
// //             </React.Fragment>
// //           ))}
// //         </tbody>
// //       </table>

// //       {editingProduct && (
// //         <div className="edit-form">
// //           <h3>Edit Product</h3>
// //           <label>
// //             Name:
// //             <input type="text" name="name" value={editingProduct.name} onChange={handleEditChange} />
// //           </label>
// //           <label>
// //             Category:
// //             <input type="text" name="category" value={editingProduct.category} onChange={handleEditChange} />
// //           </label>
// //           <label>
// //             Price:
// //             <input type="number" name="price" value={editingProduct.price} onChange={handleEditChange} />
// //           </label>
// //           <label>
// //             Description:
// //             <textarea name="description" value={editingProduct.description} onChange={handleEditChange} />
// //           </label>
// //           <label>
// //             Image 1:
// //             <input type="text" name="image1" value={editingProduct.image1} onChange={handleEditChange} />
// //           </label>
// //           <label>
// //             Image 2:
// //             <input type="text" name="image2" value={editingProduct.image2} onChange={handleEditChange} />
// //           </label>
// //           <label>
// //             Image 3:
// //             <input type="text" name="image3" value={editingProduct.image3} onChange={handleEditChange} />
// //           </label>
// //           <label>
// //             Image 4:
// //             <input type="text" name="image4" value={editingProduct.image4} onChange={handleEditChange} />
// //           </label>
// //           <button className="button-admin" onClick={saveEdit}>Save</button>
// //           <button className="button-admin" onClick={cancelEdit}>Cancel</button>
// //         </div>
// //       )}

// //       {zoomedImage && (
// //         <div className="fullscreen-overlay" onClick={closeFullscreen}>
// //           <img className="fullscreen-image" src={zoomedImage} alt="Zoomed" />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import React, { useContext, useState, useEffect } from "react";
// import { myContext } from "./context";
// import axios from "axios";
// import "../style/Admin.css";
// import "../style/Edit.css";
// import { Link } from "react-router-dom";

// const Modal = ({ children, isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="modal-close" onClick={onClose}>
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default function Admin() {
//   const { products, getProducts } = useContext(myContext);
//   const [ProdData, setProdData] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null); // State for editing a product
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [expandedProducts, setExpandedProducts] = useState({});
//   const [zoomedImage, setZoomedImage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const categories = ["All", "Clutch", "Backpack", "Travel Bag", "Shoulder Bag"];

//   useEffect(() => {
//     if (!products.length) {
//       getProducts();
//     }
//   }, [products, getProducts]);

//   useEffect(() => {
//     setProdData(products);
//   }, [products]);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/products/deleteProduct/${id}`);
//       getProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const confirmDelete = (id) => {
//     const product = ProdData.find((prod) => prod._id === id);
//     if (window.confirm(`Are you sure you want to delete this product, ${product ? product.name : 'this product'}?`)) {
//       handleDelete(id);
//     }
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const toggleShowMore = (productId) => {
//     setExpandedProducts((prev) => ({
//       ...prev,
//       [productId]: !prev[productId],
//     }));
//   };

//   const openFullscreen = (image) => {
//     setZoomedImage(image);
//   };

//   const closeFullscreen = () => {
//     setZoomedImage(null);
//   };

//   const startEditing = (product) => {
//     setEditingProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleEditChange = (event) => {
//     const { name, value } = event.target;
//     setEditingProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   const saveEdit = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/products/updatedProduct/${editingProduct._id}`, editingProduct);
//       getProducts();
//       setEditingProduct(null); // Reset editing state after saving
//       setIsModalOpen(false); // Close the modal
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   const cancelEdit = () => {
//     setEditingProduct(null); // Cancel editing by resetting editing state
//     setIsModalOpen(false); // Close the modal
//   };

//   const filteredProducts = selectedCategory === "All"
//     ? ProdData
//     : ProdData.filter(product => product.category === selectedCategory);

//   return (
//     <div className="admin-container">
//       <h2>Product Dashboard</h2>
//       <div className="category-dropdown-admin">
//         <Link to={'/UserInfo'}>
//           <button className="userbtnprd">
//             Users Information
//           </button>
//         </Link>
//         <label htmlFor="category-select">Select Category: </label>
//         <select id="category-select" onChange={handleCategoryChange}>
//           {categories.map((category) => (
//             <option key={category} value={category}>{category}</option>
//           ))}
//         </select>
//         <Link to={'/addproducts'}>
//           <button className="addbtnprd">
//             Add new Products
//           </button>
//         </Link>
//       </div>
//       <table className="product-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map((product, index) => (
//             <React.Fragment key={product._id}>
//               <tr>
//                 <td>{index + 1}</td>
//                 <td>{product.name}</td>
//                 <td>{product.category}</td>
//                 <td>{product.price}</td>
//                 <td>
//                   <button className="button-admin" onClick={() => startEditing(product)}>
//                     Edit
//                   </button>
//                   <button className="button-admin" onClick={() => toggleShowMore(product._id)}>
//                     {expandedProducts[product._id] ? "Show Less" : "Show More"}
//                   </button>
//                   <button className="button-admin" onClick={() => confirmDelete(product._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//               {expandedProducts[product._id] && (
//                 <tr key={`${product._id}-details`} className="expanded-row">
//                   <td colSpan="5">
//                     <div className="extra-details">
//                       <div className="image-container-admin">
//                         <img
//                           src={product.image1}
//                           alt={`${product.name} image1`}
//                           className="image-admin"
//                           onClick={() => openFullscreen(product.image1)}
//                         />
//                         <img
//                           src={product.image2}
//                           alt={`${product.name} image2`}
//                           className="image-admin"
//                           onClick={() => openFullscreen(product.image2)}
//                         />
//                         <img
//                           src={product.image3}
//                           alt={`${product.name} image3`}
//                           className="image-admin"
//                           onClick={() => openFullscreen(product.image3)}
//                         />
//                         <img
//                           src={product.image4}
//                           alt={`${product.name} image4`}
//                           className="image-admin"
//                           onClick={() => openFullscreen(product.image4)}
//                         />
//                       </div>
//                       <h4>ID: {product._id}</h4>
//                       <p>{product.description}</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>

//       <Modal isOpen={isModalOpen} onClose={cancelEdit}>
//         {editingProduct && (
//           <div className="edit-form">
//             <h3>Edit Product</h3>
//             <label>
//               Name:
//               <input type="text" name="name" value={editingProduct.name} onChange={handleEditChange} />
//             </label>
//             <label>
//               Category:
//               <input type="text" name="category" value={editingProduct.category} onChange={handleEditChange} />
//             </label>
//             <label>
//               Price:
//               <input type="number" name="price" value={editingProduct.price} onChange={handleEditChange} />
//             </label>
//             <label>
//               Description:
//               <textarea name="description" value={editingProduct.description} onChange={handleEditChange} />
//             </label>
//             <label>
//               Image 1:
//               <input type="text" name="image1" value={editingProduct.image1} onChange={handleEditChange} />
//             </label>
//             <label>
//               Image 2:
//               <input type="text" name="image2" value={editingProduct.image2} onChange={handleEditChange} />
//             </label>
//             <label>
//               Image 3:
//               <input type="text" name="image3" value={editingProduct.image3} onChange={handleEditChange} />
//             </label>
//             <label>
//               Image 4:
//               <input type="text" name="image4" value={editingProduct.image4} onChange={handleEditChange} />
//             </label>
//             <button className="button-admin" onClick={saveEdit}>Save</button>
//             <button className="button-admin" onClick={cancelEdit}>Cancel</button>
//           </div>
//         )}
//       </Modal>

//       {zoomedImage && (
//         <div className="fullscreen-overlay" onClick={closeFullscreen}>
//           <img className="fullscreen-image" src={zoomedImage} alt="Zoomed" />
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useContext, useState, useEffect } from "react";
import { myContext } from "./context";
import axios from "axios";
import "../style/Admin.css";
import "../style/Edit.css";
import { Link } from "react-router-dom";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default function Admin() {
  const { products, getProducts } = useContext(myContext);
  const [ProdData, setProdData] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedProducts, setExpandedProducts] = useState({});
  const [zoomedImage, setZoomedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["All", "Clutch", "Backpack", "Travel Bag", "Shoulder Bag"];

  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  }, [products, getProducts]);

  useEffect(() => {
    setProdData(products);
  }, [products]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/deleteProduct/${id}`);
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const confirmDelete = (id) => {
    const product = ProdData.find((prod) => prod._id === id);
    if (window.confirm(`Are you sure you want to delete this product, ${product ? product.name : 'this product'}?`)) {
      handleDelete(id);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const toggleShowMore = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const openFullscreen = (image) => {
    setZoomedImage(image);
  };

  const closeFullscreen = () => {
    setZoomedImage(null);
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/updatedProduct/${editingProduct._id}`, editingProduct);
      getProducts();
      setEditingProduct(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const filteredProducts = selectedCategory === "All"
    ? ProdData
    : ProdData.filter(product => product.category === selectedCategory);

  return (
    <div className="admin-container">
      <h2>Product Dashboard</h2>
      <div className="category-dropdown-admin">
        <Link to={'/UserInfo'}>
          <button className="userbtnprd">
            Users Information
          </button>
        </Link>
        <label htmlFor="category-select">Select Category: </label>
        <select id="category-select" onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <Link to={'/addproducts'}>
          <button className="addbtnprd">
            Add new Products
          </button>
        </Link>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <React.Fragment key={product._id}>
              <tr>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <button className="button-admin" onClick={() => startEditing(product)}>
                    Edit
                  </button>
                  <button className="button-admin" onClick={() => toggleShowMore(product._id)}>
                    {expandedProducts[product._id] ? "Show Less" : "Show More"}
                  </button>
                  <button className="button-admin" onClick={() => confirmDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
              {expandedProducts[product._id] && (
                <tr key={`${product._id}-details`} className="expanded-row">
                  <td colSpan="5">
                    <div className="extra-details">
                      <div className="image-container-admin">
                        <img
                          src={product.image1}
                          alt={`${product.name} image1`}
                          className="image-admin"
                          onClick={() => openFullscreen(product.image1)}
                        />
                        <img
                          src={product.image2}
                          alt={`${product.name} image2`}
                          className="image-admin"
                          onClick={() => openFullscreen(product.image2)}
                        />
                        <img
                          src={product.image3}
                          alt={`${product.name} image3`}
                          className="image-admin"
                          onClick={() => openFullscreen(product.image3)}
                        />
                        <img
                          src={product.image4}
                          alt={`${product.name} image4`}
                          className="image-admin"
                          onClick={() => openFullscreen(product.image4)}
                        />
                      </div>
                      <h4>ID: {product._id}</h4>
                      <p>{product.description}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen}>
  {editingProduct && (
    <div className="modal-content">
      <h3>Edit Product</h3>
      <div className="edit-form">
        <label>
          Name:
          <input className="box" type="text" name="name" value={editingProduct.name} onChange={handleEditChange} />
        </label>
        <label>
          Category:
          <input className="box" type="text" name="category" value={editingProduct.category} onChange={handleEditChange} />
        </label>
        <label className="grid-full">
          Price:
          <input className="box" type="number" name="price" value={editingProduct.price} onChange={handleEditChange} />
        </label>
        <div className="edit-form grid-4-cols">
          <label>
            Image 1:
            <input className="img" type="text" name="image1" value={editingProduct.image1} onChange={handleEditChange} />
          </label>
          <label>
            Image 2:
            <input className="img" type="text" name="image2" value={editingProduct.image2} onChange={handleEditChange} />
          </label>
          <label>
            Image 3:
            <input className="img" type="text" name="image3" value={editingProduct.image3} onChange={handleEditChange} />
          </label>
          <label>
            Image 4:
            <input className="img" type="text" name="image4" value={editingProduct.image4} onChange={handleEditChange} />
          </label>
        </div>
        <label className="grid-full">
          Description:
          <textarea className="full-width" name="description" value={editingProduct.description} onChange={handleEditChange} />
        </label>
        <div className="grid-full">
          <button className="button-admin" onClick={saveEdit}>Save</button>
          <button className="button-admin" onClick={cancelEdit}>Cancel</button>
        </div>
      </div>
    </div>
  )}
</Modal>


      {zoomedImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <img className="fullscreen-image" src={zoomedImage} alt="Zoomed" />
        </div>
      )}
    </div>
  );
}
