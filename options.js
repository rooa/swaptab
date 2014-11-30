$(function(){
    $("#submit").click(
        function set_mode(){
         var value = $('input[name="mode"]:checked').val();
         chrome.storage.local.set({"mode":value});
    });
});
