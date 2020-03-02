// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/Pn1g1wjxl_0

var song;
var button;
var jumpButton;
var sliderRate;
var sliderPan;

function setup() {
  createCanvas(200, 200);
  song = loadSound(
    "./music/Ed Sheeran - Perfect (Official Music Video).mp3",
    loaded
  );
  sliderRate = createSlider(0, 1.5, 1, 0.01);
  sliderPan = createSlider(-1, 1, 0, 0.01);
  button = createButton("play");
  button.mousePressed(togglePlaying);
  jumpButton = createButton("jump");
  jumpButton.mousePressed(jumpSong);
  background(51);

  song.addCue(2, changeBackground, color(0, 0, 255));
  song.addCue(4, changeBackground, color(0, 255, 255));
  song.addCue(6, changeBackground, color(255, 255, 255));
}

function changeBackground(col) {
  background(col);
}

function jumpSong() {
  var len = song.duration();
  var t = 0; //random(len);
  console.log(t);
  song.jump(t);
}

function draw() {
  // background(random(255));
  song.pan(sliderPan.value());
  song.rate(sliderRate.value());
  // if (song.currentTime() > 5) {
  //   background(song.currentTime() * 10, 0, 255);
  // }
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
  console.log("loaded");
}
