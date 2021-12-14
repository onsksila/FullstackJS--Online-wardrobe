import React,{useState,useEffect} from 'react';
import { useFormik } from "formik";
import styled from "styled-components";
import { Button } from 'primereact/button';
import { queryApi } from "../utils/queryApi";
import { makeStyles } from '@material-ui/core/styles';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { NotificationManager} from 'react-notifications';
import { Link } from "react-router-dom";


//import { Button } from 'reactstrap';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width:'100%',
    height:'100%',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width:300,
    height:200,
    display:'block',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

function SuggestionClient({user}) {

  
  
  const [suggImages,setSuggImages]= useState();
  const [show,setShow] = useState(true)//
  const [suggbb,setSuggbb] = useState(false);
  const [suggClient,setSuggClient] = useState(false);
  const [schedule,setSchedule] = useState(false);
  const [buttonText,setButtonText] = useState("Schedule")
  const [pageTitle,setPageTitle] = useState("Daly Suggestion")
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayBasic1, setDisplayBasic1] = useState(false);
  const [position, setPosition] = useState('center');

  const formikSchedule = useFormik({
    initialValues: {
      monday:"",  
      tuesday:"",
      wednesday:"",
      thursday:"",
      friday:"",
      saturday:"",
      sunday:"",
      user:""
    },
    
    onSubmit: async (values) => {
      formikSchedule.values.user=user._id;
    if(!schedule){
      const [res, err] = await queryApi("clothes/add-schedule", values, "POST", false);
      NotificationManager.success('Success Add Schedule', 'Schedule');
      setSchedule(true);
      
    }
     else{
      const [schedule, err] = await queryApi("clothes/editSchedule/"+user._id, values, "PUT", false);
      NotificationManager.success('Success Edit Schedule', 'Schedule');
     }
     

    },
  });

  const formikClient = useFormik({
    initialValues: {
      style:"",
      imageOne: "",
      iamgeTow: "",
      iamgeThree: "",
    },
    
    onSubmit: async (values) => {
  
   
      const [sugg, errr] = await queryApi("clothes/sugg/"+user._id+"/"+formikClient.values.style, {}, "GET", false);
      setSuggClient(true);
      console.log(" 1" +sugg.imageOne + " 2  " + sugg.imageOne )
      formikClient.setValues({ imageOne: sugg.imageOne, iamgeTow: sugg.imageTow, iamgeThree: sugg.imageThree });

    },
  });
  
  const formik = useFormik({
    initialValues: {
      imageOne: "",
      iamgeTow: "",
      iamgeThree: "",
      dayOfWeek: "",
    } });
  
  useEffect(()=>
    {async function fetchSugg()  {
      const [sugg,err] = await queryApi(
      "clothes/user/"+user._id,
       {},
      "GET",
      false
    );
    setSuggImages(sugg);
    if(sugg){
      setSuggbb(true);
    }
    console.log(sugg)
    if(sugg){
      formik.setValues({ imageOne:sugg.imageOne, iamgeTow:sugg.imageTow, iamgeThree:sugg.imageThree,dayOfWeek:sugg.dayOfWeek });
      console.log(formik.values.imageOne)
      console.log(formik.values.iamgeTow)
      console.log(formik.values.iamgeThree)
    }
    
  }fetchSugg();
  
  async function fetchSchedule(){
     const [schedule,err] = await queryApi(
      "clothes/schedule/"+user._id,
       {},
      "GET",
      false
    );
    if(schedule){
      formikSchedule.setValues({ monday: schedule.monday,
                                 tuesday: schedule.tuesday,
                                 wednesday: schedule.wednesday,
                                 thursday: schedule.thursday,
                                 friday: schedule.friday,
                                 saturday: schedule.saturday,
                                 sunday: schedule.sunday,
                                });
       setSchedule(true);                        
    }
  }fetchSchedule();
},
  [user._id])
      
 console.log(formik.values.dayOfWeek)


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

const sohwSchedule = () => {
   if(show){
    setShow(false);
    setPageTitle("Manage Your Schedule");
    setButtonText("Show Suggestion ");
   }
     
   else{
    setShow(true);
    setPageTitle("Daly Suggestion");
    setButtonText("Schedule ");
   }
     
}

