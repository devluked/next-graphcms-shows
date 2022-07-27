import Layout from "@c/Layout";
import { Grid, Card } from "@c/Grid";
import { Title } from "@c/Title";
import { getAllShows } from "@l/graphcms";
import { useRouter } from "next/router";
import { useState } from "react";
import { formatUSD, formatDate } from "@l/utils";

export default function Shows({ shows }) {
  const router = useRouter();
  const [grid, setGrid] = useState(true);

  return (
    <Layout title="next-graphcms-shows / Shows">
      <Title>Shows</Title>
      <label for="show-select"></label>
      {/* 
          Decided to sort by passing the order to getServerSideProps and then to the API call
           since it allowed for cleaner code compared to doing it client side, and not a ton 
           of if statements and allowed it to be more readable
      */}
      <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
        <select
          onChange={(e) =>
            router.push({
              pathname: "/shows",
              query: { orderBy: e.target.value },
            })
          }
          id="show-select"
        >
          <option value="scheduledStartTime_DESC">
            Start Time - descending
          </option>
          <option value="scheduledStartTime_ASC">Start Time - ascending</option>
          <option value="title_DESC">Title - descending</option>
          <option value="title_ASC">Title - ascending</option>
        </select>
        <button onClick={() => setGrid(!grid)}>
          {grid ? "List View" : "Grid View"}
        </button>
      </div>
      <Grid grid={grid}>
        {shows.map((show) => (
          <Card
            grid={grid}
            href={`/show/${show.slug}`}
            header={show.title}
            key={show.id}
            startTime={formatDate(show.scheduledStartTime)}
            ticketPrice={formatUSD(show.ticketPrice)}
          >
            <p>{show.artists.map(({ fullName }) => fullName).join(", ")}</p>
          </Card>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const { orderBy } = query;
  const shows = (await getAllShows(orderBy)) || [];
  return {
    props: { shows },
  };
}
