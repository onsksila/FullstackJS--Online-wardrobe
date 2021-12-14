import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';
import { InputText } from 'primereact/inputtext';
//import Clothesmap from "./Clothesmap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faCoffee } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom';
import Example from '../components/useSpeechRecognition';
import React, { useRef, useState, useEffect  } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './DialogDemo.css';
import axios from 'axios'
import { apiUrl } from '../../src/Config'
import styled from "styled-components";
import { queryApi } from "../utils/queryApi";
import Alert from '@material-ui/lab/Alert';
import { useApi } from "../hooks/UseApi";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import  { addClothe } from "../redux/slices/clothesSlice";
import * as Yup from "yup";
import { useSelector } from "react-redux";//hook qui permet m'acces a l'etat de products
import { selectClothes } from "../redux/slices/clothesSlice";
const Clothesmap = React.lazy(() => import("./Clothesmap"));




 const Gallery = ({user}) => {
  const [clothes] = useApi("clothes/byuser/"+user._id);
 
 
  const dispatch = useDispatch();

  const toast = useRef(null);

 

  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayBasic1, setDisplayBasic1] = useState(false);
  
  const [position, setPosition] = useState('center');
  const [selectedFile, setSelectedFile] = useState("");
  const [predictedVal, setPredictedVal] = useState("");
  const [isBusy, setIsBusy] = useState(false);


  
  const dialogFuncMap = {
  
      'displayBasic2': setDisplayBasic2,
      'displayBasic1': setDisplayBasic1
  
  }
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
        setPosition(position);
    }
}


    









const formik = useFormik({
  initialValues: {
    name: "",
    style: "",
    season:"",
    User:"",
    image:"",
    
  },
  validationSchema: yupSchema,
  onSubmit: async (values) => {
   formik.values.User=user._id;
  formik.values.image=selectedFile;
    const [res, err] = await queryApi("clothes/add", values, "POST", true);
    console.log(res)
    dispatch(addClothe(res));//ajout dans redux
    window.location.reload()
  },
});






  const onHide = (name) => {
      dialogFuncMap[`${name}`](false);
  }

 
  
  const renderFooter = (name) => {
    return (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
            <Button label="Confirm" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
        </div>
    );
}
  const renderFooterupload = (name) => {
      return (
          <div>
              <Button label="Cancel" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
            
          </div>
      );
  }
  return (
    
   
    <div id='portfolio' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Your Wardrobe</h2>
          <h3>Get started with your virtual closet!</h3>
          <h3>Manage your wardrobe and choose your style!</h3>
         <br/> 
         <BusyStyle>
        <div className="overlay" style={{ display: isBusy ? "" : "none" }}>
          <div className="loader w3-display-middle"></div>
        </div>
      </BusyStyle>
  
           

           
                 
          
              
               
       <div>

            <Toast ref={toast}></Toast>

            <div className="card">
                
                <Button label="Choose your image" className='btn btn-custom btn-lg page-scroll' icon="pi pi-external-link" onClick={() => onClick('displayBasic1')} /> 
              
                <Dialog header="Upload your image" visible={displayBasic1} style={{ width: '50vw' }} footer={renderFooterupload('displayBasic1')} onHide={() => onHide('displayBasic1')} baseZIndex={1000}>
             

           {/***********************************ulpoad */}   


           <form onSubmit={formik.handleSubmit}>
     
 
      <Fileinput>
      <label className="custom-file-upload">
<input
            type="file"
            name="image"
           
            onChange={(event) => {
              formik.setFieldValue("image", event.target.files[0]);
              setSelectedFile(event.target.files[0])
              var fd = new FormData()
              fd.append('file', event.target.files[0])
              setIsBusy(true);
              axios.post(apiUrl, fd)
                .then(res => {
                  setPredictedVal(
                 res.data["predictedVal"]//val mil flask
                  );
                  formik.setValues({ name: res.data["predictedVal"]})
                  setIsBusy(false);
                  return res
                });
            }}icon="pi pi-plus"    />
              Choose a file
       </label>
          </Fileinput>

          <br/>
     <br/>
         <Select
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{height:"100%" ,right:'2.5%'}}
      >
    <option value="">Category*</option>
    <option value="shoes">shoes</option>
    <option value="dress">dress</option>
    <option value="hat">hat</option>
    <option value="longsleeve">longsleeve</option>
    <option value="outwear">outwear</option>
    <option value="pants">pants</option>
    <option value="shirt">shirt</option>
    <option value="shorts">shorts</option>
    <option value="skirt">skirt</option>
    <option value="t-shirt">t-shirt</option>
      </Select>
        {formik.errors.name && formik.touched.name && (
          <FormError>{formik.errors.name}</FormError>
        )}
      <br/>
      <Select
        name="style"
        value={formik.values.style}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{height:"100%" ,right:'2.5%'}}
      >
      <option value="">select a style*</option>
      <option value="Vintage">vintage</option>
    <option value="casual">casual</option>
    <option value="chic">chic</option>
  
    <option value="Sporty">sporty</option>
      </Select>
      {formik.errors.style && formik.touched.style && (
          <FormError>{formik.errors.style}</FormError>
        )}
      
