import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  console.log("Milan Image : " + product);
  return (
    <Card sx={{ maxWidth: 345 }} className="card">
      <CardMedia
        component="img"
        sx={{ height: 140 }}
        image={product.image}
        title="green iguana"
      />
      <CardContent>
        <Typography component="div">
          {product.name}
        </Typography>
        <Typography variant="body1" component="div">
          ${product.cost}
        </Typography>
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions>
        <Button className="button" variant="contained" fullWidth={true} onClick={() => handleAddToCart(product)}>
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
