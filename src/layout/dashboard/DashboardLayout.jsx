import React from 'react'
import { useState } from "react";
import { Container, Sidebar,Sidenav, Nav, Content, Footer } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import NavToggle from "./NavToggle";
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import Header from './topnav';
import Brand from '../../components/Brand';
const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));
const DashboardLayout = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('1');
  const containerClasses = classNames('page-container', {
    'container-full': !expanded
  });  
  return (
    <Container >       
      <Sidebar style={{ display: 'flex', flexDirection: 'column' }} width={expanded ? 260 : 56} collapsible>
        <Sidenav.Header>
          <Brand expanded={expanded} />          
        </Sidenav.Header>
        <Sidenav  expanded={expanded} defaultOpenKeys={['3', '4']}>
            <Sidenav.Body className='sideMain'>
              <Nav activeKey={activeKey} onSelect={setActiveKey}>
                  <Nav.Item as={NavLink} href="/" style={{ textAlign: "left" }} eventKey="1" icon={<DashboardIcon />}>
                      Dashboard
                  </Nav.Item>
                  <Nav.Item as={NavLink} href="/departments" style={{ textAlign: "left" }} eventKey="2" icon={<GroupIcon />}>Departments
                  </Nav.Item> 
                  <Nav.Item as={NavLink} href="/login" style={{ textAlign: "left" }} eventKey="3" icon={<GroupIcon />}>Login
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
      <Container className={containerClasses}>
        <Header />
        <Content className='main-content'>          
          <Outlet />
        </Content>
        <Footer >
          <div className='footer-main' >© 2023 HR Fusion System</div>
        </Footer>
      </Container>      
    </Container>
  )
}

export default DashboardLayout