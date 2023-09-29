
var form = document.querySelector(".container2 form");

const inputs = document.querySelectorAll(".container2 form input");

var cardHolderName = document.querySelector("#chname");

var cardNumber = document.querySelector("#cardnumber");

var expMonth = document.querySelector("#month");

var expYear = document.querySelector("#year");

var cvc = document.querySelector("#cvc");

var errorText= document.querySelector(".error-text");

var cardformat = document.getElementById("cardformat");

var cardcvc = document.getElementById("cardcvc");

var fullname = document.getElementById("full-name");

var month = document.getElementById("month");
var year = document.getElementById("year");
var dtyr = document.getElementById("dt-yr");

var date = new Date();
var todaymonth = date.getMonth();
var todayyear = date.getFullYear();

// today = new Date();
// someday = new Date();
// someday.setFullYear(+year.value, +month.value, 1);

var nameOnCard = document.querySelector('.nameOnCard');
var numberOnCard =document.querySelector('.numberOnCard');
var dateOnCard = document.querySelector('.dateOnCard');
var cvcOnCard = document.querySelector('.cvcOnCard');

var fieldcontainer = document.querySelector(".field-container");
var thankYou = document.querySelector(".container3");

var a,b,c,d= false;

var btn = document.querySelector(".btn");
var continueButton = document.querySelector("#continue");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    inputs.forEach(input => {
        if(!input.value){
            input.parentElement.classList.add('error');
            
        } else {
            input.parentElement.classList.remove('error');
            
            if(input.id=='chname'){
                if(validateName(input.value)){
                    input.parentElement.classList.remove('error');
                }else{
                    input.parentElement.classList.add('error');
                }
            }
            else if(input.id =='cardnumber'){
                if(validateCard_num(input.value)){
                    input.parentElement.classList.remove('error');
                }else{
                    input.parentElement.classList.add('error');
                }
            } else if(input.id == 'cvc'){
                if(validatecvc(input.value)){
                    input.parentElement.classList.remove('error');
                }else{
                    input.parentElement.classList.add('error');
                }
            }else if(input.id == 'month' ||  input.id == 'year'){
                if(validatemonthyear(input.value)){
                    // input.parentElement.classList.remove('error');
                
                }else{
                    input.parentElement.classList.add('error');
                }
            }  
            else{

                }
            if (a&&b&&c&&d==true){
                fieldcontainer.classList.add('hidden');
                thankYou.classList.remove('hidden');
            }else{
                fieldcontainer.classList.remove('hidden');
                thankYou.classList.add('hidden');
            }
        }
    })
})

function validateName(){
    var nameFormat = /^[a-zA-Z]+$/;
    if (!nameFormat.test(document.myform.Name.value)) {
        fullname.style.display= 'block'; 
        fullname.innerHTML = 'Wrong format';  
        a=false;           
        return false;
    }else{
        fullname.style.display= 'none'; 
        let n = cardHolderName.value;
        nameOnCard.innerHTML = n;
        a=true;
        return true;
    }
}
// function for cardNumber
// function validateCard_num(){
//     var re16digit = /^\d{16}$/;
//     if (!re16digit.test(document.myform.cardnumber.value)) {
//         alert("Please enter your 16 digit credit card numbers");
//         cardformat.style.display= 'block';              
//         cardformat.innerHTML= 'Wrong format';
//         return false;
//     }else{
//         cardformat.style.display= 'none';
//       let  x= cardNumber.value; 
//         numberOnCard.innerContent= x;
//         return true;
//     }
// }

// to make spaces after every four digits to make readable by user
function validateCard_num(value) {
    
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    for (i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }
  
  onload = function() {
    document.getElementById('cardnumber').oninput = function() {
      this.value = validateCard_num(this.value);
      x= this.value;
      numberOnCard.innerHTML = x ;
      b=true;
    }
  }

  //to allow keyboard to only pick numeric values on keypress. these are ASCII values
  function checkDigit(event) {
      var code = (event.which) ? event.which : event.keyCode;
  
      if ((code < 48 || code > 57) && (code > 31)) {
          return false;
      }
  
      return true;
  }
// function for card CVC
function validatecvc(){
    var re3digit = /^\d{3}$/;
    if (!re3digit.test(document.myform.cvcnum.value)) {
        alert("Please enter your 3 digit credit card cvc numbers");
        cardcvc.style.display= 'block'; 
        cardcvc.innerHTML = 'Wrong format';  
        c=false;           
        return false;
    }else{
        cardcvc.style.display= 'none'; 
        let cc = cvc.value;
        cvcOnCard.innerHTML = cc;
        c=true;
        return true;
        
    }
}
// expire date of card
function validatemonthyear(){
    if(+month.value < 1 || +month.value > 12 || +month.value === 0 ){

       dtyr.style.display = 'block';
        dtyr.innerHTML= 'Your card is Expired!';
        d=false;
        return false;
    }
    // i used it above all in one statement but it can be done this wat too
    // else if(+month.value === 0){
    //     errormonth.classList.add('error');
    //     return false;
    // }
    else{
        if(+year.value < new Date().toISOString().split("T")[0].split("-")[0] ){
            dtyr.style.display = 'block';
            dtyr.innerHTML= 'Your card is Expired!';
            d= false;
            return false;
        }else{
            if(todayyear > +year.value || (todayyear === +year.value && todaymonth >= +month.value)){
                dtyr.style.display = 'block';
                dtyr.innerHTML= 'Your card is Expired!';
                d=false;
                return false;
            }
            // other way to get expre date
            // if (someday < today) {
            //     alert("The expiry date is before today's date. Please select a valid expiry date");
            //     return false;
            // }
            else{
                dtyr.style.display = 'none';
                m = +month.value;
                y = +year.value;
                dateOnCard.innerHTML= + m + " / " + y;
                d= true;
                return true;
            }
           
        }
       
    }

}

continueButton.addEventListener('click', () => {
    location.reload()
});


