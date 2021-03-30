import { css } from "@emotion/react";
import { Image, Card } from "antd";
import Link from "next/link";
import { desktopCss } from "styles/display";
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
          title={name}
          description={
            <div css={CardInnerBox}>
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

const CardInnerBox = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 1rem;
  ${desktopCss({ "flex-direction": "row" })}
  span {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      white-space: nowrap;
    }
  }
`;
