import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import Layout from "@c/Layout";
import FlexyRow from "@c/FlexyRow";
import { Title } from "@c/Title";
import { getShowBySlug } from "@l/graphcms";
import { formatUSD, formatDate } from "@l/utils";
import { useRouter } from "next/router";
import BackButton from "@c/BackButton";

const Markdown = styled(ReactMarkdown)`
  img {
    width: 100%;
    border-radius: 20px;
    border: 4px solid currentColor;
  }
`;

const ArtistName = styled.h2`
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
`;

const ArtistPhoto = styled.div`
  background-image: url(${(p) => p.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 4px solid currentColor;
  margin: 0 auto;
  cursor: pointer;
  &:hover {
    border: 8px solid currentColor;
  }
`;

const Portrait = ({ images = [], onClick }) => {
  if (images.length > 0) {
    const img = images[0];
    return <ArtistPhoto onClick={onClick} imageUrl={img.url} />;
  }
  return null;
};

export default function Shows({ show }) {
  const router = useRouter();

  return (
    <Layout
      title={`${show.title} / next-graphcms-shows`}
      maxWidth="900px"
      padding="0 2em"
    >
      <Title>{show.title}</Title>
      <BackButton onClick={() => router.push("/shows")}> &lt;- Back</BackButton>

      <FlexyRow>
        <span>Price: {formatUSD(show.ticketPrice)}</span>
        <span>{formatDate(show.scheduledStartTime)}</span>
      </FlexyRow>

      <Markdown source={show.description} />

      {show.artists.map((artist) => (
        <div key={artist.id}>
          <ArtistName onClick={() => router.push(`/artist/${artist.slug}`)}>
            {artist.fullName}
          </ArtistName>

          <Portrait
            onClick={() => router.push(`/artist/${artist.slug}`)}
            images={artist.images}
          />
        </div>
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const show = await getShowBySlug(slug);

  if (show)
    return {
      props: { show },
    };
  else {
    return {
      notFound: true,
    };
  }
}
