/**
 * Project Service - Handles dynamic project loading from backend API
 * Integrates with HU-VisorI2D-0001 project management system
 */

const API_BASE_URL = (typeof process !== 'undefined' && process.env && process.env.PYTHONSERVER)
    ? process.env.PYTHONSERVER.replace(/\/+$/, '')
    : 'http://localhost:8001/api';

class ProjectService {
    constructor() {
        this.currentProject = null;
        this.cache = new Map();
        this.initialized = false;
    }

    /**
     * Load project configuration by short name
     * @param {string} projectName - Short name of the project
     * @returns {Promise<Object>} Project configuration
     */
    async loadProject(projectName = 'general') {
        // Check cache first
        if (this.cache.has(projectName)) {
            this.currentProject = this.cache.get(projectName);
            return this.currentProject;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/projects/by-name/${projectName}/`);

            if (!response.ok) {
                console.warn(`Project '${projectName}' not found, using fallback`);
                return this.getFallbackProject(projectName);
            }

            const projectData = await response.json();

            // Cache the project data
            this.cache.set(projectName, projectData);
            this.currentProject = projectData;

            console.log(`Project loaded: ${projectData.nombre}`);
            return projectData;
        } catch (error) {
            console.error('Error loading project from API:', error);
            // Fallback to hardcoded project if API fails
            return this.getFallbackProject(projectName);
        }
    }

    /**
     * Get project name from URL parameters
     * @returns {string} Project name from URL or 'general' as default
     */
    getProjectNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);

        // Check for proyecto parameter
        if (urlParams.has('proyecto')) {
            return urlParams.get('proyecto');
        }

        // Check for legacy URL format
        if (window.location.href.includes("proyecto=ecoreservas")) {
            return 'ecoreservas';
        }

        return 'general';
    }

    /**
     * Initialize project and update UI elements
     * @returns {Promise<Object>} Project configuration
     */
    async initializeProject() {
        if (this.initialized) {
            return this.currentProject;
        }

        const projectName = this.getProjectNameFromURL();
        const project = await this.loadProject(projectName);

        // Update project-specific UI elements
        this.updateProjectUI(project);

        this.initialized = true;
        return project;
    }

    /**
     * Update project-specific UI elements (logos, etc.)
     * @param {Object} project - Project configuration
     */
    updateProjectUI(project) {
        // Handle ecoreservas specific UI
        if (project.nombre_corto === 'ecoreservas') {
            const logoEcoP = document.getElementById("logo_eco_p");
            const logoEcoG = document.getElementById("logo_eco_g");

            if (logoEcoP) logoEcoP.style.display = "inline-block";
            if (logoEcoG) logoEcoG.style.display = "inline-block";
        }

        // Handle custom logos if provided
        if (project.logo_pequeno_url) {
            const smallLogo = document.querySelector('.logo-small');
            if (smallLogo) smallLogo.src = project.logo_pequeno_url;
        }

        if (project.logo_completo_url) {
            const largeLogo = document.querySelector('.logo-large');
            if (largeLogo) largeLogo.src = project.logo_completo_url;
        }
    }

    /**
     * Get current project configuration
     * @returns {Object} Current project configuration
     */
    getCurrentProject() {
        return this.currentProject || this.getFallbackProject('general');
    }

    /**
     * Get map configuration for current project
     * @returns {Object} Map configuration with center, zoom, and layers
     */
    getMapConfig() {
        const project = this.getCurrentProject();
        return {
            center: [project.coordenada_central_x, project.coordenada_central_y],
            zoom: project.nivel_zoom,
            panelVisible: project.panel_visible !== false
        };
    }

    /**
     * Get layer groups for current project
     * @returns {Array} Array of layer group configurations
     */
    getProjectLayerGroups() {
        const project = this.getCurrentProject();
        return project.layer_groups || [];
    }

    /**
     * Get default layers that should be visible on load
     * @returns {Array} Array of default layer configurations
     */
    getDefaultLayers() {
        const project = this.getCurrentProject();
        return project.default_layers || [];
    }

    /**
     * Get fallback project configuration when API is unavailable
     * @param {string} projectName - Project name to get fallback for
     * @returns {Object} Fallback project configuration
     */
    getFallbackProject(projectName = 'general') {
        const fallbackProjects = {
            general: {
                id: 1,
                nombre_corto: 'general',
                nombre: 'Visor General I2D',
                nivel_zoom: 6.0,
                coordenada_central_x: -8113332,
                coordenada_central_y: 464737,
                panel_visible: true,
                base_map_visible: 'streetmap',
                layer_groups: [],
                default_layers: []
            },
            ecoreservas: {
                id: 2,
                nombre_corto: 'ecoreservas',
                nombre: 'Ecoreservas',
                nivel_zoom: 9.2,
                coordenada_central_x: -8249332,
                coordenada_central_y: 544737,
                panel_visible: true,
                base_map_visible: 'cartodb_positron',
                layer_groups: [],
                default_layers: []
            }
        };

        console.log(`Using fallback project: ${projectName}`);
        return fallbackProjects[projectName] || fallbackProjects.general;
    }

    /**
     * Check if project management is available
     * @returns {Promise<boolean>} True if backend API is available
     */
    async isProjectManagementAvailable() {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/`, {
                method: 'HEAD'
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

// Create singleton instance
const projectService = new ProjectService();

export default projectService;
