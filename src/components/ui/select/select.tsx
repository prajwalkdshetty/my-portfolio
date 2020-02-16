import React from 'react';
import { TFunction } from 'i18next';

interface IProps {
    t?: TFunction;
    tObj? : string;
    name : string;
    selected? : string;
    required? : boolean;
    options?: any[];
    fieldName?: string;
    title: string;
    handleChange: (data: any) => void;
    hideLabel?: boolean;
    selectText?: string;
}


export const Select = (props: IProps) => {
    return (
        <div className="form-group">
            { (props.hideLabel !== true) && <label htmlFor={props.name} className="form-label">{props.title}</label>}
            <select
                className="form-select"
                id={props.name}
                name={props.name}
                value={props.selected}
                onChange={props.handleChange}
                required={props.required || false}    
            >
                { props.selectText && <option value="">{props.selectText}</option> }
                {
                    props.options.map((data: any) => (
                        <option key={data.value} value={data.value}>{props.t ? props.t(props.tObj+'.'+data.label) : data.label}</option>
                    ))}
            </select>
        </div>
    )
}