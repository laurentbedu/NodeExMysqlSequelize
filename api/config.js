const dotenv = require('dotenv');
dotenv.config();
const config = {
    dev : {
        db : {
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "db_blog_code_first"
        }
    }
}

module.exports = config[process.env.NODE_ENV];