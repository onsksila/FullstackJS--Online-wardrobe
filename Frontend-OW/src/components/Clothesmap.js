import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button } from 'primereact/button';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import {
  deleteClothe,
  selectClothe,
  setErrors,
} from "../redux/slices/clothesSlice";
import { queryApi } from "../utils/queryApi";

export default function Clothesmap(props) {
  const dispatch = useDispatch();
  const [clothes] = useState(props.clothes); //usestate(etat initial)
  const history = useHistory();


  const updateclothes = () => {
    dispatch(selectClothe(clothes));
    history.replace("/clothesupdate/" + clothes._id);
  };

  const deleteClotheEvent = async () => {
    const [res,err] = await queryApi("clothes/delete/" + clothes._id, {}, "DELETE");
    if (err) {
      dispatch(setErrors(err));
      console.log(res);
    } else {
      console.log(deleteClothe(clothes._id))
      dispatch(deleteClothe(clothes._id));
      window.location.reload()
    }
  };

  useEffect(() => {
    async function fetchData() {
      window.matchMedia("(min-width: 768px)");
    
    
    }
    fetchData();
    //eslint-disable-next-line
  }, []);
  
  return (
    <>
   {/*} <div className="card">
       <div className="product-item">
                    <div className="product-item-content">
                    
                    <ProductImage
          src={
            process.env.REACT_APP_API_URL_UPLOADS + "/" + props.clothes.image
          }
        ></ProductImage>
    
                        <div>
                            <h4 className="p-mb-1">{props.clothes.name}</h4>
                            <h6 className="p-mt-0 p-mb-3">{props.clothes.season}</h6>
                            <h6 className="p-mt-0 p-mb-3">{props.clothes.style}</h6>
                            <div className="car-buttons p-mt-5">
                                
                                <Button onClick={() => props.deleteclothes(clothes._id)} className="p-button-danger p-button-rounded">Delete</Button>
                                <Button onClick={updateclothes} className="p-button-warning p-button-rounded">update</Button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>*/}
<div >
      <Grid container  justify="center" spacing={8}  >
        <Grid item>
        
          <Card style={{ maxWidth: 400, margin: 15 }} >
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
                
                  image={process.env.REACT_APP_API_URL_UPLOADS + "/" + props.clothes.image}
                  title="outfit"
                  
                />
              </div>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h3">
                  {props.clothes.name}
                </Typography>
                <Typography component="p">
                  {props.clothes.style}<br/>
                  {props.clothes.season}
                </Typography>
                
              </CardContent>
              <Button onClick={deleteClotheEvent} className="p-button-danger p-button-rounded" >Delete</Button>
            <Button onClick={updateclothes} className="p-button-warning p-button-rounded">update</Button>
            </CardActionArea>
            <CardActions>
           
            </CardActions>
          </Card>
         
        </Grid>
        </Grid>
       
        </div>
                   
                

        </>
  );
        }

        const ProductImage = styled.img`
        width: 100%;
        height: 100%;
        border-radius: 25px;
        display:flex;
        
      `;
