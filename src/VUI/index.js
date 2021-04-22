import Copy from './components/Copy';
import Transfer from './components/Transfer';

const components = {
  Copy,
  Transfer
};

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    const component = components[key];
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components
};
