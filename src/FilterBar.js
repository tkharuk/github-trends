import { Paper, Switch } from "@mantine/core";

const FilterBar = ({ onChange }) => {
  const handleChange = (e) => {
    onChange({
      onlyFavorite: e.target.checked,
    });
  };

  return (
    <Paper p="md">
      <Switch label="Only favorites" onChange={handleChange} />
    </Paper>
  );
};

export default FilterBar;
