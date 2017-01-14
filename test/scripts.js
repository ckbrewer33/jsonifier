var app = angular.module('testApp', []);

app.controller('testController', ['$scope', function($scope) {
	
	var xmlText = 	'<MyRoot>'+
						'<test>Success</test>'+
						'<test2>'+
							'<item>val1</item>'+
							'<item>val2</item>'+
						'</test2>'+
						'<test3 id="theId" value="theValue">val3</test3>'+
						'<test4></test4>'+
						'<test5/>'+
					'</MyRoot>';

	$scope.convertXML = function() {
		var start = new Date().getTime();
		$scope.errorText = null;

		try {
			$scope.output = jsonifier.xmlToJSON($scope.xmlTextBox);
		}
		catch (e)
		{
			$scope.errorText = 'Error: ' + e;
		}
		
		var end = new Date().getTime();
		var time = end-start;
		console.log('execution time: ' + time + 'ms');
	};

	$scope.xmlContainsValue = function() {
		$scope.clearJSONOutput();

		$scope.valueFound = jsonifier.xmlContainsValue($scope.xmlTextBox, $scope.valueToFind, $scope.valuePath);
	};

	$scope.getValue = function() {
		$scope.clearJSONOutput();

		var result = jsonifier.getValue($scope.xmlTextBox, $scope.valuePath);
		if (null === result) {
			$scope.valueFound = '-- no value found at given path --';
		}
		else {
			$scope.valueFound = result;
		}
	};

	$scope.xmlContainsNode = function() {
        $scope.clearJSONOutput();

		var result = jsonifier.xmlContainsNode($scope.xmlTextBox, $scope.valuePath);
		if (null === result) {
			$scope.valueFound = '-- no node found at given path --';
		}
		else {
			$scope.valueFound = 'Found a node at ' + $scope.valuePath;
		}
	};

	$scope.clearJSONOutput = function() {
		$scope.output = '';
	};

}]);

