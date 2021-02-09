import { Image, Card } from "antd";
import Link from "next/link";

type AlcoholListItemProps = {
  id: string;
  imgSrc: string;
  name: string;
  desc: string;
};

const AlcoholListItem = ({ id, imgSrc, name, desc }: AlcoholListItemProps) => {
  return (
    <Link href={`/alcohol/${id}`}>
      <Card hoverable cover={<Image src={imgSrc} alt={name} />}>
        <Card.Meta title={name} description={desc} />
      </Card>
    </Link>
  );
};

export default AlcoholListItem;
