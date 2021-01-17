import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { inkCentralServer } from '../utils/apiaxios'
import swal from 'sweetalert';



export function ResetPassword(){
  const [ isLoading, setIsloading ] = useState({ isLoading: true })
  const [ email, setEmail ] = useState({ email: ''})
  
  const { token } = useParams();
  console.log(token);
  useEffect( async () => {
    try{
      const response = await inkCentralServer({
        method: 'GET',
        url:`/clients/reset/${token}`
      })
      const { data } = response.data;
      // console.log(data.email)
      console.dir(data)
    }
    catch(error){
      console.dir(error);
    }
  }, []);

  return(
    <div className="main">
      <h1>Reset Password</h1>
    </div>
  )

}
