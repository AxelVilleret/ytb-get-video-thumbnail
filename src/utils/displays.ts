const getViewsDisplay = (views: number) => {
    if (views < 1000) {
        return views.toString();
    } else if (views < 1000000) {
        return Math.floor(views / 1000) + ' k';
    } else {
        return Math.floor(views / 1000000) + ' M';
    }
};

const getDaysSincePublishedDisplay = (days: number) => {
    let display = 'Il y a ';
    if (days < 1) {
        display = 'Aujourd\'hui';
    } else if (days < 2) {
        display += '1 jour';
    } else {
        display += days + ' jours';
    }
    return display;
}

export const getStatsDisplay = (views: number, days: number) => {
    return getViewsDisplay(views) + ' vues • ' + getDaysSincePublishedDisplay(days);
}