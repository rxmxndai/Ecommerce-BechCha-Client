import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import ConfirmModal from "../EmptyView/ConfirmModal"


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 50%;
`;

const Wrapper = styled.div`
  display: ${props => props.disp === true ? "none" : "flex"};
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h3`
  color: #333333;
  padding: 10px;
  border-radius: 12px;
`;

const ItemsList = styled.div`
  padding: 10px 0px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
`;
const ProductImage = styled.img`
  max-width: 100px;
  cursor: pointer;
  max-height: 100px;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;
const ItemHeadContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0px;
  font-weight: 700;
`;

const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0px;
`;

const ItemH = styled.span`
  flex: ${(props) => props.flex};
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const ItemC = styled.span`
  flex: ${(props) => props.flex};
  font-weight: ${(props) => (props.fw ? props.fw : 400)};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const ConfirmationForm = () => {
  const cart = useSelector((state) => state.usercart);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);


  const handleConfirm = (dat) => {
    if (dat === true) return navigate("/checkout-form/payment")
  }

  return (
    <Container>
      <Wrapper disp={showModal} >
        <TitleWrapper>
          <Title> Ordered Items: {cart.totalQuantity} </Title>
          <Title> RS {cart.totalAmount} </Title>
        </TitleWrapper>

        <ItemsList>
          <ItemHeadContainer>
            <ItemH flex={2}> </ItemH>
            <ItemH flex={2}> Product </ItemH>
            <ItemH flex={1}> Quantity </ItemH>
            <ItemH flex={1}> Price </ItemH>
          </ItemHeadContainer>

          {cart &&
            cart.cart &&
            cart.cart.map((item) => (
              <ItemContainer key={item.product._id}>
                <ItemC flex={2}>
                  <ProductImage
                    onClick={() => navigate(`/product/${item.product._id}`)}
                    src={item.product?.images[0]?.url}
                  />
                </ItemC>
                <ItemC flex={2}>
                  <ItemC>{item.product.title}</ItemC>
                </ItemC>
                <ItemC flex={1}>{item.quantity}</ItemC>
                <ItemC flex={1} fw={500}>
                  {item.price}
                </ItemC>
              </ItemContainer>
            ))}
        </ItemsList>


        <Button
          color="error"
          onClick={() => navigate("/profile/cart/me")}
        >
          manage cart
        </Button>

        <Button
          type="submit"
          variant={"contained"}
          onClick={() => setShowModal(true)}
        >
          Proceed to pay
        </Button>
      </Wrapper>





      <Wrapper>
      { showModal &&  <ConfirmModal  
        message="You are going to select whole cart items and current quantity." 
        title="Are you sure to confirm the produt?"
        setModal={setShowModal} 
        modal={showModal}
        setConfirmAdd={handleConfirm}
      /> }
      </Wrapper>

    </Container>
  );
};

export default ConfirmationForm;
