instanceOf-JavaScript
=====================

Implementation of type checking functions for JavaScript which wrap around the many inconsistencies in the core langauge. Lightweight and works cross-browser, or intends to.

API
=====================
Ordinary Usage - passing a string in for the class name. Class name may be namespaced such as "collections.dictionary".

	boolean instanceOf({string} class name, {object} object to examine)

Alternatively - pass in the class constructor
	
	boolean instanceOf({function} class constructor, {object} object to examine)

Currently the function can only check for globally scoped or globally namespaced classes. Inline class definitions are permitted provided they are accessible from a window/global level scope or namespace.

All primitive types are supported, as are native classes such as Date and Array, in addition to user-defined classes.
Primitive types are deemed equivilent to their class

	instanceOf(String, "string"); //true
	instanceOf(String, new String("string")); //true
	instanceOf("string", "string"); //true
	instanceOf("string", new String("string")); //true

Future Work
===========
- Allow configuration of things like primitive type conversion to allow explicit primitive type checking
- Expand tests
- Search for more edge cases
- Further work on optimising the type checking performance