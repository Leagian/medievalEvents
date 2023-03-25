import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import { DataContext } from "../context/EventContext";

function SearchEvents() {
  const { dataEvents } = useContext(DataContext);

  const [searchText, setSearchText] = useState([]);

  const handleSearch = ({ target }) => {
    setSearchText(target.value);
  };

  return (
    <div className="SearchEvents--global">
      <div className="SearchEvents--container">
        <input
          id="searchBar"
          name="searchBar"
          type="text"
          placeholder="Recherche..."
          value={searchText}
          onChange={handleSearch}
        />
        <div className="SearchEvents--icon">
          <AiOutlineSearch />
        </div>
        <div className="SearchEvents--datas">
          {dataEvents
            .filter((val) => val.titre.toLowerCase().includes(searchText))
            .map((val) => (
              <div className="SearchEvents--general" key={val.id}>
                <Link to={`/events/${val.id}`}>
                  <img src={val.image} alt={val.titre} />
                </Link>
                <h1>{val.titre}</h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchEvents;
