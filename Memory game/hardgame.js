var count=0;
var one;
var two;
var numberChoosenCards=0;
var back='Images/openme.jpg';

var cards=[];

function init(){
  cards[0]='Images/cat.jpg';
  cards[1]='Images/cat.jpg';
  cards[2]='Images/cow.jpg';
  cards[3]='Images/cow.jpg';
  cards[4]='Images/dog.jpg';
  cards[5]='Images/dog.jpg';
  cards[6]='Images/dolphin.jpg';
  cards[7]='Images/dolphin.jpg';
  cards[8]='Images/sheep.jpg';
  cards[9]='Images/sheep.jpg';
  cards[10]='Images/panda.jpg';
  cards[11]='Images/panda.jpg';
  shuffle();

}

function shuffle(){
  for (var i=cards.length-1; i>0; i--){
    var j= Math.floor(Math.random()*cards.length);
    var temp= cards[i];
    cards[i]=cards[j];
    cards[j]= temp;
  }
  return cards;
}



function startTimer(){
  // 1000= 1second waiting time before it flips back to 'openme' picture
  s= setInterval(compare,700);
}

function stopTimer(){
  clearInterval(s);
}

function choose(index){
  if (numberChoosenCards==0){
    one=index;
    document.getElementsByClassName('a')[index].src=cards[index];
    numberChoosenCards=1;
    clear();
  }else{

    two=index;
    document.getElementsByClassName('a')[index].src=cards[index];
    numberChoosenCards=2;
    startTimer();
  }
}

function compare(){
stopTimer();

if(cards[one]==cards[two]){
    count++;
    document.getElementById("win").innerHTML="Congratulations! You got matched cards"
    document.getElementsByClassName('a')[one].onclick="";
    document.getElementsByClassName('a')[two].onclick="";
    numberChoosenCards=0;

  }else if (cards[one]!== cards[two]){
   document.getElementById('lose').innerHTML="Oops. It is unmatched. Try again";
   document.getElementsByClassName('a')[one].src=back;
   document.getElementsByClassName('a')[two].src=back;
   numberChoosenCards=0;

  }if (count===6){
  document.getElementById('win').innerHTML="Well done. Do you want to you play again?";
  }

}

function clear(){
  document.getElementById("win").innerHTML="";
  document.getElementById('lose').innerHTML="";
}

function restart(){
  document.location.href="";
}
