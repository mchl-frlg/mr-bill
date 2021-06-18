import React  from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import EmailButton from '../buttons/EmailButton'
import{ Table } from 'react-bootstrap'
import SwitchButton from '../buttons/SwitchButton'
import TrashButton from '../buttons/TrashButton'
import BellButton from '../buttons/NotificationButton'

const Notifications = () => {

  const activeUser = useSelector(state => state.activeUser)

  return (
    <>
      <h4><span title='notifications'><BellButton/></span></h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>Sender</th>
            <th>Amount</th>
            <th>Link</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
        {activeUser.billsList?.map(bill => {
          if(bill.paid){
            return <></>
          }
          return (
            <tr key ={bill._id}>
              <td><Moment format="MM/DD/YYYY">{bill.date}</Moment></td>
              <td>{bill.from}</td>
              <td>{bill.fromEmail}</td>
              <td>${bill.amountDue}</td>
              <td><a href={bill.link} target="_blank" rel="noreferrer"><EmailButton/></a></td>
              <td><SwitchButton bill={bill._id} user={activeUser._id}/></td>
              <td><TrashButton/></td>
            </tr>
          )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default Notifications