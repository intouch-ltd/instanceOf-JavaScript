instanceOf-JavaScript
=====================

Implementation of type checking functions for JavaScript which wrap around the many inconsistencies in the core langauge.

API:
boolean instanceOf({string} class name, {object} object to examine)
boolean instanceOf({function} class constructor, {object} object to examine)

Class name may be namespaced such as "collections.dictionary".
Currently can only check for globally scoped or namespaced classes. Inline class definitions are supported provided they have global scope.

All primitive types are supported, as are native classes such as Date and Array, in addition to user-defined classes.
Primitive types are deemed equivilent to their class i.e. instanceOf(String, "string") = true;