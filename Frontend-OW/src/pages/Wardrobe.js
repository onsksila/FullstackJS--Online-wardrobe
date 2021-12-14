import React from 'react';
import Gallery from '../components/gallery';
import Navigation  from '../components/navigation'

function Wardrobe({user}) {

    return (
        <div>
         <Navigation user={user} />
           <Gallery user={user} />
        </div>
    )
}

export default Wardrobe
