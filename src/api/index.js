import { QueryClient, useMutation, useQuery } from "react-query";
import { subDays } from "date-fns";

const LS_FAVORITES_KEY = "favoriteRepos";

export const queryClient = new QueryClient();

export const useGithubTrends = ({ filters }) => {
  return useQuery(["githubTrends", { filters }], async () => {
    const wtd = subDays(new Date(), 7).toISOString();

    const url = "https://api.github.com/search/repositories";

    const params = new URLSearchParams({
      q: `created:>${wtd}`,
      sort: "stars",
      order: "desc",
    });

    const res = await fetch(`${url}?${params}`);
    const data = await res.json();

    // if not for localstorage, would be a param in api request
    if (filters.onlyFavorite) {
      const favorites = getFromLS(LS_FAVORITES_KEY);
      const onlyFavoriteRepos = data?.items.filter((repo) => {
        return favorites.includes(repo.id);
      });

      return { items: onlyFavoriteRepos };
    }

    return data;
  });
};

// FAVORITE / UNFAVORITE
export const useFavoriteRepos = () => {
  return useQuery("favoriteRepos", () => {
    const data = getFromLS(LS_FAVORITES_KEY);
    return data || [];
  });
};

export const useToggleRepoToFavorites = () => {
  return useMutation(
    ({ id }) => {
      const data = getFromLS(LS_FAVORITES_KEY) || [];
      const isFavoriteRepo = data?.includes(id);
      let updatedData;

      if (isFavoriteRepo) {
        updatedData = data.filter((x) => x !== id);
      } else {
        updatedData = data.concat(id);
      }

      localStorage.setItem(LS_FAVORITES_KEY, JSON.stringify(updatedData));
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("favoriteRepos");
      },
    }
  );
};

// LS
const getFromLS = (key) => {
  const lsData = localStorage.getItem(key);

  try {
    const favoriteRepos = JSON.parse(lsData);
    return favoriteRepos;
  } catch (error) {
    return null;
  }
};
