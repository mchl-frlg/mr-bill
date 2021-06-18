import React  from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import EmailButton from '../buttons/EmailButton'
import{ Table, Accordion, Card, Button } from 'react-bootstrap'
import ArchiveButton from '../buttons/ArchiveButton'

const Notifications = () => {

  const activeUser = useSelector(state => state.activeUser)

  return (
    <>
      <ArchiveButton/>
      <Accordion>
        {activeUser.billsList?.map(bill => {
          return (
            <Card key={bill._id}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant='light' eventKey={bill._id}>
              <h6><Moment format="MM/DD/YYYY">{bill.date}</Moment></h6>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={bill._id}>
            <Card.Body>
              <h6>${bill.amountDue} for {bill.from} <a href={bill.link} target="_blank" rel="noreferrer"><EmailButton/></a></h6>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
          )
          })}
      </Accordion>
    </>
  )
}

export default Notifications