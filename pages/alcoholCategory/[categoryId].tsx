import { Space } from "antd";
import AlcoholList from "components/alcohol/AlcoholList";
import { fakeAlcoholGenerator } from "fakeData/alcoholFakeData";
import { flexColCss } from "styles/display";

const mockDatas = new Array(10).fill(fakeAlcoholGenerator());

const AlcoholTabPage = () => {
  return (
    <div css={flexColCss}>
      <Space direction="vertical" size="large">
        <h3>category name</h3>
        <AlcoholList alcohols={mockDatas} />
      </Space>
    </div>
  );
};

export default AlcoholTabPage;
