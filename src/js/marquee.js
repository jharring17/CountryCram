// Make the width 100vw at some point. Not fitting the page currently.
var tWidth = '1000px';                  // width (in pixels)
var tHeight = '25px';                   // height (in pixels)
var tcolour = 'white';                // background colour:
var moStop = true;                      // pause on mouseover (true or false)
var fontfamily = 'arial,sans-serif';    // font for content
var tSpeed = 3;                         // scroll speed (1 = slow, 5 = fast)

var content = '🇦🇫🇦🇽🇦🇱🇩🇿🇦🇸🇦🇩🇦🇴🇦🇮';          // enter your ticker content here (use \/ and \' in place of / and ' respectively)
var cps = -tSpeed;
var aw, mq;
var fsz = parseInt(tHeight) - 4;

function startticker() {
    if (document.getElementById) {
        var tick = '<div style="position:relative;width:' + tWidth + ';height:' + tHeight + ';overflow:hidden;background-color:' + tcolour + '"'; if (moStop) tick += ' onmouseover="cps=0" onmouseout="cps=-tSpeed"';
        tick += '><div id="mq" style="position:absolute;right:0px;top:0px;font-family:' + fontfamily + ';font-size:' + fsz + 'px;white-space:nowrap;"><\/div><\/div>';
        document.getElementById('ticker').innerHTML = tick; mq = document.getElementById("mq"); mq.style.right = (10 + parseInt(tWidth)) + "px";
        mq.innerHTML = '<span id="tx">' + content + '<\/span>'; aw = document.getElementById("tx").offsetWidth; lefttime = setInterval("scrollticker()", 50);
    }
}

function scrollticker() {
    mq.style.right = (parseInt(mq.style.right) > (-10 - aw)) ?
        mq.style.right = parseInt(mq.style.right) + cps + "px" : parseInt(tWidth) + 100 + "px";
} window.onload = startticker;