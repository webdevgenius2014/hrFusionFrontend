import React from "react";
import { useState } from "react";
import { Sidebar, Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import NavToggle from "./NavToggle";
import { Link } from 'react-router-dom';
import PageEndIcon from '@rsuite/icons/PageEnd';
import PageTopIcon from '@rsuite/icons/PageTop';
import { IconButton } from 'rsuite';
import { Outlet } from 'react-router-dom';
const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));
const SidenavLayout = () => {
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');   
    return (
        <>
            <Sidebar style={{ display: 'flex', flexDirection: 'column' }} width={expanded ? 260 : 56} collapsible>
                <Sidenav.Header>
                    <div>HR Fusion</div>
                </Sidenav.Header>
                <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
                    <Sidenav.Body>
                        <Nav activeKey={activeKey} onSelect={setActiveKey}>
                            <Nav.Item as={NavLink} href="/" style={{ textAlign: "left" }} eventKey="1" icon={<DashboardIcon />}>
                                Dashboard
                            </Nav.Item>
                            <Nav.Item as={NavLink} href="/departments" style={{ textAlign: "left" }} eventKey="2" icon={<GroupIcon />}>
                                Departments
                            </Nav.Item> 
                            {/* <Nav.Item style={{ textAlign: "left" }} eventKey="3" icon={<GroupIcon />}>
                                Designations
                            </Nav.Item> 
                            <Nav.Item style={{ textAlign: "left" }} eventKey="4" icon={<GroupIcon />}>
                                Employees
                            </Nav.Item> 
                            <Nav.Item style={{ textAlign: "left" }} eventKey="5" icon={<GroupIcon />}>
                                Employee Feedback
                            </Nav.Item> 
                            <Nav.Item style={{ textAlign: "left" }} eventKey="6" icon={<GroupIcon />}>
                                Holidays 
                            </Nav.Item> 
                            <Nav.Item style={{ textAlign: "left" }} eventKey="7" icon={<GroupIcon />}>
                                Event Calenda 
                            </Nav.Item> 
                            <Nav.Item style={{ textAlign: "left" }} eventKey="8" icon={<GroupIcon />}>
                                Leaves 
                            </Nav.Item> 
                            <Nav.Item style={{ textAlign: "left" }} eventKey="9" icon={<GroupIcon />}>
                                Clients  
                            </Nav.Item> 
                            <Nav.Item style={{ textAlign: "left" }} eventKey="10" icon={<GroupIcon />}>
                                Projects  
                            </Nav.Item> 
                            <Nav.Item style={{ textAlign: "left" }} eventKey="11" icon={<GroupIcon />}>
                                Tasks   
                            </Nav.Item>   
                            <Nav.Item style={{ textAlign: "left" }} eventKey="12" icon={<GroupIcon />}>
                                Employee Documents Format   
                            </Nav.Item>  
                            <Nav.Item style={{ textAlign: "left" }} eventKey="13" icon={<GroupIcon />}>
                                Employee Concerns   
                            </Nav.Item>   */}
                        </Nav>
                    </Sidenav.Body>
                    <NavToggle expand={expanded} onChange={() => setExpanded(!expanded)} />                    
                </Sidenav>
            </Sidebar>                       
        </>
    )
}

export default SidenavLayout;