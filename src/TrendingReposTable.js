import { Table, Anchor, Button, LoadingOverlay } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";

import {
  useGithubTrends,
  useFavoriteRepos,
  useToggleRepoToFavorites,
} from "./api";

const TrendingReposTable = ({ filters }) => {
  const { data, isFetching } = useGithubTrends({ filters });

  if (isFetching) return <LoadingOverlay visible />;

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Stars</th>
          <th>Open issues</th>
          <th>Last update</th>
          <th>License</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {data?.items.map((repo) => (
          <tr key={repo.id}>
            <td>
              <Anchor href={repo.html_url} target="_blank">
                {repo.name}
              </Anchor>
              {repo.archived && " (archived)"}
            </td>
            <td>{repo.stargazers_count}</td>
            <td>{repo.open_issues_count}</td>
            <td>{formatDistanceToNow(new Date(repo.pushed_at))}</td>
            <td>{repo.license?.name}</td>
            <td>
              <FavoriteRepoCell id={repo.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const FavoriteRepoCell = ({ id }) => {
  const { data } = useFavoriteRepos();
  const { mutate: toggleFavoriteRepo } = useToggleRepoToFavorites();

  const isFavoriteRepo = data?.includes(id);
  const favoritedIcon = isFavoriteRepo ? "♥" : "♡";

  const handleClick = () => {
    toggleFavoriteRepo({ id });
  };

  return (
    <Button compact variant="outline" onClick={handleClick}>
      {favoritedIcon}
    </Button>
  );
};

export default TrendingReposTable;
