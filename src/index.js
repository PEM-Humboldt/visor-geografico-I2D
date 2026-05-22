window.RUNTIME_CONFIG = {};

async function inicializarAplicacion() {
  try {
    const response = await fetch('./config.json');
    if (response.ok) {
      window.RUNTIME_CONFIG = await response.json();
      console.info('Runtime configuration charged successfully');
    }
  } catch (error) {
    console.warn('Failed to load runtime configuration:', error);
  }

  await import('./app.js');
}

document.addEventListener('DOMContentLoaded', inicializarAplicacion);