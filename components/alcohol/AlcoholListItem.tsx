import { css, Theme } from "@emotion/react";
import { Image, Card } from "antd";
import Link from "next/link";
import { Alcohol } from "types";
import { currencyFormatter } from "utils/currencyFormatter";

type AlcoholListItemProps = {
  alcohol: Alcohol;
};

const AlcoholListItem = ({
  alcohol: { thumbnail, name, rating, price },
}: AlcoholListItemProps) => {
  return (
    <Link href={`/alcoholDetail/${name}`}>
      <Card
        hoverable
        cover={
          <Image css={imgCss} preview={false} src={`${thumbnail}`} alt={name} />
        }
      >
        <Card.Meta
          css={{ textAlign: "center" }}
          title={name}
          description={
            <div css={(theme) => CardInnerBox(theme)}>
              <span>
                <h5>가격</h5>
                <p>{currencyFormatter(price)}</p>
              </span>
              <span>
                <h5>별점</h5>
                <p>{rating} 점</p>
              </span>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default AlcoholListItem;

const imgCss = css`
  min-width: 100px;
  min-height: 100px;
`;

const CardInnerBox = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  span {
    :first-of-type {
      border-right: none;
    }
    border: 1px solid ${theme.colors.grey};
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h5 {
      margin-top: 0.5rem;
    }
    p {
      white-space: nowrap;
      margin-bottom: 0.5rem;
    }
  }
`;
