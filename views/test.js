
const axios = require('axios');

axios.get('hhttps://codeforces.com/api/user.info?handles=eclipse_hunter')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });