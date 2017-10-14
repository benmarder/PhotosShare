/* global $ */          //for cloud 9 to not warn me on '$'

$("document").ready(()=>{
    var counter = 0,
        imgs = [
            "url(images/background1.jpg)",
            "url(images/background2.jpg)",
            "url(images/background3.jpg)"
          ];
    setInterval(changeBG, 5000);
    
    function changeBG(){
        $("body").css("background-image", imgs[counter]);
        counter = ++counter%imgs.length;
    }
});




