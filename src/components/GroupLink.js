import React from 'react'
import { NavLink } from 'react-router-dom'
 
const GroupLink = ({ groupId, children, className }) => (
  <NavLink
  className = {className}
  activeClassName = " active"
    to={`/${ groupId }`}
  >
    {children}
  </NavLink>
)
 
export default GroupLink;