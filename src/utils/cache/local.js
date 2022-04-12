class localCache {
    set (key, value, expire) {
        if (expire === null || typeof expire === undefined) {
            expire = null
        } else {
            expire = new Date().getTime() + expire * 1000
        }
        const stringData = JSON.stringify({
            value,
            time: Date.now(),
            expire: expire,
        })
        window.localStorage.setItem(key.toUpperCase(), stringData)
    }

    get (key) {
        key = key.toUpperCase()
        const val = window.localStorage.getItem(key)
        if (!val) return null

        try {
            const data = JSON.parse(val)
            const { value, expire } = data
            if (expire === null || typeof expire === undefined || expire >= new Date().getTime()) {
                return value
            }
            this.remove(key)
        } catch (e) {
            return def
        }
    }

    remove (key) {
        window.localStorage.removeItem(key.toUpperCase())
    }

    clear () {
        window.localStorage.clear()
    }
}

export default new localCache()

