dinosData = {
      dinos:  [
      {
          "species": "Triceratops",
          "weight": 13000,
          "height": 114,
          "diet": "herbavor",
          "where": "North America",
          "when": "Late Cretaceous",
          "fact": "First discovered in 1889 by Othniel Charles Marsh"
      },
      {
          "species": "Tyrannosaurus Rex",
          "weight": 11905,
          "height": 144,
          "diet": "carnivor",
          "where": "North America",
          "when": "Late Cretaceous",
          "fact": "The largest known skull measures in at 5 feet long."
      },
      {
          "species": "Anklyosaurus",
          "weight": 10500,
          "height": 55,
          "diet": "herbavor",
          "where": "North America",
          "when": "Late Cretaceous",
          "fact": "Anklyosaurus survived for approximately 135 million years."
      },
      {
          "species": "Brachiosaurus",
          "weight": 70000,
          "height": "372",
          "diet": "herbavor",
          "where": "North America",
          "when": "Late Jurasic",
          "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
      },
      {
          "species": "Stegosaurus",
          "weight": 11600,
          "height": 79,
          "diet": "herbavor",
          "where": "North America, Europe, Asia",
          "when": "Late Jurasic to Early Cretaceous",
          "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
      },
      {
          "species": "Elasmosaurus",
          "weight": 16000,
          "height": 59,
          "diet": "carnivor",
          "where": "North America",
          "when": "Late Cretaceous",
          "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
      },
      {
          "species": "Pteranodon",
          "weight": 44,
          "height": 20,
          "diet": "carnivor",
          "where": "North America",
          "when": "Late Cretaceous",
          "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
      },
      {
          "species": "Pigeon",
          "weight": 0.5,
          "height": 9,
          "diet": "herbavor",
          "where": "World Wide",
          "when": "Holocene",
          "fact": "All birds are living dinosaurs."
      }
  ]
}
//global variables
const feet = document.getElementById('feet');   
const inches = document.getElementById('inches');
const form = document.getElementById('dino-compare');
const nameDoc = document.getElementById('name');   
const weight = document.getElementById('weight');   
const diet = document.getElementById('diet');  
const grid = document.getElementById('grid');  
const button = document.getElementById('btn'); 

//makes it impossible for the user to fill in the feet and inches together
feet.addEventListener('click',()=>{
  inches.value = '';
});
inches.addEventListener('click',()=>{
  feet.value = '';
});
// Create Dino factory
function Dino(obj){
  return {
    species: obj.species,
    weight: obj.weight,
    height: obj.height,
    diet: obj.diet,
    where: obj.where,
    when: obj.when,
    fact: obj.fact,
  }
};
// Create Human factory
function Human(name,weight,height,diet){
  return {
    name:name,
    species: 'Human',
    weight: weight,
    height: height,
    diet: diet  
  }
};
//create facts objetcs
const tempFacts = dinosData.dinos.map((value)=>{ 
  return value.fact;  
});

const facts = tempFacts.filter((value)=>{ 
  return value!="All birds are living dinosaurs.";  
});
// Create Dino Objects
const dinosArray = dinosData.dinos.map((value)=>{
  return Dino(value);
});

//shuffle facts/dinos objects
const shuffledFactsArray = facts.sort((a, b) => 0.5 - Math.random());
const shuffledDinosArray = dinosArray.sort((a, b) => 0.5 - Math.random());
//link the facts into dinosArray objects
for(let i =0; i < shuffledFactsArray.length;i++){
  if(shuffledDinosArray[i].species!="Pigeon"){
    shuffledDinosArray[i].fact = shuffledFactsArray[i];
  }else{
    shuffledDinosArray[i].fact = "All birds are Dinosaurs.";
  }   
}

//allows identify when the windows are refreshed
const entries = performance.getEntriesByType("navigation");
for (let i=0; i < entries.length; i++) {
  let perf = entries[i];
  if(perf.type=='reload'){    
    form.style.display = 'none';
    gridPage();
  }
}

