import "./index.scss";
import { useState, useEffect } from "react";
import useDarkMode from "./hook/useDarkMode";
function App() {
  const [data, setData] = useState([]);
  const { handleTheme } = useDarkMode();
  const [filterdata, setFilterdata] = useState("All");
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
    else {
      setWishlist([...wishlist, item]);
    }
  }
  function RemoveWishlist(id) {
    setWishlist(wishlist.filter((x) => x.id !== id));
  }
  function filter(category) {
    setFilterdata(category);
  }

  const productsFilter =
    filterdata === "All"
      ? data
      : data.filter((item) => item.category === filterdata);
  return (
    <>
      <div className="title-dark">
        <h1 className="title">React Wishlist</h1>
        <button onClick={handleTheme}>Dark Mode</button>
      </div>
      <h2 className="title">Wishlist</h2>
      <div className="wishlist-cards cards">
        {wishlist.map((x) => (
          <div className="card wishlist-card">
            <div className="card-img">
              <div className="icon" onClick={() => RemoveWishlist(x.id)} >
                <i className="fa-solid fa-x"></i>
              </div>
              <img src={x.image} alt="" />
            </div>
            <div className="card-content">
              <p><span>Title</span>:{x.title}</p>
              <p><span>Price</span>:{x.price}</p>
              <p><span>Description</span>:{x.description.slice(0, 40)}</p>
              <p><span>Category</span>:{x.category}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="title">Products</h2>
      <div className="btns">
        <button onClick={() => { filter("All") }} className="btn">
          All
        </button>
        <button onClick={() => { filter("men's clothing") }} className="btn">
          Men
        </button>
        <button onClick={() => { filter("jewelery") }} className="btn">
          Jewelery
        </button>
        <button onClick={() => { filter("electronics") }} className="btn">
          Electronics
        </button>
        <button onClick={() => { filter("women's clothing") }} className="btn">
          Women
        </button>
      </div>
      <div className="product-cards cards">
        {productsFilter.map((x) => (
          <div className="card product-card">
            <div className="card-img">
              <div className="icon" onClick={() => AddWishlist(x)} >
                <i className="fa-regular fa-heart"></i>
              </div>
              <img src={x.image} alt="" />
            </div>
            <div className="card-content">
              <p><span>Title</span>:{x.title}</p>
              <p><span>Price</span>:{x.price}</p>
              <p><span>Description</span>:{x.description.slice(0, 40)}</p>
              <p><span>Category</span>:{x.category}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
