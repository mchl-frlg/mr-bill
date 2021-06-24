import { React }  from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import EmailButton from '../buttons/EmailButton'
import{ Accordion, Card, Button } from 'react-bootstrap'
import ClockButton from '../buttons/ClockButton'

const Notifications = () => {
  const activeUser = useSelector(state => state.activeUser)

  return (
    <>
      <ClockButton/>
      <p>Recents</p>
      <Accordion>
        {activeUser.billsList?.filter(bill => bill.paid === true).map((filteredBill, index) => {
            if(index < 8){
              return (
                <Card key={filteredBill._id}>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='light' eventKey={filteredBill._id}>
                  <h6><Moment format="MM/DD/YYYY">{new Date(filteredBill.date)}</Moment></h6>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={filteredBill._id}>
                <Card.Body>
                  <h6>${filteredBill.amountDue} for {filteredBill.from} <a href={filteredBill.link} target="_blank" rel="noreferrer"><EmailButton/></a></h6>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
              )
            }
            return <> </>
          }
        )}
      </Accordion>
    </>
  )
  
}

export default Notifications