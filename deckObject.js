let deck = {
  cardArray: [],

  load: function (){
    let suitCounter = 1; //suit
    let rankCounter = 1; //rank

    for(suitCounter = 0; suitCounter <= 3; suitCounter++){
      for(rankCounter = 0; rankCounter <= 12; rankCounter++){
        this.cardArray.push(new Card(suitCounter, rankCounter));
      }
    }
  }
}