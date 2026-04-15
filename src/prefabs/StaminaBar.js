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
  
      return (this.value === 0);
    }
  
    draw() {
      this.bar.clear();
  
      //  BG
      this.bar.fillStyle(0x000000);
      this.bar.fillRect(this.x, this.y, 80, 16);
  
      //  Stamina
      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);
  
      if (this.value < 30) {
        this.bar.fillStyle(0xff0000);
      }
      else if (this.value >= 30 && this.value < 50) {
        this.bar.fillStyle(0xffff00);
      } else {
          this.bar.fillStyle(0xffff00);
      }
  
      var d = Math.floor(this.p * this.value);
  
      this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
  
    deleteHealthBar() {
      this.bar.clear();
    }
  
    healthBarFollow(object) {
      this.x = object.x - 41;
      this.y = object.y - 150;
      this.draw();
    }
  
  }