import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";

import { getAlcoholsByCategoryIdApi } from "api/alcohol";
import { serializeData } from "utils/serializeData";
import { Spin } from "antd";
import AlcoholList from "components/alcohol/AlcoholList";

const Search = () => {
  const router = useRouter();
  const { q } = router.query;
  const { data, isSuccess, isLoading } = useInfiniteQuery(
    ["alcohol/category", q],
    getAlcoholsByCategoryIdApi(undefined, undefined, q as string),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const [alcoholList, setAlcoholList] = useState([]);
  useEffect(() => {
    if (isSuccess) {
      setAlcoholList(serializeData(data!));
    }
  }, [isLoading]);
  return (
    <div>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <AlcoholList alcohols={alcoholList} />
      )}
    </div>
  );
};

export default Search;
