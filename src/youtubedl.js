/* Created by Salim Hossain from udemy online front end developer course */

function downloadVideo(){
    console.log("download this video");
    var dl = document.getElementById("videoDownloadDropdown");

    if(dl.className.indexOf("shown") > -1){
        dl.className = dl.className.replace("shown", "");
    }else{
        dl.className += "shown";
    }

}

function downloadURI(event){
  event.preventDefault();
  event.stopPropagation();

  var url = event.currentTarget.getAttribute("href");
  var name = document.getElementsByTagName("title")[0].innerText;
  var datatype = event.currentTarget.getAttribute("data-type");
  var data = {url: url, name: name, sender: "YTDL", type: datatype};

  window.postMessage(data, "*");

  var dl = document.getElementById("videoDownloadDropdown");

  if(dl.className.indexOf("shown") > -1){
      dl.className = dl.className.replace("shown", "");
  }else{
      dl.className += "shown";
  }
  
  return false;
}


var videoUrls = window.ytplayer.config.args.url_encoded_fmt_stream_map.split(",").map(function(item){
    return item.split("&").reduce(function(pre, cur){
        cur = cur.split("=");
        return Object.assign(pre, {[cur[0]]: decodeURIComponent(cur[1])});
    }, {});
});

console.log("Our extension has loaded",videoUrls);

var container = document.getElementById("info");
var btn = document.createElement("button");
btn.className = "style-scope ytd-video-primary-info-renderer custom-class";
btn.setAttribute("role", "button");
btn.id = downloadVideo;
btn.innerText = "Download";

var dropdown = document.createElement("div");
dropdown.id = ("videoDownloadDropdown");
container.appendChild(dropdown);

container.appendChild(btn);

var dropList = document.createElement("ul");
dropdown.appendChild(dropList);

for(i in videoUrls){
    var item = document.createElement("a");
    var ext = videoUrls[i]["type"].split("/")[1].split(";")[0];
    item.innerText = videoUrls[i]["quality"] + "(" + ext + ")";

    item.setAttribute("href", videoUrls[i]["url"]);
    item.setAttribute("target", "_blank");
    item.setAttribute("data-type", videoUrls[i]["type"]);
    item.addEventListener("click", downloadURI);
    dropList.appendChild(item);
}

btn.addEventListener("click", downloadVideo);










//
//    background: #41af44;
//    border: navajowhite;
//    position: absolute;
//    left: 20%;
//    padding: 15px 20px;
//    cursor: pointer;
//    top: 15%;
//    z-index: 9999;
