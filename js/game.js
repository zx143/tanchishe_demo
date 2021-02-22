(function() {
  function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
  }

  Game.prototype.start = function() {
    // 开始
    this.food.render(this.map);
    this.snake.render(this.map);

    // 动态逻辑
    // 持续移动遇到边界game over
    runSnake.call(this);
    // 键盘控制移动
    keyCode.call(this)
  };

  // 移动蛇
  function runSnake() {
    const timerId = setInterval(() => {
      this.snake.move(this.food, this.map);
      this.snake.render(this.map);
      const snakeHeadX = this.snake.body[0].x;
      const snakeHeadY = this.snake.body[0].y;
      const maxX = this.map.offsetWidth / this.snake.width;
      const maxY = this.map.offsetHeight / this.snake.height;

      if (snakeHeadX < 0 || snakeHeadX >= maxX) {
        alert("Game over!");
        clearInterval(timerId);
      }
      if (snakeHeadY < 0 || snakeHeadY >= maxY) {
        alert("Game over!");
        clearInterval(timerId);
      }
    }, 300);
  }

  // 键盘控制方向
  function keyCode() {
    document.addEventListener(
      "keydown",
      e => {
        switch (e.keyCode) {
          case 37:
            this.snake.direction = "left";
            break;
          case 38:
            this.snake.direction = "top";
            break;
          case 39:
            this.snake.direction = "right";
            break;
          case 40:
            this.snake.direction = "bottom";
            break;

          default:
            break;
        }
      },
      false
    );
  }
  // 暴露全局
  window.Game = Game;
})();
