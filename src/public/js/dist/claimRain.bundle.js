(()=>{"use strict";document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementById("claim-chucoin");let t=null,n=null;const a=new Audio("../assets/sounds/alert.mp3");function i(i){if(!i)return e.disabled=!0,n=!1,void(t=null);"active"===i.status||"countdown"===i.status?(e.disabled=!1,n=!0,n&&a.play(),t=i.id):(e.disabled=!0,n=!1,t=null)}const o=io();o.on("connect",(()=>{o.emit("requestCurrentData")})),o.on("rainData",(e=>{i(e)})),o.on("currentData",(e=>{i(e)})),e.addEventListener("click",(async function(){if(n)try{const a=await fetch("/api/v1/users/updateCoins",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({rainId:t})}),i=await a.json();if(!a.ok||"success"!==i.status)throw new Error(i.message||"Failed to claim coin");alert("Coin claimed successfully!"),e.disabled=!0,n=!1,location.reload()}catch(e){console.error("Error claiming coin:",e),alert(e.message||"Error claiming coin. Please try again.")}else alert("There is no active rain to claim at the moment.")}))}))})();