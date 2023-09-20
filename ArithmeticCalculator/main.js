
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    let input1 = event.target.elements.input1.value;
    let input2 = event.target.elements.input2.value;
    let operator = event.target.elements.operator.value;
    
    document.querySelector('.output').innerHTML = eval(input1 + operator + input2);
    
})