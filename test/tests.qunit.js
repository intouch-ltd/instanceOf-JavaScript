/*
tests.qunit.js
Copyright (C) 2012 Andrew Wise of Intouch Ltd.

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 3 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, see <http://www.gnu.org/licenses/lgpl.html>
*/
var namespaces = {};
function Dictionary() {
	this.name = "Dictionary";
}
$(document).ready(function () {
	module("instanceOf");
	{
		test("Check undefined", function () {
			expect(4);
			raises(function(){ instanceOf('string', undefined) });
			raises(function(){ instanceOf('undefined', undefined) });
			raises(function(){ instanceOf(Boolean, undefined) });
			raises(function(){ instanceOf(undefined, undefined) });
		});
		test("Check null", function () {
			expect(4);
			raises(function(){ instanceOf('string', null) });
			raises(function(){ instanceOf('null', null) });
			raises(function(){ instanceOf(Boolean, null) });
			raises(function(){ instanceOf(null, null) });
		});
		test("Check string", function () {
			expect(3)
			ok(instanceOf('string', "test"));
			ok(instanceOf('String', "test"));
			ok(instanceOf(String, "test"));
		});
		test("Check float", function () {
			expect(3);
			ok(instanceOf('number', 3.145), "Checks primative datatype correctly - lowercase");
			ok(instanceOf('Number', 3.145), "Checks primative datatype correctly - camelcase");
			ok(instanceOf(Number, 3.145), "Wraps primative datatype with Class correctly");
		});
		test("Check int", function () {
			expect(3);
			ok(instanceOf('number', 3), "Checks primative datatype correctly - lowercase");
			ok(instanceOf('Number', 3), "Checks primative datatype correctly - camelcase");
			ok(instanceOf(Number, 3), "Wraps primative datatype with Class correctly");
		});
		test("Check boolean", function(){
			expect(6);
			ok(instanceOf('boolean', true), "true - Checks primative datatype correctly - lowercase");
			ok(instanceOf('Boolean', true), "true - Checks primative datatype correctly - camelcase");
			ok(instanceOf(Boolean, true), "true - Wraps primative datatype with Class correctly");
			ok(instanceOf('boolean', false), "false - Checks primative datatype correctly - lowercase");
			ok(instanceOf('Boolean', false), "false - Checks primative datatype correctly - camelcase");
			ok(instanceOf(Boolean, false), "false - Wraps primative datatype with Class correctly");
		});
		test("Check function", function () {
			expect(2);
			ok(instanceOf('function', function(){ return true; }));
			ok(instanceOf(Function, function(){ return true; }));
		});
		test("Check Array", function (){
			expect(3);
			ok(!instanceOf('array', []));
			ok(instanceOf('Array', []));
			ok(instanceOf(Array, []));
		});
		test("Check date", function(){
			expect(3);
			ok(!instanceOf('date', new Date()));
			ok(instanceOf('Date', new Date()));
			ok(instanceOf(Date, new Date()));
		});
		test("Check custom object: Dictionary", function(){
			expect(5);
			var variable = new Dictionary();
			namespaces.collections = {};
			namespaces.collections.dictionary = Dictionary;
			ok(instanceOf("Dictionary", variable));
			ok(instanceOf("namespaces.collections.Dictionary", variable), "Check Namespacing from text: string entry");
			ok(instanceOf("namespaces.collections.dictionary", variable), "Check Namespacing from alias: string entry");
			ok(instanceOf(Dictionary, variable));
			ok(instanceOf(namespaces.collections.dictionary, variable), "Check Namespacing: constructor entry");
		});
		test("Check inline definition", function(){
			expect(2);
			var typeA = function(){
				this.propertyA = 1;
			};
			var A = new typeA();
			ok(instanceOf(typeA,A));
			ok(!instanceOf('typeA',A)); //todo - Should find way of being able to check for local class definitions
		});
		test("Check Regex", function(){
			expect(3);
			var variable = /a-z/;
			ok(!instanceOf('regexp', variable));
			ok(instanceOf('RegExp', variable));
			ok(instanceOf(RegExp, variable));
		});
		test("Check Object", function(){
			expect(2);
			ok(instanceOf('Object', {a: 1}));
			ok(instanceOf(Object, {a: 1}));
		});
		test("Check Inheritance", function(){
			expect(2);
			var a = function(){ this.a = function() { return true; } };
			var b = function(){ this.b = function() { return false; } };
			b.prototype = new a();
			ok(instanceOf(b,new b()));
			ok(instanceOf(a,new b()));
		});
	}
});