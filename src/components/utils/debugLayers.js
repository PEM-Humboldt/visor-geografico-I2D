/**
 * Debug helper functions to inspect available layers
 * Useful for testing URL parameters and finding correct layer names
 */

import { getAvailableLayerNames } from './urlParams.js';

/**
 * Add a debug button to the page to list all available layers
 */
export const addDebugButton = () => {
    // Create debug button
    const debugBtn = document.createElement('button');
    debugBtn.innerHTML = 'Debug Layers';
    debugBtn.style.position = 'fixed';
    debugBtn.style.top = '10px';
    debugBtn.style.right = '10px';
    debugBtn.style.zIndex = '9999';
    debugBtn.style.backgroundColor = '#007bff';
    debugBtn.style.color = 'white';
    debugBtn.style.border = 'none';
    debugBtn.style.padding = '10px 15px';
    debugBtn.style.borderRadius = '5px';
    debugBtn.style.cursor = 'pointer';
    
    debugBtn.addEventListener('click', () => {
        const layers = getAvailableLayerNames();
        console.log('=== AVAILABLE LAYERS FOR URL PARAMETERS ===');
        console.table(layers);
        
        // Also display in alert for easy copying
        const layerList = layers.map(layer => 
            `${layer.geoserverName} (${layer.displayName}) - ${layer.visible ? 'VISIBLE' : 'hidden'}`
        ).join('\n');
        
        alert(`Available layers:\n\n${layerList}\n\nUse these names in URL like: ?capa=layer_name\nSee console for detailed table.`);
    });
    
    document.body.appendChild(debugBtn);
};

/**
 * Console function to quickly test layer activation
 */
window.testLayer = (layerName) => {
    import('./urlParams').then(({ activateLayer }) => {
        const result = activateLayer(layerName);
        console.log(`Test result for "${layerName}": ${result ? 'SUCCESS' : 'FAILED'}`);
    });
};

/**
 * Console function to list layers matching a search term
 */
window.findLayers = (searchTerm) => {
    const layers = getAvailableLayerNames();
    const matches = layers.filter(layer => 
        layer.geoserverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        layer.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    console.log(`Layers matching "${searchTerm}":`, matches);
    return matches;
};

/**
 * Console function to switch projects for testing
 */
window.switchToProject = (projectName) => {
    import('./urlParams').then(({ switchProject }) => {
        console.log(`Switching to project: ${projectName}`);
        switchProject(projectName);
    });
};

/**
 * Console function to show current project info
 */
window.showCurrentProject = () => {
    import('../services/projectService.js').then(({ default: projectService }) => {
        const currentProject = projectService.getCurrentProject();
        console.log('Current project:', currentProject);
        
        const urlParams = new URLSearchParams(window.location.search);
        console.log('URL proyecto parameter:', urlParams.get('proyecto'));
    });
};

/**
 * Console function to check layer loading issues
 */
window.debugLayers = () => {
    console.log('=== LAYER DEBUG INFO ===');
    
    // Check map instance
    if (window.mapInstance) {
        const layers = window.mapInstance.getLayers().getArray();
        console.log(`Map has ${layers.length} layer groups`);
        
        layers.forEach((layerGroup, index) => {
            if (layerGroup.getLayers) {
                const sublayers = layerGroup.getLayers().getArray();
                console.log(`Group ${index}: ${layerGroup.get('title')} (${sublayers.length} layers)`);
                
                sublayers.forEach((layer, subIndex) => {
                    const isVisible = layer.getVisible();
                    const hasSource = layer.getSource();
                    const layerTitle = layer.get('title') || layer.get('name');
                    
                    console.log(`  Layer ${subIndex}: ${layerTitle} - visible: ${isVisible}, has source: ${!!hasSource}`);
                    
                    if (hasSource && hasSource.getParams) {
                        const params = hasSource.getParams();
                        console.log(`    WMS Params:`, params);
                    }
                });
            }
        });
    } else {
        console.log('❌ No map instance found');
    }
    
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    console.log('URL Parameters:', Object.fromEntries(urlParams.entries()));
    
    // Check for processing flags
    console.log('Processing flags:', {
        projectSwitch: window.processingProjectSwitch,
    });
};

/**
 * Console function to test a layer URL directly
 */
window.testLayerUrl = (store, layerName) => {
    const baseUrl = 'https://geoservicios.humboldt.org.co/geoserver/';
    const testUrl = `${baseUrl}${store}/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=${store}:${encodeURIComponent(layerName)}&STYLES=&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX=-8218509,469629,-8140237,547900`;
    
    console.log(`Testing layer URL: ${testUrl}`);
    
    fetch(testUrl)
        .then(response => {
            console.log(`Response status: ${response.status}`);
            console.log(`Response headers:`, [...response.headers.entries()]);
            if (response.ok) {
                console.log('✅ Layer URL is working');
            } else {
                console.log('❌ Layer URL failed');
            }
        })
        .catch(error => {
            console.error('❌ Error testing layer URL:', error);
        });
};

// Auto-add debug button in development mode
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(addDebugButton, 2000);
    });
}