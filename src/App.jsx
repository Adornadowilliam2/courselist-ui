import { useEffect, useState } from 'react'
import './App.css'
import time from "./assets/time.png"
import { Box, Container, InputAdornment, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

function App() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async () => {
    try {
      // Check if data is in localStorage
      const cachedData = localStorage.getItem("coursesData");

      if (cachedData) {
        // If data exists in localStorage, use it
        setRows(JSON.parse(cachedData));
      } else {
        // If no data in localStorage, fetch from API
        const response = await fetch("https://courselist-api.vercel.app/api/user");
        const data = await response.json();
        setRows(data);
        
        // Store the data in localStorage for future use
        localStorage.setItem("coursesData", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRows = rows.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box className='flex justify-center flex-col p-[10px]'>
        <Box className='flex item justify-center gap-[10px]'>
          <img src="https://www.mfi.org.ph/wp-content/uploads/2020/04/mfi-logo.png" alt="mfi logo" style={{ width: "50px" }} />
          <Typography className='text-center' id="title">MFI Course List</Typography>
        </Box>
        <Box style={{ display: "flex", gap: "10px", justifyContent: "center", color: "rgb(37, 36, 36)" }}>
          <a href="https://www.mfi.edu.ph/" target="_blank">Home</a>
          <a>•</a>
          <a href="https://www.facebook.com/MFIPolytechnic" target="_blank">Facebook Page</a>
        </Box>
        <TextField
          type="text"
          placeholder="Search...."
          className="border border-black p-[10px] m-0 bg-white w-full"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Container className='bg-gray-500'>
        <Box id='grid-container'>
          {filteredRows.length === 0 ? (
            <Typography className='text-center mt-[20px] text-[18px] text-white'>
              No courses found
            </Typography>
          ) : (
            filteredRows.map((item) => (
              <Box key={item.id} id='card' className='bg-white rounded-3xl'>
                <div style={{ background: `url(${item.image})`, backgroundSize: "cover", height: "200px" }} id='img'></div>
                <div className='p-2'>
                  <h1 style={{ fontSize: "24px" }} id='course-name'>{item.name}</h1>
                  <p>{item.price}</p>
                  <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src={time} alt="time icon" style={{ width: "25px" }} />
                    <p>{item.duration}</p>
                  </Box>
                  <p className="text-[gray]">
                    {item.description.split(' ').slice(0, 25).join(' ')}{item.description.split(' ').length > 25 ? '...' : ''}
                  </p>

                  <button className="bg-blue-500 text-white w-full p-[10px]"><a href={item.link} target='_blank' rel="noopener noreferrer">Click for more info</a></button>
                </div>
              </Box>
            ))
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;
