import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Menu from "./Menu";
import { Profile } from "./Profile";

const UserDashboard = () => {

    return (
        <Container fluid>
            <Row>
                <Col xs={2} className="sidebar mb-4">
                    <Menu />
                </Col>
                <Col xs={10} className="dashboard-content">
                    {/* <MyReviewsContainer /> */}
                    <Profile/>
                </Col>
            </Row>
        </Container>
    );
};

export default UserDashboard;
