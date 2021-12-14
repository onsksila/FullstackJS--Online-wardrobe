import React,{useState} from 'react';
import styled from "styled-components";
import { useFormik } from "formik";
import { queryApi } from "../utils/queryApi";

function Answer(  {answers,showButton,typeAnswer,nbAnswer,ansewerUser,nr,user}) {
  
  const [text, setText] = useState("");
  const [nrd, setNrd] = useState(0); // nr compteur de  dataQuiz

  const [showLoader, setShowLoader] = useState(false); //api
  const [error, setError] = useState({ visible: false, message: "" }); //api

  const [colorTast,setColorTast] = useState('red');
 
  const [colthTast,setColthTast] = useState([]);
  const [chicStat,setChikSatat] = useState();
  const [casualStat,setCasualSatat] = useState();
  const [sportStat,setSportStat] = useState();
  const [vintageStat,setVintageStat] = useState();

    
    const checkAnswer = async (e) =>{
    showButton();
   
    
       
    if (nr === 0){
      if(!colthTast[0]){
           colthTast.push(e.currentTarget.value); 
           console.log('1 '+colthTast[0])  
           
        }
        else{
            colthTast.pop();
            colthTast.push(e.currentTarget.value); 
            console.log('2 '+colthTast[0])    
        } 
    
    }
        if (nr === 1){
          
            if(!colthTast[1]){
                colthTast.push(e.currentTarget.value); 
                console.log('1 '+colthTast) 
                
             }
             else{
                 colthTast.pop();
                 colthTast.push(e.currentTarget.value); 
                 console.log('2 '+colthTast)    
             } 
           
        }

        if (nr === 2){
            if(!colthTast[2]){
                colthTast.push(e.currentTarget.value); 
                console.log('1 '+colthTast)   
                
             }
             else{
                 colthTast.pop();
                 colthTast.push(e.currentTarget.value); 
                 console.log('2 '+colthTast)    
             } 
            
        }

        if (nr === 3){
            if(!colthTast[3]){
                colthTast.push(e.currentTarget.value); 
               
                console.log('1 '+colthTast)    
             }
             else{
                 colthTast.pop();
                 colthTast.push(e.currentTarget.value); 
                 console.log('2 '+colthTast)    
             } 
        }

        if (nr === 4){
            if(!colthTast[4]){
                colthTast.push(e.currentTarget.value); 
                console.log('1 '+colthTast)   
                
             }
             else{
                 colthTast.pop();
                 colthTast.push(e.currentTarget.value); 
                 console.log('2 '+colthTast)    
             } 
        }

        if (nr === 5){
            if(!colthTast[5]){
                colthTast.push(e.currentTarget.value); 
                console.log('1 '+colthTast) 
                 
             }
             else{
                 colthTast.pop();
                 colthTast.
                 colthTast.push(e.currentTarget.value); 
                 console.log('2 '+colthTast)    
             } 
             
            //  colthTast.forEach(element => {
            //      console.log( 'element ' +element )
            //      if(element.toString() === 'casual'){
            //         setCasualSatat(casualStat+1);
            //      }
            //  });

             let stats = colthTast.toString();

             console.log("caine " +stats)
            
             let casual = (((stats.match(/casual/g) || []).length)/6)*100;
             setCasualSatat(casual);
             console.log(casual);

             let chic = (((stats.match(/chic/g) || []).length)/6)*100;
             setChikSatat(chic)
             console.log(chic);

             let sport = (((stats.match(/sport/g) || []).length)/6)*100;
             setSportStat(sport);
             console.log(sport);

             let oldschool = (((stats.match(/oldschool/g) || []).length)/6)*100;
             setVintageStat(oldschool);
             console.log(oldschool);



            //  let count = 0;
            //  for(let i=0; i < colthTast.length; i++){
            //      let j = colthTast[i];
            //     console.log ("array coth tast j : "+j)
            //     if(colthTast[i] === "casual"){
            //         console.log("rrrrrrrrrrrrrrrrr " +colthTast[i])
            //         setCasualSatat(casualStat+1); 

            //         console.log("casualStat :  casualStat ")
            //     }
            //     if(colthTast[i] ==='chic'){
            //         console.log(colthTast[i])
            //         setChikSatat(count+1);   
            //     }
            //     if(colthTast[i] ==='sport'){
            //         console.log(colthTast[i])
            //         setSportStat(count+1)
            //     }
            //     if(colthTast[i] ==='oldschool'){
            //         console.log(colthTast[i])
            //         setVintageStat(count+1)
            //     }
            // }
         console.log("nbreponse : "+nr)

            const [, err] = await queryApi("cloth-taste/add",
                { 
                    "colorTast" : colorTast,
                    "styleTast" : colthTast[0],
                    "partyTast" : colthTast[1] ,
                    "weddingTast" : colthTast[2],
                    "shoesTast" : colthTast[3],
                    "workTast" : colthTast[4],
                    "acccessiorTast" : colthTast[5],
                    "user" : user._id
                } , 
                "POST", false);
            if (err) {
                setShowLoader(false);
                setError({
                  visible: true,
                  message: JSON.stringify(err.errors, null, 2),
                });
              } 

        }
            
       
        
      
   
   
    }


    return (
        <>
     
             {
                  typeAnswer==="image" ? 
                  <div className="flex flex-wrap mt-4 justify-around">
                     
                      <button value={ansewerUser[0]} onClick={checkAnswer} title="Casual Style" >
                          <img src={answers[0]} alt=""  style={{maxWidth:200+'px',height:'300px'}}/>
                      </button>

                      <button  value={ansewerUser[1]} onClick={checkAnswer} title="Classy Style" >
                          <img src={answers[1]} alt=""  style={{maxWidth:200+'px',height:'300px'}}/>
                      </button>
                      <button  value={ansewerUser[2]} onClick={checkAnswer} title="Sporty Style">
                          <img src={answers[2]} alt=""  style={{maxWidth:200+'px',height:'300px'}}/>
                      </button>

                      <button value={ansewerUser[3]} onClick={checkAnswer} title="Old School Style">
                          <img src={answers[3]} alt=""  style={{maxWidth:200+'px',height:'300px'}}/>
                      </button>
            
                       
                  </div>
                       :  nbAnswer === 2 ?
                  <div className="flex flex-wrap mt-4 justify-around">
                        <button  value={ansewerUser[0]} className="bg-white w-5/12 p-3 text-indigo-800 font-semibold rounded shadow mb-4" id="" onClick={checkAnswer}>{answers[0]}</button>
                        <button   value={ansewerUser[1]} className="bg-white w-5/12 p-3 text-indigo-800 font-semibold rounded shadow mb-4" onClick={checkAnswer}>{answers[1]}</button>
                   </div> :
                       <div className="flex flex-wrap mt-4 justify-around">
                          <button className="bg-white w-5/12 p-3 text-indigo-800 font-semibold rounded shadow mb-4"
                        value={ansewerUser[0]}   onClick={checkAnswer}>{answers[0]}</button>
                          <button className="bg-white w-5/12 p-3 text-indigo-800 font-semibold rounded shadow mb-4"
                        value={ansewerUser[1]}   onClick={checkAnswer}>{answers[1]}</button>
                         <button className="bg-white w-5/12 p-3 text-indigo-800 font-semibold rounded shadow mb-4"
                         value={ansewerUser[2]}    onClick={checkAnswer}>{answers[2]}</button>
                          <button className="bg-white w-5/12 p-3 text-indigo-800 font-semibold rounded shadow mb-4"
                        value={ansewerUser[3]}  onClick={checkAnswer}>{answers[3]}</button>
                      </div>

             }
              
              



    </>
    )
}


export default Answer;