<br/>
      <Select
        name="season"
        value={formik.values.season}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{height:"100%" ,right:'2.5%'}}
      >
       <option value="">select a season*</option>
       <option value="winter">winter</option>
       <option value="spring">spring</option>
       <option value="autumn">autumn</option>
       <option value="summer">summer</option>
      </Select>
      {formik.errors.season && formik.touched.season && (
          <FormError>{formik.errors.season}</FormError>
        )}
      <br/>
      <br/>
      <Button label="Add" icon="pi pi-check" style={{height:'50'+'%',left:'40%' }} ></Button>
     

 
    </form>



           </Dialog>
           </div>
           </div>
           </div>
   
       
 

           <ProductsWrapper>
           <ul className="container">
 {clothes?.map((clothes, index) => (
  <li className="item">
   <Clothesmap
   clothes={clothes}
  
     key={index}
   ></Clothesmap>
   </li>
 ))}
</ul>
</ProductsWrapper>
 


   
      </div>
    </div>
  )
}

const ProductsWrapper = styled.div`
.container {
  display: flex; 
  justify-content: center;
  flex-wrap: wrap;
 
  align-items: flex-start;
}

.item {
  flex-wrap: wrap;
  align-self: flex-start
  flex-shrink: 3;
}

`;
const yupSchema = Yup.object({
  name: Yup.string()
   
    .required(<Alert severity="error">This field is required</Alert>),
    
    style: Yup.string()
   
    .required(<Alert severity="error">This field is required</Alert>),
    
    season: Yup.string()
   
    .required(<Alert severity="error">This field is required</Alert>),
    
  

});

const BusyStyle = styled.div`
  .overlay {
    position: fixed;
    /* display: none; */
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2000000;
    cursor: pointer;
  }
  .loader {
    background-image: url("../images/loader.svg");
    background-repeat: no-repeat;
    background-position: center;
    /* border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid blue;
  border-bottom: 16px solid blue; */
    width: 100%;
    height: 100%;
    /* -webkit-animation: spin 2s linear infinite; */
    /* animation: spin 2s linear infinite; */
  }
`;
const Fileinput = styled.div`
 

  .custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}

input[type="file"] {
  display: none;
  
}
`;
const Select = styled.select`
  width: 80%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
  position:relative;
  left:-1.8%;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
const ButtonScan = styled.div`
@import url('https://fonts.googleapis.com/css?family=Roboto');


p {
  margin: 0;
}

display: flex;
justify-content: center;
  align-items: center;
  
  .btdiv{
    height: 10%;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  }

