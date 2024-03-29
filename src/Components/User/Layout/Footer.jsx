import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

const Container = styled.div`
    background-color: #ffffff;
    z-index: 5;
    padding: 0px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LeftDiv = styled.div`
    flex: 1;
    height: 100%;
    padding: 20px 50px;
`

const Description = styled.p`
    margin: 20px 0px;

    &:hover {
        color: #333333;
    }
`


const MediaContainer = styled.div`
    display: flex;
`

const MediaIcon = styled.div`
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        transform: scale(1.1, 1.1);
    }
`


const MidDiv = styled.div`
    flex: 1;
    padding: 20px 50px;
`

const Title = styled.h3`
    margin-bottom: 30px;
    color: #333333;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItems = styled.li`
    width: 50%;
    margin-bottom: 10px;

    &:hover {
        color: #0171b6;
        cursor: pointer;
    }
`

const Linkd = styled(Link)`
    text-decoration: none;
`

const RightDiv = styled.div`
    flex: 1;
    padding: 20px 50px;
    height: 100%;
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`
    width: 50%;
`

const Logo = styled.img`
    width: 100px;
    cursor: pointer;
    text-decoration: none;
`


const Footer = () => {
    return (
        <Container>

            <LeftDiv>
                <Link to="/">
                    <Logo src='https://github.com/rxmxndai/rxmxndai-assets/blob/main/assets/Bech_Cha.png?raw=true' />
                </Link>
                <Description> Shop with Bech-cha Online  </Description>
                <MediaContainer>
                    <MediaIcon color="3b5999" > <FacebookIcon /> </MediaIcon>
                    <MediaIcon color="bc2a8d" > <InstagramIcon /> </MediaIcon>
                    <MediaIcon color="00acee" > <TwitterIcon /> </MediaIcon>
                    <MediaIcon color="3b5999" > <EmailIcon /> </MediaIcon>
                </MediaContainer>
            </LeftDiv>

            <MidDiv>
                <Title> Useful Links </Title>
                <List>
                    <ListItems > <Linkd to={"/profile/cart/me"}>  Cart  </Linkd> </ListItems>
                    <ListItems > <Linkd to={"/profile/me"}> My Account </Linkd></ListItems>
                    <ListItems > <Linkd to={"/profile/orders/me"}> Order Tracking </Linkd></ListItems>
                    <ListItems ><Linkd to={"/profile"}> Terms </Linkd></ListItems>
                </List>
            </MidDiv>


            <RightDiv >
                <Title>Contacts</Title>
                <ContactItem>
                    <LocationOnIcon style={{ marginRight: "10px", color: 'crimson' }} /> Mandikhatar, Kathmandu
                </ContactItem>
                <ContactItem>
                    <PhoneIcon style={{ marginRight: "10px", color: 'darkslateblue' }} /> +977 9848564099, 01 4438592
                </ContactItem>
                <ContactItem>
                    <EmailIcon style={{ marginRight: "10px", color: 'dodgerblue' }} /> bechchaonline@gmail.com
                </ContactItem>
                <Payment src="" />
            </RightDiv>

        </Container>
    )
}

export default Footer