const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
}

     const classes = useStyles();

    return (
        <>
        
             <div id='portfolio' className='text-center'>
             <div className='container'>
             <div className='section-title'>
                    <h2> {pageTitle} </h2>
                 
                       <span className="p-buttonset">
                           
                          <Button 
                                label={buttonText}   
                                onClick={sohwSchedule}
                                />
                           <Button 
                              
                              onClick={() => onClick('displayBasic1')}
                              disabled={ !suggbb}
                              label={ suggbb ? "show Verical" : "no suggestion to show"}
                              />
                       </span>
                 
                 </div>

       {show ?  
         <div>
           {suggbb ?
            <div> 
              <BlocImageFrame>
       <div className='row'>
         <div className='portfolio-items'>
           <div className='col-sm-6 col-md-4 col-lg-4'>
             <div className='portfolio-item'>
               {formik.values.imageOne ? 
                  <div>
                       <img
                     src={process.env.REACT_APP_API_URL_UPLOADS+"/"+formik.values.imageOne}
                     className='img-responsive'
                     alt='Project Title'
                   />
                 </div> :
                  <div>
                       <p>you dont have  any t-shirt that goes with selected tast on your wardrobe please scan plus then one</p>
                       <p> to get a nice result</p>  
                  </div>
                  }
                
                
            </div>
           </div>
           <div className='col-sm-6 col-md-4 col-lg-4'>
             <div className='portfolio-item'>
             {formik.values.iamgeTow ? 
                <div>
                   <img
                     src={process.env.REACT_APP_API_URL_UPLOADS + "/" +formik.values.iamgeTow}
                     className='img-responsive'
                     alt='Project Title'
                   />
                </div> : 
                <div>
                    <p>you dont have  any pants that goes with selected tast on your wardrobe please scan plus then one</p>
                       <p> to get a nice result</p> 
                </div> }
                
             </div>
             
           </div>
           <div className='col-sm-6 col-md-4 col-lg-4'>
             <div className='portfolio-item'>

             {formik.values.iamgeThree ? 
                <div>
                   <img
                     src={process.env.REACT_APP_API_URL_UPLOADS + "/" +formik.values.iamgeThree}
                     className='img-responsive'
                     alt='Project Title'
                   />
                </div> : 
                <div>
                    <p>you dont have  any shose that goes with selected tast on your wardrobe please scan plus then one</p>
                       <p> to get a nice result</p> 
                </div> }
                 
               
             </div>
           </div>
         </div>
       </div>
       </BlocImageFrame> 
            </div> :
             <div >
                  <p> 1 - You have to answer quiz accurately </p>
                  <div style={{dispaly :'flex' , justifyContent:'flex-start'}}>
                  <p> 2 - you have to scan more then one clothe to get a total suggestion  : </p> 
                  <Link to="/wardrobe"  style={{color:'blue'}}> go to scann</Link>
                  </div>
                  
                  <p> 3 - you have to fill in the paln : </p>  
                   <a  
                                style={{width:'100px',height:'50px',color:'blue'}}
                                onClick={sohwSchedule} > go to Schedule </a>
                                
                                
             </div>}
          
       </div> : 
          <div>
            <FormFrame>    

<FormSchedule>
    <form onSubmit={formikSchedule.handleSubmit}>
    <fieldset>
  <legend>Schedule:</legend>
  <Select name="monday"
       value={formikSchedule.values.monday}
       onChange={formikSchedule.handleChange}
       onBlur={formikSchedule.handleBlur}
      >
   <option value=""> Monday </option>
   <option value="worck">Worck</option>
   <option value="party">Party</option>
   <option value="wedding">Wedding</option>
   <option value="basicDay">Dasic Day</option>
     </Select>

     <Select name="tuesday"
       value={formikSchedule.values.tuesday}
       onChange={formikSchedule.handleChange}
       onBlur={formikSchedule.handleBlur}
     >
  <option value=""> Tuesday </option>
  <option value="worck">Worck</option>
   <option value="party">Party</option>
   <option value="wedding">Wedding</option>
   <option value="basicDay">Dasic Day</option>
    </Select>
    <Select name="wednesday"
       value={formikSchedule.values.wednesday}
       onChange={formikSchedule.handleChange}
       onBlur={formikSchedule.handleBlur}
     >
  <option value=""> Wednesday </option>
  <option value="worck">Worck</option>
   <option value="party">Party</option>
   <option value="wedding">Wedding</option>
   <option value="basicDay">Dasic Day</option>
    </Select>
    <Select name="thursday"
       value={formikSchedule.values.thursday}
       onChange={formikSchedule.handleChange}
       onBlur={formikSchedule.handleBlur}
     >
  <option value=""> Thursday </option>
  <option value="worck">Worck</option>
   <option value="party">Party</option>
   <option value="wedding">Wedding</option>
   <option value="basicDay">Dasic Day</option>
    </Select>
    <Select name="friday"
       value={formikSchedule.values.friday}
       onChange={formikSchedule.handleChange}
       onBlur={formikSchedule.handleBlur}
     >
  <option value=""> Friday </option>
  <option value="worck">Worck</option>
   <option value="party">Party</option>
   <option value="wedding">Wedding</option>
   <option value="basicDay">Dasic Day</option>
    </Select>
   
    <Select name="saturday"
       value={formikSchedule.values.saturday}
       onChange={formikSchedule.handleChange}
       onBlur={formikSchedule.handleBlur}
      >
   <option value=""> Saturday </option>
   <option value="worck">Worck</option>
   <option value="party">Party</option>
   <option value="wedding">Wedding</option>
   <option value="basicDay">Dasic Day</option>
     </Select>

     <Select name="sunday"
       value={formikSchedule.values.sunday}
       onChange={formikSchedule.handleChange}
       onBlur={formikSchedule.handleBlur}
      >
   <option value=""> Sunday </option>
   <option value="worck">Worck</option>
   <option value="party">Party</option>
   <option value="wedding">Wedding</option>
   <option value="basicDay">Dasic Day</option>
     </Select>
 
      <br/>
    <button className='btn btn-custom btn-lg page-scroll' > Save </button>  
    </fieldset>
    </form>
  </FormSchedule>


<ScheduleFrame> 
<div className="month">      
<ul>
  <li className="prev">&#10094;</li>
  <li className="next">&#10095;</li>
  <li >
      Your Schedule<br/>
    
  </li>
</ul>
</div>


<ul className="weekdays">
<li><span className={formik.values.dayOfWeek === 'monday' ? "active" : ""}>Monday</span></li>
<li><span className={formik.values.dayOfWeek === 'tuesday' ? "active" : ""}>Tuesday</span></li>
<li><span className={formik.values.dayOfWeek === 'wednesday' ? "active" : ""}>Wednesday</span></li>
<li><span className={formik.values.dayOfWeek === 'thursday' ? "active" : ""}>Thursday</span></li>
<li><span className={formik.values.dayOfWeek === 'friday' ? "active" : ""}>Friday</span></li>
<li><span className={formik.values.dayOfWeek === 'saturday' ? "active" : ""}>Saturday</span></li>
<li><span className={formik.values.dayOfWeek === 'sunday' ? "active" : ""}>Sunday</span></li>
</ul>

<ul className="days">  
<li><span className={formik.values.dayOfWeek === 'monday' ? "active-day" : ""}
      >{formikSchedule.values.monday ? formikSchedule.values.monday : "empty" }</span></li>
<li><span className={formik.values.dayOfWeek === 'tuesday' ? "active-day" : ""}
      >{formikSchedule.values.tuesday ? formikSchedule.values.tuesday : "empty" }</span></li>
<li><span className={formik.values.dayOfWeek === 'wednesday' ? "active-day" : ""}
      >{formikSchedule.values.wednesday ? formikSchedule.values.wednesday : "empty" }</span></li>
<li><span className={formik.values.dayOfWeek === 'thursday' ? "active-day" : ""}
     >{formikSchedule.values.thursday ? formikSchedule.values.tuesday : "empty" }</span></li>
<li><span className={formik.values.dayOfWeek === 'friday' ? "active-day" : ""}
    >{formikSchedule.values.friday ? formikSchedule.values.friday : "empty" }</span></li>
<li><span className={formik.values.dayOfWeek === 'saturday' ? "active-day" : ""}
     >{formikSchedule.values.saturday ? formikSchedule.values.saturday : "empty" }</span></li>
<li><span className={formik.values.dayOfWeek === 'sunday' ? "active-day" : ""}
   >{formikSchedule.values.sunday ? formikSchedule.values.sunday : "empty" }</span></li> 
</ul>     
</ScheduleFrame>     
       
  


</FormFrame>


 </div> } 
 <PageFrame>          
<Dialog  visible={displayBasic1} 
     style={{ width: '30vw' ,height: '800px', marginTop:'100px' }}
     onHide={() => onHide('displayBasic1')} baseZIndex={800}>
<div className={classes.root}>
<ImageFrame>

<div >  
{formik.values.imageOne ? 
          <div>
              <img
           src={process.env.REACT_APP_API_URL_UPLOADS + "/" +formik.values.imageOne}
           className='img-responsive'
           alt='Project Title'
           style={{maxWidth:150+'px',height:'200px'}}
         />
          </div> 
          :
          <div>
              no T-chirt Image 
          </div>
          }
      
</div>
<div >
{formik.values.iamgeTow ? 
          <div>
              <img
           src={process.env.REACT_APP_API_URL_UPLOADS+"/"+formik.values.iamgeTow}
           className='img-responsive'
           alt='Project Title'
           style={{maxWidth:150+'px',height:'200px'}}
         />
          </div> 
          :
          <div>
              no Pants Image
          </div>
          }
</div>
<div >
{formik.values.iamgeThree ? 
          <div>
              <img
           src={process.env.REACT_APP_API_URL_UPLOADS+"/"+formik.values.iamgeThree}
           className='img-responsive'
           alt='Project Title'
           style={{maxWidth:150+'px',height:'200px'}}
         />
          </div> 
          :
          <div>
              no Choes Image
          </div>
          }
</div>

       
</ImageFrame> 
</div>
</Dialog>
</PageFrame> 

<PageFrame>          
<Dialog  
     header=" Create New Suugestion "
     visible={displayBasic2} 
     style={{ width: '30vw' ,height: '800px', marginTop:'100px' }}
     onHide={() => onHide('displayBasic2')} baseZIndex={800}>
<div className={classes.root}>

  <form onSubmit={formikClient.handleSubmit}>
  <Select name="style"
       value={formikClient.values.style}
       onChange={formikClient.handleChange}
       onBlur={formikClient.handleBlur}
      >
   <option value=""> Choose Your Style </option>
   <option value="casual">Casual</option>
   <option value="chic">Chic</option>
   <option value="sporty">Sporty</option>
   <option value="vintage">Vintage</option>
     </Select>
    <br/>
    <br/>

     <Button label="Add" icon="pi pi-check" ></Button>
  </form>
   { suggClient ? 
         <div>
            <ImageFrame>

<div >  
       <img
           src={process.env.REACT_APP_API_URL_UPLOADS + "/" +formikClient.values.imageOne}
           className='img-responsive'
           alt='Project Title'
           style={{maxWidth:150+'px',height:'200px'}}
         />
</div>
<div >
  <img
           src={process.env.REACT_APP_API_URL_UPLOADS + "/" +formikClient.values.iamgeTow}
           className='img-responsive'
           alt='Project Title'
           style={{maxWidth:150+'px',height:'200px'}}
         />
</div>
<div >
  <img src={process.env.REACT_APP_API_URL_UPLOADS + "/" +formikClient.values.iamgeThree}  alt="" style={{maxWidth:150+'px',height:'200px'}} />
</div>

       
</ImageFrame>
         </div> : 
         <div>
                <p>you will get your suggestion here </p>
         </div> }
   


</div>
</Dialog>
</PageFrame>
           </div>
             
           </div>

        </>
    )
}




