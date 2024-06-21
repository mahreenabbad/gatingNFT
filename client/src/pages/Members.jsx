import {useState,useEffect} from "react"
import io from "socket.io-client"
import { useNavigate } from "react-router-dom"
import welcomeImage from "../images/GM.png"

const Members =()=>{
    console.log('Members component rendered');
    const navigateTo =useNavigate();
    const[socket,setSocket]= useState(null);

    useEffect(()=>{
        console.log('Setting up socket connection');
        const socketInstance= io('http://localhost:5173', {    
        headers:{
             mode: 'no-cors', 
             'Access-Control-Allow-Origin': '*',
        }  
             
      })    
     if(socketInstance){
        setSocket(socketInstance)
     }
     else{
        console.error('Failed to set up socket connection');
        navigateTo('/')
        
     }

     return()=>{
        console.log('Disconnecting socket');
        socketInstance.disconnect()
     }
    },[])

    useEffect(()=>{
    if(socket){
        // console.log('Socket event listener setup');
        socket.on('nftUpdated',(data)=>{
            // console.log('nftUpdated event received', data);
            if(data.userNFTs<1){
             navigateTo('/')
             alert("You've been logged out and have no NFT")
            }
            // socket.on('nftUpdated', handleNftUpdated);

            // // Cleanup function to remove the event listener
            // return () => {
            //   socket.off('nftUpdated', handleNftUpdated);
            // };
            
        })
        
    }
    },[])

    return( <>
        <p>Thank you for being a holder of NFT collection, here is your message :</p>
        <img src={welcomeImage}/>
        </>
    )

}
export default Members;