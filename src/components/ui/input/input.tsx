import React from 'react';

interface IProps {
    name : string;
    value? : string | number;
    type : string;
    placeholder : string;
    min? : number;
    max? : number;
    required : boolean;
    options?: any[];
    fieldName?: string;
    title: string;
    handleChange?: (data: any) => void;
}

export const Input = (props: IProps) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name} className="form-label">{props.title}</label>
            {props.type !== 'textarea' && <input
                className="form-input"
                id={props.name}
                name={props.name}
                type={props.type}
                value={props.value}
                {...( props.type === 'number' && { min: props.min, max: props.max} ) }
                {...( props.type === 'text' && { minlength: props.min, maxlength: props.max} ) }
                onChange={props.handleChange}
                placeholder={props.placeholder}
                required={props.required || false}    
            />
            }
            {props.type === 'textarea' && <textarea
                className="form-input"
                id={props.name}
                minLength={props.min}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
                required={props.required || false}    
            />
            }
        </div>
    )
}