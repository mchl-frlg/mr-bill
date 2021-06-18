import React  from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import EmailButton from './buttons/EmailButton'
import{ Table } from 'react-bootstrap'
import SwitchButton from './buttons/SwitchButton'
import TrashButton from './buttons/TrashButton'
import ArchiveButton from './buttons/ArchiveButton'

const Archive = () => {

  const activeUser = useSelector(state => state.activeUser)

  return (
    <>
      <h4><span title='notifications'><ArchiveButton/></span></h4>
      <p>archive</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>Sender</th>
            <th>Amount</th>
            <th>Link</th>
            <th>Bill?</th>
            <th>Paid?</th>
          </tr>
        </thead>
        <tbody>
        {activeUser.billsList?.map(bill => {
          const isBill = activeUser.billHistory.whitelist.includes(bill.fromEmail)
          return (
            <tr key ={bill._id}>
              <td><Moment format="MM/DD/YYYY">{bill.date}</Moment></td>
              <td>{bill.from}</td>
              <td>{bill.fromEmail}</td>
              <td>${bill.amountDue}</td>
              <td><a href={bill.link} target="_blank" rel="noreferrer"><EmailButton/></a></td>
              <td><SwitchButton displayOnly={true} paid={isBill}/></td>
              <td><SwitchButton displayOnly={true} paid={bill.paid}/></td>
              <td><TrashButton/></td>
            </tr>
          )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default Archive