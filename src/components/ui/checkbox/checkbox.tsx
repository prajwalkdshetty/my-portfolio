import React from 'react';
import './checkbox.scss';
import { TFunction } from 'i18next';

interface IProps {
    t?: TFunction;
    tObj? : string;
    title?: string;
    hideLabel?: boolean;
    options?: any[];
    fieldName?: string;
    handleChange: (data: any) => void
    selectedOptions?: any[]
}

export const Checkbox = (props: IProps) => {
    return (
        <div className="form-group">
            {!props.hideLabel && <label htmlFor={props.title} className="form-label">{props.title}</label>}
            <div className="checkbox-group">
                {props.options && props.options.map(option => { 
                const label = props.t? props.t(props.tObj+'.'+option.value) : option.label;
                    return (
                        <label key={option.value} className="checkbox-label" title={label}>
                            <input
                                className="form-checkbox"
                                id={option.value}
                                name={option.value}
                                data-field-name={props.fieldName}
                                onChange={(e) => props.handleChange(e)}
                                checked={props.selectedOptions && props.selectedOptions.indexOf(option.value) > -1}
                                type="checkbox"
                            />
                            {label}
                        </label>
                    );
                })}
            </div>
        </div>
    );
}