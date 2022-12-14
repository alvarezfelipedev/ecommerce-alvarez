import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Carrito from "../CartWidget/CartWidget";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <Navbar className="bg" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                className="logo"
                src="/adidas.svg"
                alt="Logo de Adidas"
                width={50}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav className="categorias">
              <Link to="category/jersey" className="categoria-">
                Jersey
              </Link>
              <Link to="category/ball" className="categoria-">
                Ball
              </Link>
              <Link to="category/cleats" className="categoria-">
                Cleats
              </Link>
            </Nav>
          </Navbar.Collapse>
          <Nav className="justify-content-end  " activeKey="/home">
            <Nav.Item>
              <Link to="/cart">
                <Carrito className="carrito" />
              </Link>
            </Nav.Item>
            <Navbar.Brand>
              <Link to="/cart"></Link>
            </Navbar.Brand>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
