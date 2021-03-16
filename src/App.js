import './App.css';
import React, {useState} from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Plot from 'react-plotly.js';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
//import api_key from './api_key.js';

function App() {
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState()
  const [digital, setDigital] = React.useState('');
  const [physical, setPhysical] = React.useState('');
  const [xval, setXval] = React.useState();
  const [yval, setYval] = React.useState();

async function getPrice() {
  setLoading(true)
  setPrice(null)
  setXval(null)
  setYval(null)
  const apikey = 'T0Z3J1PFUYAYPXOE'
  const urlPrice = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${digital}&to_currency=${physical}&apikey=${apikey}`
  /*
  url += ""
  url += "" + digital
  url += "" + physical
  url += "&apikey=T0Z3J1PFUYAYPXOE"
  */
  const urlData = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${digital}&market=${physical}&apikey=${apikey}`

  const rPrice = await fetch(urlPrice)
  const jPrice = await rPrice.json()

  const rData = await fetch(urlData)
  const jData = await rData.json()
  if (jData) {
    let pricedata = jPrice["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
    let xdata = []
    let ydata = []
    for (var key in jData['Time Series (Digital Currency Daily)']) {
      if (xdata.length < 100) {
        xdata.push(key)
        ydata.push(jData['Time Series (Digital Currency Daily)'][key][`1a. open (${physical})`]) 
      }
    }
    pricedata = parseFloat(pricedata).toFixed(2)
    setPrice(pricedata)
    setXval(xdata)
    setYval(ydata)
    setLoading(false)    
  }
}


const classes = useStyles();
  const handleDigiChange = (event) => {
    setDigital(event.target.value);
  };
  const handlePhysChange = (event) => {
    setPhysical(event.target.value);
  };


  return (
    <Wrap>
      <Header>
        <div className="logo" />
          ryptoPricer
      </Header>
      <Body>
      <ThemeProvider theme={theme}>
        <FormControl className={classes.formControl}>
          <InputLabel id="digital-select-label">Digital Currency</InputLabel>
          <Select
            labelId="digital-select-label"
            value={digital}
            onChange={handleDigiChange}
          >
            <MenuItem value={"BTC"}>BTC</MenuItem>
            <MenuItem value={"ETH"}>ETH</MenuItem>
            <MenuItem value={"DOGE"}>DOGE</MenuItem>
          </Select>
        </FormControl>

        <ArrowForwardIosIcon color="primary"/>
      
     
      <FormControl className={classes.formControl}>
        <InputLabel id="physical-select-label">Physical Currency</InputLabel>
        
        <Select
          labelId="physical-select-label"
          value={physical}
          onChange={handlePhysChange}
        >
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"GBP"}>GBP</MenuItem>
          <MenuItem value={"EUR"}>EUR</MenuItem>
        </Select>

      </FormControl>



      <Button variant="contained" 
        color="secondary" 
        style={{height:55, marginLeft:10}}
        disabled={!physical || !digital}
        onClick={getPrice}
      > 
        Search
      </Button>
        </ThemeProvider>
      </Body>
      <Price>
        {price &&             
            `${price} ${physical} to ${digital}`
        }
      {xval &&
        <Plot
        data={[
          {
            x: xval,
            y: yval,
            marker: {color: '#ffd54f'},
          },
        ]}
        layout={ {
          width: 1000, 
          height: 600, 
          title: {
            text: `${digital} in ${physical} [100 days]`,
            font: {
              color:"#ced7db",
            },
          },
          plot_bgcolor:"#212121",
          paper_bgcolor:"#696969",
          colorway:"gold",
          xaxis: {
            gridcolor:"#ced7db",
            color:"#ced7db",
          },
          yaxis: {
            gridcolor:"#ced7db",
            color:"#ced7db",
          },
        } }
        />
      }
      </Price>
    </Wrap>
  );
}

//



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  palette: {
    primary: {
      light: '#ffffff',
      main: '#ced7db',
      dark: '#9da6a9',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ffffb0',
      main: '#ffca28',
      dark: '#cab350',
      contrastText: '#000000',
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#ced7db',
      dark: '#9da6a9',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ffffb0',
      main: '#ffe57f',
      dark: '#cab350',
      contrastText: '#000000',
    },
  },
});


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
  display: flex;
  flex-direction: row;
  color: #ebc036;
  font-size: 2rem;
  font-family: 'Roboto';
`

const Body = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Price = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex-direction: column;
  color: #ced7db;
  `


export default App;
