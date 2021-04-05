import { Alcohol } from "types";
import { Card, Image, message, Popconfirm, Rate, Space } from "antd";
import styled from "@emotion/styled";
import { StarFilled } from "@ant-design/icons";
import { flexColCss, flexRowCss, horizontalMarginAuto } from "styles/display";
import { useEffect, useState } from "react";
import AlcoholInfoBox from "./AlcoholInfoBox";
import { css } from "@emotion/react";
import Paragraph from "antd/lib/typography/Paragraph";
import { useMutation, useQueryClient } from "react-query";
import { addRatingApi, updateRatingApi } from "api/rating";
import { useUser } from "hooks/useUser";

type AlcoholDetailProps = {
  alcohol: Alcohol;
};

const AlcoholDetail = ({
  alcohol: {
    id,
    name,
    thumbnail,
    rating,
    ratingCount,
    desc,
    alcoholPercentage,
    sellingAt,
    recommandedFood,
    ingredient,
    price,
    ratings,
  },
}: AlcoholDetailProps) => {
  const queryClient = useQueryClient();
  const [user, isLoggedIn] = useUser();
  const hasRating =
    user && ratings.filter((v) => v.user!.id === user.id)[0]?.rating;
  const [rateValue, setRateValue] = useState(0);
  const [descList, setDescList] = useState(desc.split(";;"));

  useEffect(() => {
    setDescList(desc.split(";;"));
  }, [desc]);
  useEffect(() => {
    if (hasRating && hasRating > 0) {
      setRateValue(hasRating);
    }
  }, []);

  const handleRateClick = (value: number) => {
    if (!isLoggedIn) return message.error("로그인 후 시도해주세요");
    setRateValue(value);
  };

  const ratingMuation = useMutation(
    hasRating === undefined ? addRatingApi : updateRatingApi
  );
  const handleRateChange = async () => {
    try {
      await ratingMuation.mutateAsync({
        rating: rateValue,
        alcoholId: id!,
      });
      queryClient.fetchQuery(["alcohol", "detail", String(id)]);
      message.success("별점이 등록되었습니다.");
    } catch (error) {
      console.error(error);
      message.error("별점등록을 실패하였습니다.");
    }
  };
  return (
    <Wrapper>
      <Card css={cardCss}>
        <Space direction="vertical" size="large">
          <Image width="100%" preview={false} src={thumbnail} alt={name} />
          <BottomLineDiv>
            <Space>
              <span>
                <h3>{name}</h3>
              </span>
              <RateWrapper>
                <StarFilled />
                <p>{rating}</p>
              </RateWrapper>
              <p>{ratingCount} 개의 별점</p>
            </Space>
          </BottomLineDiv>
          <StyledPopconfirm
            title={`별점을 ${
              hasRating === undefined ? "주" : "수정하"
            }시겠습니까?`}
            onConfirm={handleRateChange}
            onCancel={() => setRateValue(hasRating || 0)}
            okText="Yes"
            cancelText="No"
            placement="topLeft"
            disabled={!isLoggedIn}
          >
            <p>별점주기</p>
            <a href="#">
              <Rate allowHalf value={rateValue} onChange={handleRateClick} />
            </a>
          </StyledPopconfirm>
          <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "더보기" }}>
            {descList.map((v, i) => (
              <p key={`${v}_${i}`}>{v}</p>
            ))}
          </Paragraph>
          <AlcoholInfoBox
            alcoholPercentage={alcoholPercentage}
            sellingAt={sellingAt}
            recommandedFood={recommandedFood}
            ingredient={ingredient}
            price={price}
          />
        </Space>
      </Card>
    </Wrapper>
  );
};

export default AlcoholDetail;

const Wrapper = styled.div`
  ${horizontalMarginAuto}
  ${flexColCss}
  justify-content: space-around;
  @media screen and (min-width: 567px) {
    width: 100%;
  }
`;

const RateWrapper = styled.span`
  ${flexRowCss}
  align-items: center;
  font-size: 20px;
`;

const BottomLineDiv = styled.div`
  border-bottom: solid 1px ${({ theme }) => theme.colors.grey};
`;

const cardCss = css`
  ${flexColCss}
`;

const StyledPopconfirm = styled(Popconfirm)`
  ${flexRowCss}
  border-bottom: solid 1px ${({ theme }) => theme.colors.grey};
  & p {
    margin-right: 10px;
  }
`;
