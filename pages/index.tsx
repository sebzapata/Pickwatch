import type { NextPage } from 'next'
import Head from 'next/head'
import { Col, Container } from 'react-bootstrap';

import FormSection from '@src/components/formSection';
import Header from '@src/components/header';

import styles from './index.module.css';

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Seb's Pickwatch Assignment</title>
        <meta name="description" content="Seb's Pickwatch assignment" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </Head>
      <Col className={styles.col}>
        <Header />
        <p>Please enter your name, email address and a message into the form below</p>
        <FormSection />
      </Col>
    </Container>
  )
}

export default Home
