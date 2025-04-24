// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const EditProduct = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState({
//     name: '',
//     category: '',
//     price: '',
//     description: '',
//     image1: '',
//     image2: '',
//     image3: '',
//     image4: '',
//   });

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/get/${id}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//         // Handle error or redirect to homepage
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/products/updatedProduct/${id}`, product);
//       alert('Product updated successfully!');
//       // Redirect or handle navigation programmatically here
//       window.location.href = '/'; // Example: Redirect to homepage
//     } catch (error) {
//       console.error('Error updating product:', error);
//       // Handle error as needed
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Product</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Category:
//           <input
//             type="text"
//             name="category"
//             value={product.category}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Price:
//           <input
//             type="text"
//             name="price"
//             value={product.price}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Description:
//           <textarea
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Image 1:
//           <input
//             type="text"
//             name="image1"
//             value={product.image1}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Image 2:
//           <input
//             type="text"
//             name="image2"
//             value={product.image2}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Image 3:
//           <input
//             type="text"
//             name="image3"
//             value={product.image3}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Image 4:
//           <input
//             type="text"
//             name="image4"
//             value={product.image4}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Update Product</button>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;
