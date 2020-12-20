require('dotenv').config({path: '../.env'});
const app = require('./app')

const port = process.env.NARRATION_PORT || 3000;

app.listen(port, () => console.log(`Narration API listening at http://localhost:${port}`))    
