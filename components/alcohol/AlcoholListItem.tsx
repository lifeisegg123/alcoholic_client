import { css } from "@emotion/react";
import { Image, Card } from "antd";
import { backUrl } from "configs/environment";
import Link from "next/link";
import { Alcohol } from "types";

type AlcoholListItemProps = {
  alcohol: Alcohol;
};

const AlcoholListItem = ({
  alcohol: { id, thumbnail, name },
}: AlcoholListItemProps) => {
  console.log(id, thumbnail, name);
  return (
    <Link href={`/alcoholDetail/${id}`}>
      <Card
        css={cardCss}
        hoverable
        cover={
          <Image
            css={imgCss}
            preview={false}
            src={`${backUrl}/${thumbnail}`}
            alt={name}
          />
        }
      >
        <Card.Meta title={name} />
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
  max-width: 100px;
  max-height: 200px;
  @media screen and (min-width: 567px) {
    max-width: 300px;
    max-height: 500px;
  }
`;
