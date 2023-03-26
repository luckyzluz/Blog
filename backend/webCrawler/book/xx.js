const http=require('http');
http.get('http://hdyp.net/toimg/data/',(res)=>{
let data='';
    res.on('data',(chunk)=>{ //2885608989.png
        data+=chunk;
    })
    res.on('end',()=>{
        const regex=/"((?:https?:)?\/\/[^"]+?\/toimg\/data\/[^"]+?\.(?:gif|jpeg|png))*/gi;
        const matches=data.match(regex);
        const images=matches?matches.map(m=>m.replace(/"|'/g,'')):[];
        console.log(images);
    })
}).on('error',(err)=>{
    console.log(err);
})
// node webCrawler\book\xx.js