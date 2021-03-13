import './App.css';
import React, {useState} from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import api_key from './api_key.js';

function App() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState()

async function getPrice() {
  setLoading(true)
  setPrice(null)
  let url = 'https://www.alphavantage.co/query?'
  url += "function=CURRENCY_EXCHANGE_RATE"
  url += "&from_currency=BTC"
  url += "&to_currency=" + text
  url += "&apikey=T0Z3J1PFUYAYPXOE"
  

  const r = await fetch(url)
  const j = await r.json()
  console.log(j)
  if (j["Realtime Currency Exchange Rate"]) {
    //setPrice(j["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
    setPrice(j["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
    setLoading(false)
    setText('')
    
  }
}

  return (
    <Wrap>
      <Header>
      <TextField label="Enter currency to convert to BTC" 
        variant="outlined" 
        style={{width:'calc(100% - 200px)'}}
        value={text} 
        onChange={e=> setText(e.target.value)}
        onKeyPress={e=> e.key==='Enter' && getPrice()}
        autoFocus
      />
      <Button variant="contained" 
        color="primary" 
        style={{height:55, marginLeft:10}}
        disabled={!text || loading}
        onClick={getPrice}
      >
        Search
      </Button>
      </Header>
      <Body>
        {price}
      </Body>
    </Wrap>

  );
}

//<Price conversion={price["Realtime Currency Exchange Rate"]}/> {price.map(m=> <Price key={m.id} p={m["Realtime Currency Exchange Rate"]} />)}

//const size = 200

/*
(this was in the body -> memes.map(m=> <Meme key={m.id} src={m.images.fixed_width.url})

const Meme = styled.img`
  max-height: ${size}px;
  max-width: ${size}px;
  min-width: ${size}px;
  min-height: ${size}px;
  object-fit: cover;
  margin:5px;
`
*/

const Price = styled.p`
  width: 100%;
  text-align: center;
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const Header = styled.header`
  width: 100%;
  min-height: 50px;
  padding: 10px;
  box-sizing: border-box;
`

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  overflow: auto;
`
export default App;
