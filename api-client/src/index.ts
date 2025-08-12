import axios from "axios";

console.log('Happy developing ✨')

const SERVER: string = 'localhost';
const PORT: number = 3000;
const API: string = "api/customer/1"

function getPutRequestBody(): any {
    return {
        "firstName": "Jezzah",
        "lastName": "Clarkson",
        "country": "Rest of the World",
        "version": "10"
    }
}

axios.all([
    axios.put(`http://${SERVER}:${PORT}/${API}`, getPutRequestBody()),
    axios.put(`http://${SERVER}:${PORT}/${API}`, getPutRequestBody()),
])
.then(axios.spread((...responses) => {
    for(var index in responses) {
        console.log("Response ", index, ": ", responses[index].status, ": ", responses[index].data);
    }
}));
