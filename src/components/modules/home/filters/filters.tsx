import React, { Component, FormEvent } from 'react';
import './filters.scss';
import Slider from '../../../ui/slider/slider';
import { Checkbox } from '../../../ui/checkbox/checkbox';
import { FiltersData } from '../../../../data/filters-data';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';

interface IProps {
    t: TFunction;
    onFilter: (data: IState) => void;
    childRef: any;
}

interface IState {
    [key: string]: any
    price_category: string[];
    rating: number[];
    amenities: string[];
    distance: number;
    resetSlider: boolean;
}

class Filters extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.state = {
            price_category: [],
            rating: [],
            amenities: [],
            distance: 5000,
            resetSlider: false
        }

    }

    componentDidMount() {
        const { childRef } = this.props;
        childRef(this);
    }

    render() {
        const { t } = this.props;
        return (
            <div id="filter-container" ref="filterContainer">
                <h3 title={t('filter.filters')}>{t('filter.filters')}</h3>
                <div className="fa fa-close close" title={t('close')} onClick={() => this.close()}></div>
                <form onSubmit={this.onFilter}>
                    <div className="filters">
                        <div className="filter-type">
                            <h5 title={t('filter.ratings')}>{t('filter.ratings')}</h5>
                            <div className="filter-items">
                                <Checkbox
                                    fieldName={'rating'}
                                    options={FiltersData.rating}
                                    handleChange={this.handleInputChange}
                                    hideLabel={true}
                                    selectedOptions={this.state.rating}
                                />
                            </div>
                        </div>
                        <div className="filter-type">
                            <h5 title={t('filter.amenities')}>{t('filter.amenities')}</h5>
                            <div className="filter-items">
                                <Checkbox
                                    t={t}
                                    tObj={'filter.amenitiesList'}
                                    fieldName={'amenities'}
                                    options={FiltersData.amenities}
                                    handleChange={this.handleInputChange}
                                    hideLabel={true}
                                    selectedOptions={this.state.amenities}
                                />
                            </div>
                        </div>
                        <div className="filter-type">
                            <h5 title={t('filter.distance')}>{t('filter.distance')}</h5>
                            <div className="filter-items distance-slider">
                                {!this.state.resetSlider &&
                                    <Slider fieldName={'distance'} min={0} max={10000} value={5000} name="distanceRange"
                                        handleChange={(e: FormEvent) => this.handleInputChange(e)}
                                        t={t}
                                        tObj={'filter'} />
                                }
                            </div>
                        </div>
                        <div className="filter-type">
                            <h5 title={t('filter.priceCategory')}>{t('filter.priceCategory')}</h5>
                            <div className="filter-items">
                                <Checkbox
                                    t={t}
                                    tObj={'filter.priceCategoriesList'}
                                    fieldName={'price_category'}
                                    options={FiltersData.price_category}
                                    handleChange={this.handleInputChange}
                                    hideLabel={true}
                                    selectedOptions={this.state.price_category}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="apply-button">
                        <button type="button" className="button button-1" onClick={() => this.reset()} role="button" title={t('filter.reset')}>{t('filter.reset')}</button>
                        <button type="submit" className="button button-1" role="button" title={t('filter.apply')}>{t('filter.apply')}</button>
                    </div>
                </form>
            </div>
        )
    }

    reset(): void {
        this.setState({
            price_category: [],
            rating: [],
            amenities: [],
            distance: 5000,
            resetSlider: true
        });
        setTimeout(() => {
            this.setState({
                resetSlider: false
            });
        }, 0);
    }

    onFilter(e: FormEvent): void {
        e.preventDefault();
        this.props.onFilter(this.state);
        this.close();
    }

    modifyFilterData(event: FormEvent, fieldName: any, format = 'string'): void {
        let data = [...this.state[fieldName]];
        const target = (event.target as HTMLInputElement);
        let name = target.name;
        if (target.checked) {
            data.push(format === 'number' ? +name : name);
        } else {
            const index = data.findIndex(data => data === name);
            data.splice(index, 1);
        }
        this.setState({
            [fieldName]: data
        });
    }

    handleInputChange(event: FormEvent): void {
        const filterType = (event.target as HTMLInputElement).dataset.fieldName;
        switch (filterType) {
            case 'price_category':
                this.modifyFilterData(event, 'price_category');
                break;
            case 'rating':
                this.modifyFilterData(event, 'rating', 'number');
                break;
            case 'amenities':
                this.modifyFilterData(event, 'amenities');
                break;
            case 'distance':
                this.setState({
                    distance: + (event.target as HTMLInputElement).value
                });
                break;
            default:
        }
    }

    close(): void {
        (this.refs.filterContainer as HTMLElement).classList.remove('open');
        (document.body as HTMLElement).classList.remove('scroll-hidden');
        (document.getElementById('overlay') as HTMLElement).classList.remove("showOnFilter");
    }

    toggleFilter(): void {
        const filterClass = (this.refs.filterContainer as HTMLElement).classList;
        if (filterClass.contains('open')) {
            this.close();
        } else {
            filterClass.add('open');
            (document.getElementById('overlay') as HTMLElement).classList.add("showOnFilter");
            (document.body as HTMLElement).classList.add('scroll-hidden');
        }
    }
}

export default withTranslation()<any>(Filters);