function removeFromSearchHistory(historyItem, historyItems) {
        
    historyItems = chechExistingHistory(historyItems);

    //remove historyItem
    let index = historyItems.indexOf(historyItem);
    historyItems.splice(index, 1);

    return historyItems;
}

function chechExistingHistory(historyItems) {
    return historyItems = undefined ? [] : historyItems;
}

module.exports = {
    removeFromSearchHistory,
}