// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/Pn1g1wjxl_0

var song;
var button;
var jumpButton;
var sliderRate;
var sliderPan;
var amp;
// var wave;
var mic;
var volHistory = [];

function setup() {
  noCanvas()
  song = loadSound(
    "sound.mp3",
    loaded
  );
  // sliderRate = createSlider(0, 1.5, 1, 0.01);
  // sliderPan = createSlider(-1, 1, 0, 0.01);
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.8, 16)
  // wave = new p5.Oscillator();
  // wave.setType("sine");
  // wave.start();
  // wave.amp(1);
  // wave.freq(300);

  // mic = new p5.AudioIn();
  // mic.start();

  // background(51);

}

// function changeBackground(col) {
//   background(col);
// }

// function jumpSong() {
//   var len = song.duration();
//   var t = random(len);
//   console.log(t);
//   song.jump(t);
// }

function draw() {
  // background(random(255));
  // song.pan(sliderPan.value());
  // song.rate(sliderRate.value());
  // if (song.currentTime() > 5) {
  //   background(song.currentTime() * 10, 0, 255);
  // }
  // background(51);
  let spectrum =  fft.analyze()
  let waveform = fft.waveform()
  console.log(spectrum)

  var vol = amp.getLevel();
  volHistory.push(vol);
  // console.log(vol * 1000);
  // stroke(255);
  // beginShape();
  // noFill();
  // for (var i = 0; i < volHistory.length; i++) {
  //   var y = map(volHistory[i], 0, 1, height / 2, 0);
  //   vertex(i, y);
  // }
  // endShape();

  // if (volHistory.length > width - 50) {
  //   volHistory.splice(0, 1);
  // }

  // stroke(255, 0, 0);
  // line(volHistory.length, 0, volHistory.length, height);

  // var diam = map(vol, 0, 0.3, 10, 200);
  // fill(255, 0, 255);
  // ellipse(width / 2, height / 2, diam, diam);

  // var micVol = mic.getLevel();
  // console.log(micVol * 10);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    button.html("pause");
  } else {
    song.stop();
    button.html("play");
  }
}

function loaded() {
  button = createButton("play");
  button.mousePressed(togglePlaying);
  // jumpButton = createButton("jump");
  // jumpButton.mousePressed(jumpSong);
}
