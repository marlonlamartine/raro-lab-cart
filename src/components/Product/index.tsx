import { StackedLineChart } from "styled-icons/material";
import { useCartStore, useProductStore } from "../../contexts/Products";
import Incrementor from "../Incrementor";
import { Wrapper, Info, Column, Text, WrapperIncrementor } from "./styles";


export type ProductProps = {
  id: number;
  name: string;
  price: number;
  picture: string;
  amount: number;
  quantity?: number;
};

const Product = ({ id, name, price, picture, amount }: ProductProps) => {


  const { cart, loadCart } = useCartStore();
  const { products, setProductsInitial } = useProductStore();

  const handleIncrement = (amount: number) => {
    const product = products.find((product) => product.id === id);

    if (product!.quantity! >= product!.amount! + 1) {

      if (cart.length > 0) {
        const product = cart.find((item) => item.id === id)

        if (product) {
          product.amount = product.amount! + 1
        } else {
          loadCart(id, name, price, picture, 1);
        }
      } else {
        loadCart(id, name, price, picture, amount);
      }
      updateProductList('increment');
    }
  }


  const handleDecrement = (amount: number) => {
    const productAmount = products.find((product) => product.id === id)!.amount;

    if (productAmount! - 1 >= 0) {

      const product = cart.find((product) => product.id === id)

      if (product) {
        product.amount = product.amount! - 1;
      }
      loadCart(id, name, price, picture, amount - 1);
      updateProductList('decrement');
    }
  }


  const updateProductList = (actionType: string) => {

    let product = products.find((product) => product.id === id);

    if (actionType === 'increment') {
      product!.amount = product!.amount! + 1;
      setProductsInitial(products);
    }
    else {
      product!.amount = product!.amount! - 1;
      setProductsInitial(products);
    }
  }

  const priceView = price.toLocaleString("pt-br", { style: "currency", currency: "BRL", });

  return (
    <Wrapper>
      <img src={picture} alt={`Imagem de referência ${name}`} />

      <Info>
        <Column>
          <Text>{name}</Text>
          <Text>{priceView/* lembrar de formatar o preço */}</Text>
        </Column>

        <WrapperIncrementor>
          <Incrementor
            id={id}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            amount={amount!} /* inserir aqui um context pra controlar o valor */ />
        </WrapperIncrementor>
      </Info>
    </Wrapper>
  )
};

export default Product;
