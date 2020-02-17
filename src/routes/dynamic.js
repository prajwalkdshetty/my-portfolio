
import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../components/common/loader/loader';

export const AsyncDetails = Loadable({  
    loader: () => import(/* webpackChunkName: "details" */ '../components/modules/details/details'),
    loading: () => <Loader />,
    modules: ['Details']
});
export const AsyncConfirmation = Loadable({  
    loader: () => import(/* webpackChunkName: "confirmation" */ '../components/modules/confirmation/confirmation'),
    loading: () => <Loader />,
    modules: ['Confirmation']
});
export const AsyncAdmin = Loadable({  
    loader: () => import(/* webpackChunkName: "admin" */ '../components/modules/admin/admin'),
    loading: () => <Loader />,
    modules: ['Admin']
});
export const AsyncAdd = Loadable({  
    loader: () => import(/* webpackChunkName: "addItems" */ '../components/modules/admin/add-items/add-items'),
    loading: () => <Loader />,
    modules: ['AddItems']
});
export const AsyncRemove = Loadable({  
    loader: () => import(/* webpackChunkName: "removeItems" */ '../components/modules/admin/remove-items/remove-items'),
    loading: () => <Loader />,
    modules: ['RemoveItems']
});