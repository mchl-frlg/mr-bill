import React  from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import EmailButton from '../buttons/EmailButton'
import{ Table, Badge } from 'react-bootstrap'
import SwitchButton from '../buttons/SwitchButton'
import TrashButton from '../buttons/TrashButton'
import BellButton from '../buttons/NotificationButton'

const Notifications = () => {

  const activeUser = useSelector(state => state.activeUser)

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>Sender</th>
            <th>Link</th>
            <th>Bill?</th>
          </tr>
        </thead>
        <tbody>
        {activeUser.billsList?.map(bill => {
          if(bill.paid || activeUser.billHistory.blacklist.includes(bill.fromEmail) || activeUser.billHistory.whitelist.includes(bill.fromEmail)){
            return <></>
          }
          return (
            <tr key ={bill._id}>
              <td><Moment format="MM/DD/YYYY">{bill.date}</Moment></td>
              <td>{bill.from}</td>
              <td>{bill.fromEmail}</td>
              <td><a href={bill.link} target="_blank" rel="noreferrer"><EmailButton/></a></td>
              <td><SwitchButton bill={bill._id} user={activeUser._id} billStatus={true} paid={false}/></td>
              <td><TrashButton userId={activeUser._id} billId={bill._id}/></td>
            </tr>
          )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default Notifications