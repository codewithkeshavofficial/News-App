import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Loader from "./Loader";
import moment from "moment";
import {} from 'fontawesome'

const News = () => {
  //States

  const [selectedCategory, setSelectedCategory] = useState("general");
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(12);
  const [offsetForPrev, setOffsetForPrev] = useState(0);

  //api call for categorized news

  const getCatNews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}=${process.env.REACT_APP_API}&categories=${
          !selectedCategory ? "general" : selectedCategory
        }&countires=in&languages=en&limit=12&source=cnn`
      );
      setArticle(data.data);
      console.log(article);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    getCatNews();
    // eslint-disable-next-line
  }, [selectedCategory, setSelectedCategory]);

  //functions

  //handling next button
  const handleNext = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}=${process.env.REACT_APP_API}&categories=${
          !selectedCategory ? "general" : selectedCategory
        }&countires=in&languages=en&limit=12&offset=${offset}&source=cnn`
      );
      setArticle(data.data);
      setOffset(data?.pagination?.offset + 12);
      setOffsetForPrev(data?.pagination?.offset - 12);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  //handling prev button
  const handlePrev = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}=${process.env.REACT_APP_API}&categories=${
          !selectedCategory ? "general" : selectedCategory
        }&countires=in&languages=en&limit=12&offset=${offsetForPrev}&source=cnn`
      );
      setArticle(data.data);
      setOffsetForPrev(data?.pagination?.offset - 12);
      setOffset(data?.pagination?.offset + 12);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  return (
    <>
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="row mt-3">
          <h3 className="text-center" style={{textDecoration: 'underline', textShadow: '2px -1px'}}>News-Monk <br />{selectedCategory.toLocaleUpperCase()}</h3>
        <div className="col-md-12 d-flex flex-wrap justify-content-evenly">
          {loading ? (
            <div className="d-flex align-items-center justify-content-center">
              <Loader />
              
            </div>
          ) : (
            article?.map((e, i) => (
              <div key={i} className="col-md-3 m-3 content">
                <div className="card">
                  <span className="badge rounded-pill bg-danger">
                    {e.source}
                  </span>

                  <img
                    className="card-img"
                    height={"300px"}
                    src={
                      e.image === null || !e.image
                        ? "https://media.istockphoto.com/id/1300930548/video/breaking-news-template-for-tv-broadcast-news-show-program-with-3d-breaking-news-text-and.jpg?s=640x640&k=20&c=V9q9-UaoDqmhg7mKbOL4QMGAjWKJy0DBf1Mp61i7JkQ="
                        : e.image
                    }
                    alt="Oops! No Thumbnail Available"
                  />
                  <div className="d-flex justify-content-between">
                    <span className="m-2">By:- {!e.author ? e.source.toUpperCase() : e.author.toUpperCase()}</span>
                    <span className="m-2">{moment(e.published_at).fromNow()}</span>

                  </div>
                  <div>
                    <h5 className="text-center text-success mt-2">
                      {e.title.slice(0, 60)}...
                    </h5>
                    <p className="text-dark mt-2 p-2">
                      {e.description.slice(0, 60)}...
                    </p>
                  </div>
                   <a className="btn btn-outline-primary" target="_blank" rel="noreferrer" href={e.url}>Read Full Article</a>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="d-flex justify-content-around mt-2 mb-2">
          <button
            hidden={loading}
            onClick={handlePrev}
            style={{ borderRadius: "5px" }}
            className="btn btn-warning p-2 text-dark"
          >
            Prev
          </button>
          <button
            hidden={loading}
            onClick={handleNext}
            style={{ borderRadius: "5px" }}
            className="btn btn-success p-2 text-dark"
          >
            Next
          </button>
          
        </div>
      </div>
    </>
  );
};

export default News;
