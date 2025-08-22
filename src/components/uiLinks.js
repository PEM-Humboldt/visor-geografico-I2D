import { I2D_HOME_URL, CEIBA_URL, GEONETWORK_HOME_URL, GUIDES_URL, CONTACT_EMAIL, HUMBOLDT_SITE_URL } from './server/url'

function setHref(id, url) {
  const el = document.getElementById(id)
  if (!el) return
  if (url && url.trim()) {
    if (id === 'link-contact' && !/^mailto:/i.test(url)) {
      el.setAttribute('href', `mailto:${url}`)
    } else {
      el.setAttribute('href', url)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setHref('link-i2d-home', I2D_HOME_URL)
  setHref('link-ceiba', CEIBA_URL)
  setHref('link-geonetwork-home', GEONETWORK_HOME_URL)
  setHref('link-guides', GUIDES_URL)
  setHref('link-contact', CONTACT_EMAIL)
  setHref('link-humboldt', HUMBOLDT_SITE_URL)
})

