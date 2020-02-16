import React, { Component } from 'react';
import './confirmation.scss';
import History from './history/history';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { TFunction } from 'i18next';
import { Hotel, Room, User, BookingInfo } from '../../../models/data.model';
import { AppState } from '../../../models/action.model';
import { withTranslation } from 'react-i18next';

interface IProps {
    t: TFunction;
    hotel: Hotel;
    room: Room;
    user: User;
    bookingInfo: BookingInfo;
    match: {
        params: {
            userId: string;
        }
    }
}
interface IState {
    showConfirmationMessage: boolean;
    userId: string;
}

interface IStoreState {
    app: AppState
}
class Confirmation extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        if (sessionStorage.getItem("navigatedFromDetails")) {
            sessionStorage.removeItem("navigatedFromDetails");
            this.state = { showConfirmationMessage: true, userId: this.props.match.params.userId };
        } else {
            this.state = { showConfirmationMessage: false, userId: this.props.match.params.userId };
        }
    }
    render() {
        const { hotel, room, user, bookingInfo, t } = this.props;
        return (
            <div id="confirmation-container" className="wrapper app-spacing app-offset">
                {this.state.showConfirmationMessage && <div id="confirmation-details" className="box">
                    <h2>{t('confirm.congrats')} <b className="capitalize">{hotel.name}</b> {t('confirm.confirmed')}</h2>

                    <h3>{t('confirm.bookingDetails')}</h3>
                    <div id="details">
                        <div className="label">{t('confirm.hotel')}</div><div className="value capitalize">{bookingInfo.hotelName}</div>
                        <div className="label">{t('confirm.name')}</div><div className="value">{user.firstname} {user.lastname}</div>
                        <div className="label">{t('confirm.roomType')}</div><div className="value">{room.name}</div>
                        <div className="label">{t('confirm.bookingNumber')}</div><div className="value">{bookingInfo.bookingNumber}</div>
                        <div className="label">{t('confirm.bookingNights')}</div><div className="value">{bookingInfo.nights}</div>
                        <div className="label">{t('confirm.checkIn')}</div><div className="value">{bookingInfo.checkIn}</div>
                        <div className="label">{t('confirm.checkOut')}</div><div className="value">{bookingInfo.checkOut}</div>
                        <div className="label">{t('confirm.price')}</div><div className="value">{bookingInfo.price}</div>
                    </div>

                    <p className="details-messages"><i className="fa fa-check"></i>
                        <span>{t('confirm.emailSent')} <b>{user.email}.</b></span>
                    </p>
                    <p className="details-messages"><i className="fa fa-check"></i>
                        <span>{t('confirm.amendIn')} <b>{t('confirm.myBooking')}</b> {t('confirm.section')}.</span>
                    </p>
                    <div className="text-right confirmation-buttons">
                        <button className="button button-1" role="button" title={t('confirm.print')} onClick={window.print}>{t('confirm.print')}</button>
                        <button className="button button-1 not-allowed" role="button" title={t('confirm.modify')}>{t('confirm.modify')}</button>
                    </div>
                </div>
                }
                <div className="box"><History userId={this.state.userId} showAllBooking={!this.state.showConfirmationMessage} /></div>
            </div>
        );
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        hotel: state.app.selectedHotel,
        user: state.app.user,
        room: state.app.roomSelected,
        bookingInfo: state.app.bookingInfo
    }
};

export default withRouter(connect(mapStateToProps)(withTranslation()<any>(Confirmation)));