.bt {
    width: 100px;
    cursor: pointer;
    position: relative;
    font-family: "Roboto";
    text-transform: uppercase;
    color: #503af6;
    letter-spacing: 0.5px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: none;
    text-decoration: none;
    text-align: center;
  
}

.more-bt {
    border-right: 2px solid #503af6;
    border-bottom: 2px solid #503af6;
    padding: 17px 29px 15px 31px;
    border-color: #503af6;
}

.more-bt p {
  font-size: 14px;
}

#wrapper.smooth section.smoothy.show {
    visibility: visible;
}

.more-bt:before {
    left: 0;
    bottom: 0;
    height: -webkit-calc(100% - 17px);
    height: calc(100% - 17px);
    width: 2px;
}

.more-bt:after, .more-bt:before {
    content: " ";
    display: block;
    background: #503af6;
    position: absolute;
    -webkit-transition: .5s;
    transition: .5s;
    z-index: 10;
}

.more-bt:after {
    top: 0;
    right: 0;
    width: -webkit-calc(100% - 17px);
    width: calc(100% - 17px);
    height: 2px;
}

.more-bt:after, .more-bt:before {
    content: " ";
    display: block;
    background: #503af6;
    position: absolute;
    -webkit-transition: .5s;
    transition: .5s;
    z-index: 10;
}

::selection {
    background: #503af6;
    color: #FFFFFF;
    text-shadow: none;
}

.more-bt:before {
    left: 0;
    bottom: 0;
    height: -webkit-calc(100% - 17px);
    height: calc(100% - 17px);
    width: 2px;
}

.more-bt:after, .more-bt:before {
    content: " ";
    display: block;
    background: #503af6;
    position: absolute;
    -webkit-transition: .5s;
    transition: .5s;
    z-index: 10;
}

.more-bt .fl, .more-bt .sfl {
    position: absolute;
    right: 0;
    height: 100%;
    width: 0;
    z-index: 2;
    background: #503af6;
    top: 0;
    -webkit-transition: .5s;
    transition: .5s;
    -webkit-transition-delay: .1s;
    transition-delay: .1s;
}

.more-bt .fl, .more-bt .sfl {
    position: absolute;
    right: 0;
    height: 100%;
    width: 0;
    z-index: 2;
    background: #503af6;
    top: 0;
    -webkit-transition: .5s;
    transition: .5s;
    -webkit-transition-delay: .1s;
    transition-delay: .1s;
}

.more-bt .sfl {
    z-index: 1;
    background: #4431D1;
    -webkit-transition: .7s;
    transition: .7s;
}

.more-bt .cross {
    position: absolute;
    z-index: 15;
    width: 18px;
    height: 18px;
    top: -webkit-calc(50% - 8px);
    top: calc(50% - 8px);
    left: -webkit-calc(50% - 8px);
    left: calc(50% - 8px);
}

#wrapper.smooth section.smoothy {
    visibility: hidden;
}

.more-bt .cross:before {
    width: 100%;
    height: 2px;
    top: 8px;
    left: 0px;
    -webkit-transform: translateX(50px) scaleX(0);
    -ms-transform: translateX(50px) scaleX(0);
    transform: translateX(50px) scaleX(0);
}

.more-bt .cross:before, .more-bt .cross:after {
    content: " ";
    background: #fff;
    display: block;
    position: absolute;
    opacity: 0;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
    -webkit-transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
}

.more-bt .cross:after {
    width: 2px;
    height: 100%;
    left: 8px;
    top: 0;
    -webkit-transform: translateY(20px) scaleY(0);
    -ms-transform: translateY(20px) scaleY(0);
    transform: translateY(20px) scaleY(0);
    -webkit-transition-duration: .4s;
    transition-duration: .4s;
}

.more-bt .cross:before, .more-bt .cross:after {
    content: " ";
    background: #fff;
    display: block;
    position: absolute;
    opacity: 0;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
    -webkit-transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
}

.more-bt i {
    position: absolute;
    display: block;
    top: 1px;
    left: 1px;
    -webkit-transition: .5s;
    transition: .5s;
    z-index: 10;
}

