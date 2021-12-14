import React, { useEffect, useState } from 'react';
import Navigation  from '../components/navigation'
import { queryApi } from "../utils/queryApi";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import scrapData from "../data/scrap";

 function Scraping({ user }){
    const [studentList, setStudentList]= useState([]);
    useEffect(()=> {
        async function fetchStudentList(){
            try{
                const [requestUrl, err] = await queryApi("data-scrapping", {}, "Get", false);
                console.log(requestUrl);
                setStudentList(requestUrl);
                const reponse = await fetch(requestUrl);
                const reponseJSON = await reponse.json();
              
               
               
                  } catch {

                  
                }
        }
        fetchStudentList();
    },[]);
    console.log(studentList)
return (

    <div>
        <div >
    
       
       
         <Navigation />
         {user.gender === 'man' ? 
            <div>
                 <ProductsWrapper> 
         <ul className="container" >
         
 

            {studentList?.map((post,index) => 
              
              <li className="item"> 
              <Grid container  justify="center" spacing={8}  >
                 <Grid item></Grid>
            <Card style={{ maxWidth: 430, margin: 30 }} >
            <CardActionArea>
              <div
                style={{
                  display: "flex",
                  alignItem: "center",
                  justifyContent: "center",
                
                }}
              >
                <CardMedia
                  style={{
                    width: "auto",
                    maxHeight: "400px",
                 }}
                  component="img"
                  
                  image={post.image}
                  title={post.title}
                  
                />
              </div>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h4">
                  {post.title}
                </Typography>
                <Typography component="p">
               price :  {post.price}
                </Typography>
          
                
              </CardContent>
            
            </CardActionArea>
           
          </Card>
       
               
                  
                 </Grid>
               
            
              </li>
                
                
            )}
           
        
            
        </ul>
        </ProductsWrapper>
            </div>
            :
            <div>
              <ProductsWrapper> 
         <ul className="container" >
         
 

            {scrapData?.map((post,index) => 
              
              <li className="item"> 
              <Grid container  justify="center" spacing={8}  >
                 <Grid item></Grid>
              <Card style={{ maxWidth: 400, margin: 30 }} >
            <CardActionArea>
              <div
                style={{
                  display: "flex",
                  alignItem: "center",
                  justifyContent: "center",
                
                }}
              >
                <CardMedia
                  style={{
                    width: "auto",
                    maxHeight: "400px",
                 }}
                  component="img"
                
                  image={post.image}
                  title={post.title}
                  
                />
              </div>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h4">
                  {post.title}
                </Typography>
                <Typography component="p">
              
               price :  {post.price}
                </Typography>
                
              </CardContent>
            
            </CardActionArea>
           
          </Card>
  </Grid>
               
            
              </li>
                
                
            )}
           
        
            
        </ul>
        </ProductsWrapper>
            </div>
          }
          
    </div>
  
    </div>
);
}

const ProductsWrapper = styled.div`
margin-top:100px;
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
export default Scraping;