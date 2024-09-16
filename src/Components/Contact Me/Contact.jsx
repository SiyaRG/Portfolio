import React, { useState, useEffect } from "react";

import {
    Container,
    Row,
    Col,
    Form,
    FloatingLabel,
    Button
} from "react-bootstrap";
import OutputModal from "./OutputModal.jsx";
import Spinner from "../../Resources/Spinners/Spinner.jsx";

const { sendEmail } = require("./sendEmail.js");
const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [valEmail, setValEmail] = useState(0);
    const [valName, setValName] = useState(0);
    const [valComment, setValComment] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    let isValid = valName + valEmail + valComment === 3;
    useEffect(() => {}, [valName, valComment, valEmail, error]);

    const handleSubmit = async e => {
        setLoading(true);

        try {
            const par = {
                from_name: name,
                message: comment,
                email: email
            };

            await sendEmail(
                "service_1lx07tb",
                "template_vrl35gp",
                "xWbGbrbqyDgwR6vgU",
                par
            );
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
        let i = document.getElementById("name");
        i.value = "";
        i.classList.remove("isValid");
        setName("");
        setValName(0);
        i = document.getElementById("email");
        i.value = "";
        i.classList.remove("isValid");
        setEmail("");
        setValEmail(0);
        i = document.getElementById("comment");
        i.value = "";
        i.classList.remove("isValid");
        setComment("");
        setValComment(0);
        handleShow();
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLoading = () => setLoading(false);
    return (
        <Container
            fluid
            className="justify-content-center bg-body-secondary view contact"
        >
            <Row>
                <Col>
                    <h1 className="text-center text-light-emphasis mt-3">
                        Get in touch!
                    </h1>
                </Col>
            </Row>

            <Form className="mt-5">
                <Row className="text-center justify-content-evenly">
                    <Col sm>
                        <Form.Group>
                            <Form.Text className="">
                                {(() => {
                                    if (name === "") return "Name";
                                })()}
                            </Form.Text>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Name"
                                className="mb-3 mx-auto inVa"
                                style={{ maxWidth: "15rem" }}
                            >
                                <Form.Control
                                    id="name"
                                    type="text"
                                    placeholder="My Name/Organisation"
                                    onChange={e => {
                                        setName(e.target.value);
                                        e.target.classList.remove("is-invalid");
                                    }}
                                    onBlur={e => {
                                        if (e.target.value === "") {
                                            e.target.classList.add(
                                                "is-invalid"
                                            );
                                            setValName(0);
                                        } else {
                                            e.target.classList.remove(
                                                "is-invalid"
                                            );
                                            e.target.classList.add("is-valid");
                                            setValName(1);
                                        }
                                    }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Group>
                            <Form.Text className="">
                                {(() => {
                                    if (email === "") return "Email";
                                })()}
                            </Form.Text>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email Adress"
                                className="mx-auto"
                                style={{ maxWidth: "15rem" }}
                            >
                                <Form.Control
                                    id="email"
                                    type="email"
                                    placeholder="iam@interested.com"
                                    onChange={e => {
                                        setEmail(e.target.value);
                                    }}
                                    onBlur={e => {
                                        const regEmail =
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
                                        if (!regEmail.test(email)) {
                                            e.target.classList.add(
                                                "is-invalid"
                                            );
                                            setValEmail(0);
                                        } else {
                                            e.target.classList.remove(
                                                "is-invalid"
                                            );
                                            e.target.classList.add("is-valid");
                                            setValEmail(1);
                                        }
                                    }}
                                />
                            </FloatingLabel>

                            <Form.Text className="text-muted">
                                I will never share your email with anyone
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="text-center justify-content-evenly mt-5">
                    <Col>
                        <Form.Group>
                            {" "}
                            <Form.Text className="">
                                {(() => {
                                    if (comment === "") return "Comment";
                                })()}
                            </Form.Text>
                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="Comments"
                                className="mx-auto"
                                style={{
                                    maxWidth: "30rem"
                                }}
                            >
                                <Form.Control
                                    as="textarea"
                                    id="comment"
                                    placeholder="Leave a comment here"
                                    style={{
                                        height: "8rem"
                                    }}
                                    onChange={e => {
                                        setComment(e.target.value);
                                        if (e.target.value.length < 10) {
                                            e.target.classList.add(
                                                "is-invalid"
                                            );
                                            setValComment(0);
                                        } else {
                                            e.target.classList.remove(
                                                "is-invalid"
                                            );
                                            e.target.classList.add("is-valid");
                                            setValComment(1);
                                        }
                                    }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-5 pb-3">
                    <Col id="subCol">
                        <Form.Group>
                            <Button
                                id="contactSubmit"
                                disabled={!isValid}
                                onClick={e => {
                                    handleSubmit(e);
                                }}
                            >
                                {(() => {
                                    return isValid ? "Contact Me!" : "...";
                                })()}
                            </Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <OutputModal
                show={show}
                error={error}
                handleClose={handleClose}
                loading={handleLoading}
            />
            <Spinner show={loading} />
        </Container>
    );
};

export default Contact;
