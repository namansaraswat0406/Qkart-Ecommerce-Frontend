import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import { height } from "@mui/system";
import { fabClasses } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Cart from "./Cart";
import { generateCartItemsFrom, getTotalCartValue } from "./Cart";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  let isLoggedIn = false;
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [noProducts, setNoProducts] = useState(false);
  const [timer, setTimer] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  if (localStorage.getItem("token")) {
    isLoggedIn = true;
    // console.log('testLogin Auth Token : ' + localStorage.getItem("token"));
    // setIsLoggedIn(true)
  }
  // const productDummy = {
  //   name: "Tan Leatherette Weekender Duffle",
  //   category: "Fashion",
  //   cost: 150,
  //   rating: 4,
  //   image:
  //     "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
  //   _id: "PmInA797xJhMIPti",
  // };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */

  useEffect(() => {
    performAPICall();
    if (isLoggedIn) {
      fetchCart();
    }
    // fetchCart();
  }, []);
  useEffect(() => {
    // console.log("triggered");
    setCartProducts(generateCartItemsFrom(cartData, products));
  }, [cartData]);

  const fetchCart = async () => {
    let res = await axios
      .get(config.endpoint + "/cart", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        // console.log("Naman Cart Data : ", response.data);
        return response.data;
      })
      .catch((error) => {
        // console.log(error);
        return null;
      });
    // res.forEach((val) => console.log(val.productId));
    // console.log(res[0].productId)
    // let productIds = res.map((val) => val.productId)
    setCartData(res);
  };
  const performAPICall = async () => {
    setIsLoading(true);
    let products = await axios
      .get(config.endpoint + "/products")
      .then((response) => {
        setIsLoading(false);
        // products = products.json()
        return response.data;
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log(error);
        return [];
      });
    setProducts(products);
    // console.log("Milan : ", products);
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    // console.log(
    //   "Helelelelelo : " +
    //     config.endpoint +
    //     "/api/v1/products/search?value=" +
    //     text
    // );
    let products = await axios
      .get(config.endpoint + "/products/search?value=" + text)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
    if (products.length === 0) {
      setNoProducts(true);
    } else {
      setNoProducts(false);
      setProducts(products);
    }
  };

  const isItemInCart = (product) => {
    const productsInCart = cartData.map((val) => val.productId);
    if (productsInCart.includes(product._id)) {
      return true;
    } else {
      return false;
    }
  };
  const updateCartAPI = async (product, qty) => {
    let res = await axios
          .post(
            config.endpoint + "/cart",
            {
              productId: product._id,
              qty: qty,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "content-type": "application/json",
              },
            }
          )
          .then((response) => {
            // console.log(response.data);
            return response.data
          })
          .catch((error) => {
            // console.log(error);
            return null
          });
          return res;
  }
  const addToCart = async (product, qty) => {
    if (isLoggedIn) {
      if (!isItemInCart(product) && qty===undefined) {
          let res = await updateCartAPI(product, 1)
          if(res!==null) {
            setCartData(res)
          }
      } else if(isItemInCart(product) && qty!==undefined) {
        // console.log(qty)
        let updatedCart = [...cartData]
        // console.log('Milan updated cart : ' + JSON.stringify(updatedCart))
        for(let i = 0 ; i < cartData.length ; i++) {
          // console.log(updatedCart.productID, product._id)
          if(updatedCart[i].productId === product._id) {
            if(qty === 0) {
              updatedCart.splice(updatedCart[i], 1)
              updatedCart = await updateCartAPI(product, qty)
              break
            } else {
              updatedCart[i].qty = qty
              updatedCart = await updateCartAPI(product, qty)
              break
            }
          }
        }
        setCartData(updatedCart)
      } else {
        enqueueSnackbar(
          "Item already in cart. Use the cart sidebar to update quantity or remove item.",
          {
            variant: "warning",
          }
        );
      }
    } else {
      enqueueSnackbar("Login to add an item to the Cart", {
        variant: "warning",
      });
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);
  const debounceSearch = (event, debounceTimeout) => {
    let timerID = setTimeout(() => performSearch(event.target.value), 500);
    setTimer(timerID);
  };

  return (
    <div>
      <Header
        hasHiddenAuthButtons={true}
        isLoggedIn={isLoggedIn}
        children={true}
        performSearch={debounceSearch}
      >
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={debounceSearch}
      />
      <Grid container>
        <Grid item md={isLoggedIn ? 8 : 12}>
          <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your door step
            </p>
          </Box>
          {isLoading ? (
            <Grid className="loading">
              <CircularProgress />
              <p>Loading Products</p>
            </Grid>
          ) : noProducts ? (
            <Grid className="loading">
              <SentimentVeryDissatisfiedIcon />
              <p>No Products Found</p>
            </Grid>
          ) : (
            <Grid sx={{ p: 1 }} container spacing={2}>
              {products.map((product) => (
                <Grid item xs={6} md={3} key={product._id}>
                  <ProductCard product={product} handleAddToCart={addToCart} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        {isLoggedIn ? (
          <Grid item md={4} className="cart-section">
            <Cart products={products} items={cartProducts} handleQuantity={addToCart}/>
          </Grid>
        ) : (
          <></>
        )}

        {/* <Grid className="cart">
          <Cart />
      </Grid> */}
      </Grid>
      <Footer />
    </div>
  );
};

export default Products;
