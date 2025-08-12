import axios, { AxiosResponse } from "axios";

console.log('Happy developing ✨')

const SERVER: string = 'localhost';
const PORT: number = 3000;

axios.all([
    axios.get(`http://${SERVER}:${PORT}/api/customer/1`),
    axios.get(`http://${SERVER}:${PORT}/api/customer/1`),
    axios.get(`http://${SERVER}:${PORT}/api/customer/1`),
    axios.get(`http://${SERVER}:${PORT}/api/customer/1`),
    axios.get(`http://${SERVER}:${PORT}/api/customer/1`),
    axios.get(`http://${SERVER}:${PORT}/api/customer/1`),
    axios.get(`http://${SERVER}:${PORT}/api/customer/1`),
    axios.get(`http://${SERVER}:${PORT}/api/customer/1`),
    axios.get(`http://${SERVER}:${PORT}/api/customer/1`),
    axios.get(`http://${SERVER}:${PORT}/api/customer/1`),
    ])
    .then(axios.spread((...responses) => {

        for(var index in responses) {
            console.log("Response ", index, ": ", responses[index].status, " - Data: ", responses[index].data);
        }
    }));

// Create a client that iterates simultaneously calling fetch/PUT. Log HTTP response code

// SELECT
// UPDATE
// LOG http response code
