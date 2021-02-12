import { Alcohol } from "types";
import { Card, Image, Popconfirm, Rate, Space } from "antd";
import styled from "@emotion/styled";
import { StarFilled } from "@ant-design/icons";
import { flexColCss, flexRowCss, horizontalMarginAuto } from "styles/display";
import { useState } from "react";
import AlcoholInfoBox from "./AlcoholInfoBox";
import { css } from "@emotion/react";
import Paragraph from "antd/lib/typography/Paragraph";

type AlcoholDetailProps = {
  alcohol: Alcohol;
};

const AlcoholDetail = ({
  alcohol: {
    name,
    thumbnail,
    rating,
    ratingCount,
    desc,
    alcoholPercentage,
    sellingAt,
    recommandedFood,
    ingredient,
  },
}: AlcoholDetailProps) => {
  const [rateValue, setRateValue] = useState(0);
  const handleRateChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    console.log(event);
  };
  return (
    <Wrapper>
      <Card css={flexColCss}>
        <Space direction="vertical">
          <Image preview={false} src={thumbnail} alt={name} />
          <div>
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
          </div>
          <Popconfirm
            css={popconCss}
            title="별점을 주시겠습니까?"
            onConfirm={handleRateChange}
            onCancel={() => setRateValue(0)}
            okText="Yes"
            cancelText="No"
            placement="topLeft"
          >
            <p>별점주기</p>
            <a href="#">
              <Rate
                allowHalf
                value={rateValue}
                onChange={(value) => setRateValue(value)}
              />
            </a>
          </Popconfirm>
          <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "더보기" }}>
            {desc}
          </Paragraph>
          <AlcoholInfoBox
            alcoholPercentage={alcoholPercentage}
            sellingAt={sellingAt}
            recommandedFood={recommandedFood}
            ingredient={ingredient}
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
    width: 70%;
  }
`;

const RateWrapper = styled.span`
  ${flexRowCss}
  align-items: center;
  font-size: 20px;
`;

const popconCss = css`
  ${flexRowCss}
  & p {
    margin-right: 10px;
  }
`;
