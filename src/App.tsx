import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import api from './api/api.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [data, setData] = useState()

  const checkLoginStatus = () => {
    const token = localStorage.getItem('user')
    if (token) {
      // api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setIsLoggedIn(true)
      fetchData()
    }
  }

  const fetchData = async () => {
    api
      .get('/protected')
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
  }

  const handleLogin = async () => {
    api
      .post('/login')
      .then((res) => {
        console.log(res.data)
        setIsLoggedIn(true)
      })
      .catch((err) => console.error(err))
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])

  return (
    <Box sx={{ width: '24rem', margin: '2rem auto' }}>
      {isLoggedIn ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {data ? (
            <>
              <Typography>{data}</Typography>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Typography>
                Some Error Occurred. Please refresh and login
              </Typography>
            </>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '1rem',
            gap: '1rem',
          }}
        >
          <TextField
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            name="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default App
