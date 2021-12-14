import React, { Suspense, useState } from "react";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login'
import Wardrobe from '../pages/Wardrobe';
import CarouselDemo from '../pages/CarouselDemo';
import Measurment from '../pages/Measurment';
import userService from '../service/UserService'
import Clothesupdate from '../components/Clothesupdate'
import Quiz from '../pages/Quiz';
import Scraping from '../pages/Scraping'

import QuizWom from '../pages/QuizWom';
import ErrorPage from "../pages/ErrorPage";
function Routes() {
   const user = userService.getUserFromToken(localStorage.getItem("token"));
  
     return (
        <>
          <BrowserRouter basename="/">
             <Suspense fallback={<p>...Loading page please wait</p>}>
             
                <Switch>
                <Route exact path="/signup" component={Signup}></Route>
                <Route exact path="/" component={Login}></Route>
                
                        <Route
                            path="/wardrobe"
                            render={(props) => {
                             if (!localStorage.getItem("token")) return <Redirect to="/" />;
                               return (
                              <Wardrobe 
                                  dataPath={"wardrobe"} user={user}
                             />
                           );
                          }}
                     ></Route>
                    <Route
                    path="/clothesupdate/:id"
                    render={(props) => <Clothesupdate {...props}  />}
                  ></Route>

<Route
                            path="/CarouselDemo"
                            render={(props) => {
                             if (!localStorage.getItem("token")) return <Redirect to="/" />;
                               return (
                              <CarouselDemo {...props}
                                dataPath={"CarouselDemo"} user={user}
                             />
                           );
                          }}
                     ></Route>
                     <Route
                            path="/quiz"
                            render={(props) => {
                             if (!localStorage.getItem("token")) return <Redirect to="/" />;
                             if(user.gender === 'man'){
                              return (
                                 <Quiz {...props}
                                     dataPath={"quiz"} user={user}
                                />
                              );
                             }else{
                              return (
                                 <QuizWom {...props}
                                     dataPath={"quiz"} user={user}
                                />
                              );
                             }
                               
                          }}
                     ></Route>
                       <Route
                            path="/home"
                            render={(props) => {
                             if (!localStorage.getItem("token")) return <Redirect to="/" />;
                               return (
                              <Home {...props}
                                dataPath={"home"} user={user}
                             />
                           );
                          }}
                     ></Route>
                      <Route
                            path="/suggFomSite"
                            render={(props) => {
                             if (!localStorage.getItem("token")) return <Redirect to="/" />;
                               return (
                              <Scraping {...props}
                                dataPath={"suggFomSite"} user={user}
                             />
                           );
                          }}
                     ></Route>
                      
                   

 <Route
                            path="/CarouselDemo"
                            render={(props) => {
                             if (!localStorage.getItem("token")) return <Redirect to="/" />;
                               return (
                              <CarouselDemo {...props}
                                dataPath={"CarouselDemo"} user={user}
                             />
                           );
                          }}
                     ></Route>
                     <Route
                            path="/measurment"
                            render={(props) => {
                             if (!localStorage.getItem("token")) return <Redirect to="/" />;
                               return (
                              <Measurment {...props}
                                dataPath={"measurment"} user={user}
                             />
                           );
                          }}
                     ></Route>
<Route
                        render={(props) => {
                           if (!localStorage.getItem("token")) return <Redirect to="/" />;
                             return (
                            <ErrorPage {...props}
                              dataPath={""} user={user}
                           />
                         );
                        }}
                     >
                      </Route>
                  </Switch>
              
                
               </Suspense>
            </BrowserRouter>
        
           

   {/**   <BrowserRouter basename="/">
                    <Route
                         path="/home"
                         render={(props) => <Home {...props} />}
                      ></Route>
            
                      <Route
                         path="/wardrobe"
                         render={(props) => <Wardrobe {...props} />}
                      ></Route>
                      <Route
                         path="/login"
                         render={() => <Login />}
                      ></Route>

                      <Route
                         path="/signup"
                         render={() => <Signup />}
                      ></Route>
      </BrowserRouter>
*/} 

        </>
    )
}

export default Routes;


