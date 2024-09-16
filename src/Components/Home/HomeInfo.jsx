import React from "react";
import { Container, Row, Nav } from "react-bootstrap";

const HomeInfo = () => {
    return (
        <Container fluid>
            <Row>
                <h2 className="text-light-emphasis">
                    Hi, <em className="siya">I'm Siya</em>,
                    <br /> waving the flag as a <br />{" "}
                    <span>Software Developer</span>
                </h2>

                <p>
                    Persuing excellence in each line of code <br /> with
                    unwavering determination!
                </p>
            </Row>

            <Row id="linkNav">
                <Nav className="ms-auto d-flex justify-content-center">
                    <Nav.Link href="https://www.linkedin.com/in/siyabonga-soko-6189a0275" id="LinkedIn"></Nav.Link>
                    <Nav.Link href="https://github.com/SiyaRG" id="GitHub"></Nav.Link>
                    <Nav.Link
                        href="https://www.hackerrank.com/profile/siyabongafikcur1"
                        id="HackerRank"
                    ></Nav.Link>
                </Nav>
            </Row>
        </Container>
    );
};

export default HomeInfo;
