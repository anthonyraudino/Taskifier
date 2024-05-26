import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import AboutModal from './AboutModal';
import '../header.css';

const Header = ({ onAddList }) => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleAboutModal = () => setShowAboutModal(!showAboutModal);

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container className="justify-content-between">
          <div className="header-left-contents"><Navbar.Brand href="#">Taskifier</Navbar.Brand>
          <div className="versionString">v0.2.5</div>
          </div>
          <div>
            <Button className="aboutBtn" variant="secondary" onClick={handleAboutModal}>About</Button>
            <Button className="addListBtn" variant="primary" onClick={onAddList}>Add Task List</Button>
          </div>
        </Container>
      </Navbar>
      
      <AboutModal show={showAboutModal} handleClose={handleAboutModal} />
    </>
  );
};

export default Header;
