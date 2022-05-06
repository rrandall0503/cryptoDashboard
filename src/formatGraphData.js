// Format one week data
export const formatGraphData = (data, time) => {
    let finalData = {
      labels: [],
      datasets: [
        {
          label: "Price USD",
          data: [],
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          tension: 0.3,
          pointRadius: 2
        },
      ],
    };
  
  
    data = Array.from(data);
    if(data !== undefined) {
    let dates = data.map((val) => {
      let final = null;
      // [0, 1, 2, 3, 4, 5]
      // [ time, low, high, open, close, volume ],
      // [ 1415398768, 0.32, 4.2, 0.35, 4.2, 12.3 ]
      // Here time is in unix timestamp
      // Convert time from unix to current date.
      const ts = val[0];
      let date = new Date(ts * 1000);
  
      if(time === '1d') {
        function formatHours(date) {
          var am_pm = date.getHours() >= 12 ? "PM" : "AM";
          return (date.getHours() % 12 || 12) + am_pm;
        }
        final = formatHours(date);
      }
      else {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        final = `${month}-${day}`;
      }
      return final;
    });
  
  
    // Process all the data
    // const priceArr = "";
    let priceArr = data.map((val) => {
      return val[4];
    });
    
    // Only keep a week dates
    let num = null;
    let intervalTime = 1;
    if(time === '1d') {
      num = 24;
      intervalTime = 2;
    }
    if(time === '1w')
      num = 7;
    if(time === '1m')
      num = 30;
    if(time === '3m') {
      num = 90;
      intervalTime = 10;
    }
    if(time === '6m') {
      num = 180;
      intervalTime = 14;
    }
  
    let dateArr = [];
    const dayArr = [];
    if (priceArr.length >= num) {
      for (let i = 0, j = 0; i < num; i = i + intervalTime, j++) {
        dateArr[j] = dates[i];
        dayArr[j] = priceArr[i].toFixed(2);
      }
    }
  
    dayArr.reverse();
    dateArr.reverse();
    finalData.labels = dateArr;
    finalData.datasets[0].data = dayArr;
    return finalData;
  };
}