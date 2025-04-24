import { useState } from "react";
import axios from 'axios';
import '../style/Addp.css';

function Addp() {
  const [Id, setID] = useState("");
  const [Prodname, setProdName] = useState("");
  const [ProdCate, setProdCate] = useState("");
  const [price, setPrice] = useState("");
  const [ProdDescription, setDescription] = useState("");
  const [ProductImg1, setProductImg1] = useState("");
  const [ProductImg2, setProductImg2] = useState("");
  const [ProductImg3, setProductImg3] = useState("");
  const [ProductImg4, setProductImg4] = useState("");

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/products/addproducts", {
        id: Id,
        name: Prodname,
        category: ProdCate,
        price: price,
        description: ProdDescription,
        image1: ProductImg1,
        image2: ProductImg2,
        image3: ProductImg3,
        image4: ProductImg4,
      });
      alert("Product added successfully!");
      setID('');
      setProdName('');
      setProdCate('');
      setPrice('');
      setDescription('');
      setProductImg1('');
      setProductImg2('');
      setProductImg3('');
      setProductImg4('');
    } catch (error) {
      console.log(error);
      alert("Error: Product could not be added. Please try again.");
    }
  };

  return (
    <div className="add-product-container">
      <h3 className="h3">Add Product</h3>
      <div className="input-group">
        <div className="flex-row">
          <input
            className="box"
            type="number"
            placeholder="Product ID"
            value={Id}
            onChange={(e) => setID(e.target.value)}
          />
          <input
            className="box"
            type="text"
            placeholder="Product Name"
            value={Prodname}
            onChange={(e) => setProdName(e.target.value)}
          />
        </div>
        <div className="flex-row">
          <select
            id="category-select"
            className="box addp-select"
            value={ProdCate}
            onChange={(e) => setProdCate(e.target.value)}
          >
            <option value="">Category</option>
            <option value="Clutch">Clutch</option>
            <option value="Backpack">Backpack</option>
            <option value="Travel Bag">Travel Bag</option>
            <option value="Shoulder Bag">Shoulder Bag</option>
          </select>
          <input
            className="box"
            type="number"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex-row">
          <input
            className="img"
            type="text"
            placeholder="Product Image 1 URL"
            value={ProductImg1}
            onChange={(e) => setProductImg1(e.target.value)}
          />
          <input
            className="img"
            type="text"
            placeholder="Product Image 2 URL"
            value={ProductImg2}
            onChange={(e) => setProductImg2(e.target.value)}
          /> <br />
          <input
            className="img1"
            type="text"
            placeholder="Product Image 3 URL"
            value={ProductImg3}
            onChange={(e) => setProductImg3(e.target.value)}
          />
          <input
            className="img1"
            type="text"
            placeholder="Product Image 4 URL"
            value={ProductImg4}
            onChange={(e) => setProductImg4(e.target.value)}
          />
        </div>
        <textarea
          className="Dis full-width"
          placeholder="Description"
          value={ProdDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="addbtn" onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default Addp;










// import { useState } from "react";
// import axios from 'axios';
// import '../style/Addp.css';

// function Addp() {
//   const [Id, setID] = useState("");
//   const [Prodname, setProdName] = useState("");
//   const [ProdCate, setProdCate] = useState("");
//   const [price, setPrice] = useState("");
//   const [ProdDescription, setDescription] = useState("");
//   const [ProductImg1, setProductImg1] = useState("");
//   const [ProductImg2, setProductImg2] = useState("");
//   const [ProductImg3, setProductImg3] = useState("");
//   const [ProductImg4, setProductImg4] = useState("");

//   // const categories = ["Clutch", "Backpack", "Travel Bag", "Shoulder Bag"]; // Add your categories here

//   const addProduct = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/products/addproducts", {
//         id: Id,
//         name: Prodname,
//         category: ProdCate,
//         price: price,
//         description: ProdDescription,
//         image1: ProductImg1,
//         image2: ProductImg2,
//         image3: ProductImg3,
//         image4: ProductImg4,
//       });
//       setID('');
//       setProdName('');
//       setProdCate('');
//       setPrice('');
//       setDescription('');
//       setProductImg1('');
//       setProductImg2('');
//       setProductImg3('');
//       setProductImg4('');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="add-product-container">
//       <h3 className="h3">Add Product</h3>
//       <div className="input-group">
//         <div className="flex-row">
//           <input
//             className="box"
//             type="number"
//             placeholder="Product ID"
//             value={Id}
//             onChange={(e) => setID(e.target.value)}
//           />
//           <input
//             className="box"
//             type="text"
//             placeholder="Product Name"
//             value={Prodname}
//             onChange={(e) => setProdName(e.target.value)}
//           />
//         </div>
//         <div className="flex-row">
//           <select
//             id="category-select"
//             className="box addp-select"
//             value={ProdCate}
//             onChange={(e) => setProdCate(e.target.value)}
            
//           >
//   <option value="">Category</option>
 
//  <option value="Clutch">Clutch</option>
//  <option value="Backpack">Backpack </option>
//  <option value="Travel Bag">Travel Bag</option>
//  <option value="Shoulder Bag">Shoulder Bag</option>
 


  
//           </select>

//           <input
//             className="box"
//             type="number"
//             placeholder="Product Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>
//         <div className="flex-row">
//           <input
//             className="img"
//             type="text"
//             placeholder="Product Image 1 URL"
//             value={ProductImg1}
//             onChange={(e) => setProductImg1(e.target.value)}
//           />
//           <input
//             className="img"
//             type="text"
//             placeholder="Product Image 2 URL"
//             value={ProductImg2}
//             onChange={(e) => setProductImg2(e.target.value)}
//           /> <br />
//           <input
//             className="img1"
//             type="text"
//             placeholder="Product Image 3 URL"
//             value={ProductImg3}
//             onChange={(e) => setProductImg3(e.target.value)}
//           />
//           <input
//             className="img1"
//             type="text"
//             placeholder="Product Image 4 URL"
//             value={ProductImg4}
//             onChange={(e) => setProductImg4(e.target.value)}
//           />
//         </div>
//         <textarea
//           className="Dis full-width"
//           placeholder="Description"
//           value={ProdDescription}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>
//       <button className="addbtn" onClick={addProduct}>Add Product</button>
//     </div>
//   );
// }

// export default Addp;

