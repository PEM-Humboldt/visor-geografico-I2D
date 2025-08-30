/**
 * Dynamic Layer Management System
 * Integrates with HU-VisorI2D-0001 project management API
 * Replaces hardcoded layer definitions with dynamic API-driven configuration
 */

import { Group as GroupLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource, OSM, XYZ } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { wmsLayer } from '../server/geoserver/wms';
import { styleMpio, styleHighlight, styleHighlightPoint } from './layer-style/layers-style';
import { CARTODB_POSITRON_URL, OTM_TILE_URL, WMFLABS_BW_URL, STAMEN_TERRAIN_URL, ESRI_WORLD_PHYSICAL_URL, ESRI_WORLD_IMAGERY_URL } from '../server/url';
import projectService from '../services/projectService';

// Dynamic project configuration
let currentProject = null;
let dynamicLayerGroups = new Map();
let dynamicLayers = new Map();

/**
 * Initialize project and create dynamic base layers
 */
const initializeProject = async () => {
    try {
        currentProject = await projectService.initializeProject();
        console.log(`Dynamic layers initialized for project: ${currentProject.nombre}`);
        return currentProject;
    } catch (error) {
        console.error('Error initializing dynamic layers:', error);
        return null;
    }
};

/**
 * Create base map layers dynamically based on project configuration
 */
