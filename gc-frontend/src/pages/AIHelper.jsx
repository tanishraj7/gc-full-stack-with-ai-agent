import React, { useState } from 'react';
import "../styles/aihelper.css"; 
import axios from 'axios';
import Nav from '../ecom/navigation/Nav';

function AIHelper() {
  const [useCase, setUseCase] = useState("");
  const [brand, setBrand] = useState("");
  const [recommend, setRecommend] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    setRecommend("Hmm...that use case sounds clubbable!!")

    try {
      const res = await axios.post('http://localhost:5000/api/ai-recommend', {useCase, brand});
      setRecommend(res.data.recommendation);
    } catch (error) {
      console.log(error);
      setRecommend("Oops something went wrong !!");
    } finally{
      setLoading(false);
    }
  }

  return (
    <>
    <Nav/>
    <div id='ai-helper-page'>
    <div className='ai-helper-container'>
      <h2>Hi I'm Jinny🤖 your AI helper !!</h2>
      <h4>(Wanna meet the creator? <a href='https://www.linkedin.com/in/tanishrajsingh/' target='_main'>find him here👆</a>)</h4>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={useCase}
          placeholder= "What's your use-case? (e.g., Running on hard tracks.)"
          onChange={(e)=> setUseCase(e.target.value)}
          required
        />
        <select value={brand} onChange={(e)=> setBrand(e.target.value)} required>
          <option value="">Select your favorite brand</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
          <option value="Vans">Vans</option>
        </select>
        <button type='submit' disabled={loading}>
          {loading ? 'Thinking..' : 'Get recommendation'}
        </button>
      </form>

      {recommend && (
        <div className='recommendation-box'>
          <p>Personalized Recommendation:</p>
          <p><b>{recommend}</b></p>
        </div>
      )}
    </div>
    </div>
    </>
  )
}

export default AIHelper