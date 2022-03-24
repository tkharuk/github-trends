import { Table, Anchor, Button } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";

import AppLoader from "components/AppLoader";
import { useGithubTrends, useFavoriteRepos } from "./api";

const TrendingReposTable = () => {
  const { data, isFetching } = useGithubTrends();

  if (isFetching) return <AppLoader />;

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

  const isFavoriteRepo = data?.includes(id.toString());
  const favoritedIcon = isFavoriteRepo ? "♥" : "♡";

  return (
    <Button compact variant="outline">
      {favoritedIcon}
    </Button>
  );
};

export default TrendingReposTable;
