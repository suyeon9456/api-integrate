import React, { useState } from 'react'
import axios from 'axios'
import { useAsync } from 'react-async'
import User from './User'

async function getUsers () {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  return response.data
}

function Users () {
  const [userId, setUserId] = useState(null)
  const { data: users, error, isLoading, reload, run } = useAsync({
    // promiseFn: getUsers
    deferFn: getUsers // 처음부터 불러오고 싶지 않다면
  })

  if (isLoading) return <div>로딩중..</div>
  if (error) return <div>에러 발생</div>
  if (!users) return <button onClick={run}>불러오기</button>
  return (
    <>
      <ul>
        {users.map(user =>
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username} ({user.name})
          </li>
        )}
      </ul>
      <button onClick={reload}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  )
}

export default Users
