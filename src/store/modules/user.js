import { regeoApi, doLogin, getUserInfo, loginByMobileCaptcha, doLogout } from '@/api/user'
import { setAuthToken, setAuthRToken, getAuthToken, getAuthRToken, setAuthCache, getAuthCache, clearAuthCache } from '@/utils/auth'
// initial state
const state = () => ({
    userInfo: null,
    token: undefined,
    refreshToken: undefined,
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
})

// getters
const getters = {
    getUserInfo: state => state.userInfo || getAuthCache('USER_INFO') || {},
    getToken: state => state.token || getAuthToken(),
    getRToken: state => state.rtoken || getAuthRToken(),
    getSessionTimeout: state => !!state.sessionTimeout,
    getLastUpdateTime: state => state.lastUpdateTime,
}

// actions
const actions = {
    getLocation ({ commit }) {
        getLocation({ commit })
    },
    async login ({ commit, dispatch }, [params, isMobile]) {
        try {
            let res
            if (isMobile) {
                res = await loginByMobileCaptcha(params)
            } else {
                res = await doLogin(params)
            }
            if (res.code !== 200) {
                return Promise.reject(res.msg)
            }
            const { tokens } = res
            // save token
            commit('setToken', tokens.access_token)
            commit('setRToken', tokens.refresh_token)

            return dispatch('afterLoginAction')
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async afterLoginAction ({ dispatch }) {
        if (!getters.getToken) return null
        // get user info
        const userInfo = await dispatch('getUserInfoAction')
        // const sessionTimeout = state.sessionTimeout
        // if (sessionTimeout) {
        //     this.setSessionTimeout(false)
        // } else {
        //     const permissionStore = usePermissionStore()
        //     if (!permissionStore.isDynamicAddedRoute) {
        //         const routes = await permissionStore.buildRoutesAction()
        //         routes.forEach((route) => {
        //             router.addRoute(route as unknown as RouteRecordRaw)
        //         })
        //         router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
        //         permissionStore.setDynamicAddedRoute(true)
        //     }
        //     goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
        // }
        return userInfo
    },
    async getUserInfoAction ({ commit }) {
        if (!getters.getToken) return null
        const data = await getUserInfo()
        if (data.code == 200) {
            commit('setUserInfo', data.data)
            return data.data
        }
        // const { roles = [] } = userInfo;
        // if (isArray(roles)) {
        //   const roleList = roles.map((item) => item.value) as RoleEnum[];
        //   this.setRoleList(roleList);
        // } else {
        //   userInfo.roles = [];
        //   this.setRoleList([]);
        // }
        return null
    },
    async logout ({ commit }) {
        if (getters.getToken) {
            await doLogout().then(() => {
                commit('resetUserState')
            })
        }
    }
}


// mutations
const mutations = {
    setToken (state, token) {
        state.token = token ? token : '' // for null or undefined value
        setAuthToken(token)
    },
    setRToken (state, token) {
        state.refreshToken = token ? token : '' // for null or undefined value
        setAuthRToken(token)
    },
    setUserInfo (state, info) {
        state.userInfo = info
        state.lastUpdateTime = new Date().getTime()
        setAuthCache("USER_INFO", info)
    },
    setSessionTimeout (state, flag) {
        state.sessionTimeout = flag
    },
    resetUserState (state) {
        state.userInfo = null
        state.token = ''
        state.refreshToken = ''
        clearAuthCache()
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}