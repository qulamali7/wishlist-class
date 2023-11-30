import "./index.scss";
import { useState, useEffect } from "react";
function App() {
  const [data, setData] = useState([]);
  const [wishlist, setWishlist] = useState(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  async function GetFetch() {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    GetFetch();
  }, []);

  function AddWishlist(item) {
    if (wishlist.find((x) => x.id === item.id)) {
      setWishlist(wishlist.filter((x) => x.id !== item.id))
    }
    else{
      setWishlist([...wishlist,item]);
    }
  }
  function RemoveWishlist(id) {
    setWishlist(wishlist.filter((x) => x.id !== id));
  }
  return (
    <>
      <h1 className="title">React Basket</h1>
      <h2 className="title">Wishlist</h2>
      <div className="basket-cards cards">
        {wishlist.map((x) => (
          <ul className="card product-card">
            <div className="card-img">
              <div className="icon" onClick={()=>RemoveWishlist(x.id)} >
              <i className="fa-solid fa-x"></i>
              </div>
              <img src={x.image} alt="" />
            </div>
            <li>
              <b>Title</b>:{x.title}
            </li>
            <li>
              <b>Price</b>:{x.price}
            </li>
            <li>
              <b>Description</b>:{x.description.slice(0, 40)}
            </li>
            <li className="category">
              <b>Category</b>:{x.category}
            </li>
          </ul>
        ))}
      </div>
      <h2 className="title">Products</h2>
      <div className="product-cards cards">
        {data.map((x) => (
          <ul className="card product-card">
            <div className="card-img">
              <div className="icon" onClick={()=>AddWishlist(x)}>
                <i className="fa-regular fa-heart"></i>
              </div>
              <img src={x.image} alt="" />
            </div>
            <li>
              <b>Title</b>:{x.title}
            </li>
            <li>
              <b>Price</b>:{x.price}
            </li>
            <li>
              <b>Description</b>:{x.description.slice(0, 40)}
            </li>
            <li className="category">
              <b>Category</b>:{x.category}
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default App;
