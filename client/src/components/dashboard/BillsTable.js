import React  from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import EmailButton from '../buttons/EmailButton'
import{ Table } from 'react-bootstrap'
import SwitchButton from '../buttons/SwitchButton'
import TrashButton from '../buttons/TrashButton'
import InboxButton from '../buttons/InboxButton'

const BillsTable = () => {

  const activeUser = useSelector(state => state.activeUser)

  return (
    <>
      <h4><span title='notifications'><InboxButton/></span></h4>
      <p>bills</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>Amount</th>
            <th>Link</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
        {activeUser.billsList?.map(bill => {
          if(activeUser.billHistory.whitelist.includes(bill.fromEmail) && !bill.paid){
            return (
              <tr key ={bill._id}>
                <td><Moment format="MM/DD/YYYY">{bill.date}</Moment></td>
                <td>{bill.from}</td>
                <td>${bill.amountDue}</td>
                <td><a href={bill.link} target="_blank" rel="noreferrer"><EmailButton/></a></td>
                <td><SwitchButton bill={bill._id} user={activeUser._id} billStatus={true} paid={true}/></td>
              </tr>
            )
          }
          return (
            <></>
          )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default BillsTable