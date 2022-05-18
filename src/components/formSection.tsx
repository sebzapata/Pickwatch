import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import styles from './formSection.module.css';
import InfoCard from './infoCard';
import { FormData } from '../../types/formData'

type SubmissionStatuses = 'successful' | 'unsuccessful' | 'loading';

const FormSection: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isMessageValid, setIsMessageValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatuses>();
  const [formData, setFormData] = useState<FormData[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFormData = localStorage.getItem("formData");

      if (!storedFormData) return;

      const parsedFormData = JSON.parse(storedFormData);

      setFormData(parsedFormData);
    }

  }, []);

  const clearFormValues = () => {
    setName("");
    setEmail("");
    setMessage("");
  }

  const postApi = async () => {
    const url = '/api/pickwatch';

    try {
      setSubmissionStatus('loading');

      await axios.post(url, {
        name,
        email,
        message,
      });

      formData.push({
        name,
        email,
        message,
      });

      localStorage.setItem("formData", JSON.stringify(formData));

      setSubmissionStatus('successful');
      clearFormValues();
    } catch (e) {
      setSubmissionStatus('unsuccessful');
    }
  }

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    await postApi();
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

  const closeCard = (index: number): void => {
    formData.splice(index, 1)
    setFormData(x => [...formData]);

    localStorage.setItem("formData", JSON.stringify(formData));
  }

  const renderSubmissionStatus = (): JSX.Element | null => {
    if (submissionStatus === 'loading') {
      return <p className={styles.loadingMessage}>Loading, please wait</p>
    }

    if (submissionStatus === 'unsuccessful') {
      return <p className={styles.errorMessage}>Submission failed, please try again</p>
    }

    if (submissionStatus === 'successful') {
      return <p className={styles.successMessage}>Form submitted successfully</p>
    }

    return null;
  }

  const renderCardsSection = (): JSX.Element => {
    return (
      <div className={styles.cardsWrapper}>
        {
          formData.map((x, i) => (
            <InfoCard
              name={x.name}
              email={x.email}
              message={x.message}
              callback={() => closeCard(i)}
              key={`card-${i}`}
            />
          ))
        }
      </div>
    )
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
                  setSubmissionStatus(undefined)
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
                  setSubmissionStatus(undefined)
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
                  setSubmissionStatus(undefined)
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
        {renderSubmissionStatus()}
        <Button type="submit" className={styles.submitButton} disabled={!isSubmitEnabled()}>
          Submit
        </Button>
      </Form>
      {renderCardsSection()}
  </>
  )
}

export default FormSection;
