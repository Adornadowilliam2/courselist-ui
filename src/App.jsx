import { useEffect, useState } from 'react'
import './App.css'
import time from "./assets/time.png"
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
      <div style={{ display: "flex", justifyContent: "center", padding: "10px", background: "#007bff" }}>
        <input
          type="text"
          placeholder="Search...."
          className="border border-black"
          style={{ padding: "10px", background: "white" }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap", gap: "10px", padding: "20px" }}>
        {filteredRows.map((item) => (
          <div key={item.id} className="border border-black font-bold" style={{ padding: "10px", borderRadius: "10px" }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", height: "300px", objectFit: "contain" }} />
            <h1 style={{fontSize:"24px"}}>{item.name}</h1>
            <p>{item.price}</p>
            <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
              <img src={time} alt="time icon" style={{width:"25px"}} />
              <p>{item.duration}</p>
            </div>
      
            <p className="text-[gray]">{item.description}</p>
            <button className="bg-blue-500 text-white" style={{ padding: "10px" }}><a href={item.link} target='_blank'>Click for more info</a></button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
