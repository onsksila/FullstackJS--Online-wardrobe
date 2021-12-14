import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { queryApi } from "../utils/queryApi";
import * as Yup from "yup";
import FileInput from "./FileInput";
import FileInputT from "./FileInputT";

function FormMeasures({ user, propStartCalc }) {
  const [isMale, setIsMale] = useState(user.gender === "man");
  const [fileFront, setFileFront] = useState({});
  const [fileSide, setFileSide] = useState({});
  const [height, setHeight] = useState(0);

  const onClickSubmit = (e) => {
    if (isValid(height) && fileFront && fileSide)
      propStartCalc(fileFront, fileSide, height);
    else alert("Invalid Input");
  };

  const isValid = (height) => {
    return true;
  };

const changeUserSize = (e)=>{
  setHeight(e.target.value)
}
  return (
    <InputForm>
      <div className="section-title text-center">
        <h2>Get your measures</h2>
      </div>
      <div>
        <form>
          <Inplab>
            <label htmlFor="height"><strong>Height </strong>(cm) <strong>:</strong></label>
            <input type="number" placeholder="" className="bg-indigo-100" style={{  borderRadius: "30px", borderStyle: 'none'}}
            onChange={changeUserSize}/>
          </Inplab>

          <InpImg>
            <FileInput
              isMale={isMale}
              isFront={true}
              propChangeFile={(file) => setFileFront(file)}
            />

            <FileInputT
              isMale={isMale}
              isFront={false}
              propChangeFile={(file) => setFileSide(file)}
            />
          </InpImg>
        </form>
      </div>

      <div className="content--continue-btn" style={{position:'absolute',right:'55%'}}>
        <button
          className="button button--purple button--lg body-model__btn"
          onClick={onClickSubmit}
        >
          <span className="btn btn-custom btn-lg page-scroll">Calculate</span>
        </button>
      </div>
    </InputForm>
  );
}

const Inplab = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  font-size: 15px;

    label{
    font-size: 15px;
    
  }
  
}
`;
const InpImg = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: no-wrap row;
  

  
`;
const InputForm = styled.div`
margin-top : 110px
`;

export default FormMeasures;