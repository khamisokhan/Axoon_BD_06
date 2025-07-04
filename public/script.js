let url="https://catfact.ninja/fact";
let url2="https://dog.ceo/api/breeds/image/random";
let url3="https://icanhazdadjoke.com/";

let btn1=document.querySelector("#btn1");
let btn2=document.querySelector("#btn2");
let btn3=document.querySelector("#btn3");

btn1.addEventListener("click",async ()=>{
    let p=document.querySelector("#result");
    let facts=await getfacts();
    p.innerText=facts;
});
btn2.addEventListener("click",async ()=>{
    let img=document.querySelector("#image");
    let link=await getImage();
    img.setAttribute("src",link);
   
    
});
async function getfacts() {
    try{
        let res = await axios.get("/api/catfact");
        return res.data.fact + " (from " + res.data.source + ")";
    } catch(err){
        console.log("weak connection", err);
        return "no fact found";
    }
}
async function getImage() {
    try{
        let res=await axios.get(url2);
        console.log(res.data.message);
        return res.data.message;
    }catch(err){
        console.log("weak connection", err);
        return "no imag found";
    }
    
}

// dad jokes

async function getJokes() {
    try{
        const config={headers: {Accept:"application/json"}};
        let res=await axios.get(url3, config);
        return res.data.joke;


    }catch(e){
        console.log(e)

    }
    
}

btn3.addEventListener("click",async ()=>{
    let p=document.querySelector("#result2");
    let joke=await getJokes();
    p.innerText=joke; 
});