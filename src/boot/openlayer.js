import { boot } from 'quasar/wrappers'
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'
export default boot(({ app }) => {

  // Tell app to use the I18n instance
  app.use(OpenLayersMap)
})