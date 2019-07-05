import React, { useEffect, useState, useCallback } from "react"
import styled from "styled-components"

const ListItem = styled.div``
const ListItemText = ({ name, email }) => {
  return (
    <div>
      <input type="text" value={name} disabled />
      <input type="text" value={email} disabled />
    </div>
  )
}

const fnCounter = new Set()

function User({ userId }) {
  const [user, setUser] = useState({ name: "", email: "" })
  const [isFetching, setIsFeching] = useState(false)

  const fetchUser = useCallback(async () => {
    if (!userId) {
      return
    }

    setIsFeching(true)
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    )
    const newUser = await res.json()
    setIsFeching(false)

    setUser(newUser)
  }, [userId])

  const handleRefresh = useCallback(() => {
    fetchUser()
  }, [fetchUser])

  fnCounter.add(handleRefresh)

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <ListItem dense divider>
      <ListItemText name={user.name} email={user.email} />
      <button onClick={handleRefresh}>Refresh</button>
      {fnCounter.size} fns {isFetching && "Loading..."}
    </ListItem>
  )
}

const UserWrapper = () => {
  const [userId, setUserId] = useState("")

  return (
    <div>
      <input
        type="text"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />
      <User userId={userId} />
    </div>
  )
}

export default UserWrapper
