/**
 * Figma API Service
 * 
 * This service provides methods to interact with the Figma API.
 * 
 * Setup Instructions:
 * 1. Get your Figma Personal Access Token:
 *    - Go to Figma Settings > Account > Personal Access Tokens
 *    - Generate a new token
 * 
 * 2. Get your Figma File Key:
 *    - Open your Figma file
 *    - The file key is in the URL: https://www.figma.com/file/{FILE_KEY}/...
 * 
 * 3. Add to your .env file:
 *    VITE_FIGMA_ACCESS_TOKEN=your_token_here
 *    VITE_FIGMA_FILE_KEY=your_file_key_here
 */

const FIGMA_API_BASE = 'https://api.figma.com/v1';

/**
 * Get Figma access token from environment variables
 */
const getAccessToken = () => {
  const token = import.meta.env.VITE_FIGMA_ACCESS_TOKEN;
  if (!token) {
    console.warn('Figma access token not found. Please set VITE_FIGMA_ACCESS_TOKEN in your .env file');
  }
  return token;
};

/**
 * Make authenticated request to Figma API
 */
const figmaRequest = async (endpoint, options = {}) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('Figma access token is required');
  }

  const response = await fetch(`${FIGMA_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'X-Figma-Token': token,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`Figma API Error: ${error.message || response.statusText}`);
  }

  return response.json();
};

/**
 * Get file metadata
 * @param {string} fileKey - Figma file key
 * @returns {Promise<Object>} File metadata
 */
export const getFile = async (fileKey) => {
  return figmaRequest(`/files/${fileKey}`);
};

/**
 * Get file nodes (specific parts of the file)
 * @param {string} fileKey - Figma file key
 * @param {string[]} nodeIds - Array of node IDs to retrieve
 * @returns {Promise<Object>} Node data
 */
export const getFileNodes = async (fileKey, nodeIds) => {
  const ids = Array.isArray(nodeIds) ? nodeIds.join(',') : nodeIds;
  return figmaRequest(`/files/${fileKey}/nodes?ids=${ids}`);
};

/**
 * Get images from Figma file
 * @param {string} fileKey - Figma file key
 * @param {string[]} nodeIds - Array of node IDs to export as images
 * @param {Object} options - Export options (format, scale)
 * @returns {Promise<Object>} Image URLs
 */
export const getFileImages = async (fileKey, nodeIds, options = {}) => {
  const ids = Array.isArray(nodeIds) ? nodeIds.join(',') : nodeIds;
  const format = options.format || 'png';
  const scale = options.scale || 1;
  
  return figmaRequest(`/images/${fileKey}?ids=${ids}&format=${format}&scale=${scale}`);
};

/**
 * Get comments from a file
 * @param {string} fileKey - Figma file key
 * @returns {Promise<Object>} Comments data
 */
export const getFileComments = async (fileKey) => {
  return figmaRequest(`/files/${fileKey}/comments`);
};

/**
 * Get team projects
 * @param {string} teamId - Figma team ID
 * @returns {Promise<Object>} Projects data
 */
export const getTeamProjects = async (teamId) => {
  return figmaRequest(`/teams/${teamId}/projects`);
};

/**
 * Get project files
 * @param {string} projectId - Figma project ID
 * @returns {Promise<Object>} Files data
 */
export const getProjectFiles = async (projectId) => {
  return figmaRequest(`/projects/${projectId}/files`);
};

/**
 * Get component sets and components
 * @param {string} fileKey - Figma file key
 * @returns {Promise<Object>} Components data
 */
export const getFileComponents = async (fileKey) => {
  return figmaRequest(`/files/${fileKey}`);
};

/**
 * Helper function to extract design tokens from Figma
 * This is a basic implementation - you may need to customize based on your Figma structure
 */
export const extractDesignTokens = async (fileKey) => {
  try {
    const file = await getFile(fileKey);
    const tokens = {
      colors: {},
      typography: {},
      spacing: {},
      shadows: {},
    };

    // Traverse the file structure to extract tokens
    // This is a simplified example - customize based on your Figma structure
    const traverseNodes = (node) => {
      if (node.type === 'TEXT' && node.style) {
        // Extract typography tokens
        const fontFamily = node.style.fontFamily;
        const fontSize = node.style.fontSize;
        const fontWeight = node.style.fontWeight;
        
        if (!tokens.typography[fontFamily]) {
          tokens.typography[fontFamily] = {};
        }
        tokens.typography[fontFamily][`${fontSize}px`] = {
          fontSize: `${fontSize}px`,
          fontWeight: fontWeight,
        };
      }

      if (node.fills && Array.isArray(node.fills)) {
        // Extract color tokens
        node.fills.forEach((fill) => {
          if (fill.type === 'SOLID' && fill.color) {
            const color = `rgb(${Math.round(fill.color.r * 255)}, ${Math.round(fill.color.g * 255)}, ${Math.round(fill.color.b * 255)})`;
            tokens.colors[node.name || 'unnamed'] = color;
          }
        });
      }

      if (node.children) {
        node.children.forEach(traverseNodes);
      }
    };

    if (file.document) {
      traverseNodes(file.document);
    }

    return tokens;
  } catch (error) {
    console.error('Error extracting design tokens:', error);
    throw error;
  }
};

export default {
  getFile,
  getFileNodes,
  getFileImages,
  getFileComments,
  getTeamProjects,
  getProjectFiles,
  getFileComponents,
  extractDesignTokens,
};
