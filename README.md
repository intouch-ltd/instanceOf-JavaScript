instanceOf-JavaScript
=====================

Implementation of type checking functions for JavaScript which wrap around the many inconsistencies in the core langauge. Lightweight and works cross-browser, or intends to.

API
=====================
Ordinary Usage - passing a string in for the class name. Class name may be namespaced such as "collections.dictionary".

	boolean instanceOf({object} object to examine, {string} class name)

Alternatively - pass in the class constructor
	
	boolean instanceOf({object} object to examine, {function} class constructor)

Currently the function can only check for globally scoped or globally namespaced classes. Inline class definitions are permitted provided they are accessible from a window/global level scope or namespace.

All primitive types are supported, as are native classes such as Date and Array, in addition to user-defined classes.
Primitive types are deemed equivilent to their class

	instanceOf("string", String); //true
	instanceOf(new String("string"), String); //true
	instanceOf("string", "string"); //true
	instanceOf(new String("string"), "string"); //true
	
Jquery
------
There is also a jquery extension for instanceOf, included in the repo as instanceOf.jquery.js, which performs much the same function but wraps the behaviour of jquery.type() so will ignore case for RegExp, Date and Array.
I will at some point decide which behaviour us more desirable :D

Future Work
===========
- Allow configuration of things like primitive type conversion to allow explicit primitive type checking
- Expand tests
- Search for more edge cases
- Further work on optimising the type checking performance
- Decide whether base or jquery type behaviour is more suitable for the solution and implement one or the other universally.