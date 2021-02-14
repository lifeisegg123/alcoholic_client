import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";

import AlcoholDetail from "components/alcohol/AlcoholDetail";
import ReviewContainer from "components/review/ReviewContainer";
import { getAlcoholDetailApi } from "api/alcohol";
import { Alcohol, Review } from "types";

type AlcoholDetailPageProps = {
  alcohol: Alcohol;
  reviews: Review[];
};

const AlcoholDetailPage = ({ alcohol, reviews }: AlcoholDetailPageProps) => {
  const router = useRouter();
  const { alcoholId } = router.query;
  return (
    <>
      <AlcoholDetail alcohol={alcohol} />
      <ReviewContainer reviews={reviews} alcoholId={alcoholId as string} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { alcoholId } = ctx.query;
  const data = await getAlcoholDetailApi(alcoholId as string)();
  return {
    props: {
      alcohol: data,
      reviews: data.reviews,
    },
  };
};

export default AlcoholDetailPage;
