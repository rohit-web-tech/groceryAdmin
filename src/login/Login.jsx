import React ,{useState} from 'react'
import {useNavigate} from "react-router-dom" ;
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import "./style.scss" ;

const Login = ({setLoggedIn}) => {
    const navigate = useNavigate();
    const [adminDetails,setAdminDetails] = useState({
        userName : "" ,
        password : ""
    });
    const loginAdmin=()=>{
        if(adminDetails.userName!=""&&adminDetails.password!=""){
            fetch('http://localhost:8800/loginAdmin',{
            "method" : "POST" ,
            "body" : JSON.stringify({adminDetails}),
            "headers" : {
                "content-type" : "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.message === "success") {
                    setLoggedIn(true);
                    navigate("/adminPanel");
                } else {
                    alert(res.message);
                }
            }).catch(err => console.log(err));
        }else{
            alert("All Feilds are required!!");
        }
    }
    return (
        <div id="login-container">
            <div className="login-container">
                <h1>ADMIN LOGIN</h1>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        value={adminDetails.userName}
                        onChange={(e)=>{
                            setAdminDetails({...adminDetails,"userName":e.target.value})
                        }}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"># </InputGroup.Text>
                    <Form.Control
                        placeholder="Password"
                        aria-label="Password"
                        value={adminDetails.password}
                        onChange={(e)=>{
                            setAdminDetails({...adminDetails,"password":e.target.value})
                        }}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Button variant="primary" onClick={loginAdmin}>LOGIN</Button>
            </div>
        </div>
    )
}

export default Login
