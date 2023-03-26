import { createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import storage from '@/utils/storage.js'


const modulesFiles = import.meta.glob('./modules/*/index.js', { eager: true });

const modules = Object.keys(modulesFiles).reduce(
    (modules, path) => {
        const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
        modules[moduleName.split('/')[1]] = modulesFiles[path]?.default
        return modules
    }, {}
);

let modulesKey  = '';
if(process.env.NODE_ENV === 'development'){
    let obj = {...actions,...modules};
    for(let key in obj){
        modulesKey+=key+','
    };
    storage.setItem('modulesKey',modulesKey);
};
console.log(modules)
const store = createStore({
    modules:{modules},
    state: {
        name: 'allen',
        // modulesKey:storage.getItem('modulesKey') || modulesKey,
    },
    mutations,
    actions,
    getters: {}
})

export default store
