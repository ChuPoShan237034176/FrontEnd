//import { Input, Button } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';

const StaffReg = (props)=> {

    interface FormInput {
        Email: string;
        Name: string;
        Pass: string;
        SignupCode: string;
    }

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
      
    const { register, handleSubmit } = useForm<FormInput>();
      
    const onSubmit: SubmitHandler<FormInput> = (data) => {
      
      axios.post(window.ApiServerURL + '/staff/regstaff', {data})
      .then(response => {
       setPosts(response.data);
         console.log(response.data);
         window.UserName=data.Name;
         window.Userjwt=response.data.auth_token;
         if(window.Userjwt!=undefined) navigate("/", { replace: true });
       })
       .catch(error => {
        console.error(error);
       });
    };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    
      <br />
        Name:
        <input type="text" autoComplete="off" {...register("Name")} />
      <br />
        Password:
        <input type="text" autoComplete="off" {...register("Pass")} />
     
        <br />
        <br />

      <input type="submit" />
      <br />


    </form>
);
}

export default StaffReg;
