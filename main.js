document.getElementById('submit').addEventListener('click', loadVenues);

function loadVenues(e){
  //prevent default submit
  e.preventDefault();
  
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'input.json', true);

  xhr.onload = function(){
    if(this.status == 200){
      let input = JSON.parse(this.responseText);
      let checkList = [];

      //first we need to store the people selected into an array
      const selectList = document.getElementsByClassName('checkbox');
      for (let i in selectList){
        if (selectList[i].checked){
          checkList.push(selectList[i].value);
        }
      }

      console.log(checkList);

      //error checking
      if (checkList.length === 0){
        document.getElementById("error").style.visibility = "visible";
        document.getElementById("error").innerHTML = "Please select at least one team member";
        document.getElementById('places-to-go').style.display = 'none';
        document.getElementById('places-to-avoid').style.display = 'none';
      } else {
        document.getElementById("error").style.visibility = "hidden";
        document.getElementById('places-to-go').style.display = 'block';
        document.getElementById('places-to-avoid').style.display = 'block';
      }

      let venues = input.venues;
      let people = input.people;

      console.log(people);

      //filter people based on checkList
      people = people.filter(function(person) {
        return checkList.includes(person.name);
      });

      console.log("people", people);
      console.log("venues", venues);

      let placesToGo = '<h3>Places to go:</h3>';
      let placesToAvoid = '<h3>Places to avoid:</h3>';
      

      //loop through venues
      for(let i=0; i < venues.length; i++){
        let placesToAvoidCtr = 0;
        let noEatCtr = 0;
        //console.log(venues[i].drinks);
        for (let j=0; j< people.length; j++){
          
          //checking to see if there is a match of food with venue and person
          if ((venues[i].food).diff(people[j].wont_eat).length !== 0) {
            if (placesToAvoidCtr === 0){
              placesToAvoid += '<ul class="avoid">' +
              '<li>'+venues[i].name+'</li>' +
              '<ul>';  
            }
            
            placesToAvoid += 
                  '<li>There is nothing for '+people[j].name+' to eat</li>';
            
            placesToAvoidCtr++;
            noEatCtr++;
          }
          
          //checking to see if there is a match of drinks with venue and person
          if ((venues[i].drinks).diff(people[j].drinks).length === 0) {
            if (placesToAvoidCtr === 0){
              placesToAvoid += '<ul class="avoid">' +
              '<li>'+venues[i].name+'</li>';  
            }
            
            if (noEatCtr === 0){
              placesToAvoid += '<ul><li>There is nothing for '+people[j].name+' to drink</li>';
            } else {
              placesToAvoid += '<li>There is nothing for '+people[j].name+' to drink</li>'; 
            }
                
            placesToAvoidCtr++;
          }
        }

        placesToAvoid += '</ul>' +
        '</ul>';

        if (placesToAvoidCtr === 0){
          console.log(venues[i].name);
          placesToGo += '<ul class="go">' +
              '<li>'+venues[i].name+'</li>' +
              '</ul>';
        }
      }

      if (checkList.length !== 0){
        document.getElementById('places-to-go').innerHTML = placesToGo;
        document.getElementById('places-to-avoid').innerHTML = placesToAvoid;
        console.log(document.querySelectorAll('.avoid li')[1].textContent);
      }
    }
  }

  xhr.send();
}

//array diff function that returns values that match
Array.prototype.diff = function(arr2) {
  var ret = [];
  for(var i in this) {   
      if(arr2.indexOf(this[i]) > -1){
          ret.push(this[i]);
      }
  }
  return ret;
};