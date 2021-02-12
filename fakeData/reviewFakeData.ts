import faker from "faker";
import { Review } from "types";

export const fakeReviewGenerator = (): Review => ({
  desc: faker.lorem.lines(1),
});
