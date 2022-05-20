import React, {useState} from 'react'

import './App.css';


function App() {
  const [dishInput, setDishInput] = useState('');
  const [cuisinInput, setCuisinInput] = useState('');
  const [data, setData] = useState([]);

 
  async function testFetch(){
   
    const responce = await fetch (`https://api.edamam.com/api/recipes/v2?type=public&q=${dishInput}&q=${cuisinInput}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&random=true`);
    const data = await responce.json();
    const {hits} = data
 console.log(hits)
    setData(hits);
      }
    //  testFetch()
  function onSubmit(e){
    e.preventDefault();
    testFetch()
    setDishInput('')
  } 
 
 
 
  return (
    <div className="App">
     <form onSubmit ={onSubmit}>
     <input className='textIn'  onChange={(e)=> {setDishInput(e.target.value)}} type='text' value={dishInput}/>
   <input id='indian' className='cuisinInput' type='button' onClick={(e)=>{setCuisinInput(e.target.value)}} value='Indian' on='true'/>
   <input id='chinese' className='cuisinInput' type='button' onClick={(e)=>{setCuisinInput(e.target.value)}} value='Chinese' on='true'/>
   <input id='american' className='cuisinInput' type='button' onClick={(e)=>{setCuisinInput(e.target.value)}} value='American' on='true'/>


       {/* <input onChange={(e)=> {setCuisinInput(e.target.value)}} type='text' placeholder='Meat or Chicken'/> */}
       <button className='submit'>Submit</button>
     </form>
     
 <div className='flex-container'>
{data.map((e, index)=> <section className='flex-box' key={index}><h4 className='label'>{e.recipe.label}</h4>
<img src={e.recipe.image} width={200} height={200} alt={e.recipe.label}/>
<p className='ingredientPara'>{e.recipe.ingredientLines}</p>
</section>)}
</div>
    </div>
  );
}

export default App;
