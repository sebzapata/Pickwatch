import React from 'react';
import { Card, CloseButton } from 'react-bootstrap';

import styles from './formSection.module.css';
import { FormData } from '../../types/formData';

interface InfoCardProps extends FormData {
  callback: () => void;
}

const InfoCard: React.FunctionComponent<InfoCardProps> = ({name, email, message, callback}) => {
  return (
    <Card>
      <Card.Header as="h5">
        <div className={styles.headerWrapper}>
          {name}<CloseButton onClick={callback}/>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{email}</Card.Title>
        <Card.Text>
          {message}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default InfoCard;
