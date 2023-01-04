import styled from "styled-components"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { publicRequest } from "../requestMethods/requestMethods";


import { 
    FormControl, 
    InputLabel, 
    IconButton, 
    OutlinedInput, 
    InputAdornment
} from "@mui/material";

import {Visibility, VisibilityOff} from '@mui/icons-material';




const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: antiquewhite;
`

const Card = styled.div`
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    display: flex;
    width: 50%;
    height: 70%;
    border-radius: 10px;
    background-color: white;
    overflow: hidden;
`
    
const Left = styled.div`
    flex: 1;
    background: 
        linear-gradient(#0171b66c, #00000057),
        url("https://images.unsplash.com/photo-1548372033-893f42a8c1f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fGNyZWRpdCUyMGNhcmR8ZW58MHwwfDB8YmxhY2t8&auto=format&fit=crop&w=500&q=60") center;
    background-size: cover;
    display: flex;
    padding: 40px;
    flex-direction: column;
    justify-content: space-around;
    gap: 20px;
    color: white;
`

const Title = styled.h1`
    font-size: 30px;
    line-height: 100px;
`
const Desc = styled.p`
    font-size: 12px;
`

const Span = styled.span`
    font-size: 14px;
`

const Right = styled.div`
    flex: 2;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
`
const H1 = styled.h1`

`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const Btn = styled.button`
    padding: 10px;
    border: none; 
    font-size  : 14px;
    background-color: #aaaaaa;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #f5f7f8;
        color: #333333;
    }
`

const SpanMessage = styled.div`
    background-color: red;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0px;
`

const RegisterPage = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [error, setError] = useState("");
    
    const navigate = useNavigate();




    // for password box (visibility, toogle, functions)
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        try {
            await publicRequest.post("/users/register", {
                username,
                email,
                password
            })
            console.log("Log In successful");
            navigate("/login");
        }
        catch (err) {
            console.log(err.response.data);
            setError(err.response.data.Error[0].message)
            // if (err.response.data.keyPattern.username === 1) {setError("Username already taken. ") }

            // else if (err.response.data.keyPattern.email === 1) {setError("Email already exists.")}

            // else {
                
            // }
        }

    }

  return (
    <Container>
            <Card>

            <Right>
                <H1> Register </H1>
                <Form >
                    <TextField
                        value={username}
                        onChange={ e => setUsername(e.target.value) }
                        required
                        label="Username"
                        type="text"
                    />
                    <TextField
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        required
                        label="Email"
                        type="email"
                    />
                    {/* ////////////////// */}



                    <FormControl>
                    <InputLabel> Password </InputLabel>
                        <OutlinedInput
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)} }
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }
                            label="Password"
                            required = {true}
                        />
                     </FormControl>

                     <FormControl>
                    <InputLabel>Confirm Password </InputLabel>
                        <OutlinedInput
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)} }
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }
                            label="Confirm Password"
                            required = {true}
                        />
                     </FormControl>





                    {/* ///////////////// */}
                    
                    {error? <SpanMessage> {error} </SpanMessage> : ""}
                    <Button 
                        size="large" 
                        variant="contained"
                        onClick={handleSubmitRegister}
                    > 
                        Register </Button>
                    
                </Form>
            </Right>


            <Left>
                <Title> Bech-cha </Title>
                <Desc> 
                    Lorem ipsum dolor sit amet consectetur
                    Lorem ipsum dolor sit amet consectetur
                    Lorem ipsum dolor sit amet consectetur
                    Best ecommerce site in town with 100+ active users. </Desc>
                <Span> Already have an account? </Span>
                

                <Btn onClick={() => navigate("/login")} > Login </Btn>
            </Left>                
            </Card>
    </Container>
  )
}

export default RegisterPage