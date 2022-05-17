import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import styles from './formSection.module.css';

const FormSection: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isMessageValid, setIsMessageValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const submitForm = () => {
    event.preventDefault();

    console.log("name", name)
    console.log("email", email)
    console.log("message", message)
  }

  const isSubmitEnabled = (): boolean => {
    return !!name && isValidEmail(email) && isCorrectCharacterCount(message);
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
  }

  const isCorrectCharacterCount = (text: string): boolean => {
    return text.length >= 20 && text.length <= 1024;
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
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  setIsEmailValid(isValidEmail(e.target.value))
                }}
                value={email}
              />
              {!isEmailValid && (
                <p className={styles.errorMessage}>
                  Email is not valid
                </p>
              )}
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
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  setIsMessageValid(isCorrectCharacterCount(e.target.value))
                }}
                value={message}
              />
              {!isMessageValid && (
                <p className={styles.errorMessage}>
                  Message needs to be between 20 and 1,024 characters
                </p>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className={styles.submitButton} disabled={!isSubmitEnabled()}>
          Submit
        </Button>
      </Form>
  </>
  )
}

export default FormSection;