//mouse control under the childs of grid-item
function mouseover(obj){
  let ph = obj.querySelector('p');
  let details = obj.querySelector('#details');
  ph.style.display = 'none';
  details.style.display = 'block';

}
//mouse control under the childs of grid-item
function mouseout(obj){
  let ph = obj.querySelector('p');
  let details = obj.querySelector('#details');
  ph.style.display = 'block';
  details.style.display = 'none';
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
function compareDiet(human, dino){
  return (human.diet==dino.diet?"This dinosaur has the same diet as you.":"This dinosaur not has the same diet as you.")
}   
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight(human, dino){
  if(human.weight==dino.weight){
    return "This dinosaur has the same weight as you in lbs.";
  }else if(human.weight<dino.weight){
    return `This dinosaur is ${dino.weight-human.weight} heavier than you in lbs.`;
  }else{
    return `This dinosaur is ${human.weight-dino.weight} less heavy than you.`;
  }
}    
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches. 
function compareHeight(human, dino){
  if(human.height==dino.height){
    return "This dinosaur is the same height as you in inches.";
  }else if(human.height<dino.height){
    return `This dinosaur is ${dino.height-human.height} taller than you in inches.`;
  }else{
    return `This dinosaur is ${human.height-dino.height} less tall than you in inches.`;
  }
}

function gridPage(){
  //get item from localstorage  
  const humanName = localStorage.getItem('human-name');
  const humanHeight = localStorage.getItem('human-weight');
  const humanWeight = localStorage.getItem('human-height');
  const humanDiet = localStorage.getItem('human-diet');
  // Create Human Object
  // Use IIFE to get human data from form 
  const human = (function(){
    return Human(humanName,
    humanHeight,
    humanWeight,
    humanDiet,
    );
  })();  

  //shuffle colors
  const backColors = ['#dc7657f5','#009687f5','#dc7657f5','#4bb3c1fa','#fac069f9','#67a866f9','#b94169fa','#7f62b3fa','#9fc376f9','#677bcbfa'];
  const shuffledColorsArray = backColors.sort((a, b) => 0.5 - Math.random());

  // Add tiles to DOM
  // Generate Tiles for each Dino in Array
  let count=0;
  shuffledDinosArray.forEach(obj => {
  grid.innerHTML+= `<div class="grid-item" onmouseover="mouseover(this)" onmouseout="mouseout(this)" style="background-color:${shuffledColorsArray[count]};"> <h3>${obj.species}</h3> 
  <img src="./images/${obj.species.toLowerCase()}.png">
  <p>${obj.fact}</p>
  <p id = "details">Height:${obj.height} inches
  <br>Lbs:${obj.weight}
  <br>Diet:${obj.diet}
  <br>Where:${obj.where}
  <br>When:${obj.when}
  <br>${compareDiet(human.diet,obj.diet)}
  <br>${compareHeight(human.height,obj.height)}
  <br>${compareWeight(human.weight,obj.weight)}</p></div>`;

  count+=1;
  if(count==4){
    grid.innerHTML+= `<div class="grid-item" onmouseover="mouseover(this)" onmouseout="mouseout(this)" style="background-color:${shuffledColorsArray[count]};"> <h3>${human.name}</h3> 
    <img src="./images/${human.species.toLowerCase()}.png">
    <p id = "details">Height:${human.height} inches
    <br>Lbs:${human.weight}
    <br>Diet:${human.diet}
    </p></div>`;
    }
  });       
}
// On button click, prepare and display infographic
button.addEventListener('click',()=>{ 
  //Validate the form data to ensure the data is acceptable and complete.
  if(nameDoc.value.length==0 || weight.value.length==0 || 
    diet.value.length==0 || (feet.value.length==0 && inches.value.length==0)){
      alert("Fill in all fields on the form");
  }else{
    //IIFE 
    const height = (function(){
      if(feet.value.length>0){
        return feet.value*12;
      }else if(inches.value.length>0){
        return inches.value;
       }
    })();
    //setitem in localstorage
    localStorage.setItem('human-name',nameDoc.value);
    localStorage.setItem('human-weight',weight.value);
    localStorage.setItem('human-height',height);
    localStorage.setItem('human-diet',diet.value);
    // Remove form from screen
    form.style.display = 'none';
    //update and insert de grid
    gridPage();
  }     
});
