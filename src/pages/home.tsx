import axios from "axios";
import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { Container } from "../components/Container";
import Header from "../components/Header";
import Product, { ProductProps } from "../components/Product";
import { useProductStore } from "../contexts/Products";

/*const data: ProductProps = {
  id: 1,
  name: "Product 1",
  picture:
    "https://somos.lojaiplace.com.br/wp-content/uploads/2021/04/apple_iphone-12-spring21_purple_04202021.jpg",
  price: 20.50,
};*/

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { products, setProducts } = useProductStore();

  useEffect(() => {
    setProducts()
  }, [])

  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <Container>
        {products.map((product) =>
          <Product key={product.id} {...product} />
        )}

        <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
      </Container>
    </>
  );
};

export default Home;
