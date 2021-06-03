import logo from './logo.svg';
import graphql from './graphql.png'
import './App.css';
import { useQuery, gql } from '@apollo/client';
import React, {useState} from 'react'

const GET_ALL_INFO_2 = gql`
query getInformation($programmerId: ID!) {
  count
  programmer(id: $programmerId){
    name
    skills
  }
  portPassportRoles{
    name
  }
}
`

/*const GET_ALL_INFO = gql`
{
  count
  programmer(id: 2){
    name
    skills
  }
  portPassportRoles{
    name
  }
}
`;*/

const AllInformation = ({programmerId}) => {
  const {loading, error, data} = useQuery(GET_ALL_INFO_2, {
    variables: {programmerId}
  })

  if (loading)
    return <p>Loading...</p>
  if(error)
    return <p>Error :(</p>

  return (
    <div>
      <p>Counter: {data.count}</p>
      <div>
        <p>Programmer: {data.programmer.name}</p>
        <p>Skills: {data.programmer.skills.join(', ')}</p>
      </div>
      <p>PortPassport Roles: {data.portPassportRoles.map(role => role.name).join(', ')}</p>
    </div>
  )
}

const App = () => {
  const [programmerId, setProgrammerId] = useState(1)

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <img src={graphql} className="App-logo" alt="graphql" />
        </div>
        <select value={programmerId} onChange={e => setProgrammerId(e.target.value)}>
          <option value="1">Programmer 1</option>
          <option value="2">Programmer 2</option>
          <option value="3">Programmer 3</option>
        </select>
        <AllInformation programmerId={programmerId}/>
      </header>
    </div>
  );
}

export default App;
