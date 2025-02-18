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
      const response = await fetch("https://courselist-api.vercel.app/api/user");
      const data = await response.json();
      setRows(data);
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
      <Box style={{ display: "flex", justifyContent: "center", padding: "10px", flexDirection: 'column' }}>
        <Box style={{display:"flex", alignItems:'center', gap:"10px", justifyContent:"center"}}>
        <img src="https://www.mfi.org.ph/wp-content/uploads/2020/04/mfi-logo.png" alt="mfi logo" style={{width:"50px"}}/>
        <Typography sx={{ textAlign: "center" }} id="title">MFI Course List</Typography>
        </Box>
        <Box style={{display:"flex", gap:"10px", justifyContent:"center", color:"rgb(37, 36, 36)"}}>
          <a href="https://www.mfi.edu.ph/">Home</a>
          <a href="https://www.facebook.com/MFIPolytechnic">Facebook Page</a>
       
        </Box>
        <TextField
          type="text"
          placeholder="Search...."
          className="border border-black"
          style={{ padding: "10px", background: "white", width: "100%", margin: 0 }}
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
      <Container sx={{background:"gray"}}>
      <Box id='grid-container'>
        {filteredRows.length == 0 ? (
          <Typography sx={{ textAlign: "center", marginTop: "20px", fontSize: "18px", color: "black" }}>
            No courses found
          </Typography>
        ) : (
          filteredRows.map((item) => (
            <Box key={item.id} id='card'>
              {/* <img src={item.image} alt={item.name} style={{ width: "100%", objectFit: "contain" }} /> */}
              <div style={{ background: `url(${item.image})`, backgroundSize: "cover", height: "200px" }} id='img'></div>
              <div id="info">
                <h1 style={{ fontSize: "24px" }} id='course-name'>{item.name}</h1>
                <p>{item.price}</p>
                <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img src={time} alt="time icon" style={{ width: "25px" }} />
                  <p>{item.duration}</p>
                </Box>
                <p className="text-[gray]">
                  {item.description.split(' ').slice(0, 25).join(' ')}{item.description.split(' ').length > 25 ? '...' : ''}
                </p>

                <button className="bg-blue-500 text-white" style={{ padding: "10px" }}><a href={item.link} target='_blank' rel="noopener noreferrer">Click for more info</a></button>
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
