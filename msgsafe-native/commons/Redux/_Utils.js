import PropTypes from 'prop-types'
import { path } from 'ramda'

/**
 * Misc redux utilities.
 */

/**
 * A factory for extracting commonly used values from redux store.
 *
 * @param state
 * @param reduxSliceKey
 */
export const getCommonListReduxValues = (state, reduxSliceKey) => ({
  data: state[reduxSliceKey].data,
  dataOrder: state[reduxSliceKey].dataOrder,
  dataTotalCount: state[reduxSliceKey].dataTotalCount,

  searchResultsData: state[reduxSliceKey].searchResultsData,
  searchResultsDataOrder: state[reduxSliceKey].searchResultsDataOrder,
  searchResultsDataTotalCount: state[reduxSliceKey].searchResultsDataTotalCount,

  dataFetchInProgress: state[reduxSliceKey].dataRequestInProgress,
  dataFetchSuccessful: state[reduxSliceKey].dataRequestSuccessful,
  dataFetchError: state[reduxSliceKey].dataRequestError,

  isRefreshing: state[reduxSliceKey].isRefreshing,
  isPaginating: state[reduxSliceKey].isPaginating,
  isSearching: state[reduxSliceKey].isSearching,

  searchQuery: state[reduxSliceKey].searchQuery
})

/**
 * Declares the propTypes for the values generated by getCommonListReduxValues above.
 */
export const commonListReduxValueProps = {
  data: PropTypes.object,
  dataOrder: PropTypes.array,
  dataTotalCount: PropTypes.number,

  searchResultsData: PropTypes.object,
  searchResultsDataOrder: PropTypes.array,
  searchResultsDataTotalCount: PropTypes.number,

  dataFetchInProgress: PropTypes.bool,
  dataFetchSuccessful: PropTypes.bool,
  dataFetchError: PropTypes.object,

  isRefreshing: PropTypes.bool,
  isPaginating: PropTypes.bool,
  isSearching: PropTypes.bool,

  searchQuery: PropTypes.string
}

/**
 * Returns an object with currently relevant data – i.e. search data if it is
 * available otherwise the regular values.
 *
 * View can use this helper function to get the relevant data from redux store
 * and not worry about search data.
 *
 * @param storeSlice
 * @returns {{data: *, dataOrder: *, dataTotalCount: *, isSearchData: *}}
 */
export const getActiveDataFromStoreSlice = (storeSlice) => {
  const {
    data, dataOrder, dataTotalCount,
    searchResultsData, searchResultsDataOrder, searchResultsDataTotalCount
  } = storeSlice

  const isSearchDataAvailable = searchResultsData && searchResultsDataOrder

  if (isSearchDataAvailable) {
    return {
      data: searchResultsData,
      dataOrder: searchResultsDataOrder,
      dataTotalCount: searchResultsDataTotalCount,
      isSearchData: isSearchDataAvailable
    }
  }
  return {
    data, dataOrder, dataTotalCount, isSearchData: isSearchDataAvailable
  }
}

export const getDataItemForId = (storeSlice, id, cacheId) => (
  path(['searchResultsData', id], storeSlice) ||
  path(['data', id], storeSlice) ||
  path(['cache', id], storeSlice) ||
  path(['cache', cacheId], storeSlice)
)

export const getDataItemForIdWithCacheFirst = (storeSlice, id, cacheId) => (
  path(['cache', id], storeSlice) ||
  path(['cache', cacheId], storeSlice) ||
  path(['searchResultsData', id], storeSlice) ||
  path(['data', id], storeSlice)
)
