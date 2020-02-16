import React from 'react';
import { withTranslation } from 'react-i18next';
import './footer.scss';
import { TFunction } from 'i18next';

interface IProps {
    t: TFunction;
}

const Footer = ({ t }: IProps) => (
    <footer>
        <div className="wrapper">
            <div className="sticky-content">
                <a href="#content-container" id="scroll-top" title="Scroll to top"><i className="fa fa-angle-double-up" aria-hidden="true"></i></a>
                <p id="copyright">&copy; {t('footer.copyright')} 2020 ABC</p>
            </div>
            <div className="links-container">
                <div className="row">
                    <div className="sub-title">
                    {t('footer.aboutAbc')}
                    </div>
                    <a href="#" target="_blank">About Us</a>
                    <a href="#" target="_blank">Contact Us</a>
                    <a href="#" target="_blank">Sitemap</a>
                    <a href="#" target="_blank">Offers</a>
                    <a href="#" target="_blank">Careers</a>
                </div>
                <div className="row">
                    <div className="sub-title">
                    {t('footer.info')}
                    </div>

                    <a href="#" target="_blank">FAQ</a>
                    <a href="#" target="_blank">Privacy Policy</a>
                    <a href="#" target="_blank">Terms</a>
                    <a href="#" target="_blank">Conditions</a>
                </div>
                <div className="row">
                    <div className="sub-title">
                    {t('footer.bookings')}
                    </div>

                    <a href="#" target="_blank">FAQ</a>
                    <a href="#" target="_blank">Privacy Policy</a>
                    <a href="#" target="_blank">Terms</a>
                    <a href="#" target="_blank">Conditions</a>
                </div>
                <div className="row">
                    <div className="sub-title">
                    {t('footer.otherInfo')}
                    </div>

                    <a href="#" target="_blank">FAQ</a>
                    <a href="#" target="_blank">Privacy Policy</a>
                    <a href="#" target="_blank">Terms</a>
                    <a href="#" target="_blank">Conditions</a>
                </div>
                </div>
        </div>
    </footer>
);

export default withTranslation()(Footer);