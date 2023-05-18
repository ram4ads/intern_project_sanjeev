import React, {  useState } from 'react'
import ReactContext from './ReactContext'
import date from 'date-and-time';



import { BarChart, Bar,Cell, XAxis, YAxis, CartesianGrid } from 'recharts';


const colors = ['green','red','#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink',"yellow","violet","blue","pink","orange"];
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};
const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

function LinkonechildPage(props){
    const count=props.count
    const Eventhandler =props.Eventhandler
    return(
      <>
      <button onClick={()=>Eventhandler()} style={{backgroundColor:"green",width:"140px",height:"45px",borderRadius:"10px",color:"white"}}>link1 child element</button>
      <h5>{count}</h5>
      <LinkonesubchildPage count={count} Eventhandler={Eventhandler}/>
      </>
    )
}

function LinkonesubchildPage(props){
  const count=props.count
  const Eventhandler =props.Eventhandler
  return(
    <>
    <button onClick={()=>Eventhandler()} style={{backgroundColor:"green",width:"140px",height:"45px",borderRadius:"10px",color:"white"}}>link1 sub child element</button>
    <h5>{count}</h5>
    
    </>
  )
}

function LinktwochildPage(props){
  const count=props.count
  const Eventhandler =props.Eventhandler
  return(
    <>
    <button onClick={()=>Eventhandler()} style={{backgroundColor:"green",width:"140px",height:"45px",borderRadius:"10px",color:"white"}}>link2 child element </button>
    <h5>{count}</h5>
    <LinktwosubchildPage count={count} Eventhandler={Eventhandler}/>
    </>
  )
}
function LinktwosubchildPage(props){
  const count=props.count
  const Eventhandler =props.Eventhandler
  return(
    <>
    <button onClick={()=>Eventhandler()} style={{backgroundColor:"green",width:"140px",height:"45px",borderRadius:"10px",color:"white"}}>link2 sub child element</button>
    <h5>{count}</h5>
    </>
  )
}

function App() {
  const[useroneCount,setuseroneCount]=useState(0);
  const [usertwoCount,setusertwoCount]=useState(0);
  const [analysis,setanalysis]= useState([{name:"user A",uv:0},{name:"user B",uv:0}])
  // u can uncomment this to execute day users analytics 
  //and more over updateddata also dont forget to comment the alternate state and updated value
  // there is need to change in the server side query 
  // const [analysis,setanalysis] = useState([]);
  




    const Eventhandler_1=()=>{
      setuseroneCount((prev)=>prev+1)
      UpdatedData("user1")
     
    }
   const Eventhandler_2=()=>{
       setusertwoCount((prev)=>prev+1)
       UpdatedData("user2")
      
      
    
    }
const Displayeddata=async()=>{
  const res= await fetch('http://localhost:7000/view?q=xslt=json.xsl')
  const jsondata= await res.json()
    console.log(jsondata,"jsondata")
  // const updateddata =jsondata.map(each=>{
  //   return({name:each.hour,uv:each.count})
  // })
  // setanalysis(updateddata)
    setanalysis(prevanalysis=>{
      const updatedvalue=prevanalysis.map(user=>{
        if(user.name==="user A"){
           const percentage=(jsondata[0].count/(jsondata[0].count+jsondata[1].count))*100
           
          return {...user,uv:percentage.toFixed(1)}
        }
        else {
          const percentage=(jsondata[1].count/(jsondata[0].count+jsondata[1].count))*100
          return {...user,uv:percentage.toFixed(1)}
        }
         
        
      })
      return updatedvalue;
    })
    
   
}
    
      const UpdatedData=async (props)=>{
        const now = new Date();
        
       const res=await fetch('http://localhost:7000/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: props,
          created_At: date.format(now, 'YYYY-MM-DD HH:mm:ss')
        })
      })
      const resdata=await res.text()
      
      
       Displayeddata()
      }
      
  return (
    <>
    <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",backgroundColor:"lightcyan",width:"100vw",height:"100vh"}}>
    
    
    <div style={{display:"flex",flexDirection:"column",justifyContent:'flex-start'}} >
    <h1 style={{color:"blue",textAlign:"center"}}>#Starts Polling</h1>
    <h3 style={{color:"blueviolet",textAlign:"center"}}>category-UserA   ||   category-UserB</h3>
    <div style={{display:'flex',justifyContent:"center",textAlign:"center"}}>
     
    <div style={{margin: "10px",border:"2px yellow solid"}}>
    <button onClick={()=>Eventhandler_1()} style={{backgroundColor:"green",width:"140px",height:"45px",borderRadius:"10px",color:"white"}}>Link1</button>
    <h5>{useroneCount}</h5>
    <LinkonechildPage count={useroneCount} Eventhandler={Eventhandler_1}/>
    </div>
    <div style={{margin: "10px",border:"2px yellow solid"}}>
    <button onClick={()=>Eventhandler_2()} style={{backgroundColor:"green",width:"140px",height:"45px",borderRadius:"10px",color:"white"}}>Link2</button>
    <h5>{usertwoCount}</h5>
    <LinktwochildPage count={usertwoCount} Eventhandler={Eventhandler_2}/>
   
    </div>
    {/* <div>
      
    <button onClick={()=>Eventhandler_1()} style={{backgroundColor:"green",width:"140px",height:"45px",borderRadius:"10px",color:"white"}}>Link1</button>
    <h5>{useroneCount}</h5>
    <LinkonechildPage count={useroneCount} Eventhandler={Eventhandler_1}/>
    <button onClick={()=>Eventhandler_2()} style={{backgroundColor:"green",width:"140px",height:"45px",borderRadius:"10px",color:"white"}}>Link2</button>
  
    <h5>{usertwoCount}</h5>
    <LinktwochildPage count={usertwoCount} Eventhandler={Eventhandler_2}/>
    </div>
    
    <ReactContext/> */}
    
    </div>
    </div>
    <div>
      <h1 style={{color:"orange",marginLeft:"20%"}}>Polling Results</h1>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <BarChart
      width={500}
      height={300}
      data={analysis}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
      {analysis?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
    </div>
    </div>
    
    </div>
  </>
  )
}

export default App
