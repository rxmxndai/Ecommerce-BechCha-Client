import styled from "styled-components"
import { Button } from "@mui/material";
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserUpdateForm from "./UserUpdateForm";
import { useState } from "react";
import { getOneUser, LogoutUser } from "../../../ApiCalls/UserApiCalls";
import Fetching from "../EmptyView/Fetching";


const Container = styled.div`
     display: flex;
     flex-direction: column;
     width: 100%;
`
const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50PX;  
`

const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top: 30px;
`



const ProfileDisplay = () => {

    let paramms = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSignedIn, currentUser } = useSelector(state => state.user)

    const [userId, setUserId] = useState("me");

    const [user, setUser] = useState({});

    // check user login status
    useEffect(() => {
        const checkLogin = () => {
            if (!isSignedIn || !userId) {
                navigate("/login");
            }
        }
        checkLogin();
    }, [isSignedIn, userId, dispatch, navigate]);



    useEffect(() => {
        const userD = async () => {
            const _ID = "id" in paramms ? paramms.id : currentUser?._id
            const response = await getOneUser(dispatch, _ID)
            setUser(response);
        }
        userD();
    }, [paramms]);


    const handleLogout = async (e) => {
        e.preventDefault();
        await LogoutUser(dispatch, currentUser._id);
    }



    return (
        <Container>
            {user ?
                <>
                    <Card>
                        <UserUpdateForm user={user} isAdmin={currentUser?.isAdmin} email={currentUser?.email} />
                        <UserProfile user={user} />
                    </Card>

                    {user?._id === currentUser?._id &&
                        <Bottom>
                            <Button variant="contained" color="error" onClick={handleLogout} > {user.username} Logout </Button>
                        </Bottom>
                    }
                </> : <Fetching type={"Empty"} Message={"No user data!"} />
            }
        </Container>
    )
}

export default ProfileDisplay