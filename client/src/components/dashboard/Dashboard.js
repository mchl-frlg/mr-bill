import React  from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import EmailButton from '../buttons/EmailButton'
import{ Table } from 'react-bootstrap'
import Notifications from './Notifications'
import History from './History'
import BillsTable from './BillsTable'

const Dashboard = () => {

  const activeUser = useSelector(state => state.activeUser)

  return (
    <>
      {/* <div className='row'>
        <div className='col-sm-4 offset-md-4'>
          <h3>dashboard</h3>
        </div>
      </div> */}
      <div className='row'>
        <div className='col-sm-6 d-column'>
          <Notifications/>
        </div>
        <div className='col-sm-4 d-column'>
          <BillsTable/>
        </div>
        <div className='col-sm-2 d-column'>
          <History/>
        </div>
      </div>
    </>
  )
}

export default Dashboard