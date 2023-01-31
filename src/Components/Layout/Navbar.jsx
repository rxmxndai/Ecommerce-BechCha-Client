import styled from 'styled-components'
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingCartOutlined } from '@mui/icons-material';
import CompareIcon from '@mui/icons-material/Compare';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import CartBox from '../Carts/CartBox';

const Container = styled.div`
    position: sticky;
    top: 0;
    height: 70px;
    padding: 0px 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
    z-index: 999;
    box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);
`
const Wrapper = styled.div`
    width: 100%;
    color: #0171b6;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;  
`

const Logo = styled.img`
    width: 100px;
    cursor: pointer;
    text-decoration: none;
`

const Middle = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SearchContainer = styled.div`
    border: 0.7px solid lightgray;
    display: flex;
    justify-content:center;
    align-items: center;
    height: 100%; 
`
const Searchicon = styled(SearchIcon)`
    font-size: larger;
    border-right: 0.8px solid lightgray;
    padding: 10px;
`
const SearchBox = styled.input`
    flex: 8;
    border: none;
    outline: none;
    padding: 5px;
    margin: 0px 10px;
    font-size: 15px;
    font-weight: 400;
`

const SearchButton = styled(Button)`
    cursor: pointer;
    color: #0171b6;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: end;
`
const Span = styled.span`
    cursor: pointer;
`

const Mbtn = styled.div`
    width: 30px;
    margin-left: 30px;
    cursor: pointer;
    color: #0171b6;
`



const Navbar = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [cartOpen, setCartOpen] = useState(false);


  return (
    <Container>
        <Wrapper >
            <Left>
            <Link to="/"> 
                <Logo src='https://github.com/rxmxndai/rxmxndai-assets/blob/main/assets/Bech_Cha.png?raw=true' />
            </Link>
            </Left>

            <Middle>
                <SearchContainer>
                    <Searchicon fontSize= "medium" />
                    <SearchBox maxLength={30} onChange={(e) => setSearch(e.target.value) } name='search' value={search}/>
                    
                    
                    { search === '' ? 
                    <div style={{width: '20px', backgroundColor: 'red'}} ></div>
                    : <ClearIcon onClick={() => setSearch('')} 
                    style={{cursor: 'pointer', maxWidth: '20px'}} />
                    }


                    <SearchButton>Search</SearchButton>

                </SearchContainer>
            </Middle>

            
            <Right> 
                    <Span>NP</Span>
                    <Mbtn onClick={()=>navigate("/profile")} >
                        <AccountCircleIcon />
                    </Mbtn>
                    <Mbtn onClick={() => setCartOpen(!cartOpen)}>
                        <Badge badgeContent={4}  > 
                                <ShoppingCartOutlined />
                        </Badge>
                    </Mbtn>
                    <Mbtn>
                        <CompareIcon  />
                    </Mbtn>
            </Right>
        </Wrapper>
        {cartOpen  && <CartBox />}
    </Container>
  )
}

export default Navbar