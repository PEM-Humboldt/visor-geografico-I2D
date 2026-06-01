import { updateConfig } from './configStore.js';

async function inicializarAplicacion() {
  
  try {
    const response = await fetch('./config.json');
    if (response.ok) {
        const prodConfig = await response.json();
        updateConfig(prodConfig);
    }
  } catch (error) {
    console.debug('Could not load config.json, using environment variables or defaults', error);
  }

  try {
    await import('./app.js');
  } catch (error) {
    console.error('Failed to load application:', error);
  }
}

document.addEventListener('DOMContentLoaded', inicializarAplicacion);