import { useRouter } from "next/router";

import AlcoholList from "components/alcohol/AlcoholList";
import styled from "@emotion/styled";

const Search = () => {
  const router = useRouter();
  const { q } = router.query;

  return (
    <Wrapper>
      <AlcoholList searchKey={q as string} />
    </Wrapper>
  );
};

export default Search;

const Wrapper = styled.div`
  width: 100%;
`;
