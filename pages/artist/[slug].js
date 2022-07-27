import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import Layout from "@c/Layout";
import FlexyRow from "@c/FlexyRow";
import { getArtistBySlug } from "@l/graphcms";
import { useRouter } from "next/router";

const Markdown = styled(ReactMarkdown)`
  img {
    width: 100%;
    border-radius: 20px;
    border: 4px solid currentColor;
  }
`;

const ArtistName = styled.h2`
  text-align: center;
`;

const ArtistPhoto = styled.div`
  background-image: url(${(p) => p.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 4px solid currentColor;
  margin: 3rem auto;
`;

const BackButton = styled.h2`
  position: absolute;
  top: 0;
  left: 0;
  margin: 2rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Portrait = ({ images = [] }) => {
  if (images.length > 0) {
    const img = images[0];
    return <ArtistPhoto imageUrl={img.url} />;
  }
  return null;
};

export default function Artist({ artist }) {
  const router = useRouter();
  return (
    <Layout
      title={`${artist.fullName} / next-graphcms-shows`}
      maxWidth="900px"
      padding="0 2em"
    >
      <BackButton onClick={() => router.back()}> &lt;- Back</BackButton>
      <div key={artist.id}>
        <ArtistName>{artist.fullName}</ArtistName>

        <Portrait images={artist.images} />

        <FlexyRow justify="flex-start">
          <a
            href={
              !/^https?:\/\//i.test(artist.webUrl)
                ? "https://" + artist.webUrl
                : artist.webUrl
            }
            target="_blank"
          >
            Website
          </a>
          <a href={artist.facebookUrl} target="_blank">
            Facebook
          </a>
          <a href={artist.instagramUrl} target="_blank">
            Instagram
          </a>
          <a href={artist.youTubeUrl} target="_blank">
            YouTube
          </a>
        </FlexyRow>

        <Markdown source={artist.bio} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const artist = await getArtistBySlug(slug);

  if (artist)
    return {
      props: { artist },
    };
  else {
    return {
      notFound: true,
    };
  }
}
