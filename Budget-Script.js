// BUDGET MODULE
var budgetController = (function() {

    // Some code
})();




// UI MODULE
var UIController = (function() {

    var DOMstrings = {
        addType: '.add__type',
        addDescription: '.add__description',
        addValue: '.add__value'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.addType).value, // Will be inc or exp
                description: document.querySelector(DOMstrings.addDescription).value,
                value: document.querySelector(DOMstrings.addValue).value
            };
        }
    }
   
})();




// APP MODULE
// Passing in other 2 modules to connect them
var controller = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function() {
        // 1. Get the field input data
        var input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI
        
    }

    // Event listener for clicking submit button
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    // Get input data from enter key
    document.addEventListener('keypress', function(event) {
        if(event.key === 'Enter') {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);



