export const FiltersData = {
    distance: {
        from: 1,
        to: 10000,
    },
    rating: [
        { label: '4.5+', value: 4.5},
        { label: '4+', value: 4},
        { label: '3.5+', value: 3.5},
        { label: '3+', value: 3},
        { label: '2.5+', value: 2.5},
        { label: '2+', value: 2}
    ],
    price_category: [
        { label: 'High', value: 'high'},
        { label: 'Medium', value: 'medium'},
        { label: 'Low', value: 'low'}
    ],
    amenities: [
        { iconName :'car', label: 'Free Parking', value: 'free_parking' },
        { iconName :'wifi', label: 'Free Wifi', value: 'free_wifi'},
        { iconName :'shower', label: 'Spa', value: 'free_breakfast'},
        { iconName :'wifi', label: 'Restaurant', value: 'restaurant'},
        { iconName :'paw', label: 'Pets', value: 'pets'},
        { iconName :'gavel', label: 'Gym', value: 'gym'},
        { iconName :'bath', label: 'Pool', value: 'pool'},
        { iconName :'shower', label: 'Spa', value: 'spa'}
    ],
    sortBy: [
        { label: 'priceLtoH', value: 'price_category_a'},
        { label: 'priceHtoL', value: 'price_category_d'},
        { label: 'topRated', value: 'rating'},
        { label: 'distance', value: 'distance_to_venue'},
    ],
    language: [
        { label: 'English', value: 'en'},
        { label: 'German', value: 'de'}
    ]
}