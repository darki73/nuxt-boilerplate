/**
 * Number.prototype.format(n, x)
 * @param { number } n: length of decimal
 * @param { number | null } x: length of sections
 * @return { string }
 */
Number.prototype.format = function(n, x = null) {
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    // eslint-disable-next-line
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

/**
 * Append leading zero to number
 * @returns { string|number }
 */
Number.prototype.leadingZero = function() {
    if (this > 9) {
        return this;
    }
    return `0${this}`;
};
