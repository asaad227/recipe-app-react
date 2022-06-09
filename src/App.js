import React, {useState} from 'react'
import './App.css';
import Pic from './asset/recipe-wallpaper.jpg'


function App() {
  const [dishInput, setDishInput] = useState('');
  const [cuisinInput, setCuisinInput] = useState('');
  const [data, setData] = useState([]);

 
  async function testFetch(){
   
    const responce = await fetch (`https://api.edamam.com/api/recipes/v2?type=public&q=${dishInput}&q=${cuisinInput}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&random=true`);
    const data = await responce.json();
    const {hits} = data
    // console.log(hits[0].recipe.image)
    setData(hits);
      }
    //  testFetch()
  function onSubmit(e){
    e.preventDefault();
    testFetch()
    // setDishInput('')
  } 

 function checkout(){
  if(data.length === 0){
    return <div className='flex-box'>
    <h4 className='label'>Find recipe here type ingredient of your your choice and choose the cuisin then hit submit button to see the magic!!!!</h4>
      <img className='wall' src={Pic} alt="Mashala"/>
      <footer>@2022 All right reserve a@Arham</footer>
    </div>
  }else{
    return (<div className='flex-box'><h4 className='label'>{data[0].recipe.label}</h4>
      <img className='wall' src={data[0].recipe.image} alt={data[0].recipe.label}/>
      <p className='ingredientPara'>{data[0].recipe.ingredientLines}</p>
    </div>)
  }
 }
 
  return (
    <div className='flex-container'>
     <form onSubmit ={onSubmit}>
     <input className='textIn'  onChange={(e)=> {setDishInput(e.target.value)}} type='text'/>
   <input id='indian' className='cuisinInput' type='button' onClick={(e)=>{setCuisinInput(e.target.value)}} value='Indian' on='true'/>
   <input id='chinese' className='cuisinInput' type='button' onClick={(e)=>{setCuisinInput(e.target.value)}} value='Chinese' on='true'/>
   <input id='american' className='cuisinInput' type='button' onClick={(e)=>{setCuisinInput(e.target.value)}} value='American' on='true'/>


       {/* <input onChange={(e)=> {setCuisinInput(e.target.value)}} type='text' placeholder='Meat or Chicken'/> */}
       <button className='submit'>Submit</button>
     </form>
     
 <div >
{checkout()}
{/* {data.map((e, index)=> <section className='flex-box' key={index}><h4 className='label'>{e.recipe.label}</h4>
<img src={e.recipe.image} width={200} height={200} alt={e.recipe.label}/>
<p className='ingredientPara'>{e.recipe.ingredientLines}</p>
</section>)} */}
</div>
    </div>
  );
}

export default App;
