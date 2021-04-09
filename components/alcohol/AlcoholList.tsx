import { css } from "@emotion/react";
import { List, Spin } from "antd";
import { getAlcoholsByCategoryIdApi } from "api/alcohol";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { flexColCss } from "styles/display";
import { serializeData } from "utils/serializeData";
import AlcoholListItem from "./AlcoholListItem";

interface AlcoholListProps {
  categoryId?: string;
  sortBy?: string;
  searchKey?: string;
}

const AlcoholList = ({ categoryId, sortBy, searchKey }: AlcoholListProps) => {
  const {
    data,
    isSuccess,
    isLoading,
    refetch,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["alcohollist", categoryId, searchKey],
    getAlcoholsByCategoryIdApi(categoryId as string, sortBy, searchKey),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
  const handleScroll = () => {
    const {
      documentElement: { scrollHeight, scrollTop, clientHeight },
    } = document;
    if (scrollHeight - 400 < scrollTop + clientHeight && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage]);

  useEffect(() => {
    refetch();
  }, [categoryId, sortBy, searchKey]);

  const [alcoholList, setAlcoholList] = useState([]);
  useEffect(() => {
    if (isSuccess) {
      setAlcoholList(serializeData(data!));
    }
  }, [isLoading, isFetching, isFetchingNextPage]);

  return (
    <List
      loading={isLoading}
      footer={
        isFetchingNextPage && (
          <div css={flexColCss}>
            <Spin />
          </div>
        )
      }
      dataSource={alcoholList}
      css={listCss}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      renderItem={(item) => (
        <List.Item>
          <AlcoholListItem alcohol={item} />
        </List.Item>
      )}
    />
  );
};

export default AlcoholList;

const listCss = css`
  min-width: 250px;
`;
