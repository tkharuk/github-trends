import { useQuery } from "react-query";
import { subDays } from "date-fns";

export const useGithubTrends = () => {
  return useQuery("githubTrends", async () => {
    const wtd = subDays(new Date(), 7).toISOString();

    const url = "https://api.github.com/search/repositories";

    const params = new URLSearchParams({
      q: `created:>${wtd}`,
      sort: "stars",
      order: "desc",
    });

    const res = await fetch(`${url}?${params}`);
    const data = await res.json();

    return data;
  });
};
