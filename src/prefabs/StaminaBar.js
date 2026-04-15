export class StaminaBar {

    constructor(scene, x, y, stamina) {
      this.bar = new Phaser.GameObjects.Graphics(scene);
  
      this.x = x - 41;
      this.y = y - 15;
      this.value = stamina;
      this.maxValue = stamina
      this.p = 76 / this.maxValue;
  
      this.draw();
  
      scene.add.existing(this.bar);
    }
  
    decrease(amount) {
      this.value -= amount;
  
      if (this.value < 0) {
        this.value = 0;
      }
  
      this.draw();
    }

    increase(amount) {
      this.value += amount;

      if(this.value > 100) {
        this.value = 100;
      }

      this.draw();
    }
  
    draw() {
      this.bar.clear();
  
      //  BG
      this.bar.fillStyle(0x000000);
      this.bar.fillRect(this.x, this.y, 80, 16);
  
      //  Stamina
      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);
  
      this.bar.fillStyle(0x0080fe);
    
  
      var d = Math.floor(this.p * this.value);
  
      this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
  
    deleteStaminaBar() {
      this.bar.clear();
    }
  
    StaminaBarFollow(object) {
      this.x = object.x - 41;
      this.y = object.y - 150;
      this.draw();
    }
  
  }