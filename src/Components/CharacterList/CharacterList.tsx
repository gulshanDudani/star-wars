import { CellContext, PaginationState } from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../Common/Table";
import { useGetCharacterList } from "../../Hooks/useGetCharacterList/useGetCharacterList";
import "./CharacterList.css"; 
const CharacterList = () => {
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();

  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }: CellContext<Record<string, any>, string>) => {
          const { id, name } = row.original;
          return (
            <button className="character-name-btn" onClick={() => navigate(`details/${id}`)}>
              {name}
            </button>
          );
        },
      },
      { header: "Gender", accessorKey: "gender", id: "gender" },
      { header: "Home Planet", accessorKey: "homePlanet", id: "homePlanet" },
    ],
    []
  );

  const { data, isLoading, isError } = useGetCharacterList(pagination, searchText);

  useEffect(() => {
    if (searchText === "") {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  }, [searchText]);

  const handleSearchTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div className="error">Error occurred. Please try again later.</div>;
  }

  return (
    <div className="character-list-container">
      <div className="search-container">
        <label htmlFor="search">Search : </label>
        <input
          id="search"
          type="text"
          value={searchText}
          onChange={handleSearchTextChanged}
          placeholder="Search by name"
        />
      </div>

      <Table
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        data={data}
      />

    </div>
  );
};

export default CharacterList;
