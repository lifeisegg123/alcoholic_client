import { css } from "@emotion/react";
import { Image, Card } from "antd";
import Link from "next/link";
import { Alcohol } from "types";

type AlcoholListItemProps = {
  alcohol: Alcohol;
};

const AlcoholListItem = ({
  alcohol: { id, thumbnail, name, rating, price },
}: AlcoholListItemProps) => {
  return (
    <Link href={`/alcoholDetail/${id}`}>
      <Card
        css={cardCss}
        hoverable
        cover={
          <Image css={imgCss} preview={false} src={`${thumbnail}`} alt={name} />
        }
      >
        <Card.Meta title={name} />
        <div css={CardInnerBox}>
          <span>
            <h5>가격</h5>
            <p>{price}</p>
          </span>
          <span>
            <h5>별점</h5>
            <p>{rating} 점</p>
          </span>
        </div>
      </Card>
    </Link>
  );
};

export default AlcoholListItem;

const imgCss = css`
  min-width: 100px;
  min-height: 100px;
`;

const cardCss = css`
  max-height: 200px;
  @media screen and (min-width: 567px) {
    max-height: 500px;
  }
`;

const CardInnerBox = css`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 2rem;
  }
`;
