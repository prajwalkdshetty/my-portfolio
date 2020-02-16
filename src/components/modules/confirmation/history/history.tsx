import React, { Component } from 'react';
import './history.scss';
import { api } from '../../../../api/api';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { BookingInfo } from '../../../../models/data.model';

interface IProps {
    t: TFunction;
    userId: string;
    showAllBooking: boolean;
}
interface IState {
    bookings: BookingInfo[];
}

class History extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            bookings: []
        }
    }
    render() {
        const { bookings } = this.state;
        const { t } = this.props;
        return (
            <div id="history-container">
                <h4>{t('history.bookingHistory')}</h4>
                <span id="totalBooking">{t('history.totalBookings')}: {bookings.length}</span>
                <div className="bookings-container">
                    {bookings.map(data => (
                        <div key={data.id} className="history-list">
                            <h5 className="capitalize">{data.hotelName}</h5>
                            <div className="booking-details">
                                <div className="booking-date">{t('history.bookingDate')}: {data.bookingDate}</div>
                                <div>{t('history.location')}: {data.location}</div>
                            </div>
                            <button className="button button-2 not-allowed" title={t('history.viewDetails')} role="button">{t('history.viewDetails')}</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    componentDidMount() {
        api.get('bookings').then(({ data }: { data: BookingInfo[] }) => {
            localStorage.setItem("history-" + this.props.userId, JSON.stringify(data));
            if (!this.props.showAllBooking) {
                data.pop();
            }
            this.setState({
                bookings: data
            });
        }).catch(() => {
            const history = localStorage.getItem("history-" + this.props.userId);
            if (history) {
                this.setState({
                    ...this.state,
                    bookings: JSON.parse(history)
                });
            }
        });
    }
}

export default withTranslation()<any>(History);