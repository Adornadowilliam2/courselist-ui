import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [rows, setRows] = useState([])

  const getData = async () => {
    try {
      const response = await fetch("https://courselist-api.vercel.app/api/user");
      const data = await response.json();
      setRows(data);
    } catch (error) {
      toast.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
    <div style={{display:"flex",justifyContent:"center", padding:"10px", background:"#007bff"}}>
      <input type="text" placeholder='Search....' className='border border-black' style={{padding:"10px", background:"white"}}/>
    </div>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly", flexWrap:"wrap", gap:"10px", padding:"20px"}}>
      {rows.map((item)=>(
        <div key={item.id} className='border border-black font-bold' style={{padding:"10px", borderRadius:"10px"}}>
          <img src={item.image} alt={item.name}  style={{width:"300px",height:"300px", objectFit:"cover"}}/>
          <h1>{item.name}</h1>
          <p className='text-[gray]'>{item.description}</p>
          <button className='bg-blue-500 text-white' style={{padding:"10px"}}>CLick for more info</button>
        </div>
      ))}
      </div>
    </>
  )
}

export default App
