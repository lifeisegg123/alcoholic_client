import { css } from "@emotion/react";
import { Space } from "antd";
import { Alcohol } from "types";
import AlcoholListItem from "./AlcoholListItem";

interface AlcoholListProps {
  alcohols: Alcohol[];
}

const AlcoholList = ({ alcohols }: AlcoholListProps) => {
  return (
    <Space css={spaceCss} size={[10, 40]} wrap>
      {alcohols.map((alcohol) => (
        <AlcoholListItem key={alcohol.id} alcohol={alcohol} />
      ))}
    </Space>
  );
};

export default AlcoholList;

const spaceCss = css`
  justify-content: space-around;
  padding: 3% 0;
`;
