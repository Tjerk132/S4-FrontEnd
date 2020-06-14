export default class SearchLogic {

    removeFromSearchHistory(historyItem, historyItems) {
            
        historyItems = chechExistingHistory(historyItems);

        //remove historyItem
        let index = historyItems.indexOf(historyItem);
        historyItems.splice(index, 1);

        return historyItems;
    }
    
    chechExistingHistory(historyItems) {
        return historyItems = undefined ? [] : historyItems;
    }
}