var TinyTestHelper = {
    renderStats: function(myTests, failures) {
        var numberOfTests = Object.keys(myTests).length;
        var successes = numberOfTests - failures;

        var summaryString = 'Ran ' + numberOfTests + ' tests: ' 
                            + successes + ' successes, ' 
                            + failures + ' failures ';
        var summaryElement = document.createElement('h1');
        summaryElement.textContent = summaryString;
        document.body.appendChild(summaryElement);
    }
};

var TinyTest = {
    run: function(myTests) {
        var failures = 0;
        for (var testName in myTests) {
            var testAction = myTests[testName];
            try {
                testAction();//.apply(this);
                console.log('%c' + testName, "color: green;");
            } catch (e) {
                failures++;
                console.groupCollapsed('%c' + testName, "color: red;");
                console.error(e.stack);
                console.groupEnd();
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                TinyTestHelper.renderStats(myTests, failures);
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    // assert: function(value, msg) { //What assert is for?
    //     if (!value) {
    //         throw new Error('assert(): ' + msg);
    //     }
    // },

    // assertEquals: function(expected, actual) {
    //     if (expected != actual) {
    //         throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
    //     }
    // },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    }
};

var fail               = TinyTest.fail,//.bind(TinyTest),
    assert             = TinyTest.assert,//.bind(TinyTest),
    //assertEquals       = TinyTest.assertEquals,//.bind(TinyTest),
    //eq                 = TinyTest.assertEquals,//.bind(TinyTest), // alias for assertEquals
    //assertStrictEquals = TinyTest.assertStrictEquals,//.bind(TinyTest),
    eq                 = TinyTest.assertStrictEquals,
    tests              = TinyTest.run;//.bind(TinyTest);