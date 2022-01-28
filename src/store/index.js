import { createStore, createLogger } from 'vuex'
import area from './modules/area'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    area,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})