import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductCard from '../Products/ProductCard'
import { getAllProducts } from '../../../ApiCalls/ProductApiCalls'
import Fetching from '../EmptyView/Fetching'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    padding: 10px 50px;
`

const Wrap = styled.div`
     display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0px;
`

const Title = styled.h1`
    color: #0171b6;
    display: table;
    padding: 20px;
    font-weight: 700;
    font-size: 24px;
    border-bottom: 3px solid #0171b6;
`

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const WrapperD = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const TopSales = () => {
    const [data, setData] = useState()

    useEffect(() => {
        const getTopSold = async () => {
            const prods = await getAllProducts({limit: 7, sort: "sold"})
            const products = await prods.map((p) => {
                return { ...p, image: p.images[0] }
            })
           
            setData(products)
        }

        getTopSold();
    }, [])

    const navigate = useNavigate()

  return (
    <Container>
       <Wrap>
       <Title>
            Top Sold Products
        </Title>
       </Wrap>

        <Wrapper>
            {data?.length > 0 ?  
                data?.map(element => (
                    <ProductCard data={element} key={element._id} /> ))
            : <Fetching type={"Empty"} />
            }
        </Wrapper>
        <WrapperD>
        <Button onClick={() => navigate("/search-results/s")}> View more </Button>
        </WrapperD>
    </Container>
  )
}

export default TopSales