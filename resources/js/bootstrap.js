import axios from 'axios';
import * as coreui from '@coreui/coreui-pro'
window.axios = axios;
window.coreui = coreui
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import '@coreui/utils/dist/umd/index'
import 'simplebar';
import './color-modes';
import './colors';
import './config';
import './popovers';
import './toasts';
import './tooltips';