.more-bt i:before {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
}

.more-bt i:after, .more-bt i:before {
    content: " ";
    display: block;
    width: 2px;
    height: 20px;
    background: #503af6;
    position: absolute;
    margin: -10px -1px;
    left: 50%;
    top: 50%;
    transition: 0.3s;
}

.more-bt:hover i:after {
    content: " ";
    display: block;
    width: 2px;
    height: 20px;
    background: #503af6;
    position: absolute;
    margin: 0px -1px;
    left: 50%;
    top: 50%;
}

.more-bt:hover i:before {
    content: " ";
    display: block;
    width: 2px;
    height: 20px;
    background: #503af6;
    position: absolute;
    margin: -10px 0px -10px 8px;
    left: 50%;
    top: 50%;
}

.more-bt p {
    -webkit-transition: .5s;
    transition: .5s;
    position: relative;
    z-index: 1;
}

.more-bt:hover:before, .more-bt:before {
    height: 100%;
}

.more-bt:before {
    left: 0;
    bottom: 0;
    height: -webkit-calc(100% - 17px);
    height: calc(100% - 17px);
    width: 2px;
}

.more-bt:hover .fl, .more-bt .fl {
    -webkit-transition: .7s;
    transition: .7s;
}

.more-bt:hover .fl, .more-bt:hover .sfl, .more-bt .fl, .more-bt .sfl {
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
    width: 100%;
}

.more-bt .fl, .more-bt .sfl {
    position: absolute;
    right: 0;
    height: 100%;
    width: 0;
    z-index: 2;
    background: #503af6;
    top: 0;
    -webkit-transition: .5s;
    transition: .5s;
    -webkit-transition-delay: .1s;
    transition-delay: .1s;
}

.more-bt:hover .sfl, .more-bt. .sfl {
    -webkit-transition: .5s;
    transition: .5s;
}

.more-bt:hover .fl, .more-bt:hover .sfl, .more-bt.hvd .fl, .more-bt.hvd .sfl {
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
    width: 100%;
}

.more-bt .sfl {
    z-index: 1;
    background: #4431D1;
    -webkit-transition: .7s;
    transition: .7s;
}

.more-bt .cross {
    position: absolute;
    z-index: 15;
    width: 18px;
    height: 18px;
    top: -webkit-calc(50% - 8px);
    top: calc(50% - 8px);
    left: -webkit-calc(50% - 8px);
    left: calc(50% - 8px);
}

.more-bt:hover .cross:before, .more-bt .cross:before {
    -webkit-transition-duration: .5s;
    transition-duration: .5s;
}

.more-bt:hover .cross:after, .more-bt:hover .cross:before, .more-bt .cross:after, .more-bt .cross:before {
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    opacity: 1;
    -webkit-transition-delay: .2s;
    transition-delay: .2s;
}

.more-bt .cross:after {
    width: 2px;
    height: 100%;
    left: 8px;
    top: 0;
    -webkit-transform: translateY(20px) scaleY(0);
    -ms-transform: translateY(20px) scaleY(0);
    transform: translateY(20px) scaleY(0);
    -webkit-transition-duration: .4s;
    transition-duration: .4s;
}

.more-bt .cross:before, .more-bt .cross:after {
    content: " ";
    background: #fff;
    display: block;
    position: absolute;
    opacity: 0;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
    -webkit-transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
}

.more-bt:hover .cross:after, .more-bt:hover .cross:before, .more-bt.hvd .cross:after, .more-bt.hvd .cross:before {
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    opacity: 1;
    -webkit-transition-delay: .2s;
    transition-delay: .2s;
}

.more-bt:hover .cross:after, .more-bt.hvd .cross:after {
    -webkit-transition-duration: .6s;
    transition-duration: .6s;
}


`;
const FormError = styled.p`
  color: #f74b1b;
`;

export default Gallery;
