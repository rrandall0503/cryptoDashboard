import "./index.css";
import { useState, useEffect} from "react";
import { formatGraphData } from "./formatGraphData";
import { Line } from "react-chartjs-2";
import './Pricechart.css';

function Pricechart({pair}) {
    const [time, setTime] = useState('1d');
    const [pastData, setpastData] = useState({data: { datasets:[], labels:[] }});

    useEffect(() => {
        let url = "https://api.pro.coinbase.com";
        if (time === "1d") {
            url = `${url}/products/${pair}/candles?granularity=3600`;
        } 
        else {
            url = `${url}/products/${pair}/candles?granularity=86400`;
        } 

        const fetchHistoricalData = async () => {
            let dataArr = [];
            await fetch(url).then((res) => res.json()).then((data) => {
                dataArr = data;
            });
            let formattedData = formatGraphData(dataArr, time);
            if(formattedData.labels.length === 0) {
                setpastData({data: { datasets:[], labels:[] }});
            }
            else {
                setpastData(formattedData);
            }
        };

        fetchHistoricalData();
    }, [pair, time]);

    const opts = {
        animation: {
            duration: 0
        },
        tooltips: {
            intersect: false,
            mode: "index",
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        
    };

    //If there is not enough data to make a chart display message instead of chart
    if (pastData.labels === undefined) {
        return (
            <div id="mainChart" className="row">
                <div id="lineChart" className="col-9 col-md-10 col-xl-11">NOT ENOUGH DATA TO DISPLAY</div>
                <div id="timeframes" className="col-3 col-md-2 col-xl-1">
                    <button id="D" onClick={(e) => setTime('1d')} type="button" className="btns">1D</button>
                    <button onClick={(e) => setTime('1w')} type="button" className="btns">1W</button>
                    <button onClick={(e) => setTime('1m')} type="button" className="btns">1M</button>
                    <button onClick={(e) => setTime('3m')} type="button" className="btns">3M</button>
                    <button id="M6" onClick={(e) => setTime('6m')} type="button" className="btns">6M</button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div id="mainChart" className="row">
                <div id="lineChart" className="col-9 col-md-10 col-xl-11"> 
                    <Line data={pastData} options={opts} />
                </div>
                <div id="timeframes" className="col-3 col-md-2 col-xl-1">
                    <button id="D" onClick={(e) => setTime('1d')} type="button" className="btns">1D</button>
                    <button onClick={(e) => setTime('1w')} type="button" className="btns">1W</button>
                    <button onClick={(e) => setTime('1m')} type="button" className="btns">1M</button>
                    <button onClick={(e) => setTime('3m')} type="button" className="btns">3M</button>
                    <button id="M6" onClick={(e) => setTime('6m')} type="button" className="btns">6M</button>
                </div>
            </div>
        );
    }
}

export default Pricechart;