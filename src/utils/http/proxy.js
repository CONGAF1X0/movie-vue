const httpsRE = /^https:\/\//
export function createProxy (list) {
    const ret = {}
    try {
        list = JSON.parse(list.replace(/'/g, '"'))
    } catch (error) {
        list = ''
    }
    for (let i = 0; i < list.length; i++) {
        const prefix = list[i][0], target = list[i][1]
        const isHttps = httpsRE.test(target)

        // https://github.com/http-party/node-http-proxy#options
        ret[prefix] = {
            target: target,
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
            // https is require secure=false
            ...(isHttps ? { secure: false } : {}),
        }
    }
    return ret
}