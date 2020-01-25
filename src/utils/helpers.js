export { default as getYouTubeID } from 'get-youtube-id';

/**
 * Check if value is really set to "true"
 * @param value
 * @returns { boolean }
 */
export function isTrue(value) {
    return value === true || value === 'true';
}

/**
 * Check if value is really set to "false"
 * @param value
 * @returns { boolean }
 */
export function isFalse(value) {
    return value === false || value === 'false';
}

/**
 * Check if value is really defined
 * @param value
 * @returns { boolean }
 */
export function isDefined(value) {
    return value !== undefined && value !== 'undefined';
}

/**
 * Check if value is really undefined
 * @param value
 * @returns { boolean }
 */
export function isUndefined(value) {
    return value === undefined || value === 'undefined';
}

/**
 * Check if value is null
 * @param value
 * @returns { boolean }
 */
export function isNull(value) {
    return value === null;
}

/**
 * Check if value is not null
 * @param value
 * @returns { boolean }
 */
export function isNotNull(value) {
    return value !== null;
}

/**
 * Check if source variable is equal to target variable
 * @param { * } source
 * @param { * } target
 * @returns { boolean }
 */
export function isEqual(source, target) {
    return source === target;
}

/**
 * Check if source variable is not equal to target variable
 * @param { * } source
 * @param { * } target
 * @returns { boolean }
 */
export function isNotEqual(source, target) {
    return source !== target;
}

/**
 * Check if provided value length equals to the specified number
 * @param value
 * @param number
 * @returns { boolean }
 */
export function lengthEqual(value, number) {
    return isEqual(value.length, number);
}

/**
 * Check if value is greater than given number
 * @param value
 * @param number
 * @returns { boolean }
 */
export function lengthGreater(value, number) {
    return value.length > number;
}

/**
 * Check if value is greater or equal to the given number
 * @param value
 * @param number
 * @returns { boolean }
 */
export function lengthGreaterOrEqual(value, number) {
    return value.length >= number;
}

/**
 * Check if value is less than given number
 * @param value
 * @param number
 * @returns { boolean }
 */
export function lengthLess(value, number) {
    return value.length < number;
}

/**
 * Check if value is less or equal to the given number
 * @param value
 * @param number
 * @returns { boolean }
 */
export function lengthLessOrEqual(value, number) {
    return value.length <= number;
}

/**
 * Check if value really set to "true" and defined
 * @param value
 * @returns { boolean }
 */
export function isTrueAndDefined(value) {
    return isTrue(value) && isDefined(value);
}

/**
 * Check if value really set to "false" and defined
 * @param value
 * @returns { boolean }
 */
export function isFalseAndDefined(value) {
    return isFalse(value) && isDefined(value);
}

/**
 * Check whether value is undefined or null
 * @param value
 * @returns { boolean }
 */
export function isUndefinedOrNull(value) {
    return isUndefined(value) || isNull(value);
}

/**
 * Check if value defined and not null
 * @param value
 * @returns { boolean }
 */
export function isDefinedAndNotNull(value) {
    return isDefined(value) && isNotNull(value);
}

/**
 * Check whether first value is greater that second
 * @param { number } first
 * @param { number } second
 * @returns { boolean }
 */
export function greater(first, second) {
    return first > second;
}

/**
 * Check whether first value is greater or equal to second
 * @param { number } first
 * @param { number } second
 * @returns { boolean }
 */
export function greaterOrEqual(first, second) {
    return first >= second;
}

/**
 * Check whether first value is lower that second
 * @param { number } first
 * @param { number } second
 * @returns { boolean }
 */
export function lower(first, second) {
    return first < second;
}

/**
 * Check whether first value is lower or equal to second
 * @param { number } first
 * @param { number } second
 * @returns { boolean }
 */
export function lowerOrEqual(first, second) {
    return first <= second;
}

/**
 * Get random number from between the given numbers
 * @param { number } min
 * @param { number } max
 * @returns { number }
 */
export function randomFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Convert string to camel case
 * @param { string } str
 * @returns { string }
 */
export function camel(str) {
    const camel = (str || '').replace(/-([^-])/g, (g) => g[1].toUpperCase());
    return capitalize(camel);
}

/**
 * Convert string from camel case
 * @param { string } str
 * @returns { string }
 */
export function camelActual(str) {
    return (str || '').replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * Convert string to kebab case
 * @param { string } str
 * @returns { string }
 */
export function kebab(str) {
    return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Capitalize string
 * @param { string } str
 * @returns { string }
 */
export function capitalize(str) {
    str = str || '';
    return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`;
}


export default {
    isTrue,
    isFalse,
    isDefined,
    isUndefined,
    isNull,
    isNotNull,
    isEqual,
    isNotEqual,
    lengthEqual,
    lengthGreater,
    lengthGreaterOrEqual,
    lengthLess,
    lengthLessOrEqual,
    isTrueAndDefined,
    isFalseAndDefined,
    isUndefinedOrNull,
    isDefinedAndNotNull,
    greater,
    greaterOrEqual,
    lower,
    lowerOrEqual,
    randomFromInterval,
    camel,
    camelActual,
    kebab,
    capitalize,
};
