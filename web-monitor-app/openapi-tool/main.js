const OpenApiTool = require('openapi-tool');
const { resolve } = require('path');

const url = 'http://localhost:8081/api/v3/api-docs';
const outputDir = resolve(__dirname, 'services');

const openApiTool = new OpenApiTool({url});
openApiTool.generateService({
  template: 'umi-request',
  // importText: `const axios = require('axios');`,
  typescript: true,
  outputDir,
});