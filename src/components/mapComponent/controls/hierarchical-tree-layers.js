import $ from "jquery";
import { closeTutorialOnStep4 } from "../../tutorialComponent/tutorial";
import logoi2d from "../../../assets/legend/ecoreservas.png";

// Get proyecto from URL params instead of importing from layers
const urlParams = new URLSearchParams(window.location.search);
const proyecto = urlParams.get('proyecto') || 'general';

/**
 * Hierarchical Layer Tree Builder
 * Renders layer groups from API with full hierarchical support
 */

let AllLayers = [];
let layerIndex = 0;

/**
 * Build hierarchical layer tree from API data
 * @param {Object} projectData - Project data from API with layer_groups
 * @param {Object} layerGroup - OpenLayers layer group
 */
export function buildHierarchicalLayerTree(projectData, layerGroup) {
  const accordion = document.getElementById("accordion");
  if (!accordion) {
    console.error("Accordion element not found");
    return;
  }

  // Clear existing content
  accordion.innerHTML = "";
  AllLayers = [];
  layerIndex = 0;

  // Add close button
  addCloseButton(accordion);

  // First, render base layer groups from OpenLayers (Capas Base, División político-administrativa)
  renderBaseLayers(layerGroup, accordion);

  // Then render hierarchical groups from API
  const topLevelGroups = projectData.layer_groups.filter(
    (group) => group.parent_group === null
  );

  // Sort by orden
  topLevelGroups.sort((a, b) => a.orden - b.orden);

  // Render each top-level group
  topLevelGroups.forEach((group, index) => {
    renderLayerGroup(group, accordion, layerGroup, `group_${index}`, 0);
  });

  // Show accordion for ecoreservas
  if (proyecto === "ecoreservas") {
    accordion.className = "d-block";
  }

  console.log(`Built hierarchical tree with ${AllLayers.length} layers`);
}

/**
 * Render base layer groups (Capas Base, División político-administrativa)
 * These are the first groups in the OpenLayers layer array
 */
function renderBaseLayers(layerGroup, accordion) {
  if (!layerGroup || typeof layerGroup.getLayers !== "function") {
    console.warn("Invalid layerGroup for base layers");
    return;
  }

  const layers = layerGroup.getLayers().getArray();

  // Always render the first 2 groups (Capas Base, División político-administrativa)
  // These are created in layers.js and are always present
  for (let i = 0; i < Math.min(2, layers.length); i++) {
    const group = layers[i];

    if (!group || typeof group.getLayers !== "function") {
      console.warn("Skipping invalid base layer group:", group);
      continue;
    }

    const groupName = group.get("title") || group.get("name") || `Group ${i}`;
    console.log(`Rendering base layer group ${i}: ${groupName}`);
    renderBaseLayerGroup(group, accordion, i, groupName);
  }
}

/**
 * Render a base layer group (non-hierarchical, from OpenLayers)
 */
function renderBaseLayerGroup(group, accordion, index, groupName) {
  const card = document.createElement("div");
  card.className = "card overflow-auto";
  card.id = `capas${index}`;
  accordion.appendChild(card);

  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  card.appendChild(cardHeader);

  const cardLink = document.createElement("a");
  cardLink.className = "btn btn-link";
  cardLink.setAttribute("href", "#");
  cardLink.setAttribute("data-toggle", "collapse");
  cardLink.setAttribute("aria-expanded", "true");
  cardLink.setAttribute("data-target", `#collapse${index}`);
  cardLink.innerHTML = groupName;
  cardHeader.appendChild(cardLink);

  const collapseDiv = document.createElement("div");
  collapseDiv.id = `collapse${index}`;
  collapseDiv.className = "collapse";
  collapseDiv.setAttribute("aria-labelledby", `#collapse${index}`);
  collapseDiv.setAttribute("data-parent", "#accordion");
  card.appendChild(collapseDiv);

  // Render layers in this group
  const sublayers = group.getLayers().getArray();
  sublayers.forEach((layer, j) => {
    renderBaseLayer(layer, collapseDiv, j, index);
  });
}

/**
 * Render a base layer (from OpenLayers group)
 */
