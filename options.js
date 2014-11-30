//$("#submit").click(
function set_mode(){
   var value = document.getElementsByName("mode");
   chrome.storage.local.set({mode:value});
   console.log(value);
}

document.getElementsByName("submit").addEventListener("click",set_mode());