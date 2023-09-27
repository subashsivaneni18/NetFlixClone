import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useMovies from "@/hooks/useFavorites";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useMoviesList from "@/hooks/useMoviesList";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}



export default function Home() {

  const {data:user} = useCurrentUser()
  const infoModal = useInfoModalStore()
  const {data:Movies} = useMoviesList()
  const { data: favorites } = useMovies();

  return (
    <>
      <InfoModal visible={infoModal.isOpen}  onClose={infoModal.closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending" data={Movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
