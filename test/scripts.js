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

	
	$scope.thing = jsonifier.xmlToJSON(xmlText);
	
}]);

