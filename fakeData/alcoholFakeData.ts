import faker from "faker";
import { Alcohol } from "types";

export const fakeAlcoholGenerator = (): Alcohol => ({
  id: faker.random.uuid(),
  name: faker.name.firstName(),
  thumbnail: faker.image.imageUrl(),
  rating: faker.random.number(5),
  ratingCount: faker.random.number(100000),
  desc: faker.lorem.paragraph(3),
  alcoholPercentage: faker.random.number(5),
  sellingAt: faker.random.word(),
  recommandedFood: [faker.random.words(2)],
  ingredient: faker.random.word(),
  category: faker.random.number(5),
});
