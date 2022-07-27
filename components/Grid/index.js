import Link from "next/link";
import styled, { css } from "styled-components";
import { truncateText } from "@l/utils";
import { Fragment } from "react";

const CardStyle = css`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid var(--gallery-grey);
  border-radius: 10px;
  transition: 150ms ease;
  width: 100%;

  :hover,
  :focus,
  :active {
    color: #000;
    background-color: var(--gallery-grey);
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

const StyledGrid = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.grid ? "row" : "column")};
  flex-wrap: ${(props) => (props.grid ? "wrap" : "nowrap")};
  margin-top: 1rem;
  width: 100%;
  justify-content: center;

  @media (min-width: 600px) {
    width: ${(props) => (props.grid ? "100%" : "50vw")};
    flex-direction: ${(props) => (props.grid ? "row" : "column")};
  }
`;

export function Card({
  children,
  header,
  href,
  title,
  startTime,
  ticketPrice,
  grid,
}) {
  return href ? (
    <Link href={href} passHref>
      <a css={CardStyle} title={title}>
        <h3>{header} &rarr;</h3>
        {children}
        {!grid && (
          <Fragment>
            <p style={{ fontWeight: 600, margin: "5px 0" }}>{startTime}</p>
            <p style={{ fontWeight: 600 }}>{ticketPrice}</p>
          </Fragment>
        )}
      </a>
    </Link>
  ) : (
    <div css={CardStyle} title={title}>
      <h3 title={header}>{truncateText(header, 22)} &rarr;</h3>
      {children}
      {!grid && (
        <Fragment>
          <p style={{ fontWeight: 600, margin: "5px 0" }}>{startTime}</p>
          <p style={{ fontWeight: 600 }}>{ticketPrice}</p>
        </Fragment>
      )}
    </div>
  );
}

export function Grid({ children, grid }) {
  return <StyledGrid grid={grid}>{children}</StyledGrid>;
}
