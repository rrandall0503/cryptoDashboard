async function fetchAPIdata(url) {
    await fetch(url + "/currencies").then((res) => res.json()).then((data) => (apiData = data));
    return apiData;
}
export default fetchAPIdata;