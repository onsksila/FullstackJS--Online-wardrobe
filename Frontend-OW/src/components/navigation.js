
/*mport { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
const Navigation = ({user}) => {

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const items = [
    {label: 'Home', icon: 'pi pi-fw pi-home'},
    {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
    {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
    {label: 'Documentation', icon: 'pi pi-fw pi-file'},
    {label: 'Settings', icon: 'pi pi-fw pi-cog'}
];

  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top' >
      <div className='container' >
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a href='/home'>
            <img src="./img/online.png" style={{ width: '125px', position: 'fixed', left: 50, top: 0 }} />
          </a>{' '}
        </div>
        <p>Welcome {user.name}</p>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='/CarouselDemo' className='page-scroll'><i className="pi pi-fw pi-home"></i>
                Home 
              </a>
            </li>
            <li>
              <a href='/wardrobe' className='page-scroll'>
                Wardrobe
              </a>
            </li>
            <li>
              <a href='/CarouselDemo' className='page-scroll'>
               Clothes
              </a>
            </li>
            <li>
              <a href='/Measurment' className='page-scroll'>
               Measurment
              </a>
            </li>
            <li>

              <button onClick={logout} className='btn btn-custom btn-lg page-scroll' >Log Out                            <i className="fas fa-sign-out-alt"></i></button>

            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navigation;*/

/*mport { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
const Navigation = ({user}) => {

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const items = [
    {label: 'Home', icon: 'pi pi-fw pi-home'},
    {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
    {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
    {label: 'Documentation', icon: 'pi pi-fw pi-file'},
    {label: 'Settings', icon: 'pi pi-fw pi-cog'}
];

  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top' >
      <div className='container' >
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a href='/home'>
            <img src="./img/online.png" style={{ width: '125px', position: 'fixed', left: 50, top: 0 }} />
          </a>{' '}
        </div>
        <p>Welcome {user.name}</p>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='/CarouselDemo' className='page-scroll'><i className="pi pi-fw pi-home"></i>
                Home 
              </a>
            </li>
            <li>
              <a href='/wardrobe' className='page-scroll'>
                Wardrobe
              </a>
            </li>
            <li>
              <a href='/CarouselDemo' className='page-scroll'>
               Clothes
              </a>
            </li>
            <li>
              <a href='/Measurment' className='page-scroll'>
               Measurment
              </a>
            </li>
            <li>

              <button onClick={logout} className='btn btn-custom btn-lg page-scroll' >Log Out                            <i className="fas fa-sign-out-alt"></i></button>

            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navigation;*/
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navigation = ({user}) => {

   const logout = () => {
    localStorage.clear();
    window.location.href = '/';
}

   

  return (
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
          <NavLink className='navbar-brand page-scroll' to='/home'>
              <img src="./img/online.png" alt="logo" style={{width:'150px',position: 'fixed',left: 0, top: 0 }}/>
          </NavLink>{' '}

     
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <Nav className='nav navbar-nav navbar-right'>
            <li>
              <NavLink to='/home' className='page-scroll'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/wardrobe' className='page-scroll'>
              Wardrobe
              </NavLink>
            </li>
            <li>
              <NavLink to='/measurment' className='page-scroll'>
              Measurment
              </NavLink>
            </li>
            <li>
              <NavLink to='/suggFomSite' className='page-scroll'>
              SUGGESTION
              </NavLink>
            </li>
            <li>
              
              <button  onClick={logout}className='btn btn-custom btn-lg page-scroll' >Log out</button>

            </li>
            
          </Nav>
        </div>
      </div>
    </nav>
  )
}
const Nav = styled.ul`
.active{
  border-bottom: 1px solid  #5ca9fb ;
	}
`
export default Navigation;

