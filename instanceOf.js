/*
instanceOf.js
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

/*
 * @method function
 * @parent Utilities 
 * @author Andy Wise
 * Checks the type of an object
 * @param {string|function} [className] String - Name of the type to compare against, case insensitve for primative types, function - Constructor of class to compare against, will respect inheritance and wrap primative types
 * @param {object} [objectRef] Object instance to examine, null and undefined will both throw exceptions
 * @return {boolean} true if object is an instance of class, false if not
 */
 function instanceOf( className, objectRef){
	if(typeof objectRef !== 'undefined'){
		if(objectRef !== null){
			if(typeof className === 'string'){
				var classPath = className.split('.'); //allows use of namespacing
				switch(className.toLowerCase()){ //check primitive types using typeof, cast from upper case to accomodate object wrappers String, Number, Boolean, Function
					case 'string':
						return typeof objectRef === 'string' ? true : false;
						break;
					case 'number':
						return typeof objectRef === 'number' ? true : false;
						break;
					case 'boolean':
						return typeof objectRef === 'boolean' ? true : false;
						break;
					case 'function':
						return typeof objectRef === 'function' ? true : false;
						break;
					default:
						if(getNativeClassName(objectRef) === classPath[classPath.length - 1]){ //prefered method, cross frame and well supported but doesn't nessecarily user-defined classes, namespace incompatible
							return true;
						} else {
							try{
								var classConstructor = getClass(className); //check user-defined class by extracting constructor and using instanceof
								if( objectRef instanceof classConstructor ){
									return true
								}
							} catch(e) {}
							if(getDynamicClassName(objectRef) === classPath[classPath.length - 1]){ //checks user-defined classes by examining constructor for function name - fallback but doesn't work for inline class definitions
								return true;
							} else {
								return false;
							}
						}
						break;
				}
			} else if( typeof className === 'function' ) {
				switch(typeof objectRef){
					case 'string':
						return new String(objectRef) instanceof className;
						break;
					case 'number':
						return new Number(objectRef) instanceof className;
						break;
					case 'boolean':
						return new Boolean(objectRef) instanceof className;
						break;
					default:
						return objectRef instanceof className;
						break;
				}
			} else {
				throw new Error("Provided class name is not a string or class constructor");
			}
		} else {
			throw new Error("Provided object is null - reference points to an uninstanciated object");
		}
	} else {
		throw new Error("Provided object is undefined - reference does not exist");
	}
}

/*
 * @method function
 * @parent Utilities 
 * @author Andy Wise
 * returns the native class the object casts to
 * @param {object} [objectRef] Object instance to examine
 * @return {string} a string representing the native type the object casts to
 */
function getNativeClassName(objectRef) {
	return Object.prototype.toString.call(objectRef).match(/^\[object\s(.*)\]$/);
}

/*
 * @method function
 * @parent Utilities 
 * @author Andy Wise
 * returns the class name of an object if the class has been defined by the user
 * @param {object} [objectRef] Object instance to examine
 * @return {string} returns a string representing the defined type of the object, or undefined if the class was not user-defined
 */
function getDynamicClassName(objectRef) {
	/* Discover class name by reflecting and regex'ing out of class code*/
	if (objectRef !== undefined && objectRef.constructor !== undefined && objectRef.constructor.toString !== undefined) {
		var matches = objectRef.constructor.toString().match(/function\s*(\w+)/);

		if (matches && matches.length == 2) {
			return matches[1];
		}
	}
	return undefined;
}

/*
 * @method function
 * @parent Utilities 
 * @author Andy Wise
 * @author Yuriy Nemtsov
 * @download http://stackoverflow.com/questions/1366127/instantiate-a-javascript-object-using-a-string-to-define-the-class-name
 * Given a class name or class path, will return the constructor for that string
 * @param {string} [className] String containing the class name (if globally scoped) or class path if namespaced
 * @param {object} [context] (OPTIONAL) Context to check in, if classes not defined globally
 * @return {function} constructor for the specified class name
 */
function getClass(className) { //todo - extend this to allow passing in a context other than window or this
	if(instanceOf('string',className)){
		var classPath = className.split('.');
		var namespace = (window || this); //set default namespace to window or if not in browser - current context
		for(var i = 0; i < classPath.length; i++){
			namespace = namespace[classPath[i]]; //step through namepace chain until we have the class declaration we are after
		}
		var classConstructor = namespace; //superflous but included for readability
		if( !instanceOf('function',classConstructor) ){ //check we have terminated at a class definition
			throw new Error("Provided className is not a Class Definition");
		}
		return classConstructor;
	} else {
		throw new Error("Parameter 0: className, is not a String");
	}
}