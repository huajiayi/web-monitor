import proxy from './config/proxy';
import routes from './config/routes';
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  proxy,
  fastRefresh: {},
  // mfsu: {}
});
