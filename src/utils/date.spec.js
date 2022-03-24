import { jest } from "@jest/globals";

import { formatDaysAgo } from "./date";

jest.useFakeTimers();

describe("formatDaysAgo", () => {
  it("should display date relatively for past days", () => {
    jest.setSystemTime(new Date("2022-03-31").getTime());

    const daysAgo = formatDaysAgo("2022-03-30");

    expect(daysAgo).toBe("1 day ago");
  });
});
