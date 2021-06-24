import {React, useState }  from 'react';
import { useSelector } from 'react-redux';
import Badge from 'react-bootstrap/button'
import Notifications from './Notifications'
import History from './History'
import BillsTable from './BillsTable'
import BellButton from '../buttons/NotificationButton'
import InboxButton from '../buttons/InboxButton'

const NotifyDashboard = () => {

  const activeUser = useSelector(state => state.activeUser)
  const counts = {
    notifications: activeUser.billsList?.filter(bill => !activeUser.billHistory.whitelist.includes(bill.fromEmail) && !activeUser.billHistory.blacklist.includes(bill.fromEmail)).length,
    bills: activeUser.billsList?.filter(bill=> activeUser.billHistory.whitelist.includes(bill.fromEmail) && !bill.paid).length
  }

  const [showBills, setShowBills] = useState(false);

  return (
    <>
      <div className='row'>
        <div className='col-sm-2 offset-md-5'>
          <div style={{"float": "left"}}>
            <h4 onClick={()=>{setShowBills(false)}}>
              <span title='view notifications'>
                <BellButton showBills={showBills}/>
              </span>
            </h4>
            <p>Notifications  <Badge size='sm' variant="warning"><strong>{counts.notifications}</strong></Badge></p>
          </div>
          <div style={{"float": "right"}}>
            <h4 onClick={()=>{setShowBills(true)}}>
              <span title='view bills Inbox'>
                <InboxButton showBills={showBills}/>
              </span>
              </h4>
              <p>Bills  <Badge size='sm' variant="success"><strong>{counts.bills}</strong></Badge></p>
          </div>   
        </div>  
      </div>
      <div className='row'>
        <div className='col-sm-6 offset-md-3 d-column'>
          {showBills ? <BillsTable/> : <Notifications/>}
        </div>
        <div className='col-sm-2 d-column'>
          <History/>
        </div>
      </div>
    </>
  )
}

export default NotifyDashboard