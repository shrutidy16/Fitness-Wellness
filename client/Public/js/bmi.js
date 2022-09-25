var bmiResult = document.getElementById("bmicalculation");
var computeBMI = document.getElementById("compute");

if(computeBMI) {
  computeBMI.addEventListener("click",displayBMI);
}

function displayBMI() {
  var height = document.getElementById("height").value;
  var weight = document.getElementById("weight").value;

  bmi = (weight / (height * height)) * 704
  bmi = bmi.toFixed(1)
  if(bmi < 18.5){
    result = 'underweight'
  }
  else if(18.5<=bmi <= 24.9){
    result = 'normal weight'
  }
  else if(25<= bmi <= 29.9){
    result = 'overweight'
  }
  else{
    result = 'obesity'
  }

  bmiResult.innerHTML = "Your Body Mass Index is" +" " + bmi+"." +" " + "This is considered " + result + ".";
}