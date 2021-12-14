import React, { useState } from "react";
import Navquiz from "../components/navquiz";
import dataQuiz from "../data/dataQuiz";
import Answers from "../components/Answer";
import { queryApi } from "../utils/queryApi";
import { Button } from 'primereact/button';

function Quiz({ user }) {

  const tokenKey = "token";

  const [nr, setNr] = useState(0); // nr compteur de  dataQuiz
  const [total, setTotal] = useState(dataQuiz.length); //  dataQuiz.length
  const [showButton, setShowButton] = useState(false); //show button next question
 

  const [nbAnswer, setNbAnswer] = useState(dataQuiz[nr].answers.length);

  const [questionAnswered, setQuestionAnswered] = useState(false);

  const [typeAnswer, setTypeAnswer] = useState(dataQuiz[nr].typeAnswer); // iamge ou button

  const [answers, setAnswers] = useState(dataQuiz[nr].answers); // reponce affiché
  const [question, setQuestion] = useState(dataQuiz[nr].question); // qst
  const [ansewerUser, setAnsewerUser] = useState(dataQuiz[nr].answeruser);  //answer of user 

  const [showLoader, setShowLoader] = useState(false); //api
  const [error, setError] = useState({ visible: false, message: "" }); //api

  //user to update
  const [userUpdate, setUserUpdate] = useState({
    name: user.name,
    email: user.email,
    date: user.date,
    gender: user.gender,
    measures:user.measures,
    quiz: true,
  });



  const nextQst = async () => {
    if (nr < total - 1 && typeof answers != undefined) {
      setAnswers(dataQuiz[nr + 1].answers);
      setTypeAnswer(dataQuiz[nr + 1].typeAnswer);
      setNbAnswer(dataQuiz[nr + 1].answers.length);
      setQuestion(dataQuiz[nr + 1].question);
      setAnsewerUser(dataQuiz[nr + 1].answeruser);
      setNr(nr + 1);
      setShowButton(false);
      setQuestionAnswered(false);
      setTotal(dataQuiz.length);
      console.log("total"+total+"nr"+nr+1)
    }
    console.log("between "+nr+"t"+total)//0 6 
    if (nr >= total - 1) {
      user.quiz = true;
      console.log('user store '+ user.quiz)
      console.log('user to update '+userUpdate.quiz)
     
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
      } else {
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
          window.location = "/wardrobe"; //set user.quiz true
         }
       
     
      }
    }
  };

  const handleShowButton = () => {
    if (showButton) {
      setShowButton(false);
      setQuestionAnswered(false);
    } else setShowButton(true);
    setQuestionAnswered(true);
  };

  return (
    <>
     <Navquiz/>

      <div className="bg-gradient-to-r from-indigo-100 .. flex items-center h-screen">
    
        <div className="container mx-50">
          <div className="bg-white-to-r from-indigo-300 text-indigo-800 p-10 rounded-lg shadow-md mr-20 pr-20 ml-20 mr-20">
            <p className="text-indigo-600">
              {" "}
           
              <span className="text-indigo-800  text-3xl">
              Qst {nr + 1}/{total} :{" "}
              </span>
              <span className="text-indigo-800 font-semibold text-4xl">
               {question}
              </span>
            </p>
          </div>
          <Answers
            answers={answers}
            showButton={handleShowButton}
            typeAnswer={typeAnswer}
            nbAnswer={nbAnswer}
            ansewerUser={ansewerUser}
            nr={nr}
            total={total}
            user={user}
          />
          <br/>
          <br/>
          <div id="submit">
            {showButton || questionAnswered ? (
              <button
                className="btn btn-custom btn-lg page-scroll"
                onClick={nextQst}
              >
                {nr === total-1 ? "start" : "Next question"}
              </button>
            ) : <button title="Please check answer"
               className="btn btn-custom btn-lg page-scroll"
               disabled
          >
            {nr === total-1 ? "start" : "Next question"}
          </button>}
          </div>
        </div>
      </div>
      </>
  );
}
     

export default Quiz;



   