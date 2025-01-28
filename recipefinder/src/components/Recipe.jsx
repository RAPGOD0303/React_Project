import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Recipe() {
    const [Products, setproducts] = useState([]);
    const[recipebtn, setRecipebtn] = useState(null);


        const getRecipeInst = (Product)=>{
            setRecipebtn(Product);
        }

        const handleCloseModal = ()=>{
            setRecipebtn(null);
        }
    useEffect(() => {
      axios.get("https://dummyjson.com/recipes")
        .then((response) => {
          console.log(response.data); // Log the response to check its structure
          setproducts(response.data.recipes); // Adjust this based on the response structure
        })
        .catch((error) => console.error("error in fetching"));
    },[]);

    return (
  <>
  <div style={{backgroundColor:'black', textDecoration:'none'}}>
        <h3 className='text-center' style={{padding:'10px',color:'orangered', marginBottom:'10px' }}>Recipies Details</h3>
        <div className="row" style={{margin:'10px', padding:'20px' }}>
          {Products.map((Product) => (
            <div className="col-md-4 " key={Product.id}>
              <div className="card d-flex h-100 flex-column bg-light" style={{color:'orangered',border: '2px solid orangered', borderRadius:'2px solid orangered'}}>
                <div className="card-body ">
                <img src={Product.image} alt={Product.name} className="card-img-top" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <div className="card-title">{Product.name}</div>
                  <div className="card-title"> Ingridients: <br />
                    {Product.ingredients.join(", ")} {/* Displaying ingredients */}
                  </div>
                  <div className="card-title">
                    Prep Time: {Product.prepTimeMinutes} minutes
                  </div>
                  <button className='btn-primary btn-outline-danger' style={{borderRadius:'4px', color:'white'}} onClick={()=>getRecipeInst(Product)}>Get Recipie</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* used modal here */}
      { recipebtn &&
        <div
        className="modal show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={{ color: "orangered" }}>
                {recipebtn.name}
              </h5>
            </div>
            <div className="modal-body">
              <p>{recipebtn.instructions}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
}
</>
)
}
