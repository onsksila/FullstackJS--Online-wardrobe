import React from 'react'

function navquiz() {

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <div>
          <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll' href='/home'>
              <img src="./img/online.png" style={{width:'150px',position: 'fixed',left: 0, top: 0 }}/>
          </a>{' '}

         
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            
            
            <li>
              
              <button  onClick={logout}className='btn btn-custom btn-lg page-scroll' >Log out</button>

            </li>
            
          </ul>
        </div>
      </div>
    </nav>  
        </div>
    )
}

export default navquiz
