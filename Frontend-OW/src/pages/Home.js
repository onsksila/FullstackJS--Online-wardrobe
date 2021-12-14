import React,{useState,useEffect} from 'react';

import styled from "styled-components";
import Navigation  from '../components/navigation';

const SuggestionClient = React.lazy(() => import("../components/SuggestionClient"));


function Home({user}) {


    return (
        <>
         <Navigation user={user}/>
        <HomeFrame>
        <SuggestionClient user={user} />
          
        </HomeFrame>
        </>
    )
}
const HomeFrame = styled.div`

`;
export default Home;
