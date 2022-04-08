import axios from "axios";
import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { Container } from "../components/Container";
import Header from "../components/Header";
import Product, { ProductProps } from "../components/Product";

/*const data: ProductProps = {
  id: 1,
  name: "Product 1",
  picture:
    "https://somos.lojaiplace.com.br/wp-content/uploads/2021/04/apple_iphone-12-spring21_purple_04202021.jpg",
  price: 20.50,
};*/

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [product_list, setProduct_list] = useState<ProductProps[]>();
  //const [product, setProduct] = useState<ProductProps>();

  async function buscaProdutos() {

    const response = await axios.get("http://localhost:3001/products");
    setProduct_list(response.data)
    //setProduct(response.data[0]);
    console.log(response.data);
  }

  useEffect(() => {
    buscaProdutos()
  }, [])

  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <Container>
        {product_list?.map((item) =>
          <Product {...item} />
        )}

        <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
      </Container>
    </>
  );
};

export default Home;
