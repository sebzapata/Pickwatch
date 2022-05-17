import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import styles from './formSection.module.css';

const FormSection: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const submitForm = () => {
    event.preventDefault();

    console.log("name", name)
    console.log("email", email)
    console.log("message", message)
  }

  return (
    <>
      <Form onSubmit={submitForm}>
        <Row>
          <Col xs={12} lg={6}>
            <Form.Group controlId="name" className={styles.inputField}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
                value={name}
              />
              {/*{isBookingRefInvalid && (*/}
              {/*  <p className={styles.errorMessage}>*/}
              {/*    Booking reference needs to be 7 characters or more*/}
              {/*  </p>*/}
              {/*)}*/}
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group controlId="email" className={styles.inputField}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="message" className={styles.inputField}>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMessage(e.target.value);
                }}
                value={message}
                maxLength={12}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className={styles.submitButton}>
          Submit
        </Button>
      </Form>
  </>
  )
}

export default FormSection;
