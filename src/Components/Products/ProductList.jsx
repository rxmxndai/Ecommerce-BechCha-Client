import styled from "styled-components"
import ProductCard from "./ProductCard";


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ProductList = () => {


  const data = [
    {
      id: 0,
      img: "https://github.com/rxmxndai/rxmxndai-assets/blob/main/assets/G24F2.png?raw=true",
      title: "Gigabyte G24F-2 180hz (OC)",
      price: 36000
    },
      {
        id: 2,
        img: "https://github.com/rxmxndai/rxmxndai-assets/blob/main/assets/keyboard.png?raw=true",
        title: "K552 rgb Keyboard",
        price: 5000
      },
      {
        id: 1,
        img: "https://github.com/rxmxndai/rxmxndai-assets/blob/main/assets/G24F2.png?raw=true",
        title: "Gigabyte G24F-2 180hz (OC)",
        price: 36000
      },
        {
          id: 3,
          img: "https://github.com/rxmxndai/rxmxndai-assets/blob/main/assets/keyboard.png?raw=true",
          title: "K552 rgb Keyboard",
          price: 5000
        },
        {
            id: 4,
            img: "https://github.com/rxmxndai/rxmxndai-assets/blob/main/assets/G24F2.png?raw=true",
            title: "Gigabyte G24F-2 180hz (OC)",
            price: 36000
          },
            {
              id: 5,
              img: "https://github.com/rxmxndai/rxmxndai-assets/blob/main/assets/keyboard.png?raw=true",
              title: "K552 rgb Keyboard",
              price: 5000
            },
            {
              id: 6,
              img: "https://github.com/rxmxndai/rxmxndai-assets/blob/main/assets/G24F2.png?raw=true",
              title: "Gigabyte G24F-2 180hz (OC)",
              price: 36000
            },
              {
                id: 7,
                img: "https://github.com/rxmxndai/rxmxndai-assets/blob/main/assets/keyboard.png?raw=true",
                title: "K552 rgb Keyboard",
                price: 5000
              },
                
  ];


  return (
    <Container>
        {data.map((product) => (
          <ProductCard  data={product} key={product.id} />
        ))}
    </Container>
  )
}

export default ProductList