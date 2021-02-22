(function() {
  const position = "absolute";
  const elements = [];

  function Food(options = {}) {
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.left = options.left || 0;
    this.top = options.top || 0;
    this.backgroundColor = options.backgroundColor || "#0f0";
  }

  Food.prototype.render = function(parentNode) {
    // remove
    remove();
    const el = document.createElement("div");
    el.style.position = position;
    el.style.width = this.width + "px";
    el.style.height = this.height + "px";
    el.style.backgroundColor = this.backgroundColor;
    this.left =
      Tools.getRandom(0, parentNode.offsetWidth / this.width - 1) * this.width;
    this.top =
      Tools.getRandom(0, parentNode.offsetHeight / this.height - 1) *
      this.height;
    el.style.left = this.left + "px";
    el.style.top = this.top + "px";
    parentNode.appendChild(el);
    elements.push(el);
  };

  // remove food
  function remove() {
    if (elements.length > 0) {
      for (let i = elements.length - 1; i >= 0; i--) {
        // 删除页面中的food元素
        elements[i].parentNode.removeChild(elements[i]);
        // 删除数组中存储的food
        elements.splice(i, 1);
      }
    }
  }
  // 暴露到全局
  window.Food = Food;
})();
