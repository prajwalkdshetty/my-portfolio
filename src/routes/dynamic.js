
import React from 'react';
import Loadable from 'react-loadable';

export const AsyncDetails = Loadable({  
    loader: () => import(/* webpackChunkName: "details" */ '../components/modules/details/details'),
    loading: () => <div>loading...</div>,
    modules: ['Details']
});
export const AsyncConfirmation = Loadable({  
    loader: () => import(/* webpackChunkName: "confirmation" */ '../components/modules/confirmation/confirmation'),
    loading: () => <div>loading...</div>,
    modules: ['Confirmation']
});
export const AsyncAdmin = Loadable({  
    loader: () => import(/* webpackChunkName: "admin" */ '../components/modules/admin/admin'),
    loading: () => <div>loading...</div>,
    modules: ['Admin']
});
export const AsyncAdd = Loadable({  
    loader: () => import(/* webpackChunkName: "addItems" */ '../components/modules/admin/add-items/add-items'),
    loading: () => <div>loading...</div>,
    modules: ['AddItems']
});
export const AsyncRemove = Loadable({  
    loader: () => import(/* webpackChunkName: "removeItems" */ '../components/modules/admin/remove-items/remove-items'),
    loading: () => <div>loading...</div>,
    modules: ['RemoveItems']
});