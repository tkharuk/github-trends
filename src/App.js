import { useState } from "react";
import { Container } from "@mantine/core";

import FilterBar from "./FilterBar";
import TrendingReposTable from "./TrendingReposTable";

function App() {
  const [filters, setFilters] = useState({
    onlyFavorite: false,
  });

  return (
    <Container fluid>
      <FilterBar onChange={setFilters} />
      <TrendingReposTable filters={filters} />
    </Container>
  );
}

export default App;
