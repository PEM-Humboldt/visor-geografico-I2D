window.RUNTIME_CONFIG = {};

async function inicializarAplicacion() {
  try {
    const response = await fetch('./config.json');
    if (response.ok) {
      window.RUNTIME_CONFIG = await response.json();
      console.log('Configuración cargada exitosamente.');
    }
  } catch (error) {
    console.warn('Error cargando config.json, usando valores por defecto locales.');
  }

  await import('./app.js');
}

document.addEventListener('DOMContentLoaded', inicializarAplicacion);