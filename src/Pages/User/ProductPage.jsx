import { useEffect, useState } from "react";
import styled from "styled-components";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BalanceIcon from "@mui/icons-material/Balance";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../ApiCalls/apiCalls";
import { addToCompareP, getOneProduct } from "../../ApiCalls/ProductApiCalls";
import Fetching from "../../Components/User/EmptyView/Fetching";
import ConfirmModal from "../../Components/User/EmptyView/ConfirmModal";
import ReviewComponent from "../../Components/User/Products/ReviewComponent";
import { Button } from "@mui/material";
import ReviewForm from "../../Components/User/Products/ReviewForm";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f7f8;
`;
const Wrapper = styled.div`
  margin: 10px 50px;
  padding: 10px;
  display: flex;
  gap: 50px;
  background-color: #ffffff;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const MainImageContainer = styled.div`
  flex: 5;
`;
const SmallImage = styled.img`
  width: 100%;
  height: 120px;
  padding: 10px;
  object-fit: contain;
  cursor: pointer;
  border: ${(props) => (props.selected === true ? "#0171b6" : "white")} 1px
    solid;
`;
const BigImage = styled.img`
  width: 100%;
  height: 600px;
  object-fit: contain;
  padding: 20px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 50px;
`;
const TitleWrapper = styled.div``;
const Title = styled.h1`
  font-weight: 500;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #0171b6;
`;

const QuantityDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ButtonBD = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #f5f7f8;
`;

const AddToCart = styled.div`
  padding: 10px 20px;
  width: 180px;
  background-color: ${props => props.color ? props.color : "gray"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  border: none;
  font-weight: 500;
`;
const QuickLinks = styled.div`
  display: flex;
  gap: 50px;
  padding: 10px 0px;
`;
const Links = styled.div`
  color: ${props => props.color && props.color};
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: ${props => props.point && props.point};
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.6px;
`;

const Span = styled.span`
  font-size: 10px;
  color: #aaaaaa;
  margin: 0px;
  font-weight: 600;
`;
const DisplayInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const DisplayUnit = styled.span`
  color: green;
  font-weight: 500;
`;

const ReviewsWrapper = styled.div`
  margin: 10px 50px;
  background-color: white;
`;

const WrapperReview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 30px;
`;

const ReviewsTitle = styled.h2`
  color: gray;
  border-bottom: 3px solid #0171b6;
  display: table;
