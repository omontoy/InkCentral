import Table from 'react-bootstrap/Table';
import { TransactionArtist, TransactionClient } from './Transaction.js';


export function TransactionsTable({ userType, payments }){
  return(
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Amount (COP)</th>
          <th>Service</th>
          <th>{ userType === 'artist' ? 'Client' : 'Artist' } </th>
          <th>Email</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        { userType === 'artist' ? 
          !!payments && 
          payments.length > 0 && 
          payments.map(({_id, 
                         amount, 
                         service, 
                         consumer, 
                         createdAt }) => {
           return(
             <TransactionArtist
               key={_id}
               id={_id}
               amount={amount}
               service={service}
               consumer={consumer}
               date={createdAt} 
             />
           )
          })
          :
          !!payments && 
          payments.length > 0 && 
          payments.map(({_id, 
                         amount, 
                         service, 
                         provider, 
                         createdAt }) => {
           return(
             <TransactionClient
               key={_id}
               id={_id}
               amount={amount}
               service={service}
               provider={provider}
               date={createdAt} 
             />
           )
          })
        }
      </tbody>
    </Table>
  )
}