import { useSelector, useDispatch } from 'react-redux';
import EmailButton from './buttons/EmailButton'
import{ Table } from 'react-bootstrap'
const Dashboard = () => {

  const activeUser = useSelector(state => state.activeUser)

  return (
    <>
      <h1>THIS IS THE DASHBOARD</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>sender</th>
            <th>amount</th>
            <th>link</th>
          </tr>
        </thead>
        <tbody>
        {activeUser.billsList?.map(bill => {
          return (
            <tr>
              <td>{bill.date}</td>
              <td>{bill.from}</td>
              <td>{bill.fromEmail}</td>
              <td>{bill.amountDue}</td>
              <td><a href={bill.link} target="_blank" rel="noreferrer"><EmailButton/></a></td>
            </tr>
          )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default Dashboard