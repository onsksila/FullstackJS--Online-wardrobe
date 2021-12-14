import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import React, { useRef, useState, useEffect  } from 'react';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './DialogDemo.css';
import axios from 'axios'
import  useSpeechRecognition  from '../../src/useSpeechRecognition';
import { apiUrl } from '../../src/Config'
import styled from "styled-components";
import { queryApi } from "../utils/queryApi";
import Alert from '@material-ui/lab/Alert';
import { useApi } from "../hooks/UseApi";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CollectionsBookmarkRounded } from '@material-ui/icons';
import {
  selectSelectedClothe,
  unselectClothe,
  updateClothe,
} from "../redux/slices/clothesSlice";



 const Clothesupdate = () => {

  
    const { id } = useParams();
 
  const toast = useRef(null);
  const selectedClothe = useSelector(selectSelectedClothe);
  const dispatch = useDispatch();
  const history = useHistory();
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayBasic1, setDisplayBasic1] = useState(false);
  const [selectValuestyle, SetselectValuestyle] = useState("");
  const [selectValueseason, SetselectValueseason] = useState("");
  const [position, setPosition] = useState('center');
  const [selectedFile, setSelectedFile] = useState("");
  const [predictedVal, setPredictedVal] = useState("");
  
  const [error, setError] = useState({ visible: false, message: "" });




  const formik = useFormik({
    initialValues: {
      name: selectedClothe.name,
      style: selectedClothe.style,
      season:selectedClothe.season,
      
    },
    
    onSubmit: async (values) => {
     
      const [res, err] = await queryApi("clothes/update/"+id, values, "PUT", true);
      dispatch(updateClothe(res));
      dispatch(unselectClothe());
      history.push("/wardrobe");
    },
  });

 
  useEffect(() => {
    console.log(selectedClothe.name)
    if (!selectedClothe) history.replace("/wardrobe");//ken selected produit mouch mawjoud yimchi lil produit
  }, [selectedClothe, history]);

  const returntowardrobe = () => {
    
    history.push("/wardrobe");
  };

  
  /*const dialogFuncMap = {
  
      'displayBasic2': setDisplayBasic2,
      'displayBasic1': setDisplayBasic1
  
  }
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
        setPosition(position);
    }
}

const fileSelectedHandler = (event) => {
  setSelectedFile(event.target.files[0])
  
}
async function update() {
  console.log("eeee"+clothes)
    var values={image:selectedFile,name:valuei,season:selectValueseason ,style:selectValuestyle}
    const [res, err] = await queryApi("clothes/update/"+id, values, "PUT", true);
    console.log(res)
   // history.push("/wardrobe");
  }

const fileUploadHandler = () => {
  var fd = new FormData()
  fd.append('file', selectedFile)
  axios.post(apiUrl, fd)
    .then(res => {
      setPredictedVal(
     res.data["predictedVal"]//val mil flask
      );
      return res
    });

    


}










const  handleDropdownChangesetyle=(e) =>{
  SetselectValuestyle( e.target.value );
}

const  handleDropdownChangeseason=(e) =>{
    
    SetselectValueseason( e.target.value )
    
    
   
  }

  
  const  handleChange=(e) =>{
    setValuei( e.target.value );
  }*/
  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0])
    console.log(selectedFile)
  }
  const fileUploadHandler = () => {
    var fd = new FormData()
    fd.append('file', selectedFile)
    axios.post(apiUrl, fd)
      .then(res => {
        setPredictedVal(
       res.data["predictedVal"]//val mil flask
        );
        return res
      });
  
      
  
  
  }
  function verif()
  {
if(predictedVal!="")
{return predictedVal}
else
return formik.values.name

  }
  return (
    <>

    
    
  <Wrapper className="bg-gradient-to-r from-indigo-100 .. flex items-center h-screen">
    <Form onSubmit={formik.handleSubmit}>
   
 
      <Fileinput>
      <label className="custom-file-upload">
<input
            type="file"
            name="image"
           
            onChange={(event) => {
              formik.setFieldValue("image", event.target.files[0]);
              var fd = new FormData()
              fd.append('file', event.target.files[0])
              axios.post(apiUrl, fd)
                .then(res => {
                  setPredictedVal(
                 res.data["predictedVal"]//val mil flask
                  );
                  return res
                });
            }}icon="pi pi-plus"    />
              Choose a file
       </label>
          </Fileinput>

          <br/>
     
         <Select
        name="name"
        value={verif()}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{height:"100%" ,right:'2.5%'}}
      >
      
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
      
      <br/>
      <Select
        name="style"
        value={formik.values.style}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{height:"100%" ,right:'2.5%'}}
      >
      
      <option value="Vintage">vintage</option>
    <option value="casual">casual</option>
    <option value="chic">chic</option>
  
    <option value="Sporty">sporty</option>
      </Select>
      
<br/>
      <Select
        name="season"
        value={formik.values.season}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{height:"100%" ,right:'2.5%'}}
      >
      
       <option value="winter">winter</option>
       <option value="spring">spring</option>
       <option value="autumn">autumn</option>
       <option value="summer">summer</option>
      </Select>
      <br/>
    
    
     
    
                            

        
       
     

      <Button label="Update" icon="pi pi-check" style={{height:'50'+'%' }} ></Button>
      <br/>

      <Button label="Cancel" icon="pi pi-times" onClick={returntowardrobe} style={{height:'40'+'%' }}/>
    </Form>
    </Wrapper>


 
       </>
 
       
  )
}
const Wrapper = styled.div`
 
  display: flex;
 
  justify-content: center;
`;



const FormGroup = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  text-transform: uppercase;
  color: black;
  display: flex;
  flex-direction: column;
  width: 33%;
  align-self: center;
`;
const FormField = styled.input`
  color: black;
  padding: 15px;
  outline: 0;
  border-width: 0 0 2px;
  border-color: #ebebeb;
  ::placeholder {
    text-transform: uppercase;
    font-family: "Kiona";
    font-size: large;
    letter-spacing: 0.1rem;
  }
`;
const FormButton = styled.button`
  background: #7b1bf7;
  text-transform: uppercase;
  color: white;
  border-radius: 25px;
  padding: 15px;
  border: 0;
  font-size: large;
  margin: 10px 0;
  font: 200 larger Kiona;
`;

const FormError = styled.p`
  color: #f74b1b;
`;


const Loader = styled.svg`
  animation: rotate 2s linear infinite;
  display: flex;
  align-self: center;
  width: 50px;
  height: 50px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;



const ProductsWrapper = styled.div`
  text-align: center;
  display: flex;
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
  width: 100%;
  height: 40%;
  position:relative;
  right:3%;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: 1px solid;
  margin-left: 10px;
  border-radius: 2.5px;
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


export default Clothesupdate;
