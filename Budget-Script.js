// BUDGET MODULE
var budgetController = (function() {
    // Constructors for exp/inc objects
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Data object to hold all item objects
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        // Creating exp/inc object and adding to data object
        addItem: function(type, desc, val) {
            var newItem, ID;

            // Create new ID (+1 after last id value in the array)
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            

            // Create new item based on inc or exp type
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }
        
            // Push it to data structure 
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };

})();


// UI MODULE
var UIController = (function() {
    // QuerySelector strings for html classes
    var DOMstrings = {
        addType: '.add__type',
        addDescription: '.add__description',
        addValue: '.add__value',
        addButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    // Returning these methods so that other modules can access them.
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.addType).value, // Will be inc or exp
                description: document.querySelector(DOMstrings.addDescription).value,
                value: document.querySelector(DOMstrings.addValue).value
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            // create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="income-%id%"><div class="item__description">%description%
                </div><div class="right clearfix"><div class="item__value">%value%</div><div class=
                "item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i>
                </button></div></div></div>`;
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = `<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%
                </div><div class="right clearfix"><div class="item__value">%value%</div><div class=
                "item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">
                <i class="ion-ios-close-outline"></i></button></div></div></div>`;
            }
            
            // Replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)

            // Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }
   
})();




// APP MODULE
// Passing in other 2 modules to connect them
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        // Getting dom strings from UI module
        var DOM = UICtrl.getDOMstrings();

        // Event listener for clicking submit button
        document.querySelector(DOM.addButton).addEventListener('click', ctrlAddItem);

        // Get input data from enter key
        document.addEventListener('keypress', function(event) {
            if(event.key === 'Enter') {
                ctrlAddItem();
            }
        });
    };


    // Adding item from the input fields
    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);

        // 4. Calculate the budget

        // 5. Display the budget on the UI
        
    };

    return {
        init: function() {
            console.log('App has started');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();



