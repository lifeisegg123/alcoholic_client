import { css } from "@emotion/react";
import { List, Space } from "antd";
import { Alcohol } from "types";
import AlcoholListItem from "./AlcoholListItem";

interface AlcoholListProps {
  alcohols: Alcohol[];
}

const AlcoholList = ({ alcohols }: AlcoholListProps) => {
  return (
    <List
      dataSource={alcohols}
      renderItem={(item) => (
        <List.Item>
          <AlcoholListItem alcohol={item} />
        </List.Item>
      )}
    />
    /*     <Space css={spaceCss} size={[10, 40]} wrap>
      {alcohols.length &&
        alcohols.map((alcohol) => (
          <AlcoholListItem key={alcohol.id} alcohol={alcohol} />
        ))}
    </Space> */
  );
};

export default AlcoholList;

const spaceCss = css`
  justify-content: space-around;
  padding: 3% 0;
`;
