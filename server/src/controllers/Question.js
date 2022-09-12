
import fetch from 'node-fetch';

export const getQuestions = async (req, res) => {
  const category = req.params.category;
  
  const requestConfig = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.Api_Key || '' }
  }

  const questionsData = await fetch(`https://quizapi.io/api/v1/questions?limit=${10}&category=${category}`,requestConfig);
  const data  = await questionsData.json();

  res.send(data);
}