function renderBaseLayer(layer, parentElement, layerIndex, groupIndex) {
  const subname = layer.get("name");

  const cardBody = document.createElement("div");
  cardBody.className = "card-body-layers";
  parentElement.appendChild(cardBody);

  const formCheck = document.createElement("div");
  formCheck.className = "form-check";
  cardBody.appendChild(formCheck);

  const checkbox = document.createElement("input");
  checkbox.className = "form-check-input layers-input";
  checkbox.setAttribute("type", "checkbox");
  checkbox.id = subname;

  // Disable dpto_politico checkbox if it's the first layer
  if (layerIndex === 0 && subname === "dpto_politico") {
    checkbox.disabled = true;
  }

  checkbox.checked = layer.getVisible();

  checkbox.onclick = function (ev) {
    cleanHighlights(ev);
    const isVisible = ev.target.checked;
    layer.setVisible(isVisible);

    // Sync with URL parameters for base layers too
    const layerName = layer.get('name') || layer.get('geoserverName');
    if (isVisible && layerName) {
      import('../../utils/urlParams').then(({ setURLParam }) => {
        setURLParam('capa', layerName);
      }).catch(err => console.error('Error setting URL param:', err));
    } else if (!isVisible && layerName) {
      import('../../utils/urlParams').then(({ getURLParam, removeURLParam }) => {
        const currentCapa = getURLParam('capa');
        if (currentCapa === layerName) {
          removeURLParam('capa');
        }
      }).catch(err => console.error('Error removing URL param:', err));
    }

    console.log(`Base layer ${layer.get("title")} visibility set to: ${isVisible}`);
  };

  formCheck.appendChild(checkbox);

  const label = document.createElement("label");
  label.className = "form-check-label";
  label.setAttribute("for", "defaultCheck1");
  label.innerHTML = layer.get("title") || layer.get("name");
  formCheck.appendChild(label);

  // Add download link if available
  const urldownload = layer.get("urldownload");
  if (urldownload && urldownload !== "") {
    const downloadLink = document.createElement("div");
    downloadLink.innerHTML = '<i class="fas fa-link"></i>';
    downloadLink.className = "card-link float-right";
    downloadLink.setAttribute("onclick", `window.open("${urldownload}")`);
    formCheck.appendChild(downloadLink);
  }

  // Store layer reference (skip first group index 0)
  if (groupIndex !== 0) {
    AllLayers[AllLayers.length] = layer;
  }
}

/**
 * Add close button to accordion
 */
function addCloseButton(accordion) {
  const closeCard = document.createElement("div");
  closeCard.className = "card overflow-auto";
  closeCard.id = "capas_close";
  accordion.appendChild(closeCard);

  const closeHeader = document.createElement("div");
  closeHeader.className = "card-header";
  closeCard.appendChild(closeHeader);

  const closeButton = document.createElement("a");
  closeButton.className = "card-link float-right";
  closeButton.setAttribute("data-toggle", "collapse");
  closeButton.setAttribute(
    "style",
    "position:absolute; right:8px; color: rgb(42, 71, 80)"
  );
  closeButton.setAttribute("href", "#");
  closeButton.onclick = () => {
    document.getElementById("accordion").className = "d-none";
  };
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  closeHeader.appendChild(closeButton);
}

/**
 * Render a layer group and its subgroups/layers recursively
 * @param {Object} group - Layer group data from API
 * @param {HTMLElement} parentElement - Parent DOM element
 * @param {Object} layerGroup - OpenLayers layer group
 * @param {string} groupId - Unique ID for this group
 * @param {number} level - Nesting level (0 = top level)
 */
function renderLayerGroup(group, parentElement, layerGroup, groupId, level = 0) {
  // Create card for this group
  const card = document.createElement("div");
  card.className = "card overflow-auto";
  card.id = `combined_${groupId}`;
  parentElement.appendChild(card);

  // Create header - don't add bg-warning/bg-success classes, use color from API
  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  // Apply color as background color for the entire header
  const groupColor = group.color || '#e3e3e3';
  cardHeader.style.cssText = `background-color: ${groupColor} !important;`;

  card.appendChild(cardHeader);

  // Create collapse link
  const cardLink = document.createElement("a");
  cardLink.className = "btn btn-link";
  cardLink.setAttribute("href", "#");
  cardLink.setAttribute("data-toggle", "collapse");
  cardLink.setAttribute("aria-expanded", group.fold_state === "open");
  cardLink.setAttribute("data-target", `#collapse_${groupId}`);
  cardLink.innerHTML = group.nombre;

  // Style for top-level groups
  if (level === 0) {
    cardLink.style.fontWeight = "bold";
    cardLink.style.textDecoration = "underline";
    cardLink.style.fontStyle = "italic";
  }

  cardHeader.appendChild(cardLink);

  // Create collapse container
  const collapseDiv = document.createElement("div");
  collapseDiv.id = `collapse_${groupId}`;
  collapseDiv.className = `collapse ${group.fold_state === "open" ? "show" : ""}`;
  collapseDiv.setAttribute("aria-labelledby", `#collapse_${groupId}`);
  collapseDiv.setAttribute("data-parent", `#${parentElement.id}`);
  card.appendChild(collapseDiv);

  // Render subgroups first
  if (group.subgroups && group.subgroups.length > 0) {
    group.subgroups.sort((a, b) => a.orden - b.orden);
    group.subgroups.forEach((subgroup, index) => {
      renderLayerGroup(
        subgroup,
        collapseDiv,
        layerGroup,
        `${groupId}_sub_${index}`,
        level + 1
      );
    });
  }

  // Render layers for this group
  if (group.layers && group.layers.length > 0) {
    group.layers.sort((a, b) => a.orden - b.orden);
    group.layers.forEach((layerData) => {
      renderLayer(layerData, collapseDiv, layerGroup);
    });
  }
}

/**
 * Get header class based on nesting level
 */
function getHeaderClass(level) {
  switch (level) {
    case 0:
      return "bg-warning"; // Top level - yellow/warning
    case 1:
      return "bg-success"; // Second level - green
    case 2:
      return ""; // Third level - default
    default:
      return ""; // Deeper levels - default
  }
}

