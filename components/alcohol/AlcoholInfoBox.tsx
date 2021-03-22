import { Col, Row, Card } from "antd";
import { currencyFormatter } from "utils/currencyFormatter";

type InfoContainerProps = {
  title: string;
  desc: string | string[] | number;
};

const InfoContainer = ({ title, desc }: InfoContainerProps) => (
  <div>
    <div>
      <h4>{title}</h4>
    </div>
    <div>
      <p>{desc}</p>
    </div>
  </div>
);
type AlcoholInfoBoxProps = {
  alcoholPercentage: number;
  ingredient: string;
  price: number;
  recommandedFood?: string;
  sellingAt?: string;
};
const AlcoholInfoBox = ({
  alcoholPercentage,
  sellingAt,
  recommandedFood,
  ingredient,
  price,
}: AlcoholInfoBoxProps) => {
  return (
    <Card>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <InfoContainer title="원료" desc={ingredient} />
        </Col>
        <Col span={12}>
          <InfoContainer title="알콜도수" desc={alcoholPercentage + "%"} />
        </Col>
        {sellingAt && (
          <Col span={12}>
            <InfoContainer title="판매처" desc={sellingAt} />
          </Col>
        )}
        <Col span={12}>
          <InfoContainer
            title="가격 (정확하지 않을 수 있습니다)"
            desc={currencyFormatter(price)}
          />
        </Col>
        {recommandedFood && (
          <Col span={24}>
            <InfoContainer title="추천안주" desc={recommandedFood} />
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default AlcoholInfoBox;
