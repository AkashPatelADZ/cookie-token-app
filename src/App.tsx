import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import api from './api/api'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = async () => {
    api
      .post('/login')
      .then((res) => {
        console.log(res.data)
        setIsLoggedIn(true)
      })
      .catch((err) => console.error(err))
  }

  const getData = () => {
    api
      .get('/protected')
      .then((res) => {
        console.log(res.data)
        setIsLoggedIn(true)
      })
      .catch((err) => {
        console.error(err)
        if (err.status === 401) {
          setIsLoggedIn(false)
        }
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box sx={{ width: '24rem', margin: '2rem auto' }}>
      {isLoggedIn ? (
        <Typography>Logged In</Typography>
      ) : (
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      )}
    </Box>
  )
}

export default App
