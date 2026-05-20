import { 
    getI2DHomeUrl, 
    getCeibaUrl, 
    getGeonetworkHomeUrl, 
    getGuidesUrl, 
    getContactEmail, 
    getHumboldtSiteUrl } from './server/url'

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

function inicializarEnlaces() {
  setHref('link-i2d-home', getI2DHomeUrl());
  setHref('link-ceiba', getCeibaUrl());
  setHref('link-geonetwork-home', getGeonetworkHomeUrl());
  setHref('link-guides', getGuidesUrl());
  setHref('link-contact', getContactEmail());
  setHref('link-humboldt', getHumboldtSiteUrl());
}

inicializarEnlaces();