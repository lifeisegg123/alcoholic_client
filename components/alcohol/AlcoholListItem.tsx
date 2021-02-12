import { css } from "@emotion/react";
import { Image, Card } from "antd";
import Link from "next/link";
import { Alcohol } from "types";

type AlcoholListItemProps = {
  alcohol: Alcohol;
};

const AlcoholListItem = ({
  alcohol: { id, thumbnail, name, desc },
}: AlcoholListItemProps) => {
  return (
    <Link href={`/alcoholDetail/${id}`}>
      <Card
        css={cardCss}
        hoverable
        cover={<Image preview={false} src={thumbnail} alt={name} />}
      >
        <Card.Meta
          title={name}
          //description={desc.length > 50 ? desc.slice(0, 50) + "..." : desc}
        />
      </Card>
    </Link>
  );
};

export default AlcoholListItem;

const cardCss = css`
  max-width: 100px;
  max-height: 200px;
  @media screen and (min-width: 567px) {
    max-width: 300px;
    max-height: 500px;
  }
`;
