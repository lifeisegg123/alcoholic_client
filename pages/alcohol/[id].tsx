import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';

import AlcoholDetailModal from 'components/AlcoholDetailModal';

const AlcoholDetail = () => {
  const route = useRouter()
  const {id} = route.query;
  return (
    <AlcoholDetailModal>
      Enter
    </AlcoholDetailMo>
  );
}




export const getServerSideProps:GetServerSideProps = async (ctx) => {


  return {
    props:{
      data:null
    }
  }
}

export default AlcoholDetail;