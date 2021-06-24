import React  from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import EmailButton from './buttons/EmailButton'
import{ Table } from 'react-bootstrap'
import TrashButton from './buttons/TrashButton'
import ArchiveButton from './buttons/ArchiveButton'
import { CheckLg, XLg } from 'react-bootstrap-icons'

const Archive = () => {

  const activeUser = useSelector(state => state.activeUser)

  return (
    <>
      <h4><span title='notifications'><ArchiveButton/></span></h4>
      <p>Archive</p>
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
              
              
              <td>{isBill ? <CheckLg/> : <XLg/>}</td>
              <td>{bill.paid ? <CheckLg/> : <XLg/>}</td>
              <td><TrashButton userId={activeUser._id} billId={bill._id}/></td>
            </tr>
          )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default Archive