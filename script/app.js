var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext;

// 创建音色、音量node
// var gainNode = audioCtx.createGain();
var finish = audioCtx.destination;
var maxFreq = 6000;
// 键盘key与琴键音频映射
var s = {
    81: 110,
    87: 116.541,
    69: 123.471,
    82: 130.813,
    84: 138.591,
    89: 146.832,
    85: 155.563,
    73: 164.814,
    79: 174.614,
    80: 184.997,
    219: 195.998,
    221: 207.652,
    65: 220,
    83: 233.082,
    68: 246.942,
    70: 261.626,
    71: 277.183,
    72: 193.665,
    74: 311.127,
    75: 329.628,
    76: 349.228,
    186: 369.994,
    222: 391.995,
    90: 415.305,
    88: 440,
    67: 466.164,
    86: 493.833,
    66: 523.251,
    78: 554.365,
    77: 587.330,
    188: 622.254,
    190: 659.255,
    191: 698.456
};

//每个键创建一个音色node
for (var i in s) {
    var value = s[i];
    s[i] = audioCtx.createOscillator();
    s[i].frequency.value = value;
    s[i].start();
}

// canvas
var width = window.innerWidth;
var height = window.innerHeight;

function random(number1,number2) {
    var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
    return randomNo;
}

var c = document.getElementById("myCanvas");
c.width = width;
c.height = height;
var cxt = c.getContext("2d");
cxt.globalAlpha = 0.2;

// 键盘按下时将相应频率的Oscillator连接到输出源上，并在屏幕画出多个圆
document.addEventListener('keydown', function (e) {
    if (s[e.keyCode]) {
        s[e.keyCode].connect(finish);
        var x = Math.random() * width;
        var y = Math.random() * height;
        var r = random(20,50);
        for(i=1;i<=15;i=i+2) {
            cxt.beginPath();
            cxt.fillStyle = 'rgb(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ')';
            cxt.arc( x+random(0,50), y+random(0,50), r,0,Math.PI*2,true);
            cxt.fill();
            cxt.closePath();
        }
    }
});

// 键盘松开时将相应频率的Oscillator的连接取消
document.addEventListener('keyup', function (e) {
    if (s[e.keyCode]) {
        s[e.keyCode].disconnect();
    }
})

