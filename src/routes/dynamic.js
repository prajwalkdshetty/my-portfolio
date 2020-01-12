
import React from 'react';
import Loadable from 'react-loadable';
export const AsyncContact = Loadable({
    loader: () => import(/* webpackChunkName: "contact" */ './../components/modules/contact/Contact'),
    loading: () => <div>loading...</div>,
    modules: ['Contact']
});