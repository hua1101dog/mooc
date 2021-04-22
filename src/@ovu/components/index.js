import Vue from 'vue';

import Hamburger from './Hamburger';
import SizeSelect from './SizeSelect';
import HeaderSearch from './HeaderSearch';
import Pagination from './Pagination';
import Screenfull from './Screenfull';
import VTable from './VTable';
import VTreeTable from './VTreeTable';
import VTreeSelect from './VTreeSelect';

import ErrorLog from './ErrorLog';
import RightPanel from './RightPanel';

const components = {
  Hamburger,
  HeaderSearch,
  SizeSelect,
  Pagination,
  Screenfull,
  VTable,
  VTreeTable,
  VTreeSelect,
  ErrorLog,
  RightPanel
  
};

Object.keys(components).forEach(component => {
  Vue.component(component, components[component]);
});
