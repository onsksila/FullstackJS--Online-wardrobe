import React,{useState} from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { queryApi } from "../utils/queryApi";
import * as Yup from "yup";
import Alert from '@material-ui/lab/Alert';
function Signup() {
  
  const history = useHistory();
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState({ visible: false, message: "" });
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      date:"",
      gender: "",
      measures:false,
      quiz:false
    },
    validationSchema: yupSchema,
    onSubmit: async (values) => {
      setShowLoader(true);
      const [, err] = await queryApi("auth/register", values, "POST", false);
      if (err) {
        setShowLoader(false);
        setError({
          visible: true,
          message: JSON.stringify(err.errors, null, 2),
        });
      } else history.push("/");
    }
  });
  
    return (
      <div>
      <header id='header'>
  <div className='intro'>
   
    
        <div className='row'>
          <div className='col-md-8 col-md-offset-2 intro-text'>
            <div className="container">


<div className="row">
    <div>
    
 
         <SigneUpFrame>
           
             <form onSubmit={formik.handleSubmit}>
           
                 <h2>Create Account</h2><br/>
                   <input
                     type="text"
                     id="name"
                      placeholder="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange} />
                       {formik.errors.name && formik.touched.name && (
          <FormError>{formik.errors.name}</FormError>
        )}
                    <input
                     type="text"
                     id="email"
                      placeholder="Email"
                      value={formik.values.email}
                     onChange={formik.handleChange} />
                      {formik.errors.email && formik.touched.email && (
          <FormError>{formik.errors.email}</FormError>
        )}
                     <input
                     type="password"
                     id="password"
                      placeholder="Password"
                      value={formik.values.password}
                     onChange={formik.handleChange} />
                      {formik.errors.password && formik.touched.password && (
          <FormError>{formik.errors.password}</FormError>
        )}
                      <input
                     type="date"
                     id="date"
                      placeholder="Date"
                      value={formik.values.date}
                     onChange={formik.handleChange} />
                      {formik.errors.date && formik.touched.date && (
          <FormError>{formik.errors.date}</FormError>
        )}
           <div style={{display:'flex'}}>       
 <label style={{left:'2%',position:"relative",color:'black'}} >
        <input
          type="radio"
          name="gender"
          value="woman"
          checked={formik.values.gender === "woman"}
          onChange={formik.handleChange}
          style={{right:'-15%',position:"relative"}} />woman
      </label>
      {formik.errors.gender && formik.touched.gender && (
          <FormError>{formik.errors.gender}</FormError>
        )}
        
      <label style={{right:'-6%',position:"relative",color:'black'}}>
        <input 
          type="radio"
          name="gender"
          value="man"
          checked={formik.values.gender === "man"}
          onChange={formik.handleChange}
          style={{right:'-40%',position:"relative"}}
        />man
      </label>
      {formik.errors.gender && formik.touched.gender && (
          <FormError>{formik.errors.gender}</FormError>
        )}
        </div>   
        <br/>
                    <button className='btn btn-custom btn-lg page-scroll'>Sign Up</button><br/><br/>
                        <a href='login'>login in.</a><br/><br/>
                       
             </form>
</SigneUpFrame>



         
    </div>
</div>
</div>
     
      
      
      </div>
    </div>
    <div
            className="footer"
            style={{
              display: "flex",
              flexFlow: "row  nowrap",
              justifyContent: "center",
            }}
          >
            <a
              href="https://www.facebook.com/Owardrobe"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
                marginRight: "10px",
              }} target="blank"
              >
              <i
                class="fab fa-facebook"
                style={{ color: "344fa1", backgroundColor: "transparent" }}
              ></i>{" "}
              Owardrobe
            </a>
            <i
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
                marginRight:"8px",
                marginLeft:"5px"
              }}
            >
              |
            </i>
            <a
              href="https://www.instagram.com/onlinewardrobe68/?hl=fr"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
              }}
              target="blank"
            >
              <i
                class="fab fa-instagram"
                style={{
                  background:
                    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                  borderRadius: "25px",
                  marginLeft: "10px",
                }}
              ></i>{" "}
              onlinewardrobe68
            </a>
          </div>
  </div>
  <div
          className="footer-urls"
          style={{ display: "flex", flexFlow: "row  nowrap" }}
        >
          <a
            href="https://online-wardrobe.herokuapp.com/wardrobe"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "15px",
              marginRight: "10px",
            }}
          >
            Wardrobe
          </a>{" "}
          |
          <a
            href="https://online-wardrobe.herokuapp.com/measurment"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "15px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          >
            Get your body measures
          </a>{" "}
          |
          <a
            href="https://online-wardrobe.herokuapp.com/suggFomSite"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "15px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          >
            Get suggestion
          </a>
        </div>
</header>  
    </div>
    )
}




const FormError = styled.p`
  color: #f74b1b;
`;


const SigneUpFrame = styled.div`

  overflow: hidden;
	background-color: rgba(255, 255, 255, 0.123);
	padding: 40px 30px 30px 30px;
	border-radius: 10px;
	position: absolute;
	top: 30%;
	left: 50%;
	width: 600px;
	-webkit-transform: translate(-50%, -50%);
	-moz-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	-o-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	
	transition: transform 300ms, box-shadow 300ms;
	box-shadow: 5px 10px 10px rgba(2, 128, 144, 0.2);

  &:before, &:after {
    content: "";
    position: absolute;
    width: 1100px;
    height: 1300px;
    border-top-left-radius: 50%;
    border-top-right-radius: 55%;
    border-bottom-left-radius: 35%;
    border-bottom-right-radius: 40%;
    z-index: -1;
    }

    &:before {
      left: 40%;
      bottom: -130%;
      background-color: rgba(187, 174, 234, 0.57);
      -webkit-animation: wawes 6s infinite linear;
      -moz-animation: wawes 6s infinite linear;
      animation: wawes 6s infinite linear;
      }
      &:after {
        left: 35%;
        bottom: -125%;
      background-color: rgba(163, 174, 228, 0.61);
      -webkit-animation: wawes 7s infinite;
      -moz-animation: wawes 7s infinite;
      animation: wawes 7s infinite;
      }
       input {
        font-family: "Asap", sans-serif;
        display: block;
        border-radius: 5px;
        font-size: 16px;
        background: rgb(255, 255, 255);
        width: 100%;
        border: 0;
        padding: 10px 10px;
        margin: 15px -10px;
        }
        @-webkit-keyframes wawes {
	from {
	  -webkit-transform: rotate(0);
	}
	to {
	  -webkit-transform: rotate(360deg);
	}
  }
  @-moz-keyframes wawes {
	from {
	  -moz-transform: rotate(0);
	}
	to {
	  -moz-transform: rotate(360deg);
	}
  }
  @keyframes wawes {
	from {
	  -webkit-transform: rotate(0);
	  -moz-transform: rotate(0);
	  -ms-transform: rotate(0);
	  -o-transform: rotate(0);
	  transform: rotate(0);
	}
	to {
	  -webkit-transform: rotate(360deg);
	  -moz-transform: rotate(360deg);
	  -ms-transform: rotate(360deg);
	  -o-transform: rotate(360deg);
	  transform: rotate(360deg);
	}
  }
  a {
    text-decoration: none;
    color: black;
    right: 10px;
    bottom: 10px;
    font-size: 20px;
    text-decoration: underline;
    }
`;
const yupSchema = Yup.object({
  name: Yup.string()
    
     .required("This field is "),
  email: Yup.string()
    
    .required(),
    password: Yup.string()
  
    .required(),
    
    gender: Yup.string()
    .required(),
 
    
});


export default Signup