`;
const Star = styled.div`
  display: flex;
  align-items: center;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const ProductPage = () => {
  const id = useParams().id;

  const [reviewSelected, setReviewSelected] = useState(false);

  const { products } = useSelector((state) => state.compare);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [imageSelected, setImageSelected] = useState();
  const [confirmAdd, setConfirmAdd] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getEssential = async () => {
      const pro = await getOneProduct(id);
      const textContent = document.createElement("div");
      textContent.innerHTML = pro.description;
      const plainText = textContent.innerText;

      const totalRatings = pro?.reviews?.length;

      setProduct({
        ...pro,
        description: plainText,
        ratingCount: totalRatings,
      });
    };

    getEssential();
  }, [id]);

  /// quantity increase / decrease
  const handleQuantity = (option, maxQuantity) => {
    if (option === "dec") {
      if (quantity > 1) setQuantity(quantity - 1);
    } else if (option === "inc") {
      if (quantity < maxQuantity) setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = async () => {
    if (product.quantity === 0) return;
    await addProductToCart(dispatch, product, quantity, product.quantity, id);
  };

  const handleCompare = () => {
    let catHere;
    products.map((prod) => {
      return (catHere = prod.category.name);
    });
    if (!catHere) {
      addToCompareP(dispatch, product._id);
    } else if (product.category.name === catHere) {
      console.log("add compare invoked");
      addToCompareP(dispatch, product._id);
    } else {
      setModal(true);
    }
  };

  useEffect(() => {
    if (confirmAdd === true) {
      addToCompareP(dispatch, product._id);
      setModal(false);
      setConfirmAdd(false);
    }
  }, [confirmAdd, product, dispatch]);

  return (
    <>
      {modal && (
        <ConfirmModal
          message={"You are comparing unsimilar category products!"}
          title={"Would you still like to compare products?"}
          modal={modal}
          setModal={setModal}
          setConfirmAdd={setConfirmAdd}
        />
      )}

      {product ? (
        <Container>
          <Wrapper>
            <Left>
              <ImageContainer>
                {product.images?.map((image) => (
                  <SmallImage
                    key={image.public_id}
                    selected={image.url === imageSelected}
                    onClick={() => {
                      setImageSelected(image?.url);
                    }}
                    src={image.url}
                  />
                ))}
              </ImageContainer>

              <MainImageContainer>
                <BigImage src={imageSelected || product.images[0]?.url} />
              </MainImageContainer>
            </Left>

            <Right>
              <TitleWrapper>
                <Title> {product.title} </Title>
                <Span>Product ID: {product._id}</Span>
              </TitleWrapper>
              <Price> RS {product.price} </Price>

              <RatingSection>
                <Star>
                  {Array(5)
                    .fill()
                    .map((_, index) => {
                      // Check for full star
                      if (index < Math.floor(product?.averageRating)) {
                        return (
                          <StarIcon
                            key={index}
                            sx={{
                              color: "gold",
                            }}
                          />
                        );
                      }
                      // Check for half-star
                      if (
                        index <= Math.floor(product?.averageRating) &&
                        Math.ceil(product?.averageRating) < 6 &&
                        product?.averageRating % 1 !== 0
                      ) {
                        return (
                          <StarHalfIcon
                            key={index}
                            sx={{
                              color: "gold",
                            }}
                          />
                        );
                      }
                      // Render empty star
                      return (
                        <StarIcon
                          key={index}
                          sx={{
                            color: "gray",
                          }}
                        />
                      );
                    })}
                </Star>

                <span>({product.ratingCount} reviews)</span>
              </RatingSection>

              <Description>{product.description}</Description>

              <DisplayInfo>
                <DisplayUnit> Stock: {product.quantity} </DisplayUnit>

                {product.sold && (
                  <DisplayUnit> Sold: {product.sold} </DisplayUnit>
                )}
                {product.brand && (
                  <DisplayUnit> Brand: {product.brand} </DisplayUnit>
                )}
              </DisplayInfo>

              <QuantityDiv>
                <ButtonBD
                  onClick={() => handleQuantity("dec", product.quantity)}
                >
                  {" "}
                  -{" "}
                </ButtonBD>
                {quantity >= 1 ? quantity : 0}
                <ButtonBD
                  onClick={() => handleQuantity("inc", product.quantity)}
                >
                  {" "}
                  +{" "}
                </ButtonBD>
              </QuantityDiv>

              <AddToCart color={product.quantity === 0 ? "gray" : "#0171b6"}  disabled={product.quantity === 0 ? true : false} onClick={handleAddToCart}>
                <AddShoppingCartIcon  /> ADD TO CART
              </AddToCart>

              <QuickLinks>
                <Links point="pointer" color="#0171b6" onClick={handleCompare}>
                  {" "}
                  <BalanceIcon /> ADD TO COMPARE{" "}
                </Links>
                <Links point="none" color="gray" >
                  {" "}
                  <FavoriteIcon /> ADD TO WISHLIST{" "}
                </Links>
              </QuickLinks>
            </Right>
          </Wrapper>

          <ReviewsWrapper>
            {reviewSelected && (
              <ReviewForm
                onCancel={() => setReviewSelected(false)}
                onSubmit={() => setReviewSelected(false)}
                prod={product._id}
              />
            )}
            <WrapperReview>
              <ReviewsTitle> Reviews </ReviewsTitle>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => setReviewSelected(true)}
              >
                Add a review
              </Button>
            </WrapperReview>
            {product.reviews.length > 0 ? (
              product.reviews.map((prod) => (
                <ReviewComponent key={prod._id} data={prod} />
              ))
            ) : (
              <Fetching type={"Empty"} Message={"No reviews posted yet!"} />
            )}
          </ReviewsWrapper>
        </Container>
      ) : (
        <Fetching type={"spokes"} />
      )}
    </>
  );
};

export default ProductPage;
