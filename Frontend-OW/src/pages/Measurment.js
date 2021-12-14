import Navigation from "../components/navigation";
import React, { useState, useEffect } from "react";
import FormMeasures from "../components/FormMeasures";
import Mesures from "../components/Mesures";
import axios from "axios";
import styled from "styled-components";
import { queryApi } from "../utils/queryApi";
import { useParams } from "react-router-dom";

function Measurment({ user }) {

  useEffect(() => {
    console.log("user measures", user.measures);
  }, [user.measures]);

  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState("");

  const [lefthand, setLefthand] = useState();
  const [leftleg, setLeftleg] = useState();
  const [righthand, setRighthand] = useState();
  const [rightleg, setRightleg] = useState();
  const [shoulder, setShoulder] = useState();
  const [volume, setVolume] = useState();
  const [userUpdate, setUserUpdate] = useState({
    name: user.name,
    email: user.email,
    date: user.date,
    gender: user.gender,
    quiz: user.quiz,
    measures: true,
  });

  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState({ visible: false, message: "" });

  const handleStartCalc = async (fileFront, fileSide, height) => {
    const formData = new FormData();
    formData.append("frontFile", fileFront);
    formData.append("sideFile", fileSide);
    formData.append("height", height);

    const config = { headers: { "content-type": "application/json" } };
    const tokenKey = "token";
   
    setIsBusy(true);
   

    try {
      const resp = await axios.post(
        "http://127.0.0.1:5000/api/get-body-measure",
        { face: fileFront, profile: fileSide, height: height },
        config
      );
      let result = resp.data;
      console.log(user.measures)
    
     

      if (result && user.measures === false) {
              
          const addToDb = await axios.post(
            process.env.REACT_APP_API_URL+"/measurement/add",
            {
              lefthand: result.left_hand,
              leftleg: result.left_leg,
              righthand: result.right_hand,
              rightleg: result.right_leg,
              shoulder: result.shoulder,
              volume: result.volume,
              User: user._id,
            }
          );
          const [, err] = await queryApi(
            "user/update/" + user._id,
            userUpdate,
            "PUT",
            false
          );
          if (err) {
            setShowLoader(false);
            setError({
              visible: true,
              message: JSON.stringify(err.errors, null, 2),
            });
          }else {
            localStorage.clear();
            //window.location = "/"; //set user.quiz true
            const [newUser, err] = await queryApi(
              "auth/email/"+user.email,
               {},
              "GET",
              false
            );
            if (err) {
              setShowLoader(false);
              setError({
                visible: true,
                message: JSON.stringify(err.errors, null, 2),
              });
             } else{
             localStorage.setItem(tokenKey, newUser.accessToken.accessToken);
              console.log("this is new user "+newUser);
              window.location = "/measurment"; //set user.quiz true
             }
           
         
          }
       
      } 
   

       if (result && user.measures === true) {
        const updateData = await axios.put(
          process.env.REACT_APP_API_URL+"/measurement/editMeasure/" + user._id,
          {
            lefthand: result.left_hand,
            leftleg: result.left_leg,
            righthand: result.right_hand,
            rightleg: result.right_leg,
            shoulder: result.shoulder,
            volume: result.volume,
            User: user._id,
          }
        );
      }

    const getMeasureFromDb = await axios.get(
      process.env.REACT_APP_API_URL+"/measurement/measure/" + user._id
    );
    console.log("getMeasureFromDb", getMeasureFromDb);
    setLefthand(getMeasureFromDb.data.lefthand);
    setLeftleg(getMeasureFromDb.data.leftleg);
    setRighthand(getMeasureFromDb.data.righthand);
    setRightleg(getMeasureFromDb.data.rightleg);
    setShoulder(getMeasureFromDb.data.shoulder);
    setVolume(getMeasureFromDb.data.volume);

    } catch (err) {
      if (!err.response) {
      } else if (err.response.status === 500) {
        setMessage("There was a problem with the server");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage(err.response.data.msg);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    }

    setIsBusy(false);
    
  };

  return (
    <>
      <Navigation user={user} />
      <BusyStyle>
        <div className="overlay" style={{ display: isBusy ? "" : "none" }}>
          <div className="loader w3-display-middle"></div>
        </div>
      </BusyStyle>
      <div style={{ display: "flex", flexFlow: "wrap row" }}>
        <FormMeasures user={user} propStartCalc={handleStartCalc} />

        <Mesures
         
          user={user}
          lefthand={lefthand}
          leftleg={leftleg}
          righthand={righthand}
          rightleg={rightleg}
          shoulder={shoulder}
          volume={volume}
        />
      </div>
    </>
  );
}

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
    
    width: 100%;
    height: 100%;
   
  }
`;

export default Measurment;

