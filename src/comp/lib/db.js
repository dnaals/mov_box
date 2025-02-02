
let mysql = require('mysql2');
const pool = {
    host:  process.env.HOST ,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.NEXT_PUBLIC_PORT
}

export const queryExecute = async (query,values)=>{

    const connection = mysql.createConnection(pool);
    connection.connect();
    return await new Promise((resolve,reject)=>{
        connection.query(query,values, function(error, results, fields){
            
            if(error) console.log(error,'==================');
            else console.log('Connected to db...!')
            resolve(results);
            connection.end();
        })
    })
}