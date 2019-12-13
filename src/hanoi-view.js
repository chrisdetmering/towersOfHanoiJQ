class View { 
  constructor(game, $el) { 
    this.game = game
    this.$el = $el
    this.clickedPile = null; 
  }

  setupTowers() { 
    for (var i = 0; i < 3; i++) { 
      var $tower = $('<ul>').addClass('tower').attr('idx', i); 

      if (i === 0) { 
        this.addDisks($tower);
      }

      $tower.appendTo(this.$el);
    }
  }

  addDisks($tower) { 
    for (var i = 1; i < 4; i++) {
      var $disk = $('<li>').addClass('disk' + i);
      $disk.appendTo($tower);
    }

  }
  
  hoverTower() { 
    $('ul').on('mouseenter', (event) => { 
      var $tower = $(event.currentTarget);

      if (!$tower.hasClass('selected')) { 
        $tower.addClass('hover');
      }

    }).on('mouseleave', (event) => { 
      var $tower = $(event.currentTarget);
      $tower.removeClass('hover');
    })

  }


  clickTower() { 
    $('ul').on('click', (event) => { 
      if (this.clickedPile === null) { 
        this.selectPile(event); 
      } else { 
        this.moveDisk(event);
      }
    }); 
  }

 
  selectPile(event) { 
    var $tower = $(event.currentTarget);
    $tower.removeClass('hover');
    $tower.addClass('selected');
     
    this.clickedPile = $tower;
  }


  moveDisk(event) { 
    var pile = this.clickedPile;
    var startTowerIdx = pile.attr('idx'); 
    var $disk = pile.children().first();
    var $tower = $(event.currentTarget);
    var endTowerIdx = $tower.attr('idx'); 
      
    if (this.game.move(startTowerIdx, endTowerIdx)) {  
        $disk.remove();
        $disk.prependTo($tower);
        
        pile.removeClass('selected');
        this.clickedPile = null; 

        this.gameOver();
    } else { 

        pile.removeClass('selected');
        this.clickedPile = null; 
        alert('Not a valid move!');
    }
  }

  gameOver() { 
    if (this.game.isWon()) {
      window.setTimeout(() => alert('You won!'), 500)
      
      $('ul').off();

      for (var i = 1; i < 4; i ++) { 
      $('.disk' + i).addClass('gameOver'); 
      }
    }
  }
  

  
}

module.exports = View 