const createBaseLayers = (project) => {
    const isEcoreservas = project && project.nombre_corto === 'ecoreservas';
    
    return {
        streetmap: new TileLayer({ 
            title: 'Streetmap', 
            visible: !isEcoreservas, 
            source: new OSM({ crossOrigin: null }), 
            maxZoom: 20, 
            minResolution: 2, 
            name: 'Street Map' 
        }),
        cartodb_positron: new TileLayer({ 
            title: 'CartoDB Positron', 
            visible: isEcoreservas, 
            source: new XYZ({ url: CARTODB_POSITRON_URL }), 
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" rel="noopener">CARTO</a>', 
            subdomains: 'abcd', 
            maxZoom: 19, 
            name: 'CartoDB Positron' 
        }),
        otm: new TileLayer({ title: 'OTM', visible: false, source: new XYZ({ url: OTM_TILE_URL, attributions: ' © OpenStreetMap contributors' }), name: 'OTM' }),
        bw: new TileLayer({ title: 'B & W', visible: false, source: new XYZ({ url: WMFLABS_BW_URL, attributions: ' © OpenStreetMap contributors' }), name: 'BW' }),
        terrain: new TileLayer({ title: 'Terrain', visible: false, source: new XYZ({ url: STAMEN_TERRAIN_URL, attributions: ' © OpenStreetMap contributors' }), name: 'Terrain' }),
        esri_physical: new TileLayer({ title: 'Esri WorldPhysical', visible: false, attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service', source: new XYZ({ url: ESRI_WORLD_PHYSICAL_URL }), maxZoom: 8, name: 'Esri WorldPhysical' }),
        esri_imagery: new TileLayer({ title: 'Esri WorldImagery', visible: false, source: new XYZ({ url: ESRI_WORLD_IMAGERY_URL }), attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community', name: 'Esri WorldImagery' })
    };
};

//capa para seleccion
export var highlight = new VectorLayer({ style: styleHighlight, source: new VectorSource() });
export var highlightPoint = new VectorLayer({ style: styleHighlightPoint, source: new VectorSource() });

var highlightStyle = styleMpio;
export var highlightStadistics = new VectorLayer({
    style: function (feature) {
        highlightStyle.getText().setText(feature.values_.mpio_cnmbr);
        return highlightStyle;
    },
    source: new VectorSource()
});
/**
 * Create dynamic WMS layers from API configuration
 */
const createDynamicWMSLayer = (layerConfig) => {
    const layer = wmsLayer(
        layerConfig.store_geoserver,
        layerConfig.nombre_geoserver,
        layerConfig.nombre_display,
        layerConfig.estado_inicial,
        layerConfig.metadata_id
    );
    
    // Ensure layer is properly configured and visible
    if (layer && typeof layer.setVisible === 'function') {
        // Force visibility setting - ensure it's actually applied
        layer.setVisible(Boolean(layerConfig.estado_inicial));
        
        // Double-check visibility was set correctly
        const actualVisibility = layer.getVisible();
        if (actualVisibility !== Boolean(layerConfig.estado_inicial)) {
            console.warn(`Layer ${layerConfig.nombre_display}: visibility mismatch! Expected: ${layerConfig.estado_inicial}, Actual: ${actualVisibility}`);
            // Force set again
            setTimeout(() => layer.setVisible(Boolean(layerConfig.estado_inicial)), 50);
        }
        
        // Force refresh the layer source to ensure it renders
        if (layerConfig.estado_inicial && layer.getSource) {
            const source = layer.getSource();
            if (source && typeof source.refresh === 'function') {
                setTimeout(() => source.refresh(), 100);
            }
        }
        
        console.log(`Layer ${layerConfig.nombre_display}: visibility=${layerConfig.estado_inicial}, actual=${layer.getVisible()}, opacity=${layer.getOpacity()}`);
    }
    
    return layer;
};

/**
 * Create dynamic layer groups from API data
 */
const createDynamicLayerGroups = async (project) => {
    if (!project || !project.layer_groups) {
        return {};
    }

    const layerGroups = {};
    
    for (const group of project.layer_groups) {
        const groupLayers = [];
        
        if (group.layers && Array.isArray(group.layers)) {
            for (const layerConfig of group.layers) {
                const layer = createDynamicWMSLayer(layerConfig);
                if (layer) {
                    // Ensure layer is properly configured
                    layer.setVisible(layerConfig.estado_inicial);
                    groupLayers.push(layer);
                }
            }
        }
        
        if (groupLayers.length > 0) {
            const groupName = group.nombre_display || group.nombre || `Group ${group.id}`;
            const groupLayer = new GroupLayer({
                title: groupName,
                name: groupName,
                layers: groupLayers,
                visible: true // Group should be visible, individual layers control their own visibility
            });
            
            // Ensure the group layer is properly configured
            groupLayer.setVisible(true);
            
            // Debug: log the group and its layers
            console.log(`Created group "${groupName}" with ${groupLayers.length} layers`);
            groupLayers.forEach((layer, idx) => {
                console.log(`  - Layer ${idx}: ${layer.get('title')} (visible: ${layer.getVisible()})`);
            });
            
            // Use unique key to avoid overwriting groups with same name
            const uniqueKey = `${groupName}_${group.id}`;
            layerGroups[uniqueKey] = groupLayer;
        }
    }
    
    return layerGroups;
};

// Static base layers (always needed)
export var mpios = wmsLayer('Capas_Base', 'mpio_politico', 'Municipios', true, '');
export var deptos = wmsLayer('Capas_Base', 'dpto_politico', 'Departamentos', true, '');

/**
 * Main function to get all project layers dynamically
 */
const getProjectLayers = async () => {
    try {
        // Initialize project configuration
        const project = await initializeProject();
        const baseLayers = createBaseLayers(project);
        const dynamicGroups = await createDynamicLayerGroups(project);
        
        console.log('Dynamic groups created:', Object.keys(dynamicGroups));
        
        // Create array of GroupLayer instances for OpenLayers compatibility
        const dynamicGroupLayers = Object.values(dynamicGroups).filter(group => group instanceof GroupLayer);
        
        const layerGroups = [
            // Base layers (always present) - at bottom
            createBaseLayerGroup(baseLayers),
            createDivisionLayerGroup(),
            
            // Dynamic project-specific layers (only GroupLayer instances) - in middle
            ...dynamicGroupLayers,
            
            // Selection layers (VectorLayers) - on top
            highlight,
            highlightPoint,
            highlightStadistics
        ];
        
        // Set proper z-index for layer ordering and check for visible layers
        let hasVisibleLayers = false;
        layerGroups.forEach((layer, index) => {
            if (layer && typeof layer.setZIndex === 'function') {
                layer.setZIndex(index);
            }
            
            // Check for visible layers and force refresh
            if (layer && typeof layer.getLayers === 'function') {
                const sublayers = layer.getLayers().getArray();
                sublayers.forEach(sublayer => {
                    if (sublayer.getVisible()) {
                        hasVisibleLayers = true;
                        console.log(`Found visible layer: ${sublayer.get('title')} - will refresh source`);
                        
                        if (sublayer.getSource) {
                            const source = sublayer.getSource();
                            if (source && typeof source.refresh === 'function') {
                                setTimeout(() => {
                                    source.refresh();
                                    console.log(`Refreshed source for: ${sublayer.get('title')}`);
                                }, 300);
                            }
                        }
                    }
                });
            }
        });
        
        console.log(`Layer initialization complete. Has visible layers: ${hasVisibleLayers}`);
        
        // Debug layer visibility
        layerGroups.forEach((group, index) => {
            if (group && typeof group.getLayers === 'function') {
                const layers = group.getLayers().getArray();
                console.log(`Group ${index} (${group.get('title') || 'unnamed'}): ${layers.length} layers`);
                layers.forEach((layer, layerIndex) => {
                    console.log(`  Layer ${layerIndex}: ${layer.get('title') || layer.get('name')} - visible: ${layer.getVisible()}`);
                });
            }
        });
        
        // Also return as object for backward compatibility
        return {
            // Base layers (always present)
            layer_base: createBaseLayerGroup(baseLayers),
            division_base: createDivisionLayerGroup(),
            
            // Dynamic project-specific layers
            ...dynamicGroups,
            
            // Selection layers (always present)
            highlight,
            highlightPoint,
            highlightStadistics,
            
            // Array format for OpenLayers
            _layerArray: layerGroups
        };
    } catch (error) {
        console.error('Error loading project layers:', error);
        return getFallbackLayers();
    }
};

/**
 * Create base layer group
 */
const createBaseLayerGroup = (baseLayers) => {
    return new GroupLayer({
        fold: 'close',
        title: 'Capas Base',
        layers: Object.values(baseLayers),
        name: 'Capas Base'
    });
};

/**
 * Create division layer group
 */
const createDivisionLayerGroup = () => {
    return new GroupLayer({
        fold: 'close',
        title: 'División político-administrativa',
        layers: [deptos, mpios],
        name: 'División político-administrativa'
    });
};

/**
 * Fallback layers when API is not available
 */
const getFallbackLayers = () => {
    const baseLayers = createBaseLayers(null);
    return {
        layer_base: createBaseLayerGroup(baseLayers),
        division_base: createDivisionLayerGroup(),
        highlight,
        highlightPoint,
        highlightStadistics
    };
};
// Export the main function to get project layers
export { getProjectLayers };

// Export legacy variables for backward compatibility (will be populated dynamically)
export let proyecto = 'general';
export let streetmap = null;
export let CartoDB_Positron = null;

// Legacy layer group exports (populated dynamically)
export let layer_base = null;
export let division_base = null;
export let historicos = null;
export let fondo_adaptacion = null;
export let proyecto_oleoducto_bicentenario = null;
export let conservacion_biodiversidad = null;
export let gobernanza = null;
export let restauracion = null;
export let gefpar = null;
export let comp_preservacion = null;
export let comp_restauracion = null;
export let comp_uso_sostenible = null;
export let inv1_preservacion = null;
export let inv1_restauracion = null;
export let inv1_uso_sostenible = null;
export let invv_preservacion = null;
export let invv_restauracion = null;
export let invv_uso_sostenible = null;
export let san_antero4 = null;
export let san_antero5 = null;
export let san_antero6 = null;
export let san_antero7 = null;
export let san_antero8 = null;
export let san_antero9 = null;

/**
 * Initialize and populate legacy exports for backward compatibility
 */
export const initializeLegacyExports = async () => {
    try {
        const layers = await getProjectLayers();
        const project = currentProject || { nombre_corto: 'general' };
        
        // Update legacy exports
        proyecto = project.nombre_corto;
        
        // Base layers
        const baseLayers = createBaseLayers(project);
        streetmap = baseLayers.streetmap;
        CartoDB_Positron = baseLayers.cartodb_positron;
        
        // Layer groups
        layer_base = layers.layer_base;
        division_base = layers.division_base;
        
        // Assign dynamic groups to legacy exports based on project type
        Object.keys(layers).forEach(key => {
            if (key.startsWith('historicos')) historicos = layers[key];
            if (key.startsWith('fondo_adaptacion')) fondo_adaptacion = layers[key];
            if (key.startsWith('proyecto_oleoducto')) proyecto_oleoducto_bicentenario = layers[key];
            if (key.startsWith('conservacion')) conservacion_biodiversidad = layers[key];
            if (key.startsWith('gobernanza')) gobernanza = layers[key];
            if (key.startsWith('restauracion')) restauracion = layers[key];
            if (key.startsWith('gef')) gefpar = layers[key];
            if (key.startsWith('preservacion')) comp_preservacion = layers[key];
            if (key.startsWith('comp_restauracion')) comp_restauracion = layers[key];
            if (key.startsWith('uso_sostenible')) comp_uso_sostenible = layers[key];
        });
        
        console.log('Legacy layer exports initialized');
        return layers;
    } catch (error) {
        console.error('Error initializing legacy exports:', error);
        return getFallbackLayers();
    }
};

export var feats = (data) => {
    return new VectorSource({
        features: (new GeoJSON()).readFeatures(data)
    });
}
// hightlight the selection
export const hightlightAdd = (feature, type) => {
    type == 'point' ? highlightPoint.getSource().addFeature(feature) : highlight.getSource().addFeature(feature);
}
// remove the selection
export const hightlightRemove = () => {
    highlightPoint.getSource().clear();
    highlight.getSource().clear();
}
// hightlight the feat selection
export const highlightStadisticsAdd = (feature) => { highlightStadistics.getSource().addFeature(feature); }
// remove the feat selection
export const highlightStadisticsRemove = () => { highlightStadistics.getSource().clear(); }
