import React from 'react'
import styles from "../Homepage/Homepage.module.css"
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';

const SearchBar = (props) => {
  return (
    <form className={styles.topSearch}>
      <div className={styles.one}>
        <div className={styles.iconInput}>
          <SearchIcon />
        </div>
        <input 
          placeholder="Search for Stores, Bus Stops and More....." 
          value={ props.searchedTermForNearby }
          onChange={ (e) => {
            props.setSearchedTermForNearby(e.target.value);
          } }
        />
      </div>

      <div className={styles.two}>
        <div className={styles.iconInput}>
          <FilterAltIcon />
        </div>
        <input placeholder="Apply filters..." />
      </div>

      <div className={styles.three}>
        <div className={styles.iconInput}>
          <SortIcon />
        </div>
        <input placeholder="Sort By" />
      </div>
    </form>
  )
}

export default SearchBar