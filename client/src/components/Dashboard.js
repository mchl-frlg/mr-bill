import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {

  const activeUser = useSelector(state => state.activeUser)

  return (
    <>
      <h1>THIS IS THE DASHBOARD</h1>
      {activeUser.billsList?.map(bill => {
        return (
          <>
          <h2>{bill.from}</h2>
          <p>{bill.link}</p>
          </>
        )
      })}
    </>
  )
}

export default Dashboard