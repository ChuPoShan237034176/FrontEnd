import {Image } from "antd";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';

import '../globalvar'

const StaffLogin = (props)=> {

  interface FormInput {
    Email: string;
    Pass: string;
  }

  const navigate = useNavigate();
      
  const { register, handleSubmit } = useForm<FormInput>();

  const [posts, setPosts] = useState([]);
      
  const onSubmit: SubmitHandler<FormInput> = (data) => {

    axios.post(window.ApiServerURL + '/staff/Stafflogin',{data})
      .then(response => {
       setPosts(response.data);
         console.log(response.data);
         window.UserName=response.data.Name;
         window.Userjwt=response.data.auth_token;
        
         if(window.Userjwt!=undefined) navigate("/doglist", { replace: true });
       })
       .catch(error => {
        console.error(error);
       });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        Name:
        <input type="text" autoComplete="off" {...register("Email")} />
      <br />
        <br />

        Password:
        <input type="text" autoComplete="off" {...register("Pass")} />
      <br />
        <br />

        <a href="/staffreg">New Staff Please Enter Here</a>
      <br />
        <br />
      <input type="submit" />
      <br />
        <br />

      <Image
      width={600}
      src="https://onlinewritingtraining.com.au/wp-content/uploads/2017/04/Depositphotos_3365578_s-768x512.jpg"
      />
    
    </form>
  );
}

export default StaffLogin;
