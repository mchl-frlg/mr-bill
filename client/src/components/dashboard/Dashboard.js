import React  from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import EmailButton from '../buttons/EmailButton'
import{ Table } from 'react-bootstrap'
import Notifications from './Notifications'
import History from './History'

const Dashboard = () => {

  const activeUser = useSelector(state => state.activeUser)

  return (
    <>
      <div className='row'>
        <div className='col-sm-4 offset-md-4'>
          <h3>dashboard</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-7 offset-md-2'>
          <Notifications/>
        </div>
        <div className='col-sm-2'>
          <History/>
        </div>
      </div>
    </>
  )
}

export default Dashboard