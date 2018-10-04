/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
var TinyTest = {

    run: function(tests) {
        var failures = 0;//this: TinyTest. Case 2
        for (var testName in tests) {//this: TinyTest. Case 2
            var testAction = tests[testName];//this: TinyTest. Case 2
            try {
                testAction.apply(this);//this: TinyTest. Case 2 //Why need .apply()
                //`this` inside testAction will be TinyTest. Case 4. If don't apply,`this` will be window.
                console.log('Test:', testName, 'OK');//this: TinyTest. Case 2 
            } catch (e) {
                failures++;//this: TinyTest. Case 2 
                console.error('Test:', testName, 'FAILED', e);//this: TinyTest. Case 2 
                console.error(e.stack);//this: TinyTest. Case 2 
            }
        }

        setTimeout(function() { // Give document a chance to complete //this before {: TinyTest. Case 2
            if (window.document && document.body) {//this: window. Case 1 within case 5
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');//this: window. Case 1 within case 5
            }
        }, 0);
    },
    //setTimeout priority
    //1.JavaScript
    //2.Update the DOM
    //3.Extra tasks (e.g. callbacks passed into setTimeout)

    fail: function(msg) {
        throw new Error('fail(): ' + msg);//this: TinyTest. Case 2 
    },

    assert: function(value, msg) {
        if (!value) {//this: TinyTest. Case 2 
            throw new Error('assert(): ' + msg);//this: TinyTest. Case 2 
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {//this: TinyTest. Case 2 
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');//this: TinyTest. Case 2 
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {//this: TinyTest. Case 2 
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');//this: TinyTest. Case 2 
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),//why need .bind(TinyTest) //this: window. Case 1
    assert             = TinyTest.assert.bind(TinyTest),//this: window. Case 1
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),//this: window. Case 1
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals //this: window. Case 1
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),//this: window. Case 1
    tests              = TinyTest.run.bind(TinyTest);//this: window. Case 1