/**
 * Render an individual layer
 * @param {Object} layerData - Layer data from API
 * @param {HTMLElement} parentElement - Parent DOM element
 * @param {Object} layerGroup - OpenLayers layer group
 */
function renderLayer(layerData, parentElement, layerGroup) {
  const cardBody = document.createElement("div");
  cardBody.className = "card-body-layers";
  parentElement.appendChild(cardBody);

  const formCheck = document.createElement("div");
  formCheck.className = "form-check";
  cardBody.appendChild(formCheck);

  // Create checkbox
  const checkbox = document.createElement("input");
  checkbox.className = "form-check-input layers-input";
  checkbox.setAttribute("type", "checkbox");
  checkbox.id = layerData.nombre_geoserver;
  checkbox.checked = layerData.estado_inicial;

  // Find the actual OpenLayers layer
  const olLayer = findLayerByName(layerGroup, layerData.nombre_geoserver);

  if (olLayer) {
    // Set initial visibility
    olLayer.setVisible(layerData.estado_inicial);

    // Add click handler with URL parameter sync
    checkbox.onclick = function (ev) {
      cleanHighlights(ev);
      const isVisible = ev.target.checked;
      olLayer.setVisible(isVisible);

      // Sync with URL parameters
      const geoserverName = layerData.nombre_geoserver;
      if (isVisible) {
        // Dynamically import to avoid circular dependencies
        import('../../utils/urlParams').then(({ setURLParam }) => {
          setURLParam('capa', geoserverName);
        }).catch(err => console.error('Error setting URL param:', err));
      } else {
        // Remove URL parameter if this was the active layer
        import('../../utils/urlParams').then(({ getURLParam, removeURLParam }) => {
          const currentCapa = getURLParam('capa');
          if (currentCapa === geoserverName) {
            removeURLParam('capa');
          }
        }).catch(err => console.error('Error removing URL param:', err));
      }

      console.log(
        `Layer ${layerData.nombre_display} visibility set to: ${isVisible}`
      );
    };

    // Store layer reference
    AllLayers[layerIndex] = olLayer;
    layerIndex++;
  } else {
    console.warn(`Layer not found in OpenLayers: ${layerData.nombre_geoserver}`);
  }

  formCheck.appendChild(checkbox);

  // Create label
  const label = document.createElement("label");
  label.className = "form-check-label";
  label.setAttribute("for", layerData.nombre_geoserver);
  label.innerHTML = layerData.nombre_display;
  formCheck.appendChild(label);

  // Add metadata link if available
  if (layerData.metadata_id) {
    const metadataLink = document.createElement("div");
    metadataLink.innerHTML = '<i class="fas fa-link"></i>';
    metadataLink.className = "card-link float-right";
    metadataLink.setAttribute(
      "onclick",
      `window.open("https://geonetwork.humboldt.org.co/geonetwork/srv/spa/catalog.search#/metadata/${layerData.metadata_id}")`
    );
    formCheck.appendChild(metadataLink);
  }

  // Add logo for ecoreservas
  if (proyecto === "ecoreservas") {
    const logoDiv = document.createElement("div");
    const image = document.createElement("img");
    image.src = logoi2d;
    logoDiv.appendChild(image);
    formCheck.appendChild(logoDiv);
  }
}

/**
 * Find layer by name in OpenLayers layer group
 */
function findLayerByName(layerGroup, name) {
  if (!layerGroup || typeof layerGroup.getLayers !== "function") {
    return null;
  }

  const layers = layerGroup.getLayers().getArray();

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];

    // Check if this layer matches
    if (layer.get("name") === name || layer.get("geoserverName") === name) {
      return layer;
    }

    // Check sublayers if this is a group
    if (typeof layer.getLayers === "function") {
      const sublayers = layer.getLayers().getArray();
      for (let j = 0; j < sublayers.length; j++) {
        const sublayer = sublayers[j];
        if (sublayer.get("name") === name || sublayer.get("geoserverName") === name) {
          return sublayer;
        }
      }
    }
  }

  return null;
}

/**
 * Find layer by property
 */
export function findBy(layer, key, value) {
  if (layer.get(key) === value) {
    return layer;
  }
  if (layer.getLayers) {
    const layers = layer.getLayers().getArray();
    for (let i = 0; i < layers.length; i++) {
      const result = findBy(layers[i], key, value);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

/**
 * Clean highlights when layer is toggled
 */
function cleanHighlights(ev) {
  if (ev.target.id === "mpio_politico") {
    $("#nav-chart").attr("style", "display:none");
    $("#layers-data-tab").tab("show");
    $("#nav-layers").attr("style", "display:block");

    // Try to call highlight removal functions if they exist globally
    if (window.hightlightRemove) {
      window.hightlightRemove();
    }
    if (window.highlightStadisticsRemove) {
      window.highlightStadisticsRemove();
    }
  }
}

// Control layer visibility
$("#ControlCapas").on("click", function () {
  document.getElementById("accordion").className = "d-block";
  closeTutorialOnStep4();
});

export const AllLayerss = AllLayers;