const BlocImageFrame = styled.div`
   margin-left : 50px;
`;

const PageFrame= styled.div`

display: flex; 
justify-content: center;

`;
const ImageFrame = styled.div`
display: flex;
flex-direction:column
`;


const ScheduleFrame = styled.div`
width : 50%;
height : 600px;
{box-sizing: border-box;}
ul {list-style-type: none;}
body {font-family: Verdana, sans-serif;}

.month {
  padding: 70px 25px;
  width: 100%;
  background: #1E90FF ;
  text-align: center;
}

.month ul {
  margin: 0;
  padding: 0;
}

.month ul li {
  color: white;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.month .prev {
  float: left;
  padding-top: 10px;
}

.month .next {
  float: right;
  padding-top: 10px;
}

.weekdays {
  margin: 0;
  padding: 10px 0;
  background-color: #ddd;
}

.weekdays li {
  display: inline-block;
  width: 13.6%;
  color: #666;
  text-align: center;
}

.days {
  padding: 10px 0;
  background: #eee;
  margin: 0;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 13.6%;
  text-align: center;
  margin-bottom: 5px;
  font-size:12px;
  color: #777;
}

.weekdays li .active {
  padding: 11px;
  background:#1E90FF;
  font-size:17px;
  color: white !important
}

.days li .active-day {
  font-size:20px
  font-weight: bold;
  color: black !important
}

/* Add media queries for smaller screens */
@media screen and (max-width:720px) {
  .weekdays li, .days li {width: 13.1%;}
}

@media screen and (max-width: 420px) {
  .weekdays li, .days li {width: 12.5%;}
  .days li .active {padding: 2px;}
}

@media screen and (max-width: 290px) {
  .weekdays li, .days li {width: 12.2%;}
}
`;


const FormSchedule = styled.div`
   width:40%;
`;

const FormFrame = styled.div`
  display : flex;
  justify-content: space-between;
  margin-top : 50px;
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


export default SuggestionClient
