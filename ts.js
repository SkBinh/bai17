function Hero(image, top, left, size, speed) {
    this.image = image;
    this.top = top;
    this.left = left;
    this.size = size;
    this.speed = speed;
  
    this.getHeroElement = function() {
      return '<img width="' + this.size + '"' +
        ' height="' + this.size + '"' +
        ' src="' + this.image + '"' +
        ' style="top: ' + this.top + 'px; left:' + this.left + 'px; position: absolute;" />';
    }
  
    this.moveRight = function() {
      this.left += this.speed;
      console.log('Di chuyển sang phải: ' + this.left);
    }
  
    this.moveDown = function() {
      this.top += this.speed;
      console.log('Di chuyển xuống: ' + this.top);
    }
  
    this.moveLeft = function() {
      this.left -= this.speed;
      console.log('Di chuyển sang trái: ' + this.left);
    }
  
    this.moveUp = function() {
      this.top -= this.speed;
      console.log('Di chuyển lên: ' + this.top);
    }
  }
  
  var hero = new Hero('download.png', 20, 30, 100, 30);
  
  function start() {
    const directions = ['moveRight', 'moveDown', 'moveLeft', 'moveUp'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  
    
    if (randomDirection === 'moveRight' && hero.left < window.innerWidth - hero.size) {
      hero.moveRight();
    }
    if (randomDirection === 'moveDown' && hero.top < window.innerHeight - hero.size) {
      hero.moveDown();
    }
    if (randomDirection === 'moveLeft' && hero.left > 0) {
      hero.moveLeft();
    }
    if (randomDirection === 'moveUp' && hero.top > 0) {
      hero.moveUp();
    }
  
    document.getElementById('game').innerHTML = hero.getHeroElement();
    setTimeout(start, 500);
  }
  
  start();
  