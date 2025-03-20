import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';
import { faBuilding } from '@fortawesome/free-regular-svg-icons/faBuilding';
import { faSun } from '@fortawesome/free-regular-svg-icons/faSun';

const Nav = () => {

  return (
    <div className="navbar backdrop-blur-lg shadow-sm bg-gray-950/40">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Home Assistant</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a><FontAwesomeIcon icon={faBuilding} /></a></li>
          <li><a><FontAwesomeIcon icon={faLightbulb} /></a></li>
          <li><a><FontAwesomeIcon icon={faSun} /></a></li>
          <li><a><FontAwesomeIcon icon={faLightbulb} /></a></li>
          <li><a><FontAwesomeIcon icon={faLightbulb} /></a></li>
          <li><a><FontAwesomeIcon icon={faLightbulb} /></a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Settings</a>
      </div>
    </div>
  )
}

export default Nav;
