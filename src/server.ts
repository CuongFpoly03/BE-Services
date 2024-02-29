import express from "express";
import routes from "./routes/index"
import mongoDB from "./configs/mongooDB"// dữ liệu
import morganS from "./configs/morgan";//được sử dụng để ghi lại các thông tin về yêu cầu HTTP và phản hồi từ server.
import dotenv from "dotenv"//chứa các giá trị cấu hình(khoá API, port erver, info connect database)
import cors from "cors"// cho phép chặn các yc HTTP khác
import cookieParser from "cookie-parser";//p.tich xử lí cookie từ yc http
const app = express();

//connect dotenv
dotenv.config();
const port = process.env.port;

//connect cors
app.use(cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}))

//connect cookie-parser
app.use(cookieParser());

// connect morgan
morganS(app)
app.use(express.json()); //reques data json
app.use(express.urlencoded({extended: true})); // reques data body

// connect mongoo db
mongoDB();

// connect router
routes(app);
 
app.listen(port, () =>{
    console.log("run success !"+ port);
})
