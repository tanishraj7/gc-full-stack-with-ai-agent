import products from "./db/db.jsx";
import Cards from "./eComps/Cards.jsx";
import "./gc.css";
import { useState } from "react";

import Nav from './navigation/Nav';
import Sidebar from './sidebar/Sidebar.jsx';
import Recommended from './recommended/Recommended.jsx';
import Products from './products/Products.jsx';

function GinnisCart() {
  const [selectedCategory, setSelectedCategory]= useState(null);
  const [query, setQuery] = useState("");

  //input filters
  const handleInputChange= e=>{
    setQuery(e.target.value)
  };

  //to filter only the needed products from the db
  const filteredItems = products.filter(
    (product)=> product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 
  );

  //radio button filters
  const handleChange = e=>{
    setSelectedCategory(e.target.value)
  };

  //button filters
  const handleClick = e=>{
    setSelectedCategory(e.target.value)
  };

  //final filtering out of the db
  function filteredData(query, selected, products){
    let filteredProducts = products;
    if(query){
      filteredProducts = filteredItems
    };

    if(selected){
      filteredProducts = filteredProducts.filter(
        ({company, color, category, newPrice, title})=>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({img, title, prevPrice, newPrice, star, reviews})=>(
        <Cards
          key={Math.random()}
          img={img}
          title={title}
          prevPrice={prevPrice}
          newPrice={newPrice}
          star={star}
          reviews={reviews}
        />
      )
    )
  }

  //now store the resultant products into a variable to send as a prop to products page
  const result = filteredData(products, selectedCategory, query)

  return (
    <>
    <Sidebar handleChange={handleChange}/>
    <Nav query={query} handleInputChange={handleInputChange}/>
    <Recommended handleClick={handleClick}/>
    <Products result={result}/>
    </>
  )
}

export default GinnisCart