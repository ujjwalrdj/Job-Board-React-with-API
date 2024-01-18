import React from 'react';
import { useEffect, useState } from 'react';
import JobPosting from './JobPosting.js';
import './style.css';

const ITEMS_PER_PAGE = 5;
const API = 'https://hacker-news.firebaseio.com/v0';

export default function App() {
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchJobs = async (currPage) => {
    setCurrentPage(currPage);
    setFetchingDetails(true);

    let itemList = itemIds;
    if (itemIds === null) {
      const response = await fetch(`${API}/jobstories.json`);
      itemList = await response.json();
      setItemIds(itemList);
    }
    const itemIdsForPage = itemList.slice(
      currPage * ITEMS_PER_PAGE,
      currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
    //The Promise.all() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.
    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${API}/item/${itemId}.json`).then((res) => res.json())
      )
    );
    setItems([...items, ...itemsForPage]);
    setFetchingDetails(false);
  };

  const fetchItemsHandler = () => {
    fetchJobs(currentPage + 1);
  };

  useEffect(() => {
    if (currentPage === 0) fetchJobs(currentPage);
  }, []);

  const loader = (
    <section className="dots-container">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </section>
  );

  return (
    <>
      <div className="app">
        <h1>Hacker News Jobs Board</h1>
        {itemIds === null || items.length < 1 ? (
          loader
        ) : (
          <div>
            <div className="items" role="list">
              {items.map((item) => {
                return <JobPosting key={item.id} {...item} />;
              })}
            </div>
            <button
              disabled={fetchingDetails}
              onClick={fetchItemsHandler}
              className="load-more-btn"
            >
              {fetchingDetails ? 'Loading...' : 'Load more jobs'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
