import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const PostContainer = styled.div`
  width: 600px;
  .slick-track {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 30px 0 30px 0;
  }
  .slick-dots {
    li {
      button {
        &::before {
          font-size: 20px;
          color: #5e5858;
        }

        &.slick-active::before {
          color: #bda8a8;
        }
      }
    }
  }
`;
