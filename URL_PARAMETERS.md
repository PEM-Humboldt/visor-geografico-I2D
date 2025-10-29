# URL Parameters for Layer Loading

## Overview

The application now supports automatic layer loading via URL parameters, similar to the production site functionality at `https://i2d.humboldt.org.co/visor-I2D/?capa=aicas`.

## Usage

### Project Selection

To switch to a specific project, use the `proyecto` parameter:

```
http://localhost:1234/?proyecto=general       # General project (default)
http://localhost:1234/?proyecto=ecoreservas   # Ecoreservas project  
http://localhost:1234/?proyecto=ecopetrol     # Ecopetrol project
```

### Basic Layer Loading

To load a specific layer automatically when the map loads, add the `capa` parameter to the URL:

```
http://localhost:1234/?capa=aicas
http://localhost:1234/?capa=bosque_seco_tropical
http://localhost:1234/?capa=Humedales
```

### Combined Parameters

You can combine project and layer parameters:

```
http://localhost:1234/?proyecto=ecoreservas&capa=layer_name
http://localhost:1234/?proyecto=general&capa=aicas
```

### Available Layer Names

Layer names can be either:
1. **GeoServer names** (from `nombre_geoserver` field): `aicas`, `bosque_seco_tropical`, `Humedales`, etc.
2. **Display names** (from `nombre_display` field): `AICAS`, `Bosque Seco Tropical 2014`, etc.

## Development/Debug Features

When running in development mode (`localhost`), the following debug features are available:

### Debug Button
A "Debug Layers" button appears in the top-right corner that shows all available layers and their names for URL parameter usage.

### Console Functions
- `testLayer('layername')` - Test activating a specific layer
- `findLayers('search_term')` - Find layers matching a search term

## Implementation Details

### Files Modified/Added:
- `src/components/utils/urlParams.js` - Main URL parameter handling logic
- `src/components/utils/debugLayers.js` - Debug utilities
- `src/components/mapComponent/map.js` - Integration with map initialization
- `src/components/server/geoserver/wms.js` - Enhanced layer properties

### Key Features:
1. **Automatic Layer Activation**: Layers specified in URL are automatically loaded and made visible
2. **URL Sync**: When layers are toggled via UI, URL is updated accordingly
3. **Bidirectional Sync**: URL changes reflect in layer visibility and vice versa
4. **Fallback Support**: Works with both GeoServer names and display names
5. **Debug Support**: Development tools to identify available layer names

### API Integration:
The system works with the dynamic layer loading API at `/api/projects/1/layers/` and supports all layers returned by this endpoint.

## Examples

### Production-like URLs:
- `http://localhost:1234/?capa=aicas` - Load AICAS layer (general project)
- `http://localhost:1234/?proyecto=ecoreservas` - Switch to Ecoreservas project
- `http://localhost:1234/?proyecto=ecoreservas&capa=layer_name` - Ecoreservas with specific layer
- `http://localhost:1234/?capa=bosque_seco_tropical` - Load Bosque Seco Tropical layer
- `http://localhost:1234/?capa=Humedales` - Load Humedales layer

### Testing:
1. Open browser console
2. Type `findLayers('bosque')` to find layers containing "bosque"
3. Use `testLayer('aicas')` to test loading the AICAS layer
4. Click "Debug Layers" button to see all available layers

## Error Handling

- Invalid layer names are logged as warnings
- Failed activations return false and log errors
- System gracefully handles missing layers
- Circular import issues resolved through dynamic imports

## Browser Compatibility

- Uses `URLSearchParams` API (supported in all modern browsers)
- Uses `window.history.pushState` for URL updates without page reload
- Compatible with ES6+ module systems