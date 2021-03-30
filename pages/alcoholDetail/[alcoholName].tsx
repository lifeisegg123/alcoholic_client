import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import AlcoholDetail from "components/alcohol/AlcoholDetail";
import ReviewContainer from "components/review/ReviewContainer";
import { getAlcoholDetailApi } from "api/alcohol";
import { Alcohol, Review } from "types";
import { Space } from "antd";
import Head from "next/head";

type AlcoholDetailPageProps = {
  alcohol: Alcohol;
  reviews: Review[];
};

const AlcoholDetailPage = ({}: AlcoholDetailPageProps) => {
  const router = useRouter();
  const { alcoholName } = router.query;
  const { data: alcohol } = useQuery(
    ["alcohol", "detail", alcoholName],
    getAlcoholDetailApi(alcoholName as string),
    { staleTime: Infinity, refetchOnWindowFocus: false }
  );
  return (
    <>
      <Head>
        <title>{alcohol.name} | 주당 이선생</title>
        <meta name="description" content={`${alcohol.name}의 정보`} />
        <meta property="og:description" content={`${alcohol.name}의 정보`} />
      </Head>
      <Space direction="vertical" size="large">
        <AlcoholDetail alcohol={alcohol} />
        <ReviewContainer
          reviews={alcohol.reviews}
          alcoholId={alcohol.id as string}
        />
      </Space>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { alcoholName } = ctx.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["alcohol", "detail", alcoholName],
    getAlcoholDetailApi(alcoholName as string),
    { staleTime: Infinity }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default AlcoholDetailPage;
