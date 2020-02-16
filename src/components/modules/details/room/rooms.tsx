import React, { Component, MouseEvent } from 'react';
import './rooms.scss';
import Occupency from '../../../common/occupency/occupency';
import { TFunction } from 'i18next';
import { Room } from '../../../../models/data.model';
import { withTranslation } from 'react-i18next';

interface IProps {
    t: TFunction;
    roomDetails: Room;
    index: number;
    book: (data: Room) => void;
}

class Rooms extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        const { roomDetails, t } = this.props;
        return (
            <div className="rooms-list box">
                <div className="rooms-col-1">
                    <h4>
                        {roomDetails.name}
                    </h4>
                    <div className="occupency"><Occupency noOfPersons={roomDetails.max_occupancy} /></div>
                    <p className="desc">
                        {roomDetails.description}
                        {
                            this.props.index < 2 && 
                            <span className="more" onClick={this.showMore} title={t('showMore')}>{t('showMore')}</span>
                        }
                    </p>
                </div>
                <div className="rooms-col-2">
                    <div className="title">{t('details.price')}</div><div className="value">${roomDetails.price_in_usd}</div>
                    <button onClick={() => this.props.book(roomDetails)} title={t('details.bookNow')}
                        role="button" className="button button-1">{t('details.bookNow')}</button>
                </div>
            </div>
        );
    }

    showMore(event: MouseEvent): void {
        const element = event.target as HTMLElement;
        const pNode = element.parentNode as HTMLElement;
        if (pNode.classList.contains("expanded")) {
            pNode.classList.remove('expanded');
            element.textContent = this.props.t('showMore');
        } else {
            pNode.classList.add('expanded');
            element.textContent = this.props.t('hideMore');;
        }
    }
}

export default withTranslation()<any>(Rooms);
