(function() {
  const position = "absolute";
  const snakeArray = [];

  function Snake(options = {}) {
    this.width = options.width || 20;
    this.height = options.height || 20;
    // 移动方向
    this.direction = options.direction || "right";
    this.body = [
      {
        x: 3,
        y: 2,
        color: "#f00"
      },
      {
        x: 2,
        y: 2,
        color: "#00f"
      },
      {
        x: 1,
        y: 2,
        color: "#00f"
      }
    ];
  }

  Snake.prototype.render = function(map) {
    if (!map) {
      return console.log(map为空);
    }
    // 蛇身初始化
    snakeRemove();
    // 将蛇身渲染到view
    for (let i = 0, len = this.body.length; i < len; i++) {
      // 蛇身每一项蛇节
      const item = this.body[i];
      const div = document.createElement("div");
      const box = div.style;
      box.position = position;
      box.width = this.width + "px";
      box.height = this.height + "px";
      box.left = item.x * this.width + "px";
      box.top = item.y * this.height + "px";
      box.backgroundColor = item.color;
      map.appendChild(div);
      snakeArray.push(div);
    }
  };

  // 移动
  Snake.prototype.move = function(food, map) {
    // 蛇身
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    // 蛇头
    const snakeHead = this.body[0];
    switch (this.direction) {
      case "right":
        snakeHead.x += 1;
        break;
      case "bottom":
        snakeHead.y += 1;
        break;
      case "left":
        snakeHead.x -= 1;
        break;
      case "top":
        snakeHead.y -= 1;
        break;

      default:
        break;
    }
    // 蛇吃食物 判断蛇头与食物两者坐标是否重合
    const { x, y } = this.body[0];
    const headX = x * this.width;
    const headY = y * this.height;
    // console.log(headX, food.left, headX === food.left);
    // console.log(headY, food.top, headY === food.top);
    if (headX === food.left && headY === food.top) {
      // view food 重新生成, 蛇身增加最后一节蛇身
      this.body.push({
        ...this.body[this.body.length - 1]
      });
      food.render(map);
    }
  };

  // init
  function snakeRemove() {
    for (let i = snakeArray.length - 1; i >= 0; i--) {
      snakeArray[i].parentNode.removeChild(snakeArray[i]);
      snakeArray.splice(i, 1);
    }
  }

  // 暴露到全局
  window.Snake = Snake;
})();
