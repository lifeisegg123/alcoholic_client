import { useRouter } from "next/router";

import AlcoholList from "components/alcohol/AlcoholList";

const Search = () => {
  const router = useRouter();
  const { q } = router.query;

  return (
    <div>
      <AlcoholList searchKey={q as string} />
    </div>
  );
};

export default Search;
