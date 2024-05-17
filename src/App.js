import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(1);
  const handleNex=()=>{
    if(page===Math.ceil(data.length/10))
      return
    setpage((prev)=>prev+1);
  }

  const handlePrev=()=>{
    if(page===1) return
    setpage((prev)=>prev-1);
  }
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setdata(response.data);
      } catch (err) {
        alert("failed to fetch data")
      }
    };
    fetchdata();
  }, []);
  console.log(data);
  return (
    <div>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Employee Data Table
      </h2>
      <table style={{width:"100%",borderBottom:"1px solid #009879",  borderCollapse:"collapse"}}>

        <thead>
          <tr
            style={{
              background: "#009879",
              display: "flex",
              justifyContent: "space-around",
              padding:"20px",
              
            }}
          >
            {data &&
              data.length > 0 &&
              Object.keys(data[0]).map((title, index) => (
                <th style={{ textAlign: "left",flex:"1",width:"10%",color:"white",
                  padding: "2px"}}key={index}>{title.toLocaleUpperCase()}</th>
              ))}
          </tr>
        </thead>


        <tbody>
          {data.slice((page - 1) * 10, page * 10).map((body) => (
            <tr style={{
             
              display: "flex",
              justifyContent: "space-around",
              padding:"0 10px 0 10px",
              borderBottom:"1.5px solid #b3b3cc",
              backgroundColor:" #dddddd"
              
            }}>
              {Object.values(body).map((value, index) => (
                <td style={{textAlign: "left",flex:"1",width:"10px",
                  padding: "8px"}} key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>

       
      </table>
      <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "95rem",
          }}
        >
          <button onClick={()=>handlePrev()}style={{ margin: "10px", background: "#009879" }}>
            Previous
          </button>
          <button style={{ margin: "10px", background: "#009879" }}>
            {page}
          </button>
          <button onClick={()=>handleNex()} style={{ margin: "10px", background: "#009879" }}>
            Next
          </button>
        </div>
    </div>
  );
}

export default App;
