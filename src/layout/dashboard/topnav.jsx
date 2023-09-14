import React from "react";
import { Navbar, Nav } from 'rsuite';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import CogIcon from '@rsuite/icons/legacy/Cog';

const Header = () => {
    return (
        <>
            <Navbar>               
                <Nav>
                    <Nav.Item>
                        <InputGroup>
                            <Input placeholder="Search here..." />
                            <InputGroup.Button>
                                <SearchIcon />
                            </InputGroup.Button>
                        </InputGroup>
                    </Nav.Item>
                </Nav>                
                <Nav pullRight>
                    <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
                </Nav>
            </Navbar>
        </>
    )
}

export default Header;