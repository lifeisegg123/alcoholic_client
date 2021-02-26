import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import AlcoholDetail from "components/alcohol/AlcoholDetail";
import ReviewContainer from "components/review/ReviewContainer";
import { getAlcoholDetailApi } from "api/alcohol";
import { Alcohol, Review } from "types";
import { Space } from "antd";

type AlcoholDetailPageProps = {
  alcohol: Alcohol;
  reviews: Review[];
};

const AlcoholDetailPage = ({}: AlcoholDetailPageProps) => {
  const router = useRouter();
  const { alcoholId } = router.query;
  const { data: alcohol } = useQuery(
    ["alcohol", "detail", alcoholId],
    getAlcoholDetailApi(alcoholId as string)
  );
  return (
    <Space direction="vertical" size="large">
      <AlcoholDetail alcohol={alcohol} />
      <ReviewContainer
        reviews={alcohol.reviews}
        alcoholId={alcoholId as string}
      />
    </Space>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { alcoholId } = ctx.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["alcohol", "detail", alcoholId],
    getAlcoholDetailApi(alcoholId as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default AlcoholDetailPage;
