import { Dispatch, SetStateAction } from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline";

import Button from "../Button";
import Typography from "../Typography";

import { Wrapper, Subtotal, Header } from "./styles";
import { useCartStore } from "../../contexts/Products";
import Product from "../Product";

export type MenuPaymentProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * Adicionar itens ao carrinho, design ao seu critério mas deve conter:
 * - Nome do produto
 * - Imagem
 * - Preço
 * - Incrementador
 */

const MenuPayment = ({ isOpen, setIsOpen }: MenuPaymentProps) => {

  const { cart, loadCart } = useCartStore();

  const valorTotal = () => {
    let total: number = 0;
    cart.forEach((product) => {
      total = total + product.amount! * product.price;
    })

    return total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  return (
    <Wrapper isOpen={isOpen}>
      <Header>
        <Typography level={5} size="large" fontWeight={600}>
          Produtos no carrinho
        </Typography>
        <CloseOutline onClick={() => setIsOpen(false)} />
      </Header>

      {cart.map((product) =>
        product.amount! > 0 && <Product key={product.id} {...product} />
      )}

      <Subtotal>
        <Typography level={5} size="large" fontWeight={600}>
          Total
        </Typography>
        <Typography>{valorTotal()}</Typography>
      </Subtotal>

      <Button fullWidth>Finalizar compra</Button>
    </Wrapper>
  )
};

export default MenuPayment;
