(()=>{"use strict";document.querySelector("#logout").addEventListener("click",(e=>{e.preventDefault(),fetch("/api/v1/users/logout",{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{if(!e.ok)throw new Error("Error en el logout");return e.json()})).then((e=>{setTimeout((()=>{window.location.href="/"}),1e3)})).catch((e=>{console.log(e)}))}))})();