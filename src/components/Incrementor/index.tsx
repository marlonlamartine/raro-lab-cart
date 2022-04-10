import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Subtract as SubtractIcon } from "@styled-icons/remix-fill/Subtract";
import { useState } from "react";
import create from 'zustand';
import { Wrapper, IconWrapper, Quantity } from "./styles";

type IncrementorProps = {
  id: number;
  amount: number;
  handleIncrement: (id: number, amount: number) => void,
  handleDecrement: (id: number, amount: number) => void,
};


const Incrementor = ({ id, amount, handleIncrement, handleDecrement }: IncrementorProps) => {

  return (
    <Wrapper>
      <IconWrapper>
        <SubtractIcon aria-label="Subtract item" onClick={() => handleDecrement(id, amount)} />
      </IconWrapper>

      <Quantity>{amount}</Quantity>

      <IconWrapper>
        <PlusIcon aria-label="Add item" onClick={() => handleIncrement(id, amount)} />
      </IconWrapper>
    </Wrapper>
  )
}

export default Incrementor;
