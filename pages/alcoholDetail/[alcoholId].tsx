import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";

import AlcoholDetail from "components/alcohol/AlcoholDetail";
import { fakeAlcoholGenerator } from "fakeData/alcoholFakeData";
import { fakeReviewGenerator } from "fakeData/reviewFakeData";
import ReviewContainer from "components/review/ReviewContainer";

const alcohol = fakeAlcoholGenerator();
const reviews = new Array(10).fill(fakeReviewGenerator());

const AlcoholDetailPage = () => {
  const route = useRouter();
  const { alcoholId } = route.query;
  console.log(alcoholId, "alcoholId");
  return (
    <>
      <AlcoholDetail alcohol={alcohol} />
      <ReviewContainer reviews={reviews} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  };
};

export default AlcoholDetailPage;
