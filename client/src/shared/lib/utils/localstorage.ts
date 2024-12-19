export default class LocalStorage {
    private static isLocalStorageSupported: boolean = LocalStorage.isSupported()

    static isSupported() {
        return typeof window['localStorage'] != 'undefined' && window['localStorage'] != null
    }

    static has(key: string) {
        return Object.prototype.hasOwnProperty.call(localStorage, key)
    }

    static set(key: string, value: string | object) {
        if (!this.isLocalStorageSupported) {
            return
        }

        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }

        localStorage.setItem(key, value)
    }

    static get(key: string) {
        if (!this.isLocalStorageSupported) {
            return
        }

        const item = localStorage.getItem(key)

        if (item === null) return null

        try {
            return JSON.parse(item)
        } catch {
            return item
        }
    }

    static remove(key: string) {
        if (!this.isLocalStorageSupported) {
            return
        }

        localStorage.removeItem(key)
    }
}
