import cookies from 'js-cookie';

/**
 * Storage Class
 */
export default new class Storage {
    /**
     * Storage constructor
     */
    constructor() {
        this.canUseLocalStorage = this.isLocalStorageAvailable();
    }

    /**
     * This method allows us to convert the GQL timestamp to date and then to days
     * @param timestamp
     * @returns {number}
     */
    tokenExpirationDaysCount(timestamp) {
        const expirationDate = timestamp * 1000;
        const currentDate = new Date();

        const seconds = Math.floor((expirationDate - (currentDate)) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return Math.floor(hours / 24);
    }

    /**
     * Save value to storage
     * @param key
     * @param value
     * @param expirationInDays
     */
    setItem(key, value, expirationInDays = 365) {
        const convertedValue = this.convertValueToStorageFormat(value);
        if (this.canUseLocalStorage) {
            this.setLocalStorageItem(key, convertedValue);
        } else {
            cookies.set(key, convertedValue, {
                expires: expirationInDays,
                path: '/'
            });
        }
    }

    /**
     * Replace value in storage
     * @param key
     * @param value
     * @param storageType
     * @param expirationInDays
     */
    replaceItem(key, value, storageType = 'localStorage', expirationInDays = 365) {
        const convertedValue = this.convertValueToStorageFormat(value);
        if (this.canUseLocalStorage && storageType === 'localStorage') {
            this.removeLocalStorageItem(key);
            this.setLocalStorageItem(key, convertedValue);
        } else {
            this.removeCookieItem(key);
            this.setCookieItem(key, convertedValue, expirationInDays);
        }
    }

    /**
     * Remove item from the local storage
     * @param key
     */
    removeLocalStorageItem(key) {
        localStorage.removeItem(key);
    }

    /**
     * Save value to local storage
     * @param key
     * @param value
     */
    setLocalStorageItem(key, value) {
        localStorage.setItem(key, value);
    }

    /**
     * Set value specifically to cookie
     * @param key
     * @param value
     * @param expirationInDays
     */
    setCookieItem(key, value, expirationInDays = 365) {
        if (expirationInDays > 1000000000) {
            expirationInDays = new Date(expirationInDays * 1000);
        }
        cookies.set(key, value, {
            expires: expirationInDays,
            path: '/'
        });
    }

    /**
     * Get cookie item value
     * @param key
     * @returns {*}
     */
    getCookieItem(key) {
        return this.convertValueFromStorageFormat(key, 'cookie');
    }

    /**
     * Get value from the storage with its original type
     * @param key
     * @param defaultValue
     * @param storageType
     * @returns {*}
     */
    getItem(key, defaultValue, storageType = 'localStorage') {
        const storageValue = this.convertValueFromStorageFormat(key, storageType);
        if (storageValue === null || storageValue === undefined || storageValue === 'undefined') {
            if (defaultValue !== 'undefined' && defaultValue !== undefined) {
                this.setItem(key, defaultValue);
            }
            return defaultValue;
        }
        return storageValue;
    }

    getAll() {
        let values = {};
        if (this.canUseLocalStorage) {
            Object.keys(localStorage).forEach((key) => {
                values[key] = this.getItem(key);
            });
        }
        return values;
    }

    /**
     * Remove item from storage
     * @param key
     * @returns {boolean}
     */
    removeItem(key) {
        try {
            if (this.canUseLocalStorage) {
                localStorage.removeItem(key);
            } else {
                this.removeCookieItem(key);
            }
        } catch (error) {
            return false;
        }
        return true;
    }

    removeCookieItem(key) {
        cookies.remove(key, {
            path: '/'
        });
    }

    /**
     * Convert original value to the string so the storage can properly handle it
     * @param value
     * @returns {*}
     */
    convertValueToStorageFormat(value) {
        let newValue = null;
        if (typeof value === 'boolean') {
            newValue = value.toString();
        } else if (typeof value === 'number') {
            newValue = value.toString();
        } else if (typeof value === 'object') {
            newValue = JSON.stringify(value);
        } else {
            newValue = value;
        }
        return newValue;
    }

    /**
     * Convert value retrieved from storage from string to the valid type
     * @param key
     * @param storageType
     * @returns {*}
     */
    convertValueFromStorageFormat(key, storageType = 'localStorage') {
        let value = null;
        let tempValue = null;
        if (this.canUseLocalStorage && storageType === 'localStorage') {
            tempValue = localStorage.getItem(key);
        } else {
            tempValue = cookies.get(key);
        }

        if (tempValue === null || tempValue === undefined || tempValue === 'undefined') {
            return tempValue;
        }

        if (tempValue === 'true') {
            value = true;
        } else if (tempValue === 'false') {
            value = false;
        } else if (!isNaN(tempValue)) {
            if (tempValue.indexOf('.') !== false) {
                value = parseFloat(tempValue);
            } else {
                value = parseInt(tempValue, 10);
            }
        } else if (this.isStringValidJson(tempValue)) {
            value = JSON.parse(tempValue);
        } else {
            value = tempValue;
        }

        return value;
    }

    /**
     * Check whether local storage is available
     * @returns {boolean}
     */
    isLocalStorageAvailable() {
        return typeof localStorage !== 'undefined';
    }

    /**
     * Check if string is a valid Json Object
     * @param string
     * @returns {boolean}
     */
    isStringValidJson(string) {
        try {
            JSON.parse(string);
        } catch (error) {
            return false;
        }
        return true;
    }
};
