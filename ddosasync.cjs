const {HttpProxyAgent} = require("http-proxy-agent");
//const fetch = require("node-fetch");
process.on("unhandledRejection",e=>{});
const site = "";
const types = 
  //"POST PUT PATCH DELETE OPTIONS GET".split(" ")
  ["GET"]
;
const showEachFetch = false;
(async ()=>{
let http = await fetch("https://raw.githubusercontent.com/gooferdoofer1-web/proxylistformehttp/refs/heads/main/mixedwithproxiestotest.txt");
http = await http.text();
http = http.split("\n");
http.pop();
let times = [];
console.log("http loaded");
  i = 0;
  for (let n=0;n<20;n++) setInterval(async ()=>{try {
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
    let x = await fetch(site,fetchobj);
    if (showEachFetch == true) return console.log(`${a.split("//")[1].split(":")[0]} -> ${site} METHOD ${fetchobj.method}, STATUS ${x.status} -> ${new Date().getTime() - fetchTime}MS`);
    times.push(new Date().getTime() - fetchTime);
  } catch (e) {}
});
  /*for (let n=0;n<http.length;n++) {console.log("setting up ip "+http[n]);setInterval(async () => {try {
    let a = "";
    const agent = new HttpProxyAgent(a=http[n]);
    let fetchobj = {};
    const usingType = types[Math.random() * types.length | 0];
    fetchobj.method = usingType;
    if (usingType !== "GET") {
      fetchobj.headers = {
        "Content-Type": "text/plain"
      };
      fetchobj.body = Array.from({length: 1000},()=>String.fromCharCode(Math.random() * 65536 | 0)).join("")
    };
    fetchobj.agent = agent;
    let fetchTime = new Date().getTime();
    let x = await fetch(site,fetchobj);
    if (showEachFetch == true) return console.log(`${a.split("//")[1].split(":")[0]} -> ${site} METHOD ${fetchobj.method}, STATUS ${x.status} -> ${new Date().getTime() - fetchTime}MS`);
    times.push(new Date().getTime() - fetchTime);
    } catch (e) {}
  })
  }*/
setInterval(()=>{
  if (showEachFetch == true) return console.clear();
  if (times.length > 2000) {
    console.log(`time entries > 2000, (${times.length}) stopping math to make it still fast. Last time entry: ${times[times.length-1]}MS`);
    return times = [];
  };
  console.log(`AVERAGE MS ${times.reduce((a, b)=>a+b, 0)/times.length}`);
  times = [];
},1000);
})()
