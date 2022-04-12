import { createStore, createLogger } from 'vuex'
import area from './modules/area'
import user from './modules/user'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    area, user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})