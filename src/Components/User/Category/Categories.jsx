import styled from 'styled-components'
import OneCategory from './CategoryBlock'
import { publicRequest } from '../../../requestMethods/requestMethods';
import { Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css/bundle";
import "swiper/css/autoplay"

import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from 'react';

const Container = styled.div`
    padding: 10px 50px;
`

const Title = styled.h1`
    color: #0171b6;
    display: table;
    padding: 10px;
    font-weight: 700;
    font-size: 24px;
    border-bottom: 3px solid #0171b6;
`

const List = styled.div`
    display: flex;
    align-items: center;
    margin: 20px;
    height: 20vh;
    width: 100%;
    padding: 20px;
`

const Display = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const Span = styled.span`
    color: #0171b6;
    font-size: 14px;
    font-weight: 200;
    border-bottom: .5px solid #0171b6;
`

const Categories = () => {


    const [CategoriesList, setCategoriesList] = useState([]);

    useEffect(() => {
        const getCategoriesAll = async () => {
            try {
                const response = await publicRequest.get("/categories?child=none");
                const resData = response.data.CategoryList;
                setCategoriesList(resData)
            }
            catch (err) {

            }
        }
        getCategoriesAll();
    }, []);



    return (
        <Container >

            <Display>
                <Title>
                    Categories
                </Title>
                <Span>
                    Buy Items best siuite for you
                </Span>
            </Display>


            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                spaceBetween={1}
                navigation
                slidesPerView={4}
                pagination={{ clickable: true }}
                effect={'slide'}
            >
                <List >
                    {CategoriesList.length > 0 ?
                    CategoriesList.map((each) => (
                        <SwiperSlide key={each._id}>
                            <OneCategory category={each} />
                        </SwiperSlide>
                    )) 
                : <p>No categories to display :(</p>} 
                </List>

            </Swiper>


        </Container>
    )
}

export default Categories