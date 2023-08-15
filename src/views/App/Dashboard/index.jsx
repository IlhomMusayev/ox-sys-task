import { Card, Col, Row, Skeleton } from "antd";
import { LockIcon } from "assets/icons/lockIcon";
import React from "react";

export default function Dashboard() {
  return (
    <div style={{ height: "100vh" }}>
      <h1>Dashboard</h1>
      <Row gutter={10}>
        <Col xs={20} sm={20} md={20} lg={8}>
          <Card>
            <span>Net Sales</span>
            <Skeleton active />
            <LockIcon
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "#fff",
                padding: 10,
                borderRadius: 50,
                width: 60,
                height: 60,
              }}
            />
          </Card>
        </Col>
        <Col xs={20} sm={20} md={20} lg={8}>
          <Card>
            <span>Visitors</span>
            <Skeleton active />
            <LockIcon
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "#fff",
                padding: 10,
                borderRadius: 50,
                width: 60,
                height: 60,
              }}
            />
          </Card>
        </Col>
        <Col xs={20} sm={20} md={20} lg={8}>
          <Card>
            <span>New customers</span>
            <Skeleton active />
            <LockIcon
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "#fff",
                padding: 10,
                borderRadius: 50,
                width: 60,
                height: 60,
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
