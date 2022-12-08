const player_1 = document.getElementById("p1");
const player_2 = document.getElementById("p2");
const ball = document.getElementById("b1");
const screen = document.getElementById("screen");
const ball_reset_btn = document.getElementById("ball-reset");

const screen_1 = getComputedStyle(screen);

var p_score = 0;
var e_score = 0;
var ball_side;
var p1_movement_timer;
var game_time;
var vertical_turn = 0;
var ball_touches = 0;

function ball_start_check() {
  var ball_left = ball.offsetLeft;
  var screen_width = parseInt(screen_1.width);

  if (ball_left < screen_width / 2) {
    ball_side = true;
  } else {
    ball_side = false;
  }
}
ball_start_check();

function p1_Down() {
  var screen_height = parseInt(screen_1.height);
  if (player_1.offsetTop + player_1.offsetHeight < screen_height) {
    player_1.style.top = player_1.offsetTop + 3 + "px";
  }
  p1_movement_timer = setTimeout("p1_Down()", 10);
}

function p1_Up() {
  if (player_1.offsetTop > 0) {
    player_1.style.top = player_1.offsetTop - 3 + "px";
  }
  p1_movement_timer = setTimeout("p1_Up()", 10);
}

function ball_and_p2_colide() {
  var p2 = player_2.getBoundingClientRect();
  var p1 = player_1.getBoundingClientRect();
  var b = ball.getBoundingClientRect();

  if (
    b.x < p2.x + p2.width &&
    b.x + b.width > p2.x &&
    b.y < p2.y + p2.height &&
    b.y + b.height > p2.y
  ) {
    ball_side = false;
    ball_touches++;
    console.log(ball_touches);
  } else if (
    b.x < p1.x + p1.width &&
    b.x + b.width > p1.x &&
    b.y < p1.y + p1.height &&
    b.y + b.height > p1.y
  ) {
    ball_side = true;
    ball_touches++;
    console.log(ball_touches);
  }
}

function enemy_movement() {
  var ball_top = ball.offsetTop;
  var enemy_top = player_2.offsetTop;

  if (
    ball_top > enemy_top &&
    enemy_top + player_2.offsetHeight < screen.offsetHeight
  ) {
    player_2.style.top = enemy_top + 4 + "px";
  } else if (ball_top < enemy_top + 50) {
    player_2.style.top = enemy_top - 4 + "px";
  }
}

// vertical --------------------ball-----------------

function ball_vertical_movement() {
  if (vertical_turn < 1) {
    ball_move_up();
  } else {
    ball_move_down();
  }
}

function ball_move_up() {
  var ball_x = ball.offsetTop;
  if (ball_x > 0) {
    ball.style.top = ball_x - 4 + "px";
  } else {
    vertical_turn = 1;
  }
}

function ball_move_down() {
  var ball_x = ball.offsetTop;
  var screen_height = parseInt(screen_1.height);
  if (ball_x < screen_height - 21) {
    ball.style.top = ball_x + 4 + "px";
  } else {
    vertical_turn = 0;
  }
}
// vertical ball end-----------------------

function game_start() {
  var ball_left = ball.offsetLeft;
  var ball_speed = 0.2 * ball_touches;

  if (ball_side == true) {
    ball.style.left = ball_left + 5 + ball_speed + "px";
  } else if (ball_side == false) {
    ball.style.left = ball_left - 5 + ball_speed + "px";
  }
}

function win_check() {
  var ball_left = ball.offsetLeft;
  var screen_width = parseInt(screen_1.width);

  if (ball_left < -40) {
    e_score++;
    ball_touches = 0;
    ball.style.display = "none";
    setTimeout("enemy_win()", 1500);
  } else if (ball_left > screen_width + 40) {
    p_score++;
    ball_touches = 0;
    ball.style.display = "none";
    setTimeout("player_win()", 1500);
  }
}

function player_win() {
  var screen_width = parseInt(screen_1.width);
  var screen_height = parseInt(screen_1.height);
  let ball_y = Math.floor(Math.random() * screen_height - 20) + 20;
  ball_side = false;
  ball.style.left = screen_width - 50 + "px";
  ball.style.top = ball_y + "px";
  ball.style.display = "block";
  document.getElementById("p_score").innerHTML = p_score;
}

function enemy_win() {
  var screen_height = parseInt(screen_1.height);
  let ball_y = Math.floor(Math.random() * screen_height - 20) + 20;
  ball_side = true;
  ball.style.left = 50 + "px";
  ball.style.top = ball_y + "px";
  ball.style.display = "block";
  document.getElementById("e_score").innerHTML = e_score;
}

function start() {
  enemy_movement();
  win_check();
  ball_and_p2_colide();
  game_start();
  ball_vertical_movement();

  game_time = setTimeout("start()", 10);
}

function ball_reset() {
  clearTimeout(game_time);
}

function reset() {
  clearTimeout(p1_movement_timer);
}
