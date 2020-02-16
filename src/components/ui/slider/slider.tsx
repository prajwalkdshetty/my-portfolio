import React, { FormEvent } from 'react';
import './slider.scss';
import { TFunction } from 'i18next';

interface IProps {
    t?: TFunction;
    tObj? : string;
    name : string;
    min: number;
    value: number;
    max:number;
    fieldName?: string;
    handleChange: (data: any) => void;
}
const Slider = (props: IProps) => {
    const toText = props.t ? props.t(props.tObj + '.to') : 'to';
    return (
        <div className="slidecontainer">
            <input type="range"
                data-field-name={props.fieldName}
                id={props.name}
                value={undefined}
                name={props.name}
                className="slider"
                min={props.min} max={props.max}
                onChange={e => sliderChange(e, props)} />
            <div>0 {toText} <span className="max-value">{props.value}</span></div>
        </div>
    )
}
const sliderChange = (e: FormEvent, props: IProps) => {
    const node: any = e.target;
    node.parentNode.getElementsByClassName('max-value')[0].innerHTML = node.value;
    props.handleChange(e);
}
export default Slider;