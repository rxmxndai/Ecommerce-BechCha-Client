import styled from "styled-components";
import { Avatar } from "@mui/material";
import ProductUpdate from "./ProductUpdate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOneProduct } from "../../../ApiCalls/ProductApiCalls";
import DonutChart from "react-donut-chart";

const Container = styled.div`
  flex: 5;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: gray;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 20px;
`;
const Left = styled.div`
  flex: 1;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  height: 100%;
  background-color: white;
`;

const Right = styled.div`
  flex: 1;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  height: 100%;
  background-color: white;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 50px;
  gap: 10px;
`;

const ProductNameWrap = styled.h1`
  display: flex;
  gap: 50px;
  font-weight: 500;
  align-items: center;
`;

const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0px;
`;

const Item = styled.span`
  margin: 5px 0px;
  display: flex;
`;
const Label = styled.span`
  flex: 1;
  width: 100px;
  display: flex;
  justify-content: space-between;
  color: gray;
`;

const Data = styled.span`
  flex: 1;
  font-weight: 300;
`;

const ProductChart = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const BottomWrapper = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  padding: 20px;
`;

const ProductDetails = () => {
  const prodId = useParams().id;
  const [data, setData] = useState("");

  const { categories } = useSelector((state) => state.product);

  useEffect(() => {
    const makereq = async () => {
      const product = await getOneProduct(prodId);
      setData(product);
    };
    makereq();
  }, [prodId]);

  return (
    <Container>
      <Title> Product Profile </Title>
      <TopWrapper>
        <Left>
          <ProductChart>
            <DonutChart
              data={[
                {
                  label: "Total Sales",
                  value: data.sold,
                },
                {
                  label: "Quantity Left",
                  value: data.quantity,
                },
              ]}
              colors={["#0b74a8", "#0171b6"]}
            />
            ;
          </ProductChart>
        </Left>

        <Right>
          <ProductCard>
            <ItemTitle> Product Info </ItemTitle>
            <ProductNameWrap>
              <Avatar
                src={data?.images && data.images[0]?.url}
                sx={{ width: 60, height: 60 }}
              />
              <Data> {data?.title} </Data>
            </ProductNameWrap>
            <ProductInfo>
              <Item>
                <Label>Id</Label>
                <Data> {data?._id} </Data>
              </Item>
              <Item>
                <Label>Sales</Label>
                <Data> {data?.sold} </Data>
              </Item>
              <Item>
                <Label> InStock</Label>
                <Data> {data?.quantity} </Data>
              </Item>
              <Item>
                <Label> Current Price</Label>
                <Data> {data?.price} </Data>
              </Item>
              <Item>
                <Label> Category </Label>
                <Data> {data?.category?.name} </Data>
              </Item>
            </ProductInfo>
          </ProductCard>
        </Right>
      </TopWrapper>

      <BottomWrapper>
        <Title style={{ marginBottom: "30px" }}> Edit product </Title>
        {ProductDetails && (
          <ProductUpdate prodDetails={data} categories={categories} />
        )}
      </BottomWrapper>
    </Container>
  );
};

export default ProductDetails;
