import { FC, useState, useEffect } from "react";
import { useBeerQuery, useBearQueryWithPage } from "../hooks/api";
import { useStore } from "../Store";
import { PER_PAGE } from "../utils/Constants";
import { GridLoader } from "react-spinners";
import { motion } from "framer-motion";
import GridScreen from "../components/GridScreen";
import BilledMembers from "../components/BilledMembers";

const LandingPage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    if (totalBeers && totalBeers.length > 0) {
      setPageCount(Math.floor(totalBeers.length / PER_PAGE));
    }
  }, [totalBeers]);

  useEffect(() => {
    refetchPage();
  }, [currPage, filter]);

  useEffect(() => {
    setBeers(pageItems);
  }, [pageItems]);

  return (
    <div className="wrapper">
      {/* Title */}
      <motion.div
        initial={{ x: "-50%", opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          textShadow: "0px 0px 8px rgb(229, 184, 11)",
        }}
        transition={{
          duration: 1.5,
          delay: 0.2,
          type: "spring",
          stiffness: 60,
        }}
        className="heading"
      >
        BEER SHOP
      </motion.div>
      {/* /Title */}

      {/* Filter */}
      <div className="filter-box">
        <p className="filter-label">Show beers ABV above 8</p>
        <input
          data-cy="filterToggle"
          type="checkbox"
          checked={filter}
          onChange={(e) => setFilter(e.target.checked)}
          id="filter-check"
          className="toggle-checkbox"
        />
        <motion.label
          whileHover={{ scale: 1.2 }}
          htmlFor="filter-check"
          className="toggle-label"
        ></motion.label>
      </div>
      {/* /Filter */}

      {/* BEERS */}
      {isLoading ? (
        <div className="loader">
          <GridLoader color="blue" />
        </div>
      ) : (
        <GridScreen data={beers} />
      )}
      {/* /BEERS */}

      {/* Pages */}
      <div className="pagination-box">
        <div style={filter ? { color: "green" } : { color: "blueviolet" }}>
          {filter ? "showing items ABV above 8" : "showing items ABV below 8"}
        </div>
        <div className="button-box">
          <motion.button
            className="page-btn"
            disabled={currPage === 1}
            onClick={() => setCurrPage(currPage - 1)}
            whileHover={{ scale: 1.1 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width="16px"
              height="16px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
          </motion.button>
          <p>{currPage}</p>
          <motion.button
            className="page-btn"
            disabled={currPage === totalPages}
            onClick={() => setCurrPage(currPage + 1)}
            whileHover={{ scale: 1.1 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width="16px"
              height="16px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </motion.button>
        </div>
      </div>
      {/* /Pages */}

      <button className="members-btn" onClick={() => setIsOpen(true)}>
        Members Should Be Billed..!
      </button>

      {isOpen && (
        <div className="modal">
          <BilledMembers setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
