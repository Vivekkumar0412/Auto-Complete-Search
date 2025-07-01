import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [searchResult,setSearchResult] = useState([]);
  const [search,setSearch]= useState("");
  const [showRes,setShowres] = useState(false)
  const [cache,setCache] = useState({})
   const getData = async()=>{
    try {
      if(cache[search]){ 
        console.log("cached data")
        setSearchResult(cache[search]);
        return;
      }
      const res = await axios.get(`https://dummyjson.com/recipes/search?q=${search}`)
      setSearchResult(res.data.recipes);
      setCache((prev)=> ({...prev,[search]:res.data.recipes}));
      // console.log(res.data,"api call test")
    } catch (error) {
      console.log(error,"fetxh error")
    }
  };

  useEffect(()=>{
    const timer = setTimeout(getData,300)
    return ()=>{
      clearTimeout(timer)
    }
  },[search])
  return (
    <>
      <h1 className='bg-red-500'>Auto Complete Search Bar</h1>
      <input type="text" className='border-4' value={search} onChange={(e)=> setSearch(e.target.value)} onFocus={()=> setShowres(true)} onBlur={()=> setShowres(false)} />
      {showRes && <div className='w-[500px] max-h-[500px] overflow-y-scroll border-2 border-black'>
        {searchResult && searchResult.length>0 && searchResult.map((r)=> (<span  className='block p-2 hover:bg-green-300 cursor-pointer' key={r.id}>{r.name}</span>))}
      </div>}
    </>
  )
}

export default App
