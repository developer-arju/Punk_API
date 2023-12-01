import { FC, useState, useEffect } from "react";
import { useBeerQuery, useBearQueryWithPage } from "../hooks/api";
import { useStore } from "../Store";
import { PER_PAGE } from "../utils/Constants";
import GridScreen from "../components/GridScreen";
import { GridLoader } from "react-spinners";

const LandingPage: FC = () => {
  const [filter, setFilter] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const { beers, totalPages, setBeers, setPageCount } = useStore();
  const { data: totalBeers, refetch } = useBeerQuery(filter);
  const {
    data: pageItems,
    refetch: refetchPage,
    isLoading,
  } = useBearQueryWithPage(currPage, filter);

  useEffect(() => {
    refetch();
  }, [filter]);

  useEffect(() => {
    refetchPage();
  }, [currPage, filter]);

  useEffect(() => {
    if (totalBeers && totalBeers.length > 0) {
      setPageCount(Math.floor(totalBeers.length / PER_PAGE));
    }
  }, [totalBeers]);

  useEffect(() => {
    setBeers(pageItems);
  }, [pageItems]);

  return (
    <div className="wrapper">
      <div className="heading">BEER</div>
      <div className="filter-box">
        <p className="filter-label">Show beers ABV above 8</p>
        <input
          type="checkbox"
          checked={filter}
          onChange={(e) => setFilter(e.target.checked)}
          id="filter-check"
          className="toggle-checkbox"
        />
        <label htmlFor="filter-check" className="toggle-label"></label>
      </div>
      {isLoading ? (
        <div className="loader">
          <GridLoader color="blue" />
        </div>
      ) : (
        <GridScreen data={beers} />
      )}

      <div className="pagination-box">
        <div style={filter ? { color: "green" } : { color: "blueviolet" }}>
          {filter ? "showing items ABV above 8" : "showing items ABV below 8"}
        </div>
        <div className="button-box">
          <button
            disabled={currPage === 1}
            onClick={() => setCurrPage(currPage - 1)}
          >
            -
          </button>
          <p>{currPage}</p>
          <button
            disabled={currPage === totalPages}
            onClick={() => setCurrPage(currPage + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
