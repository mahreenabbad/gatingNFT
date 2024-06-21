const express = require("express")
const {Web3} = require("web3")
const cors = require("cors")
const socketIO = require('socket.io')
const ABI =require("./ABI.json")

const {createAddressActivityNotification} = require('./createAddressNotification')
const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
app.use(cors(corsOptions));

// const app = express()
// app.use(cors())
app.use(express.json())





const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/1q3OGVvPowOC379o6FdLAxxIYa0id7RZ")
const contractAddress = "0x2Ae40A89D689AB7aaAf4580C1388442db4A83901"
const contract = new web3.eth.Contract(ABI,contractAddress);

const fetchNFTs =async(account)=>{
    try {
         const balanceNFT = await contract.methods.balanceOf(account).call();
         return{userNFTs: Number(balanceNFT)}
    } catch (error) {
        console.error("Error in fetching nft:", error)
    } 
}
// app.get('/',async(req,res)=>{
//     res.send("hi ngrok")
// })
app.post('/members',async(req,res)=>{
    try {
        const account = req.body.from;
        const numNFTs = await fetchNFTs(account)
        // console.log(numNFTs)
        if(numNFTs.userNFTs >0){
            res.status(200).json({status:200,numNFTs})
        }else{
            res.status(400).json({status:400,message:"U have 0 NFTS"})
        }
        
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
})
app.post('/webhook',async(req,res)=>{
    try{
        const account = req.body[0].from;
        const numNFTs = await fetchNFTs(account);
        io.emit('nftsUpdated',{userNFTs:numNFTs.userNFTs})
        res.status(200).json({status:200,message:"Webhook Triggered"})
      }catch(error){
        console.error(error)
      }
})
 const PORT =3000
const server=app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})
const io = socketIO(server);
io.on('connection',()=>{
  createAddressActivityNotification();
  console.log("Connected")
})

////////////////////////////////////////
